import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {createPartner} from '../../api/partnerApi';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../helpers/helpers';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, Stepper, Thumb} from '../shared';
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';

class PartnerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partnerIsValid: false
		};
	}

	componentDidMount() {}

	render() {
		const {partnerIsValid} = this.state;
		const {countries, currentUser, nextStep} = this.props;
		const partnerDetails = {
			name: currentUser.name,
			email: currentUser.email,
			contact_number: currentUser.phone_number
		};
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						Become a Partner
						<Formik
							initialValues={partnerDetails}
							onSubmit={(values, {setSubmitting}) => {
								this.setState({
									searching: true
								});
								// console.log(values);
								createPartner(values)
									.then((response) => {
										setSubmitting(false);
										// console.log('Partner CREATED', response);
										nextStep(response.data);
									})
									.catch((error) => {
										// console.log('Create Partner Error', error);
										setSubmitting(false);
										swal({
											title: 'Partner Create Error!',
											text: 'could not able to create partner.. please try again or contact us',
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
										<div className='field-box'>
											<label>Name</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='name'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.name}
												/>
											</IconInput>
											<ErrorMessage name='name' />
										</div>
										<div className='field-box'>
											<label>Email Address</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='email'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.email}
												/>
											</IconInput>
											<ErrorMessage name='email' />
										</div>
										<div className='field-box'>
											<label>Contact Number</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='contact_number'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.contact_number}
												/>
											</IconInput>
											<ErrorMessage name='contact_number' />
										</div>
									</div>
									<div class='text-center'>
										<button className='btn btn-secondary m-2' type='submit' disabled={isSubmitting}>
											Submit
										</button>
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

const mapStateToProps = ({extras, userStore}) => ({
	countries: extras.countries,
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerForm);
