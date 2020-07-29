import React, {Component} from 'react';
import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown, Form, TextArea} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, Stepper, Thumb} from '../shared';
import {Input} from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import {sortObjectBy, phoneValidate, textValidate, numberValidate, alphaNumericValidate} from '../../helpers';
import {partnerApproval} from '../../api/carBookingApi';
import {getPartners} from '../../api/partnerApi';
import {createServiceTransaction} from '../../api/serviceTransactionApi';

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
			partner_id: numberValidate(yup).required('Required'),
			receipt_no: alphaNumericValidate(yup).required('Required'),
			direction: textValidate(yup).required('Required'),
			payment_mode: textValidate(yup).required('Required'),
			amount: numberValidate(yup).required('Required')
		});
		const {partners} = this.state;

		return (
			<div className=''>
				<h3 className='m-3' />
				<Formik
					initialValues={{
						partner_id: '',
						receipt_no: '',
						direction: '',
						payment_mode: '',
						amount: 0,
						remarks: ''
					}}
					validationSchema={serviceTransactionSchema}
					onSubmit={(values, {setSubmitting}) => {
						createServiceTransaction(values).then((response) => {
							setSubmitting(false);
							swal({
								title: 'Response',
								text: response.data.message,
								icon: response.status == 200 ? 'success' : 'error'
							}).then((response) => {
								history.push('/');
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
						<React.Fragment>
							<Form onSubmit={handleSubmit}>
								<div className=''>
									<div className='row'>
										<div className='col-12 col-md-6 offset-md-3'>
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
													error={
														touched.partner_id &&
														errors.partner_id && {
															content: errors.partner_id,
															pointing: 'above'
														}
													}
												/>
											</Form.Field>

											<Form.Field>
												<Form.Input
													type='text'
													name='receipt_no'
													label='Receipt no'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.receipt_no}
													error={
														touched.receipt_no &&
														errors.receipt_no && {
															content: errors.receipt_no,
															pointing: 'above'
														}
													}
												/>
											</Form.Field>

											<Form.Field>
												<Form.Select
													className=''
													name='direction'
													label='Payment Type'
													placeholder='Type of Payment'
													onBlur={handleBlur}
													onChange={(e, data) => {
														setFieldValue(`direction`, data.value);
													}}
													value={values.direction}
													fluid
													search
													selection
													options={[
														{
															key: 1,
															value: 'debit',
															text: 'Debit'
														},
														{
															key: 2,
															value: 'credit',
															text: 'Credit'
														}
													]}
													error={
														touched.direction &&
														errors.direction && {
															content: errors.direction,
															pointing: 'above'
														}
													}
												/>
											</Form.Field>

											<Form.Field>
												<Form.Select
													className=''
													name='payment_mode'
													label='Payment Mode'
													placeholder='Mode of Payment'
													onBlur={handleBlur}
													onChange={(e, data) => {
														setFieldValue(`payment_mode`, data.value);
													}}
													value={values.payment_mode}
													fluid
													search
													selection
													options={[
														{
															key: 1,
															value: 'Bank Deposit',
															text: 'Bank Deposit'
														},
														{
															key: 2,
															value: 'Cheque',
															text: 'Cheque'
														},
														{
															key: 3,
															value: 'Wallet',
															text: 'Wallet'
														}
													]}
													error={
														touched.payment_mode &&
														errors.payment_mode && {
															content: errors.payment_mode,
															pointing: 'above'
														}
													}
												/>
											</Form.Field>

											<Form.Field>
												<Form.Input
													type='number'
													name='amount'
													label='Amount'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.amount}
													error={
														touched.amount &&
														errors.amount && {
															content: errors.amount,
															pointing: 'above'
														}
													}
												/>
											</Form.Field>

											{values.payment_mode == 'Cheque' && (
												<Form.Field>
													<Form.Input
														type='text'
														name='cheque_no'
														label='Cheque Number'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.cheque_no}
														error={
															touched.cheque_no &&
															errors.cheque_no && {
																content: errors.cheque_no,
																pointing: 'above'
															}
														}
													/>
												</Form.Field>
											)}
											<Form.Field>
												<label>Remarks</label>
												<TextArea
													name='remarks'
													onChange={handleChange}
													onBlur={handleBlur}
													placeholder='Remarks'
													style={{minHeight: 100}}
													value={values.remarks}
													error={
														touched.remarks &&
														errors.remarks && {
															content: errors.remarks,
															pointing: 'above'
														}
													}
												/>
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
