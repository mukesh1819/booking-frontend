import React, {Component} from 'react';
import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, numberValidate} from '../../helpers';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown, Form, TextArea} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, Stepper, Thumb} from '../shared';
import {Input} from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import {sortObjectBy, phoneValidate, textValidate, alphaNumericValidate} from '../../helpers';
import {partnerApproval} from '../../api/carBookingApi';
import {getPartners} from '../../api/partnerApi';

class ServiceTransactionForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partners: []
		};
	}

	componentDidMount() {
		var params = {};
		params['q[status_eq]'] = 'approved';
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
		const serviceTransactionSchema = yup.object().shape({
			partner_id: textValidate(yup).required('Required'),
			direction: textValidate(yup).required('Required'),
			amount: numberValidate(yup).required('Required')
		});
		const {partners} = this.state;

		return (
			<div className=''>
				<h3 className='m-3' />
				<Formik
					initialValues={{
						partner_id: '',
						direction: '',
						amount: 0,
						remarks: ''
					}}
					validationSchema={serviceTransactionSchema}
					onSubmit={(values, {setSubmitting}) => {}}
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
							<Form onSubmit={handleSubmit}>
								<div className=''>
									<div className='row'>
										<div className='col-12 col-md-6 offset-md-3'>
											<div className='field-box'>
												<Form.Field>
													<Form.Select
														className=''
														name='partner_id'
														label='Select Partner'
														placeholder='Select Partner'
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
																text: name
															};
														})}
													/>
												</Form.Field>
											</div>
											<div className='field-box'>
												<Form.Field>
													<Form.Input
														type='number'
														name='amount'
														label='Amount'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.amount}
													/>
												</Form.Field>
												<ErrorMessage name='amount' />
											</div>
											<Form.Field>
												<label>Remarks</label>
												<TextArea
													name='remarks'
													onChange={handleChange}
													onBlur={handleBlur}
													placeholder='Remarks'
													style={{minHeight: 100}}
													value={values.remarks}
												/>
												<ErrorMessage name='remarks' />
											</Form.Field>
										</div>
									</div>
								</div>
								<div class='text-center'>
									<button className='btn btn-primary mt-4' type='submit' disabled={isSubmitting}>
										Submit
									</button>
								</div>
							</Form>
						</React.Fragment>
					)}
				</Formik>
			</div>
		);
	}
}

export default ServiceTransactionForm;
