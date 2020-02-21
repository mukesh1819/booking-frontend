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
import {Container, Button, Segment} from 'semantic-ui-react';
import {ButtonGroup} from 'react-bootstrap';
import Counter from '../shared/Counter';
import Dropdown from '../shared/Dropdown';

class SearchFlightForm extends Component {
	constructor(props) {
		super(props);
		var date = new Date();
		date.setDate(date.getDate() + 2);
		this.state = {
			cities: [],
			tripType: 'O',
			hideReturnField: true,
			isSubmitted: false,
			availableFlights: [],
			searching: false
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
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

	render() {
		const ListWithLoading = withLoading(FlightList);
		const tomorrow = addDays(new Date(), 1);
		const {hideReturnField} = this.state;

		const SearchFlightSchema = yup.object().shape({
			strFlightDate: yup.date().required('Required').default(function() {
				return new Date();
			}),
			strSectorFrom: yup.string().required('Required'),
			strSectorTo: yup.string().required('Required'),
			strNationality: yup.string().required('Required'),
			intAdult: yup.number().min(0, 'Cannot be less than 0').required('Required'),
			intChild: yup.number().min(0, 'Cannot be less than 0').required('Required')
		});

		return (
			<React.Fragment>
				<header id='header' className='cover' role='banner'>
					<div id='search-flight-form'>
						<Container>
							<div className='text-white mb-2'>Search and book flights</div>
							<Formik
								initialValues={{
									strTripType: this.state.tripType,
									strFlightDate: tomorrow,
									strReturnDate: tomorrow,
									strNationality: 'NP',
									intAdult: 1,
									intChild: 0,
									strSectorFrom: 'KTM',
									strSectorTo: 'PKR'
								}}
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
											this.setState({
												searching: false,
												availableFlights: response.data.data
											});
											history.push('/flights');
										})
										.catch((error) => {
											console.log(error);
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
									<form onSubmit={handleSubmit}>
										<ButtonGroup aria-label='Basic example'>
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
												<Field
													as='select'
													name='strSectorFrom'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.strSectorFrom}
												>
													<option value='' disabled selected>
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
											</div>
											<div className='field-box'>
												<label>Going To</label>
												<Field
													as='select'
													name='strSectorTo'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.strSectorTo}
												>
													<option value='' disabled selected>
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
												<ErrorMessage name='strSectorTo' />
											</div>
											<div className='field-box'>
												<label>Departure Date</label>
												<DatePicker
													name='strFlightDate'
													className='form-control'
													type='date'
													date={new Date()}
													minDate={new Date()}
													format='dd-mm-YYYY'
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('strFlightDate', date)}
													value={values.strFlightDate}
												/>
												<ErrorMessage name='strFlightDate' />
											</div>
											<div className={`field-box ${hideReturnField ? 'd-none' : ''}`}>
												<label>Arrival Date</label>
												<DatePicker
													name='strReturnDate'
													className='form-control'
													type='date'
													format='dd-mm-YYYY'
													date={new Date()}
													onBlur={handleBlur}
													onChange={(date) => setFieldValue('strReturnDate', date)}
													value={values.strReturnDate}
													disabled={hideReturnField}
												/>
												<ErrorMessage name='strReturnDate' />
											</div>
											<div className='field-box'>
												<label>Adult/Child</label>
												<Dropdown title={`${values.intAdult} Adult, ${values.intChild} Child`}>
													<span class='text-small'>Adult</span>
													<Counter
														id='intAdult'
														type='number'
														onBlur={handleBlur}
														onChange={(value) => setFieldValue('intAdult', value)}
														value={values.intAdult}
													/>
													<span class='text-small'>Child</span>
													<Counter
														id='intChild'
														type='number'
														onBlur={handleBlur}
														onChange={(value) => setFieldValue('intChild', value)}
														value={values.intChild}
													/>
												</Dropdown>
												<ErrorMessage name='intAdult' />
												<ErrorMessage name='intChild' />
											</div>
											<div className='field-box'>
												<label>Nationality</label>

												<Field as='select' className='form-control'>
													<option value='NP'> Nepali </option>{' '}
													<option value='IN'> Indian </option>
												</Field>
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
						</Container>
					</div>
				</header>
				{this.state.isSubmitted && (
					<ListWithLoading flights={this.state.availableFlights} searching={this.state.searching} />
				)}
			</React.Fragment>
		);
	}
}

const Loading = () => (
	<div className='container text-center'>
		{/* <img src={require('/assets/images/loading.gif')} /> */}
		Loading...
	</div>
);

const withLoading = (Component) => ({searching, ...rest}) => (searching ? <Loading /> : <Component {...rest} />);
const mapStateToProps = ({flights}) => {
	return {
		flights
	};
};

const mapDispatchToProps = {
	setFlights,
	setSearchDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFlightForm);
