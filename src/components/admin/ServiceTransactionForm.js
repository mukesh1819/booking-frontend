import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../helpers';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, Stepper, Thumb} from '../shared';
import {Input} from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import {sortObjectBy, phoneValidate, textValidate, alphaNumericValidate} from '../../helpers';
import {partnerApproval} from '../../api/carBookingApi';

class ServiceTransactionForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		const {carBooking} = this.props.state ? this.props.state : {carBooking: {}};

		const PartnerApprovalSchema = yup.object().shape({
			driver_name: textValidate(yup).required('Required'),
			car_color: textValidate(yup).required('Required'),
			driver_contact: phoneValidate(yup).required('Required'),
			car_number: alphaNumericValidate(yup).required('Required')
		});

		const partnerDetails = {
			driver_name: carBooking.driver_name,
			driver_contact: carBooking.driver_contact,
			car_color: carBooking.car_color,
			car_number: carBooking.car_number
		};

		return (
			<div className=''>
				<h3 className='m-3' />
				<Formik
					initialValues={partnerDetails}
					validationSchema={PartnerApprovalSchema}
					onSubmit={(values, {setSubmitting}) => {
						partnerApproval('728f884d68aa3d403e0a', values)
							.then((response) => {
								setSubmitting(false);
								swal({
									title: 'Partner approval success!',
									text: response.data.message,
									icon: 'success',
									button: 'Continue'
								}).then((value) => {
									history.push('/');
								});
							})
							.catch((error) => {
								console.log('Partner approval error', error);
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
						<React.Fragment>
							<form onSubmit={handleSubmit}>
								<div className=''>
									<div className='row'>
										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label>Driver Name</label>
												<Field
													name='driver_name'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.driver_name}
												/>
												<ErrorMessage name='driver_name' />
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label> Driver Mobile Number </label>
												<IconInput icon='icon-paper-plane' iconPosition='left'>
													<Field
														name='driver_contact'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.driver_contact}
													/>
												</IconInput>
												<ErrorMessage name='driver_contact' />
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label>Car Color</label>
												<Field
													name='car_color'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.car_color}
												/>
												<ErrorMessage name='car_color' />
											</div>
										</div>

										<div className='col-12 col-md-6'>
											<div className='field-box'>
												<label>Car Number</label>
												<Field
													name='car_number'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.car_number}
												/>
												<ErrorMessage name='car_number' />
											</div>
										</div>
									</div>
								</div>
								<div class='text-center'>
									<button className='btn btn-primary mt-4' type='submit' disabled={isSubmitting}>
										Submit
									</button>
								</div>
							</form>
						</React.Fragment>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = ({extras, userStore}) => ({
	countries: extras.countries,
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTransactionForm);
