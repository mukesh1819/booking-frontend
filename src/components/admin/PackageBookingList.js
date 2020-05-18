import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getPackageBookings} from '../../api/packageBookingApi';
import swal from 'sweetalert';
import FilterForm from './FilterForm';
import {Segment, Card, Menu, Dropdown, Input} from 'semantic-ui-react';

class PackageBookingList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'All',
			packageBookings: [],
			showFilter: false
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchPackageBookings();
	}

	fetchPackageBookings = () => {
		getPackageBookings()
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					packageBookings: response.data
				});
			})
			.catch((error) => {
				// console.log('Fetch Package Error', errors);
				console.log('Package Booking fetch error', error);
			});
	};

	onFilter = (values) => {
		this.setState({
			packageBookings: values
		});
	};

	toggleFilter = () => {
		this.setState({
			showFilter: !this.state.showFilter
		});
	};

	onStatusChange = (value) => {
		this.setState({activeItem: value});
	};

	handleItemClick = (e, {name}) => {
		this.setState({activeItem: name});
	};

	handleClick = (e, titleProps) => {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({activeIndex: newIndex});
	};

	render() {
		const {packageBookings, activeItem, activeIndex, showFilter} = this.state;

		const FilterFields = [
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

			{
				name: 'status_eq',
				label: 'Status',
				type: 'select',
				options: ['pending', 'confirmed', 'processing']
			},

			{
				name: 'amount_eq',
				label: 'Amount',
				type: 'text'
			},

			{
				name: 'inquiry_first_name_or_last_name_cont',
				label: 'inquiry',
				type: 'text'
			}
		];

		return (
			<div className='ui container'>
				<h3>Package Booking List</h3>

				{showFilter && (
					<FilterForm
						submitUrl='package_bookings'
						fields={FilterFields}
						onSubmit={(values) => this.onFilter(values)}
					/>
				)}
				<Menu pointing>
					<Menu.Item name={activeItem} active={true} onClick={this.handleItemClick} />
					<Menu.Item>
						<Dropdown clearable text='Status'>
							<Dropdown.Menu>
								<Dropdown.Item content='Verified' onClick={() => this.onStatusChange('verified')} />
								<Dropdown.Item content='Processing' onClick={() => this.onStatusChange('processing')} />
								<Dropdown.Item content='Cancelled' onClick={() => this.onStatusChange('cancelled')} />
								<Dropdown.Item content='Completed' onClick={() => this.onStatusChange('completed')} />
								<Dropdown.Item content='Declined' onClick={() => this.onStatusChange('declined')} />
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>

					<Menu.Menu position='right'>
						<Menu.Item name={showFilter ? 'Cancel' : 'Filter'} onClick={this.toggleFilter} />
						<Menu.Item>
							<Input icon='search' placeholder='Search...' />
						</Menu.Item>
					</Menu.Menu>
				</Menu>

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
										<td>{packageBooking.start_date}</td>
										<td>{packageBooking.end_date}</td>
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
			</div>
		);
	}
}
export default PackageBookingList;
