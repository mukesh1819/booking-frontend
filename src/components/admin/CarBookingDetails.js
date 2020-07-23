import React, {Component, Fragment} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import history from '../../history';
import {
	getCarBookingConfirmation,
	declineCarBooking,
	deleteCarBooking,
	showUserCarBooking,
	markComplete
} from '../../api/carBookingApi';
import {fetchTicket} from '../../api/flightApi';
import {downloadTicket, pick} from '../../helpers';
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

	onMarkComplete(id) {
		markComplete(id).then((response) => {
			swal({
				title: 'Response',
				text: response.data.message,
				icon: response.status == 200 ? 'success' : 'error'
			}).then((response) => {
				history.push('/');
			});
		});
	}

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
				<div className='ui grid'>
					<div className='row'>
						<div className='right floated right aligned sixteen wide column'>
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

							{carBooking.status != 'completed' && (
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
							)}

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
											<span className='btn bg-none text-primary'>Approve Booking</span>
										</Link>
									</span>
								</td>
							)}

							{carBooking.status == 'approved' && (
								<td>
									<span>
										<span
											className='btn bg-none text-primary'
											onClick={() => this.onMarkComplete(carBooking.idx)}
										>
											Mark As Complete
										</span>
									</span>
								</td>
							)}
						</div>
					</div>
				</div>
				<div className='ui segment'>
					{/* <h3 className='ui header'> Details </h3> */}
					<div className='ui internally celled stackable grid section-layout'>
						<div className='row'>
							<div className='eight wide column section'>
								<h3 className='ui header'> Inquiry Details </h3>
								<div className='ui grid'>
									{Object.entries(
										pick(carBooking.car_inquiry, [
											'source',
											'destination',
											'no_of_pax',
											'trip_type',
											'no_of_days'
										])
									).map(([key, value]) => (
										<div className='row'>
											<div className='eight wide column'>{key.titleize()}:</div>
											<div className='eight wide column'>{value}</div>
										</div>
									))}
								</div>
							</div>
							<div className='eight wide column section'>
								<h3 className='ui header'> Booking Details </h3>
								<div className='ui grid'>
									{Object.entries(
										pick(carBooking, ['pickup_date', 'drop_off_date'])
									).map(([key, value]) => (
										<div className='row'>
											<div className='eight wide column'>{key.titleize()}:</div>
											<div className='eight wide column'>
												{moment(value).format('D MMMM, YYYY HH:mm:ss')}
											</div>
										</div>
									))}
									{Object.entries(
										pick(carBooking, ['pickup_location', 'drop_off_location'])
									).map(([key, value]) => (
										<div className='row'>
											<div className='eight wide column'>{key.titleize()}:</div>
											<div className='eight wide column'>{value}</div>
										</div>
									))}
									{carBooking.flight_no && (
										<Fragment>
											<div className='row'>
												<div className='eight wide column'>Flight Number</div>
												<div className='eight wide column'> {carBooking.flight_no}</div>
											</div>
											<div className='row'>
												<div className='eight wide column'>Flight Time</div>
												<div className='eight wide column'>
													{moment(carBooking.flight_time).format('D MMMM, YYYY')}
												</div>
											</div>
										</Fragment>
									)}
									<div className='row text-bold text-danger'>
										<div className='eight wide column'>Amount:</div>
										<div className='eight wide column'> {carBooking.amount}</div>
									</div>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='eight wide column section'>
								<h3 className='ui header'> Contact Details </h3>
								<div className='ui grid'>
									{Object.entries(
										pick(carBooking, ['contact_name', 'contact_email', 'mobile_no'])
									).map(([key, value]) => (
										<div className='row'>
											<div className='eight wide column'>{key.titleize()}:</div>
											<div className='eight wide column'>{value}</div>
										</div>
									))}
								</div>
							</div>
							<div className='eight wide column section'>
								<h3 className='ui header'> Other Details </h3>
								<div className='ui grid'>
									{Object.entries(pick(carBooking.car_inquiry, ['car_type'])).map(([key, value]) => (
										<div className='row'>
											<div className='eight wide column'>{key.titleize()}:</div>
											<div className='eight wide column'>{value}</div>
										</div>
									))}
									<div className='row'>
										<div className='eight wide column'>Booking Status:</div>
										<div className='eight wide column'>
											<Badge type={carBooking.status}>{carBooking.status}</Badge>
										</div>
									</div>
									<div className='row'>
										<div className='eight wide column'>IDx:</div>
										<div className='eight wide column'>{carBooking.idx}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CarBookingDetails;
