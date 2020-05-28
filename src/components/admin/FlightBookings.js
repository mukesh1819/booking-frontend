import React, {Component, Fragment} from 'react';
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
import {CustomMenu} from './Menu';
import queryString from 'query-string';

class FlightBookings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookings: [],
			pagination: {},
			activeItem: 'All',
			activeIndex: -1,
			showFilter: false
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchBookings({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchBookings(queryString.parse(this.props.location.search));
	}

	fetchBookings(params) {
		getAdminBookings(params)
			.then((response) => {
				// console.log(response);
				this.setState({
					bookings: response.data.bookings,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				console.log('Booking fetch error', error);
			});
	}

	onFilter = (values) => {
		this.setState({
			bookings: values
		});
	};

	toggleFilter = () => {
		this.setState({
			showFilter: !this.state.showFilter
		});
	};

	render() {
		const {bookings, activeItem, showFilter, pagination} = this.state;
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
				name: 'status_eq',
				label: 'Status',
				type: 'select',
				options: ['verified', 'pending', 'processing']
			},
			{
				name: 'flight_id_cont',
				label: 'Flight Id',
				type: 'text'
			}
		];
		return (
			<div className='container'>
				<div className='row my-3'>
					<div className='col-12'>
						<CustomMenu
							submitUrl='admin/bookings'
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
											label: 'Verified',
											value: 'verified'
										},
										{
											label: 'Cancelled',
											value: 'cancelled'
										},
										{
											label: 'Completed',
											value: 'completed'
										},
										{
											label: 'Declined',
											value: 'declined'
										}
									]
								}
							]}
						/>
						<Segment>
							<Accordion styled fluid>
								{bookings.map((booking, index) => {
									return (
										<div
											onClick={() => {
												history.push(`/admin/booking/${booking.ruid}`);
											}}
										>
											<div className='row'>
												<div className='col-3'>
													<h5>{booking.contact_name}</h5>
													<div className='text-muted text-small'>{booking.email}</div>
													<div className='text-muted text-small'>{booking.mobile_no}</div>
												</div>
												<div className='col'>
													<div className=''>
														<span className='px-2'>{`${booking.departure}`}</span>
														<i className='fas fa-arrow-right' />
														<span className='px-2'> {`${booking.arrival}`}</span>
													</div>
													<div>
														<span className='text-small text-muted px-2'>
															<i className='fas fa-plane-departure' />&nbsp;
															{/* {`${moment(booking.flight_date).format('Do MMMM, YYYY')}`} */}
														</span>
														{booking.strTripType === 'R' && (
															<span className='text-small text-muted px-2'>
																<i className='fas fa-plane-arrival' />&nbsp;
																{/* {`${moment(booking.strReturnDate).format('Do MMMM, YYYY')}`} */}
															</span>
														)}
														<span className='text-small text-muted px-2'>
															<i className='fas fa-male' />&nbsp;
															{booking.no_of_adult} Adult
															{ifNotZero(
																booking.no_of_child,
																`, ${booking.no_of_child} Child`
															)}
														</span>
													</div>
												</div>
												<div className='col-1 text-center'>
													<div className=''>
														{booking.currency}
														{booking.total_fare}
													</div>
													<Badge type={booking.status}>{booking.status}</Badge>
												</div>
											</div>
											<hr />
										</div>
									);
								})}
							</Accordion>
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
			</div>
		);
	}
}
export default FlightBookings;
