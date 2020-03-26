import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import {DatePicker, Counter, Loading as LoadingScreen, Modal, IconInput, Dropdown as DropdownItem} from '../shared';
import {getFlights} from '../../api/flightApi';
import FlightList from './FlightList';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../helpers/helpers';
import {connect} from 'react-redux';
import {setFlights, setSearchDetails} from '../../redux/actions/flightActions';
import history from '../../history';
import {Container, Segment} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import {setTTLtime} from '../../redux/actions/flightActions';
import ReactDOM from 'react-dom';
import {Dropdown} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Radio} from 'semantic-ui-react';

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
		const {hideReturnField, searching, cities} = this.state;
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
					<Modal show={searching}>
						<LoadingScreen />
					</Modal>
				)}
				<Formik
					initialValues={searchDetails}
					validationSchema={SearchFlightSchema}
					onSubmit={(values, {setSubmitting}) => {
						history.push('/flights');
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
							<div className='input-section'>
								<div className='d-none d-md-block select-trip'>
									<span
										onClick={() => {
											setFieldValue('strTripType', 'O');
											this.changeTripType('O');
										}}
									>
										One-Way
									</span>
									<span
										onClick={() => {
											setFieldValue('strTripType', 'R');
											this.changeTripType('R');
										}}
									>
										Round Trip
									</span>
								</div>

								<div className='input-section-inputs'>
									<div className='field-box form-group'>
										<label>Going from</label>
										<Dropdown
											name='strSectorFrom'
											onBlur={handleBlur}
											className='icon btn-dropdown'
											iconPosition='left'
											icon='fas fa-plane departure'
											onChange={(e, data) => {
												setFieldValue(`strSectorFrom`, data.value);
											}}
											placeholder={'Going From'}
											value={values.strSectorFrom}
											fluid
											search
											selection
											selectOnBlur={false}
											options={cities.map(function(sector) {
												return {
													key: sector.SectorCode,
													value: sector.SectorCode,
													text: sector.SectorName
												};
											})}
										/>
										<ErrorMessage name='strSectorFrom' />
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
									<div className='field-box form-group'>
										<label>Going To</label>
										<Dropdown
											name='strSectorTo'
											onBlur={handleBlur}
											className='icon btn-dropdown'
											iconPosition='left'
											icon='fas fa-plane arrival'
											placeholder={'Going To'}
											value={values.strSectorTo}
											onChange={(e, data) => {
												setFieldValue(`strSectorTo`, data.value);
											}}
											fluid
											search
											selection
											selectOnBlur={false}
											options={cities
												.filter((v) => v.SectorCode !== values.strSectorFrom)
												.map(function(sector) {
													return {
														key: sector.SectorCode,
														value: sector.SectorCode,
														text: sector.SectorName
													};
												})}
										/>

										<ErrorMessage name='strSectorTo' />
									</div>
								</div>
								<div className='input-section-inputs'>
									<div className='field-box form-group'>
										<label>Departure Date</label>
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
										<ErrorMessage name='strFlightDate' />
										<div className='toggle-trip'>
											<Radio
												toggle
												checked={this.state.tripType == 'R'}
												onChange={() => {
													setFieldValue('strTripType', this.toggleTripType());
												}}
												value={this.state.tripType}
											/>
											<span class='label'>Round Trip?</span>
										</div>
									</div>
									<div className={`field-box form-group ${hideReturnField ? 'd-none' : ''}`}>
										<label>Arrival Date</label>
										<DatePicker
											name='strReturnDate'
											className='form-control'
											type='date'
											date={values.strReturnDate}
											minDate={new Date()}
											format='dd-mm-YYYY'
											onBlur={handleBlur}
											onChange={(date) => setFieldValue('strReturnDate', date)}
											value={moment(values.strReturnDate).format('D MMM, YYYY')}
											placeholder='Arrival Date'
										/>
										<ErrorMessage name='strReturnDate' />
									</div>
									<div className='field-box form-group'>
										<label>Adult/Child</label>
										{/* <IconInput icon='icon-users' iconPosition='left'>
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
										</IconInput> */}
										<Dropdown
											name=''
											placeholder='Select Country'
											value=''
											icon='icon-users'
											className='icon btn-dropdown'
											fluid
											selection
											closeOnChange={false}
											placeholder={`${values.intAdult + values.intChild} Traveller(s)`}
											onClick={(event, data) => {
												event.preventDefault();
											}}
										>
											<Dropdown.Menu>
												<Dropdown.Item
													value={`${values.intAdult + values.intChild} Traveller(s)`}
													content={
														<Counter
															id='intAdult'
															type='number'
															className='m-1'
															onBlur={handleBlur}
															title={`${values.intAdult} Adult`}
															onChange={(value) => setFieldValue('intAdult', value)}
															value={values.intAdult}
														/>
													}
												/>
												<Dropdown.Item
													value={`${values.intAdult + values.intChild} Traveller(s)`}
													content={
														<Counter
															id='intChild'
															type='number'
															className='m-1'
															onBlur={handleBlur}
															title={`${values.intChild} Child`}
															onChange={(value) => setFieldValue('intChild', value)}
															value={values.intChild}
														/>
													}
												/>
											</Dropdown.Menu>
										</Dropdown>
										<ErrorMessage name='intAdult' />
										<ErrorMessage name='intChild' />
									</div>

									<div className='field-box form-group'>
										<label htmlFor=''>Nationality</label>
										<Dropdown
											name='strNationality'
											placeholder='Select Country'
											className='icon btn-dropdown'
											iconPosition='left'
											icon='fas fa-globe'
											onBlur={handleBlur}
											onChange={(e, data) => {
												setFieldValue(`strNationality`, data.value);
											}}
											value={values.strNationality}
											fluid
											search
											selection
											selectOnBlur={false}
											options={countries.map(function(country) {
												return {
													key: country.id,
													value: country.country_char,
													flag: country.country_char.toLowerCase(),
													text: country.name
												};
											})}
										/>
										<ErrorMessage name='strNationality' />
									</div>
									<div class='field-box text-center'>
										<button
											className='search-btn btn btn-secondary btn-large'
											type='submit'
											disabled={isSubmitting}
										>
											Search
										</button>
									</div>
								</div>
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
