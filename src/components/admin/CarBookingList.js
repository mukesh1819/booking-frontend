import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getCarBookings} from '../../api/carBookingApi';
import swal from 'sweetalert';
import {CustomMenu} from './Menu';
import {Segment, Card, Menu, Dropdown, Input, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';
import history from '../../history';
import FilterForm from './FilterForm';

class PackageBookingList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'All',
			carBookings: [],
			pagination: {},
			showFilter: false
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchCarBookings({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchCarBookings(queryString.parse(this.props.location.search));
	}

	fetchCarBookings = (params) => {
		getCarBookings(params)
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					carBookings: response.data.car_bookings,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				// console.log('Fetch Package Error', errors);
				console.log('Car Booking fetch error', error);
			});
	};

	onFilter = (values) => {
		this.setState({
			carBookings: values.car_bookings
		});
	};

	render() {
		const {carBookings, activeItem, activeIndex, showFilter, pagination} = this.state;

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

			{
				name: 'pickup_date_gteq',
				label: 'From pickup Date',
				type: 'date'
			},
			{
				name: 'pickup_date_lteq',
				label: 'To pickup Date',
				type: 'date'
			},

			{
				name: 'drop_off_date_gteq',
				label: 'From drop off Date',
				type: 'date'
			},
			{
				name: 'drop_off_date_lteq',
				label: 'To start Date',
				type: 'date'
			},

			{
				name: 'pickup_location_cont',
				label: 'pickup location',
				type: 'text'
			},

			{
				name: 'drop_off_location_cont',
				label: 'drop location',
				type: 'text'
			},

			{
				name: 'mobile_no_cont',
				label: 'Contact Number',
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
				name: 'contact_name_cont',
				label: 'User Name',
				type: 'text'
			},

			{
				name: 'contact_email_cont',
				label: 'User Email',
				type: 'text'
			}
		];

		return (
			<div className='ui container'>
				{/* <FilterForm submitUrl='admin/car_bookings' fields={filterFields} onSubmit={(values) => this.onFilter(values)} /> */}

				<h3 className='title'>Car Bookings</h3>
				<CustomMenu
					submitUrl='car_bookings'
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
					<table className='ui celled striped unstackable selectable table ' ref='main'>
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
								<th>Pickup Date</th>
								{/* <th>Pickup Location</th> */}
								<th>Drop off Date</th>
								{/* <th>Drop off Location</th> */}
								{/* <th>Meals Included</th> */}
								{/* <th>Remarks</th> */}
								{/* <th>Created At</th> */}
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{carBookings.map((carBooking) => {
								return (
									<tr>
										<td>{carBooking.idx}</td>
										{/* <td>{packageBooking.idx}</td> */}
										{/* <td>{packageBooking.package_id} </td> */}
										{/* <td>{packageBooking.user_id} </td> */}
										<td>{carBooking.amount}</td>
										{/* <td>{packageBooking.inquiry_id}</td> */}
										{/* <td>{packageBooking.booking_transaction_id}</td> */}
										<td>{carBooking.status}</td>
										<td>{carBooking.pickup_date}</td>
										<td>{carBooking.drop_off_date}</td>
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
													pathname: `/admin/car_bookings/${carBooking.idx}`,
													state: {
														carBooking: carBooking
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
