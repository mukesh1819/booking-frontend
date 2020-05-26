import React, {Component} from 'react';
import {ButtonToolbar, Modal, Tabs, Tab} from 'react-bootstrap';
import UserDetailCard from '../users/UserDetailCard';
import BookingDetails from './BookingDetails';
import TransactionApiResponse from './TransactionApiResponse';
import {Formik} from 'formik';
import {Form, TextArea} from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {onTransactionSuccess} from '../../api/transactionApi';
import {Badge} from '../shared';
import {fetchTicket} from '../../api/flightApi';
import {Button} from 'semantic-ui-react';
import history from '../../history';
import {downloadTicket} from '../../helpers/general';

class TransactionDetails extends Component{
	constructor(props){
		super(props);

		this.state = {
			loading: false
		};
	}

	download(idx) {
		this.setState({
			loading: true
		});
		fetchTicket(idx).then((response) => {
			downloadTicket(response.data);
			this.setState({
				loading: false
			});
		});
	}

	render(){
		const {transaction} = this.props.location.state || {};
		const {loading} = this.state;
		const TransactionSchema = yup.object().shape({
			response: yup.string().required('Required')
		});

		const transactionSuccess = {
			response: '',
			transaction_idx: transaction.idx
		};
		return (
			<div className='ui container'>
				<h3 className='title'>Transaction Details</h3>
				<div className='ui segment'>
					<div className='list-view'>
						<div className='list'>
							<span className='label'>Invoice Number</span>
							<span className='value'>{transaction.idx}</span>
						</div>
						<div className='list'>
							<span className='label'>Type</span>
							<span className='value'>{transaction.booking_type}</span>
						</div>
						<div className='list'>
							<span className='label'>Amount</span>
							<span className='value'>{transaction.amount}</span>
						</div>
						<div className='list'>
							<span className='label'>Created on</span>
							<span className='value'> {transaction.created_at}</span>
						</div>
						<div className='list'>
							<span className='label'>Status</span>
							<span className='value'>
								<Badge type={transaction.state}> {transaction.state}</Badge>
							</span>
						</div>
					</div>
				</div>

				<div className='ui card fluid'>
					<div className='ui card content'>
						<h3>User Details</h3>
						<UserDetailCard user={transaction.user} />

						{transaction.bookings && (
							<div className='ui card'>
								<h3 className='ui header'>Booking Details</h3>
								<div className='ui card content'>
									{transaction.bookings.map((booking) => <BookingDetails booking={booking} />)}
								</div>
							</div>
						)}

						<h3>API Response</h3>
						<TransactionApiResponse response={transaction.response} />
					</div>
				</div>
				{transaction.state !== 'verified' && 
					<Formik
					initialValues={transactionSuccess}
					validationSchema={TransactionSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
						});
						setSubmitting(false);
						// console.log(values);
						if (transaction.id != null) {
							onTransactionSuccess(values.transaction_idx, values)
								.then((response) => {
									swal({
										title: 'Transaction updated!',
										text: response.data.message,
										icon: 'Success',
										button: 'Continue'
									}).then((value) => history.push('/admin/transaction_list'));
									
								})
								.catch((error) => {
									console.log('Transaction update error', error);
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
						<div className='transaction-form mt-4'>
							<div className='row'>
								<div className='col-12'>
									<h3>Create Transaction by admin</h3>
								</div>
							</div>
							<form onSubmit={handleSubmit}>
								<Form>
									<Form.Field>
										<label className='font-weight-bold'>Remarks</label>
										<TextArea
											name='response'
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder='Remarks'
											style={{minHeight: 100}}
											value={values.response}
										/>
									</Form.Field>
									<ErrorMessage name='response' />

									
									<div className='text-center'>
										<button className='btn btn-success m-2' type='submit' disabled={isSubmitting}>
											Success
										</button>
									</div>
								</Form>
							</form>
						</div>
					)}
				</Formik>
				}
				{transaction.state === 'verified' &&
					<div>
						<Button
							primary
							loading={loading}
							className='btn btn-primary btn-large '
							onClick={() => this.download(transaction.idx)}
						>
							Download ticket
						</Button>
					</div>
				}

			</div>
		);
	}
}
export default TransactionDetails;
