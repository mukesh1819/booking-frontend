import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getPackageBookings} from '../../api/packageBookingApi';
import swal from 'sweetalert';
import {CustomMenu} from './Menu';
import {Segment, Card, Menu, Dropdown, Input, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';
import history from '../../history';
import moment from 'moment';

class PackageBookingList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'All',
			packageBookings: [],
			pagination: {},
			showFilter: false
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchPackageBookings({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchPackageBookings(queryString.parse(this.props.location.search));
	}

	fetchPackageBookings = (params) => {
		getPackageBookings(params)
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					packageBookings: response.data.package_bookings,
					pagination: response.data.meta.pagination

				});
			})
			.catch((error) => {
				// console.log('Fetch Package Error', errors);
				console.log('Package Booking fetch error', error);
			});
	};

	onFilter = (values) => {
		this.setState({
			packageBookings: values.package_bookings
		});
	};

	render() {
		const {packageBookings, activeItem, activeIndex, showFilter, pagination} = this.state;

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

			// {
			// 	name: 'start_date_gteq',
			// 	label: 'From start Date',
			// 	type: 'date'
			// },
			// {
			// 	name: 'start_date_lteq',
			// 	label: 'To start Date',
			// 	type: 'date'
			// },

			// {
			// 	name: 'end_date_gteq',
			// 	label: 'From end Date',
			// 	type: 'date'
			// },
			// {
			// 	name: 'end_date_lteq',
			// 	label: 'To end Date',
			// 	type: 'date'
			// },

			// {
			// 	name: 'pickup_date_gteq',
			// 	label: 'From pickup Date',
			// 	type: 'date'
			// },
			// {
			// 	name: 'pickup_date_lteq',
			// 	label: 'To pickup Date',
			// 	type: 'date'
			// },

			// {
			// 	name: 'drop_off_date_gteq',
			// 	label: 'From drop off Date',
			// 	type: 'date'
			// },
			// {
			// 	name: 'drop_off_date_lteq',
			// 	label: 'To start Date',
			// 	type: 'date'
			// },

			// {
			// 	name: 'pickup_location_cont',
			// 	label: 'pickup location',
			// 	type: 'text'
			// },

			// {
			// 	name: 'drop_off_location_cont',
			// 	label: 'drop location',
			// 	type: 'text'
			// },

			{
				name: 'package_name_cont',
				label: 'Package Name',
				type: 'text'
			},

			// {
			// 	name: 'status_eq',
			// 	label: 'Status',
			// 	type: 'select',
			// 	options: ['pending', 'confirmed', 'processing']
			// },

			{
				name: 'amount_eq',
				label: 'Amount',
				type: 'text'
			},

			{
				name: 'inquiry_first_name_or_last_name_cont',
				label: 'Inquiring User',
				type: 'text'
			}
		];

		return (
			<div className='ui container'>
				<h3 className='title'>Package Bookings</h3>
				<CustomMenu
					submitUrl='package_bookings'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					items={[
						{
							label: 'Status',
							type: 'dropdown',
							name: 'status_eq',
							objects: [
								{
									label: 'Pending',
									value: 'pending'
								},
								{
									label: 'Processing',
									value: 'processing'
								},
								{
									label: 'Confirmed',
									value: 'confirmed'
								}
							]
						}
					]}
				/>

				<Segment>
					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>S. No.</th>
								{/* <th>IDX</th> */}
								{/* <th>package ID</th> */}
								{/* <th>User ID</th> */}
								<th>Amount</th>
								{/* <th>Inquiry ID</th> */}
								{/* <th>Booking Transaction ID</th> */}
								<th>Status</th>
								<th>Start Date</th>
								<th>End Date</th>
								{/* <th>Pickup Date</th> */}
								{/* <th>Pickup Location</th> */}
								{/* <th>Drop off Date</th> */}
								{/* <th>Drop off Location</th> */}
								{/* <th>Meals Included</th> */}
								{/* <th>Remarks</th> */}
								{/* <th>Created At</th> */}
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{packageBookings.map((packageBooking) => {
								return (
									<tr>
										<td>{packageBooking.id}</td>
										{/* <td>{packageBooking.idx}</td> */}
										{/* <td>{packageBooking.package_id} </td> */}
										{/* <td>{packageBooking.user_id} </td> */}
										<td>{packageBooking.amount}</td>
										{/* <td>{packageBooking.inquiry_id}</td> */}
										{/* <td>{packageBooking.booking_transaction_id}</td> */}
										<td>{packageBooking.status}</td>
										<td>{moment(packageBooking.start_date).format('D MMMM, YYYY')}</td>
										<td>{moment(packageBooking.end_date).format('D MMMM, YYYY')}</td>
										{/* <td>{packageBooking.pickup_date}</td> */}
										{/* <td>{packageBooking.pickup_location}</td> */}
										{/* <td>{packageBooking.drop_off_date}</td> */}
										{/* <td>{packageBooking.drop_off_location}</td> */}
										{/* <td>{packageBooking.meals_included}</td> */}
										{/* <td>{packageBooking.remarks}</td> */}
										{/* <td>{packageBooking.created_at}</td> */}
										<td>
											<Link
												to={{
													pathname: `/admin/package_booking_details/${packageBooking.idx}`,
													state: {
														packageBooking: packageBooking
													}
												}}
											>
												<i className='fas fa-contact' />
												<span className='px-1'>view</span>
											</Link>
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
		);
	}
}
export default PackageBookingList;
