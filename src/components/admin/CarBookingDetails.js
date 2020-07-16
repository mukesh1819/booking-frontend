import React, {Component, Fragment} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import history from '../../history';
import {
	getCarBookingConfirmation,
	declineCarBooking,
	deleteCarBooking,
	showUserCarBooking
} from '../../api/carBookingApi';
import {fetchTicket} from '../../api/flightApi';
import {downloadTicket} from '../../helpers';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Badge} from '../shared';
import moment from 'moment';

class CarBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carBooking: {car_inquiry: {}},
			loading: false
		};
	}

	componentDidMount() {
		this.fetchDetails();
	}

	fetchDetails() {
		showUserCarBooking(this.props.match.params.idx).then((response) => {
			this.setState({
				carBooking: response.data
			});
		});
	}

	onConfirmCarBooking(id) {
		getCarBookingConfirmation(id)
			.then((response) => {
				swal({
					title: 'Car Booking Confirmation!',
					text: response.data.message,
					icon: 'success',
					button: 'Continue!'
				});
				history.push('/admin/car_bookings');
			})
			.catch((error) => {
				console.log('Car booking confirmation error', error);
			});
	}

	onDeclineCarBooking(id) {
		declineCarBooking(id)
			.then((response) => {
				swal({
					title: 'Car Booking Rejection!',
					text: response.data.message,
					icon: 'success',
					button: 'Continue!'
				});
				history.push('/admin/car_bookings');
			})
			.catch((error) => {
				console.log('Car booking Rejection error', error);
			});
	}

	download = (idx) => {
		fetchTicket(idx).then((response) => {
			this.setState({
				loading: false
			});
			downloadTicket(response.data);
		});
	};

	destroyCarBooking(id) {
		// deletePackageBooking(id)
		// 	.then((response) => {
		// 		swal({
		// 			title: 'Package Booking deleted!',
		// 			text: `this package booking is deleted`,
		// 			icon: 'success',
		// 			button: 'Continue!'
		// 		});
		// 		history.push('/admin/package_booking');
		// 	})
		// 	.catch((error) => {
		// 		swal({
		// 			title: 'Package Booking Delete error',
		// 			text: 'Something went wrong. please try again or contact us',
		// 			icon: 'error',
		// 			button: 'Continue!'
		// 		});
		// 	});

		swal({
			title: 'Are you sure?',
			text: 'Once delete, your car booking will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteCarBooking(id).then((response) => {
					swal('this car booking is deleted', {
						icon: 'success'
					});
					history.push('/admin/car_bookings');
				});
			} else {
				swal('Your Car booking is not deleted yet');
			}
		});
	}

	render() {
		const {carBooking, loading} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<div className='row'>
						<div className='col-12 col-md-3 offset-md-2 '>
							<div className=''>
								<i className='fas fa-car fa-3x' />
								<h3 className='title'>
									{carBooking.first_name}&nbsp;
									{carBooking.last_name}
								</h3>
								<div className=''>
									Status:&nbsp;<Badge type={carBooking.status}>{carBooking.status}</Badge>
								</div>
								<div>IDx: {carBooking.idx}</div>
								<div>Car Type: {carBooking.car_inquiry.car_type}</div>
								<div>Amount: {carBooking.amount}</div>
								<h3 className='title' />
								{carBooking.status === 'verified' && (
									<span className='text-center py-4'>
										<a
											href='#'
											primary
											loading={loading}
											className='text-danger text-bold'
											onClick={(e) => {
												e.preventDefault();
												this.download(carBooking.idx);
											}}
										>
											Download ticket
										</a>
									</span>
								)}

								{carBooking.status == 'processing' && (
									<td>
										<span>
											<Link
												to={{
													pathname: `/admin/${carBooking.idx}/assign_partner_booking_form`,
													state: {
														carBooking: carBooking
													}
												}}
											>
												<i className='fas fa-contact' />
												<span className='btn bg-none text-primary'>assign partner</span>
											</Link>
										</span>
									</td>
								)}

								{carBooking.status == 'verified' && (
									<td>
										<span>
											<Link
												to={{
													pathname: `/admin/${carBooking.idx}/partner_approval_form`,
													state: {
														carBooking: carBooking
													}
												}}
											>
												<i className='fas fa-contact' />
												<span className='btn bg-none text-primary'>approve partner</span>
											</Link>
										</span>
									</td>
								)}
							</div>
						</div>

						<div className='col-12 col-md-5'>
							<div className='list-view'>
								<h3 className='title'>Car Booking Details</h3>
								<div className='list'>
									<span className='label'>Pickup Time</span>
									<span className='value'>{moment(carBooking.pickup_date).format('D MMMM, YYYY HH:mm:ss')}</span>
								</div>
								<div className='list'>
									<span className='label'>Drop off Time</span>
									<span className='value'>{moment(carBooking.drop_off_date).format('D MMMM, YYYY HH:mm:ss')}</span>
								</div>

								<div className='list'>
									<span className='label'>Pickup Location</span>
									<span className='value'>{carBooking.pickup_location}</span>
								</div>

								<div className='list'>
									<span className='label'>Drop off Location</span>
									<span className='value'>{carBooking.drop_off_location}</span>
								</div>
							</div>

							<div className='list-view'>
								<h3 className='title'>Contact Details</h3>
								<div className='list'>
									<span className='label'>Name</span>
									<span className='value'>{carBooking.contact_name}</span>
								</div>
								<div className='list'>
									<span className='label'>Email</span>
									<span className='value'> {carBooking.contact_email}</span>
								</div>
								<div className='list'>
									<span className='label'>Mobile No</span>
									<span className='value'>{carBooking.mobile_no}</span>
								</div>
							</div>

							{carBooking.flight_no && (
								<div className='list-view'>
									<h3 className='title'>Flight Details</h3>
									<div className='list'>
										<span className='label'>Flight Number</span>
										<span className='value'>{carBooking.flight_no}</span>
									</div>
									<div className='list'>
										<span className='label'>Flight Time</span>
										<span className='value'> {moment(carBooking.flight_time).format('D MMMM, YYYY')}</span>
									</div>
								</div>
							)}

							<div className='list-view'>
								<h3 className='title'>Inquiry Details</h3>
								<div className='list'>
									<span className='label'>Number of pax</span>
									<span className='value'>{carBooking.car_inquiry.no_of_pax}</span>
								</div>
								<div className='list'>
									<span className='label'>Source</span>
									<span className='value'>{carBooking.car_inquiry.source}</span>
								</div>
								<div className='list'>
									<span className='label'>Destination</span>
									<span className='value'>{carBooking.car_inquiry.destination}</span>
								</div>
								<div className='list'>
									<span className='label'>Trip Type</span>
									<span className='value'>
										{carBooking.car_inquiry.trip_type}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='text-center'>
						{(carBooking.status == 'pending' || carBooking.status == 'declined') && (
							<span
								className='btn btn-success m-2'
								onClick={() => this.onConfirmCarBooking(carBooking.idx)}
							>
								confirm
							</span>
						)}

						{(carBooking.status == 'pending' || carBooking.status == 'processing') && (
							<span
								className='btn btn-outline-danger m-2'
								onClick={() => this.onDeclineCarBooking(carBooking.idx)}
							>
								decline
							</span>
						)}

						<Link
							className='m-2'
							to={{
								pathname: `/car_bookings/${carBooking.idx}/edit`,
								state: {
									carBooking: carBooking
								}
							}}
						>
							<i className='fas fa-contact' />
							<span className='btn btn-primary'>edit</span>
						</Link>

						{/* <span
							className='btn btn-danger'
							onClick={() => this.destroyCarBooking(carBooking.idx)}
						>
							Delete
						</span> */}
					</div>
				</div>
			</div>
		);
	}
}

export default CarBookingDetails;
