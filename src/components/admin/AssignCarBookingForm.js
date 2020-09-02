import React, {Component} from 'react';

import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Counter, IconInput, Loading as LoadingScreen} from '../shared';
import {Input, Form, Checkbox, TextArea} from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import {assignPartner, getCarBookingConfirmation} from '../../api/carBookingApi';
import {getPartners} from '../../api/partnerApi';
import RemarksForm from '../shared/RemarksForm';

class AssignCarBookingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partners: []
		};
	}

	componentDidMount() {
		var params = {};
		params['q[company_type_cont]'] = 'vehicle rental';
		params['q[status_eq]'] = 'approved';
		this.fetchPartners(params);
	}

	fetchPartners(params) {
		getPartners(params)
			.then((response) => {
				this.setState({
					partners: response.data.partners
				});
			})
			.catch((error) => {
				console.log('partner fetch error', error);
			});
	}

	render() {
		const {carBooking} = this.props.location.state != null ? this.props.location.state : {carBooking: {}};
		const {partners} = this.state;
		const BookingSchema = yup.object().shape({
			partner_id: yup.string().required('Required'),
			partner_amount: yup.string().required('Required')
			// partner_remarks: yup.string().required('Required')
		});

		const bookingDetails = {
			partner_id: carBooking.partner_id || 1,
			partner_remarks: carBooking.partner_remarks,
			partner_amount: carBooking.partner_amount
		};
		return (
			<div className='container bg-white'>
				<Formik
					initialValues={bookingDetails}
					validationSchema={BookingSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
						});
						setSubmitting(false);
						// console.log(values);
						if (carBooking.status == 'pending' && carBooking.idx != null) {
							getCarBookingConfirmation(carBooking.idx, values)
								.then((response) => {
									swal({
										title: 'Car Booking Confirmation!',
										text: response.data.message,
										icon: 'success',
										button: 'Continue!'
									});
									history.push('/admin/car_bookings');
								})
								.catch((error) => {
									console.log('Car booking confirmation error', error);
								});
						} else if (carBooking.idx != null) {
							assignPartner(carBooking.idx, values)
								.then((response) => {
									swal({
										title: 'Car Booking updated!',
										text: response.data.message,
										icon: 'success',
										button: 'Continue'
									}).then((value) => {
										history.push(`/admin/car_bookings/${carBooking.idx}`);
									});
								})
								.catch((error) => {
									console.log('Update Booking Error', error);
								});
						}
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
						<div className='inquiry-form'>
							<div className='row'>
								<div className='col-12'>
									{/* <h3>
										Kindly submit the query form below to book your trip and we will contact you
										with the confirmed itinerary.
									</h3> */}
								</div>
							</div>
							<Form onSubmit={handleSubmit}>
								<div className='input-section padded bg-white'>
									<Form.Select
										label='Select Partner'
										className=''
										name='partner_id'
										placeholder='Select Partners'
										onBlur={handleBlur}
										onChange={(e, data) => {
											setFieldValue(`partner_id`, data.value);
										}}
										value={values.partner_id}
										fluid
										search
										selection
										options={partners.map(function(partner) {
											name = partner.first_name + ' ' + partner.last_name;
											return {
												key: partner.id,
												value: partner.id,
												text: `${name} (${partner.company_name})`
											};
										})}
									/>

									<Form.Field>
										<Form.Input
											label='Amount'
											type='number'
											className=''
											name='partner_amount'
											placeholder='amount'
											onBlur={handleBlur}
											onChange={(e, data) => {
												setFieldValue(`partner_amount`, e.target.value);
											}}
											value={values.partner_amount}
										/>
										<ErrorMessage name='partner_amount' />
									</Form.Field>

									{/* <Form.Field>
										<Form.TextArea
											label='Remakrs'
											className=''
											name='partner_remarks'
											placeholder='partner remarks'
											onBlur={handleBlur}
											onChange={(e, data) => {
												setFieldValue(`partner_remarks`, e.target.value);
											}}
											value={values.partner_remarks}
										/>
										<ErrorMessage name='partner_remarks' />
									</Form.Field> */}

									<RemarksForm
										remarks={[]}
										onSubmit={(value) => setFieldValue(`partner_remarks`, value)}
									/>
								</div>

								<div className='traveller-details '>
									<div className='input-section padded bg-white'>
										<div className='row'>
											<div className='col-12'>
												<div className='text-center'>
													<button
														className='btn btn-primary m-2'
														type='submit'
														disabled={isSubmitting}
													>
														Update
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Form>
						</div>
					)}
				</Formik>
			</div>
		);
	}
}

export default AssignCarBookingForm;
