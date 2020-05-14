import React, {Component} from 'react';
import {passCsrfToken} from '../../helpers';
import axios from 'axios';
import {getAdminBookings, deleteBooking} from '../../api/flightApi';
import BookingDetails from './BookingDetails';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Pagination, Menu, Segment, Input, Dropdown} from 'semantic-ui-react';
import moment from 'moment';
import {ifNotZero} from '../../helpers';
import {Badge} from '../shared';
import history from '../../history';
import {Accordion} from 'semantic-ui-react';
import FilterForm from './FilterForm';

class FlightBookings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookings: [],
			currentPage: 1,
			activeItem: 'All',
			activeIndex: -1
		};
	}

	onStatusChange = (value) => {
		this.fetchBookings(`q[status_eq]=${value.toLowerCase()}`);
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

	changeCurrentPage = (e, {activePage}) => {
		this.setState({currentPage: activePage});
		this.fetchBookings(`page=${activePage}`);
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchBookings();
	}

	fetchBookings(params) {
		getAdminBookings(params)
			.then((response) => {
				// console.log(response);
				this.setState({
					bookings: response.data
				});
			})
			.catch((error) => {
				console.log('Booking fetch error', error);
			});
	}

	destroyBooking = (id) => {
		// deleteBooking(id)
		// .then((response) => {
		// 	swal({
		// 		title: 'Flight Booking deleted!',
		// 		text: `this flight booking is deleted`,
		// 		icon: 'success',
		// 		button: 'Continue!'
		// 	});
		// 	history.go();

		// })
		// .catch((error) => {
		// 	swal({
		// 		title: 'Flight Booking Delete error',
		// 		text: 'Something went wrong. please try again or contact us',
		// 		icon: 'error',
		// 		button: 'Continue!'
		// 	});
		// })

		swal({
			title: 'Are you sure?',
			text: 'Once delete, your flight booking will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteBooking(id).then((response) => {
					swal('this flight booking is deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Your flight booking is not deleted yet');
			}
		});
	};

	render() {
		const {bookings} = this.state;
		const {activeItem, activeIndex} = this.state;
		return (
			<div className='container'>
				<div className='row my-3'>
					<div className='col-12'>
						<FilterForm
							submitUrl='bookings'
							fields={[
								{
									name: 'created_at',
									label: 'Created At',
									type: 'date'
								},
								{
									name: 'status',
									label: 'Status',
									type: 'select',
									options: ['confirmed', 'pending', 'processing']
								},
								{
									name: 'flight_id',
									label: 'Flight Id',
									type: 'text'
								}
							]}
						/>

						<Menu pointing>
							<Menu.Item name={activeItem} active={activeItem === 'All'} onClick={this.handleItemClick} />
							<Menu.Item>
								<Dropdown clearable text='Status'>
									<Dropdown.Menu>
										<Dropdown.Item
											content='Verified'
											onClick={() => this.onStatusChange('verified')}
										/>
										<Dropdown.Item
											content='Processing'
											onClick={() => this.onStatusChange('processing')}
										/>
										<Dropdown.Item
											content='Cancelled'
											onClick={() => this.onStatusChange('cancelled')}
										/>
										<Dropdown.Item
											content='Completed'
											onClick={() => this.onStatusChange('completed')}
										/>
										<Dropdown.Item
											content='Declined'
											onClick={() => this.onStatusChange('declined')}
										/>
									</Dropdown.Menu>
								</Dropdown>
							</Menu.Item>
							<Menu.Menu position='right'>
								<Menu.Item>
									{/* <Input icon='search' placeholder='Search...' /> */}
									<Link to='/admin/cancel_requests' className='text-danger'>
										Cancel Requests
									</Link>
								</Menu.Item>
							</Menu.Menu>
						</Menu>

						<Segment>
							<Accordion styled fluid>
								{bookings.map((booking, index) => {
									return (
										<BookingDetails
											booking={booking}
											activeIndex={activeIndex}
											index={index}
											handleClick={this.handleClick}
											destroyBooking={this.destroyBooking}
										/>
									);
								})}
							</Accordion>
						</Segment>
						<div className='text-center p-2'>
							<Pagination
								activePage={this.state.currentPage}
								sizePerPage={5}
								onPageChange={this.changeCurrentPage}
								totalPages={this.state.bookings.length}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default FlightBookings;
