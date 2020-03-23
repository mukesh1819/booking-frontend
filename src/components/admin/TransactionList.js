import React, {Component} from 'react';
import {getUserTransaction} from '../../api/transactionApi';
import {passCsrfToken} from '../../helpers/helpers';
import axios from 'axios';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';
import UserDetailCard from '../users/UserDetailCard';
import BookingDetails from './BookingDetails';
import TransactionApiResponse from './TransactionApiResponse';
import {Modal as ModalExample} from '../shared';

class TransactionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
			selectedTransaction: null,
			key: 'user'
		};
	}

	onTransactionSelect(transaction) {
		this.setState({
			selectedTransaction: transaction
		});
	}

	setKey(key) {
		this.setState({
			key: key
		});
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchUserTransaction();
	}

	fetchUserTransaction() {
		getUserTransaction()
			.then((response) => {
				console.log(response);
				this.setState({
					transactions: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const {show, key, selectedTransaction} = this.state;
		return (
			<React.Fragment>
				{this.state.transactions !== null && (
					<div className='container-fluid'>
						<div className='col-md-8 col-md-offset-2' id='search-form'>
							<h5 className='text-center'>Transactionlist</h5>
							<table className='table table-striped table-bordered'>
								<thead>
									<tr>
										<th>Transaction Invoice</th>
										<th>state</th>
										<th>Amount</th>
										<th>Details</th>
									</tr>
								</thead>
								<tbody>
									{this.state.transactions.map((transaction) => {
										return (
											<tr>
												<td>{transaction.idx}</td>
												<td>{transaction.state}</td>
												<td>{transaction.amount}</td>
												<td>
													<span
														className='btn btn-primary'
														onClick={() => this.onTransactionSelect(transaction)}
													>
														Transaction details
													</span>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
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
						<Tabs id='controlled-tab-example' activeKey={key} onSelect={(k) => this.setKey(k)}>
							<Tab eventKey='user' title='user'>
								<UserDetailCard user={selectedTransaction.user} />
							</Tab>
							<Tab eventKey='bookings' title='bookings'>
								<BookingDetails bookings={selectedTransaction.bookings} />
							</Tab>
							<Tab eventKey='response' title='response'>
								<TransactionApiResponse response={selectedTransaction.response} />
							</Tab>
						</Tabs>
					)}
				</ModalExample>
			</React.Fragment>
		);
	}
}

export default TransactionList;
