import React, {Component} from 'react';
import {getUserTransaction, deleteTransaction} from '../../api/transactionApi';
import {passCsrfToken} from '../../helpers';
import axios from 'axios';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';
import UserDetailCard from '../users/UserDetailCard';
import BookingDetails from './BookingDetails';
import TransactionApiResponse from './TransactionApiResponse';
import {Modal as ModalExample, Badge} from '../shared';
import swal from 'sweetalert';
import {Menu, Segment, Pagination, Input, Accordion} from 'semantic-ui-react';
import FilterForm from './FilterForm';

class TransactionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
			selectedTransaction: null,
			key: 'user',
			activeMenuItem: 'All'
		};
	}

	onTransactionSelect(transaction) {
		this.setState({
			selectedTransaction: transaction
		});
	}

	handleItemClick = (e, {name}) => {
		var searchQuery = name == 'All' ? '' : `q[state_eq]=${name.toLowerCase()}`;
		this.fetchUserTransaction(searchQuery);
		this.setState({activeMenuItem: name});
	};

	setKey(key) {
		this.setState({
			key: key
		});
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchUserTransaction();
	}

	fetchUserTransaction(params) {
		getUserTransaction(params)
			.then((response) => {
				// console.log(response);
				this.setState({
					transactions: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' Transaction fetch error', error);
			});
	}

	destroyTransaction(id) {
		// deleteTransaction(id)
		// 	.then((response) => {
		// 		swal({
		// 			title: 'Transaction deleted!',
		// 			text: `this Transaction is deleted`,
		// 			icon: 'success',
		// 			button: 'Continue!'
		// 		});
		// 		history.go();
		// 	})
		// 	.catch((error) => {
		// 		swal({
		// 			title: 'Transaction Delete error',
		// 			text: 'Something went wrong. please try again or contact us',
		// 			icon: 'error',
		// 			button: 'Continue!'
		// 		});
		// 	});

		swal({
			title: 'Are you sure?',
			text: 'Once delete, your transaction will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteTransaction(id).then((response) => {
					swal('this Transaction is deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Your transaction is not deleted yet');
			}
		});
	}

	onFilter = (values) => {
		this.setState({
			transactions: values
		});
	};

	render() {
		const {show, key, selectedTransaction, activeMenuItem} = this.state;
		return (
			<React.Fragment>
				{this.state.transactions !== null && (
					<div className='container p-4'>
						<div className="col-12">
							<FilterForm
								submitUrl='payments'
								fields={[
									{
										name: 'created_at_gteq',
										label: 'From Date',
										type: 'date'
									},
									{
										name: 'created_at_lteq',
										label: 'To Date',
										type: 'date'
									},

									{
										name: 'date_gteq',
										label: 'From Transaction Date',
										type: 'date'
									},
									{
										name: 'date_lteq',
										label: 'To Transaction Date',
										type: 'date'
									},

									{
										name: 'user_name_cont',
										label: 'user name',
										type: 'text'
									},

									{
										name: 'amount_eq',
										label: 'amount',
										type: 'text'
									},

									{
										name: 'state_eq',
										label: 'status',
										type: 'select',
										options: ["pending", "initial", "verified"]
									},

									{
										name: 'booking_type_eq',
										label: 'booking type',
										type: 'select',
										options: ["FLIGHT", "PACKAGE"]
									}
									
								]}
								onSubmit={(values) => this.onFilter(values)}
							/>
						</div>
						<div className='' id='search-form'>
							<h3 className='title'>Transactions</h3>

							<Menu pointing>
								<Menu.Item
									name='All'
									active={activeMenuItem === 'All'}
									onClick={this.handleItemClick}
								/>
								<Menu.Item
									name='Pending'
									active={activeMenuItem === 'Pending'}
									onClick={this.handleItemClick}
								/>
								<Menu.Item
									name='Processing'
									active={activeMenuItem === 'Processing'}
									onClick={this.handleItemClick}
								/>
								<Menu.Item
									name='Verified'
									active={activeMenuItem === 'Verified'}
									onClick={this.handleItemClick}
								/>
								<Menu.Menu position='right'>
									<Menu.Item>
										<Input icon='search' placeholder='Search...' />
									</Menu.Item>
								</Menu.Menu>
							</Menu>

							<Segment>
								<table className='table table-striped table-bordered'>
									<thead>
										<tr>
											<th>Sno</th>
											<th>Transaction Invoice</th>
											<th>state</th>
											<th>Amount</th>
											<th>Created At</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{this.state.transactions.map((transaction) => {
											return (
												<tr>
													<td>{transaction.sNo}</td>
													<td>{transaction.idx}</td>
													<td>
														<Badge type={transaction.state}>{transaction.state}</Badge>
													</td>
													<td>{transaction.amount}</td>
													<td>{transaction.created_at}</td>
													<td>
														<span
															className='btn bg-none text-primary'
															onClick={() => this.onTransactionSelect(transaction)}
														>
															Details
														</span>
														<span
															className='btn bg-none text-danger'
															onClick={() => this.destroyTransaction(transaction.idx)}
														>
															Delete
														</span>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</Segment>
						</div>
					</div>
				)}
				<ModalExample
					title='Transaction Details'
					buttonLabel='close'
					show={selectedTransaction !== null}
					toggle={() => this.onTransactionSelect(null)}
					onSuccess={() => this.onTransactionSelect(null)}
				>
					{selectedTransaction !== null && (
						<div className='p-3'>
							<Tabs id='controlled-tab-example' activeKey={key} onSelect={(k) => this.setKey(k)}>
								<Tab eventKey='user' title='user'>
									<UserDetailCard user={selectedTransaction.user} />
								</Tab>
								<Tab eventKey='bookings' title='bookings'>
									{selectedTransaction.bookings.map((booking) => (
										<BookingDetails booking={booking} />
									))}
								</Tab>
								<Tab eventKey='response' title='response'>
									<TransactionApiResponse response={selectedTransaction.response} />
								</Tab>
							</Tabs>
						</div>
					)}
				</ModalExample>
			</React.Fragment>
		);
	}
}

export default TransactionList;
