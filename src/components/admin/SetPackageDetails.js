import React, {Component} from 'react';
import swal from 'sweetalert';
import history from '../../history';
import {deleteInquiry, showInquiry} from '../../api/inquiryApi';
import * as yup from 'yup';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {setPackageDetails, assignPartner, rejectInquiry} from '../../api/inquiryApi';
import {getPackageBookingDetails} from '../../api/packageBookingApi';
class SetPackageDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inquiry: {
				package_booking: {}
			},
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
		});
	}

	setActions = (actions) => {
		this.setState(actions);
	};

	render() {
		const {inquiry} = this.state;
		const InquiriesSchema = yup.object().shape({
            details: yup.string()
		});

		const inquiryDetails = {
			details: inquiry.package_booking.details
		};

		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
							<Formik
								enableReinitialize
								initialValues={inquiryDetails}
								validationSchema={InquiriesSchema}
								onSubmit={(values, {setSubmitting}) => {
									setSubmitting(false);
									setPackageDetails(inquiry.idx, values)
										.then((response) => {
											swal({
												title: 'Package Admin Action!',
												text: `Package Details have been set!!`,
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
											<br></br>
											<div className='row'>
												<div className='col-12'>
													<div className='input-section'>
														<div className='row'>
															{true && <div className='col-12'>
																<div className='field-box'>
																	{/* <label>Other Details</label> */}

																	<Field
																		component='textarea'
																		rows="4"
																		name='details'
																		className='form-control'
																		onBlur={handleBlur}
																		onChange={handleChange}
																		value={values.details}
																	/>

																	<ErrorMessage name='details' />
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
														Submit
													</button>
												</div>
											</div>
										</div>
									</form>
								)}
							</Formik>
					</div>
				</div>
			</div>
		);
	}
}

export default SetPackageDetails;
