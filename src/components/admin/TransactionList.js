import React, {Component} from 'react';
import {getUserTransaction} from '../../api/transactionApi';
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
		this.fetchUserTransaction(`q[status_eq]=${name.toLowerCase()}`);
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
				swal({
					title: 'Transaction fetch error',
					text: 'could not able to fetch user transaction. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	render() {
		const {show, key, selectedTransaction, activeMenuItem} = this.state;
		return (
			<React.Fragment>
				{this.state.transactions !== null && (
					<div className='container p-4'>
						<div className='' id='search-form'>
							<h3 className='title'>Transactions</h3>

							<Menu pointing>
								<Menu.Item
									name='All'
									active={activeMenuItem === 'All'}
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
											<th>Transaction Invoice</th>
											<th>state</th>
											<th>Amount</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{this.state.transactions.map((transaction) => {
											return (
												<tr>
													<td>{transaction.idx}</td>
													<td>
														<Badge type={transaction.state}>{transaction.state}</Badge>
													</td>
													<td>{transaction.amount}</td>
													<td>
														<span
															className='btn bg-none text-primary'
															onClick={() => this.onTransactionSelect(transaction)}
														>
															Details
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
