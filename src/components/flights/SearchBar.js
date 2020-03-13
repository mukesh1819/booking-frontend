import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from '../shared/Datepicker';
import {getFlights} from '../../api/flightApi';
import FlightList from './FlightList';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../utils/helpers';
import {connect} from 'react-redux';
import {setFlights, setSearchDetails} from '../../redux/actions/flightActions';
import store from '../../redux/store';
import history from '../../history';
import {Container, Segment} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import Counter from '../shared/Counter';
import DropdownItem from '../shared/Dropdown';

import IconInput from '../shared/IconInput';
import {Input} from 'semantic-ui-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import {setTTLtime} from '../../redux/actions/flightActions';
import ReactDOM from 'react-dom';
import LoadingScreen from '../shared/Loading';
import SweetAlert from 'react-bootstrap-sweetalert';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		var date = new Date();
		date.setDate(date.getDate() + 2);
		this.state = {
			cities: [],
			hideReturnField: true,
			isSubmitted: false,
			availableFlights: [],
			searching: false,
			tripType: 'O'
		};
		this.strSectorFrom = React.createRef();
		this.strSectorTo = React.createRef();
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.setState({
			searchDetails: this.props.searchDetails
		});
		this.fetchCities();
	}

	fetchCities = () => {
		getCities()
			.then((response) => {
				this.setState({
					cities: response.data.Sector
				});
				console.log(response.data.Sector);
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					error
				});
			});
	};

	changeTripType = (trip) => {
		this.setState({
			tripType: trip,
			hideReturnField: trip == 'O' ? true : false
		});
	};

	toggleTripType = () => {
		var value = this.state.tripType == 'R' ? 'O' : 'R';
		this.setState(function(prevState) {
			return {tripType: prevState.tripType == 'R' ? 'O' : 'R', hideReturnField: !prevState.hideReturnField};
		});
		return value;
	};

	toggleSectors = () => {
		this.strSectorFrom.current;
		console.log('Changed SearchDetails', this.state.searchDetails);
		this.props.setSearchDetails(
			Object.assign({}, this.state.searchDetails, {
				strSectorFrom: this.state.searchDetails.strSectorTo,
				strSectorTo: this.state.searchDetails.strSectorFrom
			})
		);
	};

	render() {
		const {hideReturnField, searching} = this.state;
		const {searchDetails, countries} = this.props;
		console.log('Search Details', searchDetails);

		const SearchFlightSchema = yup.object().shape({
			strFlightDate: yup.date().required('Required').default(function() {
				return new Date();
			}),
			strReturnDate: yup.date().required('Required').default(function() {
				return yup.ref('strFlightDate');
			}),
			strSectorFrom: yup.string().required('Required'),
			strSectorTo: yup.string().required('Required'),
			strNationality: yup.string().required('Required'),
			intAdult: yup.number().min(1, 'Cannot be less than 1').required('Required'),
			intChild: yup.number().min(0, 'Cannot be less than 0').required('Required')
		});

		return (
			<div id='search-flight-form'>
				{searching && (
					<SweetAlert showCancel={false} title='Searching Flights' onConfirm={console.log('Confirm')}>
						<LoadingScreen />
					</SweetAlert>
				)}
				<Formik
					initialValues={searchDetails}
					validationSchema={SearchFlightSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							isSubmitted: true,
							searching: true
						});
						console.log(values);
						this.props.setSearchDetails(values);
						getFlights(values)
							.then((response) => {
								setSubmitting(false);
								this.props.setFlights(response.data.data);
								this.props.setTTLtime(0);
								this.setState({
									searching: false,
									availableFlights: response.data.data
								});
								history.push('/flights');
							})
							.catch((error) => {
								console.log('Search Flight Error', error);
								setSubmitting(false);
								this.setState({
									searching: false
								});
								swal({
									title: 'No Flights Found!',
									text: 'Something went wrong',
									icon: 'error',
									button: 'Try Again!'
								});
							});
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						setFieldValue
						/* and other goodies */
					}) => (
						<form onSubmit={handleSubmit} autoComplete='off'>
							<ButtonGroup className='d-none d-md-block' aria-label='Basic example'>
								<Button
									type='button'
									variant='secondary'
									className='btn btn-secondary btn-sm'
									onClick={() => {
										setFieldValue('strTripType', 'O');
										this.changeTripType('O');
									}}
								>
									One Way
								</Button>
								<Button
									type='button'
									variant='secondary'
									className='btn btn-secondary btn-sm'
									onClick={() => {
										setFieldValue('strTripType', 'R');
										this.changeTripType('R');
									}}
								>
									Return
								</Button>
							</ButtonGroup>
							<div className='input-section'>
								<div className='field-box'>
									<label>Going from</label>
									<IconInput icon='icon-paper-plane' iconPosition='left'>
										<Field
											as='select'
											name='strSectorFrom'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.strSectorFrom}
											ref={this.strSectorFrom}
											defaultValue=''
										>
											<option value='' disabled>
												Going From
											</option>
											{this.state.cities.map(function(sector) {
												return (
													<option key={sector.SectorCode} value={sector.SectorCode}>
														{sector.SectorName}
													</option>
												);
											})}
											<ErrorMessage name='strSectorFrom' />
										</Field>
									</IconInput>
									<div>
										<div className='toggle-sector'>
											<i
												className='fas fa-exchange-alt'
												onClick={() => {
													setFieldValue('strSectorTo', values.strSectorFrom);
													setFieldValue('strSectorFrom', values.strSectorTo);
												}}
											/>
										</div>
									</div>
								</div>
								<div className='field-box'>
									<label>Going To</label>
									<IconInput icon='icon-paper-plane' iconPosition='left'>
										<Field
											as='select'
											name='strSectorTo'
											className='form-control'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.strSectorTo}
											ref={this.strSectorTo}
											defaultValue=''
										>
											<option value='' disabled>
												Going To
											</option>
											{this.state.cities.map(function(sector) {
												return (
													<option key={sector.SectorCode} value={sector.SectorCode}>
														{sector.SectorName}
													</option>
												);
											})}
										</Field>
									</IconInput>

									<ErrorMessage name='strSectorTo' />
								</div>
								<div className='field-box'>
									<label>Departure Date</label>
									<IconInput icon='icon-calendar' iconPosition='left'>
										<DatePicker
											name='strFlightDate'
											className='form-control'
											type='date'
											date={values.strFlightDate}
											minDate={new Date()}
											format='dd-mm-YYYY'
											onBlur={handleBlur}
											onChange={(date) => setFieldValue('strFlightDate', date)}
											value={moment(values.strFlightDate).format('D MMM, YYYY')}
											placeholder='Departure Date'
										/>
									</IconInput>
									<ErrorMessage name='strFlightDate' />
								</div>
								<div>
									<div className='toggle-trip'>
										<FormControlLabel
											control={
												<Switch
													checked={this.state.tripType == 'R'}
													onChange={() => {
														setFieldValue('strTripType', this.toggleTripType());
													}}
													value={this.state.tripType}
												/>
											}
										/>
										<span class='label'>Round Trip?</span>
									</div>
								</div>
								<div className={`field-box ${hideReturnField ? 'd-none' : ''}`}>
									<label>Arrival Date</label>
									<IconInput icon='icon-calendar' iconPosition='left'>
										<DatePicker
											name='strReturnDate'
											className='form-control'
											type='date'
											format='dd-mm-YYYY'
											date={values.strFlightDate}
											minDate={new Date()}
											onBlur={handleBlur}
											onChange={(date) => setFieldValue('strReturnDate', date)}
											value={moment(values.strReturnDate).format('D MMM, YYYY')}
											disabled={hideReturnField}
											placeholder='Arrival Date'
										/>
									</IconInput>
									<ErrorMessage name='strReturnDate' />
								</div>
								<div className='field-box'>
									<label>Adult/Child</label>
									<IconInput icon='icon-users' iconPosition='left'>
										<DropdownItem
											title={`${values.intAdult + values.intChild} Traveller`}
											className='text-field px-3'
										>
											<Counter
												id='intAdult'
												type='number'
												className='m-1'
												onBlur={handleBlur}
												title={`${values.intAdult} Adult`}
												onChange={(value) => setFieldValue('intAdult', value)}
												value={values.intAdult}
											/>
											<Counter
												id='intChild'
												type='number'
												className='m-1'
												onBlur={handleBlur}
												title={`${values.intChild} Child`}
												onChange={(value) => setFieldValue('intChild', value)}
												value={values.intChild}
											/>
										</DropdownItem>
									</IconInput>
									<ErrorMessage name='intAdult' />
									<ErrorMessage name='intChild' />
								</div>
								<div className='field-box'>
									<label>Nationality</label>
									<IconInput icon='icon-flag' iconPosition='left'>
										<Field
											as='select'
											name='strNationality'
											className='form-control'
											onChange={handleChange}
											value={values.strNationality}
											defaultValue=''
										>
											<option value='' disabled>
												Nationality
											</option>
											{countries.map((country) => {
												return (
													<option key={country.id} value={country.country_char}>
														{country.name}
													</option>
												);
											})}
										</Field>
									</IconInput>

									<ErrorMessage name='strNationality' />
								</div>
							</div>
							<div class='text-center'>
								<button
									className='search-btn btn btn-secondary m-2'
									type='submit'
									disabled={isSubmitting}
								>
									Search
								</button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = ({flightStore, extras}) => ({
	flights: flightStore.flights,
	searchDetails: flightStore.searchDetails,
	ttlTime: flightStore.ttlTime,
	countries: extras.countries
});

const mapDispatchToProps = {
	setFlights,
	setSearchDetails,
	setTTLtime
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
