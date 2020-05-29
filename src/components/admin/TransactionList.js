import React, {Component} from 'react';
import {getUserTransaction, deleteTransaction, getCsvTransaction, getXlsTransaction} from '../../api/transactionApi';
import {passCsrfToken} from '../../helpers';
import axios from 'axios';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';
import {Modal as ModalExample, Badge} from '../shared';
import swal from 'sweetalert';
import {Menu, Segment, Pagination, Input, Accordion, Dropdown, Button} from 'semantic-ui-react';
import {downloadTicket, downloadCsvTicket, downloadXlsTicket} from '../../helpers/general';
import queryString from 'query-string';
import FilterForm from './FilterForm';

class TransactionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
			selectedTransaction: null,
			key: 'user',
			activeMenuItem: 'All',
			pagination: {}
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchUserTransaction({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	onStatusChange = (value) => {
		this.setState({activeMenuItem: value});
	};

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
		this.fetchUserTransaction(queryString.parse(this.props.location.search));
	}

	fetchUserTransaction(params) {
		getUserTransaction(params)
			.then((response) => {
				// console.log(response);
				this.setState({
					transactions: response.data.booking_transactions,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' Transaction fetch error', error);
			});
	}

	downloadCsv() {
		getCsvTransaction()
			.then((response) => {
				console.log('Transaction response', response.data);
				downloadCsvTicket(response.data);
			})
			.catch((error) => {
				console.log('csv download error');
			});
	}

	downloadXls() {
		getXlsTransaction()
			.then((response) => {
				console.log('Transaction response', response.data);
				downloadXlsTicket(response.data);
			})
			.catch((error) => {
				console.log('csv download error');
			});
	}

	// destroyTransaction(id) {
	// 	// deleteTransaction(id)
	// 	// 	.then((response) => {
	// 	// 		swal({
	// 	// 			title: 'Transaction deleted!',
	// 	// 			text: `this Transaction is deleted`,
	// 	// 			icon: 'success',
	// 	// 			button: 'Continue!'
	// 	// 		});
	// 	// 		history.go();
	// 	// 	})
	// 	// 	.catch((error) => {
	// 	// 		swal({
	// 	// 			title: 'Transaction Delete error',
	// 	// 			text: 'Something went wrong. please try again or contact us',
	// 	// 			icon: 'error',
	// 	// 			button: 'Continue!'
	// 	// 		});
	// 	// 	});

	// 	swal({
	// 		title: 'Are you sure?',
	// 		text: 'Once delete, your transaction will be deleted',
	// 		icon: 'warning',
	// 		buttons: true,
	// 		dangerMode: true
	// 	}).then((willDelete) => {
	// 		if (willDelete) {
	// 			deleteTransaction(id).then((response) => {
	// 				swal('this Transaction is deleted', {
	// 					icon: 'success'
	// 				});
	// 				history.go();
	// 			});
	// 		} else {
	// 			swal('Your transaction is not deleted yet');
	// 		}
	// 	});
	// }

	onFilter = (values) => {
		this.setState({
			transactions: values
		});
	};

	render() {
		const {show, key, selectedTransaction, activeMenuItem, pagination} = this.state;
		const FilterFields = [
			// {
			// 	name: 'created_at_gteq',
			// 	label: 'From Date',
			// 	type: 'date'
			// },
			// {
			// 	name: 'created_at_lteq',
			// 	label: 'To Date',
			// 	type: 'date'
			// },

			{
				name: 'date_gteq',
				label: 'From Date',
				type: 'date'
			},
			{
				name: 'date_lteq',
				label: 'To Date',
				type: 'date'
			},

			// {
			// 	name: 'user_name_cont',
			// 	label: 'user name',
			// 	type: 'text'
			// },

			{
				name: 'amount_eq',
				label: 'amount',
				type: 'text'
			}

			// {
			// 	name: 'state_eq',
			// 	label: 'status',
			// 	type: 'select',
			// 	options: ['pending', 'initial', 'verified']
			// },

			// {
			// 	name: 'booking_type_eq',
			// 	label: 'booking type',
			// 	type: 'select',
			// 	options: ['FLIGHT', 'PACKAGE']
			// }
		];
		return (
			<React.Fragment>
				{this.state.transactions !== null && (
					<div className='ui container'>
						<FilterForm
							submitUrl='payments'
							fields={FilterFields}
							onSubmit={(values) => this.onFilter(values)}
						/>
						<div className='' id='search-form'>
							<div className='row'>
								<div className='col-6'>
									<h3 className='title'>Transactions</h3>
								</div>
							</div>

							<Menu pointing>
								<Menu.Item name={activeMenuItem} active={true} />
								<Menu.Item>
									<Dropdown clearable text='Status'>
										<Dropdown.Menu>
											<Dropdown.Item
												content='Pending'
												onClick={() => this.onStatusChange('pending')}
											/>
											<Dropdown.Item
												content='Processing'
												onClick={() => this.onStatusChange('processing')}
											/>
											<Dropdown.Item
												content='Verified'
												onClick={() => this.onStatusChange('verified')}
											/>
										</Dropdown.Menu>
									</Dropdown>
								</Menu.Item>
								<Menu.Item>
									<Dropdown clearable text='Type'>
										<Dropdown.Menu>
											<Dropdown.Item
												content='Flights'
												onClick={() => this.onStatusChange('flights')}
											/>
											<Dropdown.Item
												content='Packages'
												onClick={() => this.onStatusChange('packages')}
											/>
										</Dropdown.Menu>
									</Dropdown>
								</Menu.Item>
								<Menu.Item>
									<Dropdown clearable text='Export'>
										<Dropdown.Menu>
											<Dropdown.Item content='CSV' onClick={() => this.downloadCsv()} />
											<Dropdown.Item content='Excel' onClick={() => this.downloadXls()} />
										</Dropdown.Menu>
									</Dropdown>
								</Menu.Item>
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
											<th>S. No.</th>
											<th>Transaction Invoice</th>
											<th>state</th>
											<th>Amount</th>
											<th>Created At</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{this.state.transactions.map((transaction, index) => {
											return (
												<tr>
													<td>{index + 1}</td>
													<td>{transaction.idx}</td>
													<td>
														<Badge type={transaction.state}>{transaction.state}</Badge>
													</td>
													<td>{transaction.amount}</td>
													<td>{transaction.created_at}</td>
													<td>
														<Link
															className='btn bg-none text-primary'
															to={{
																pathname: `/admin/transaction/${transaction.idx}`,
																state: {
																	transaction: transaction
																}
															}}
														>
															Details
														</Link>
														{/* <span
															className='btn bg-none text-danger'
															onClick={() => this.destroyTransaction(transaction.idx)}
														>
															Delete
														</span> */}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</Segment>

							<div className='text-center p-2'>
								<Pagination
									activePage={pagination.current_page}
									sizePerPage={pagination.per_page}
									onPageChange={this.changeCurrentPage}
									totalPages={pagination.total_pages}
								/>
							</div>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default TransactionList;
