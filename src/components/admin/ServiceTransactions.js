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
import moment from 'moment';
import {getServiceTransactions} from '../../api/serviceTransactionApi';
import {CustomMenu} from './Menu';
import {getPartners} from '../../api/partnerApi';

class ServiceTransactions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			serviceTransactions: [],
			activeMenuItem: 'All',
			pagination: {},
			partners: []
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchServiceTransaction({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	// onStatusChange = (value) => {
	// 	this.setState({activeMenuItem: value});
	// };

	// onTransactionSelect(transaction) {
	// 	this.setState({
	// 		selectedTransaction: transaction
	// 	});
	// }

	// handleItemClick = (e, {name}) => {
	// 	var searchQuery = name == 'All' ? '' : `q[state_eq]=${name.toLowerCase()}`;
	// 	this.fetchServiceTransaction(searchQuery);
	// 	this.setState({activeMenuItem: name});
	// };

	// setKey(key) {
	// 	this.setState({
	// 		key: key
	// 	});
	// }

	componentDidMount() {
		passCsrfToken(document, axios);
		// this.fetchUserTransaction(queryString.parse(this.props.location.search));
		this.fetchServiceTransaction(queryString.parse(this.props.location.search));
	}

	fetchServiceTransaction(params) {
		getServiceTransactions(params)
			.then((response) => {
				// console.log(response);
				this.setState({
					serviceTransactions: response.data.service_transactions,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' Transaction fetch error', error);
			});

		getPartners({per_page: 100}).then((response) => {
			this.setState({
				partners: response.data.partners
			});
		});
	}

	// downloadCsv() {
	// 	getCsvTransaction()
	// 		.then((response) => {
	// 			console.log('Transaction response', response.data);
	// 			downloadCsvTicket(response.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log('csv download error');
	// 		});
	// }

	// downloadXls() {
	// 	getXlsTransaction()
	// 		.then((response) => {
	// 			console.log('Transaction response', response.data);
	// 			downloadXlsTicket(response.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log('csv download error');
	// 		});
	// }

	onFilter = (values) => {
		this.setState({
			serviceTransactions: values.service_transactions
		});
	};

	render() {
		const {show, key, serviceTransactions, activeMenuItem, pagination, partners} = this.state;
		const filterFields = [
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
				name: 'amount_eq',
				label: 'amount',
				type: 'text'
			},

			// {
			// 	name: 'partner_first_name_or_partner_last_name_cont',
			// 	label: 'Partner Name',
			// 	type: 'text'
			// },

			{
				label: 'Partner Name',
				type: 'select',
				//name: 'partner_id_eq',
				name: 'partner_id_eq',
				options: partners.map(function(partner) {
					// key: partner.id
					// value: partner.id
					var pName = partner.first_name + ' ' + partner.last_name;
					return {
						key: partner.id,
						value: partner.id,
						text: pName
					};
				})
			},

			{
				name: 'closing_balance_eq',
				label: 'Total Transaction',
				type: 'text'
			},

			{
				name: 'remarks_cont',
				label: 'Remarks',
				type: 'text'
			}
		];
		return (
			<React.Fragment>
				{this.state.serviceTransactions !== null && (
					<div className='ui container'>
						{/* <FilterForm
							submitUrl='service_transactions'
							fields={FilterFields}
							onSubmit={(values) => this.onFilter(values)}
						/> */}
						<div className='' id='search-form'>
							<div className='row justify-content-between mb-2'>
								<div className='col-4'>
									<h3 className='title'>Service Transactions</h3>
								</div>
								<div
									className='ui button primary'
									onClick={() => history.push('/admin/service_transaction/new')}
								>
									Create Service Transaction
								</div>
							</div>
							{/* <div className='text-center'>
								
							</div> */}

							{/* <Menu pointing>
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
							</Menu> */}

							<CustomMenu
								submitUrl='service_transactions'
								filterFields={filterFields}
								onFilter={(values) => this.onFilter(values)}
								items={[
									{
										label: 'Transaction Type',
										type: 'dropdown',
										name: 'direction_eq',
										objects: [
											{
												label: 'debit',
												value: 'debit'
											},
											{
												label: 'credit',
												value: 'credit'
											}
										]
									}
								]}
							/>

							<Segment>
								<table className='table table-striped table-bordered'>
									<thead>
										<tr>
											<th>S. No.</th>
											<th>Date</th>
											<th>Partner</th>
											<th>Description</th>
											<th>Payment Mode</th>
											<th>Debit</th>
											<th>Credit</th>
											<th>Closing Balance</th>
											<th>Booking Details</th>
											{/* <th>Amount</th>
											<th>Partner id</th>
											<th>Total Balance</th>
											<th>Remarks</th>
											<th>Created At</th>
											<th>Actions</th> */}
										</tr>
									</thead>
									<tbody>
										{this.state.serviceTransactions.map((transaction, index) => {
											return (
												<tr>
													<td>{index + 1}</td>
													<td>{moment(transaction.created_at).format('D MMMM, YYYY')}</td>
													<td>
														{transaction.partner && transaction.partner.first_name} {transaction.partner && transaction.partner.last_name}
													</td>
													<td>{transaction.remarks}</td>
													<td>{transaction.payment_mode}</td>
													<td>
														{transaction.direction === 'debit' ? transaction.amount : ''}
													</td>
													<td>
														{transaction.direction === 'credit' ? transaction.amount : ''}
													</td>
													<td>{transaction.closing_balance}</td>
													<td>
														{transaction.booking_details &&
														transaction.booking_details.type === 'RENTAL' && (
															<Link
																to={`/admin/car_bookings/${transaction.booking_details
																	.idx}`}
															>
																view details
															</Link>
														)}
														{transaction.booking_details &&
														transaction.booking_details.type === 'PACKAGE' && (
															<Link
																to={`/admin/package_booking_details/${transaction
																	.booking_details.idx}`}
															>
																view details
															</Link>
														)}
													</td>

													{/* <td>
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
													</td> */}
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

export default ServiceTransactions;
