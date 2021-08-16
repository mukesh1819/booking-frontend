import React, {Component} from 'react';
import swal from 'sweetalert';
import history from '../../history';
import {deleteInquiry, showInquiry} from '../../api/inquiryApi';
import * as yup from 'yup';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {confirmInquiry, assignPartner, rejectInquiry} from '../../api/inquiryApi';
import {getPackageBookingDetails} from '../../api/packageBookingApi';
class SetPackageDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inquiry: {},
			showPartnerForm: false,
			packageBooking: {}
		};
	}

	componentDidMount() {
		this.fetchDetails();
	}

	fetchDetails() {
		showInquiry(this.props.match.params.idx).then((response) => {
			this.setState({
				inquiry: response.data || {}
			});
			if(response.data.package_booking){

				getPackageBookingDetails(response.data.package_booking.idx)
				.then((response) => {
					this.setState({
						packageBooking: response.data
					});
				})
				.catch((error) => {
					swal({
						title: 'Package Booking fetch error',
						text: 'Something went wrong. please try again or contact us',
						icon: 'error',
						button: 'Continue!'
					});
				});

			}
			
		});
	}

	setActions = (actions) => {
		this.setState(actions);
	};

	render() {
		const {inquiry} = this.state;
		var date = new Date();
		const InquiriesSchema = yup.object().shape({
			start_date: yup.date().default(function() {
				return new Date();
			}),
			end_date: yup.date().default(function() {
				return new Date();
			}),
			pickup_date: yup.date().default(function() {
				return new Date();
			}),
			drop_off_date: yup.date().default(function() {
				return new Date();
			}),
			amount: yup.number(),
			pickup_location: yup.string(),
			drop_off_location: yup.string(),
			remarks: yup.string(),
			partner_id: yup.string(),
			name: yup.string(),
			details: yup.string(),
            remarks: yup.string()
		});

		const inquiryDetails = {
			start_date: date,
			end_date: date,
			pickup_date: date,
			pickup_location: '',
			amount: inquiry.total_amount,
			drop_off_date: date,
			drop_off_location: '',
			meals_included: false,
			remarks: ''
		};

		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						{showOtherForm && (
							<Formik
								initialValues={inquiryDetails}
								validationSchema={InquiriesSchema}
								onSubmit={(values, {setSubmitting}) => {
									setSubmitting(false);
									confirmInquiry(inquiry.idx, values)
										.then((response) => {
											swal({
												title: 'Package Admin Action!',
												text: `Package Details have been set!!! ${response.data.message}`,
												icon: 'success',
												button: 'Continue!'
											}).then((response) => {
												history.push('/admin/inquiries');
											});
										})
										.catch((error) => {
											console.log('Package details set error', error);
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
										<div className=''>
                                            <h3>Set Package Details</h3>
											<div className='row'>
												<div className='col-12'>
													<div className='input-section'>
														<div className='row'>
															{true && <div className='col-12'>
																<div className='field-box'>
																	<label>Other Details</label>

																	<Field
																		name='remarks'
																		className='form-control'
																		onBlur={handleBlur}
																		onChange={handleChange}
																		value={values.remarks}
																	/>

																	<ErrorMessage name='remarks' />
																</div>
															</div>}
														</div>
													</div>
												</div>
											</div>
											<div className='input-section'>
												<div className='text-center'>
													<button
														className='btn btn-secondary m-2 text-center'
														type='submit'
														disabled={isSubmitting}
													>
														Confirm
													</button>
												</div>
											</div>
										</div>
									</form>
								)}
							</Formik>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default SetPackageDetails;
