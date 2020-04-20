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
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import {connect} from 'react-redux';
import {setFlights, setSearchDetails, setTTLtime, setError, clearFlights} from '../../redux/actions';
import history from '../../history';
import {Container, Segment} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {Dropdown} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Radio} from 'semantic-ui-react';
import swal from 'sweetalert';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		var date = new Date();
		date.setDate(date.getDate() + 2);
		this.state = {
			cities: [],
			hideReturnField: true,
			availableFlights: [],
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
			})
			.catch((error) => {
				this.props.setError('Cant fetch cities');
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
		const {hideReturnField, cities, minDate} = this.state;
		const {searchDetails, countries, setError} = this.props;
		console.log('Search Details', searchDetails);

		const SearchFlightSchema = yup.object().shape({
			strFlightDate: yup.date().required('Required').default(function() {
				return new Date();
			}),
			strReturnDate: yup.date().default(function() {
				return yup.ref('strFlightDate');
			}),
			strSectorFrom: yup.string().required('Required'),
			strSectorTo: yup.string().required('Required'),
			strNationality: yup.string().required('Required'),
			intAdult: yup.number().min(1, 'Traveller cannot be zero').required('Required'),
			intChild: yup.number().min(0, 'Traveller cannot be zero').required('Required')
		});

		return (
			<div id='search-flight-form'>
				<Formik
					initialValues={searchDetails}
					validationSchema={SearchFlightSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.props.clearFlights();
						this.props.setSearchDetails(values);
						history.push('/flights');
						this.props.onSearch && this.props.onSearch();
						setSubmitting(false);
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
						<form onSubmit={handleSubmit} autoComplete='off' className='form-wrap'>
							<div className='input-section'>
								<div className='d-none d-md-block select-trip'>
									<span
										className={values.strTripType == 'O' ? 'active' : ''}
										onClick={() => {
											setFieldValue('strTripType', 'O');
											this.changeTripType('O');
										}}
									>
										One-Way
									</span>
									<span
										className={values.strTripType == 'R' ? 'active' : ''}
										onClick={() => {
											setFieldValue('strTripType', 'R');
											this.changeTripType('R');
										}}
									>
										Round Trip
									</span>
								</div>

								<div className='inputs row'>
									<div className='field-box col px-md-0'>
										<label>Leaving From</label>
										<Dropdown
											name='strSectorFrom'
											onBlur={handleBlur}
											className='icon btn-dropdown'
											iconPosition='left'
											icon='fas fa-plane departure'
											onChange={(e, data) => {
												setFieldValue(`strSectorFrom`, data.value);
											}}
											placeholder={'Leaving From'}
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
										<div className='toggle-sector-mobile'>
											<i
												className='fas fa-exchange-alt'
												onClick={() => {
													setFieldValue('strSectorTo', values.strSectorFrom);
													setFieldValue('strSectorFrom', values.strSectorTo);
												}}
											/>
										</div>
									</div>
									<div className='col-md-1 toggle-sector-desktop text-center'>
										<label htmlFor=''>&nbsp;</label>
										<i
											className='menu fas fa-exchange-alt'
											onClick={() => {
												setFieldValue('strSectorTo', values.strSectorFrom);
												setFieldValue('strSectorFrom', values.strSectorTo);
											}}
										/>
									</div>
									<div className='field-box col px-md-0'>
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
								<div className='row inputs'>
									<div
										className={`field-box col-12 pl-md-0 ${values.strTripType == 'O'
											? 'col-md-3'
											: 'col-md-2'}`}
									>
										<label>Departure Date</label>
										<DatePicker
											name='strFlightDate'
											className='form-control'
											type='date'
											date={values.strFlightDate}
											minDate={new Date()}
											maxDate={addDays(new Date(), 365)}
											onBlur={handleBlur}
											onChange={(date) => setFieldValue('strFlightDate', date)}
											value={values.strFlightDate}
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
											<span className='label'>Round Trip?</span>
										</div>
									</div>
									<div
										className={`field-box col-12 col-md-2 ${values.strTripType == 'O'
											? 'd-none'
											: ''}`}
									>
										<label>Arrival Date</label>
										<DatePicker
											name='strReturnDate'
											className='form-control'
											type='date'
											date={values.strReturnDate}
											minDate={values.strFlightDate}
											maxDate={addDays(new Date(), 365)}
											onBlur={handleBlur}
											onChange={(date) => setFieldValue('strReturnDate', date)}
											value={values.strReturnDate}
											placeholder='Arrival Date'
										/>
										<ErrorMessage name='strReturnDate' />
									</div>
									<div className='field-box col-12 col-md-3'>
										<label>Traveller(s)</label>
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
											placeholder=''
											icon='icon-users'
											className='icon btn-dropdown travellers'
											fluid
											selection
											closeOnChange={false}
											placeholder={`${values.intAdult} Adult${ifNotZero(
												values.intChild,
												`, ${values.intChild} Child`
											)}`}
											onClick={(event, data) => {
												event.preventDefault();
											}}
										>
											<Dropdown.Menu
												content={
													<div className='p-2'>
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
													</div>
												}
											/>
										</Dropdown>
										<ErrorMessage name='intAdult' />
										<ErrorMessage name='intChild' />
									</div>

									<div className='field-box col-12 col-md-3'>
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
											options={countries}
										/>
										<ErrorMessage name='strNationality' />
									</div>
									<div
										className={`field-box col-12 text-center pr-md-0' ${values.strTripType == 'O'
											? 'col-md-3'
											: 'col-md-2'}`}
									>
										<label>&nbsp;</label>
										<button
											className='search-btn btn btn-primary btn-large'
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
	clearFlights,
	setSearchDetails,
	setTTLtime,
	setError
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
