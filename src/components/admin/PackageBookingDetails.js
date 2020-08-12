import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import history from '../../history';
import {getPackageBookingConfirmation, deletePackageBooking, markComplete} from '../../api/packageBookingApi';
import {fetchTicket} from '../../api/flightApi';
import {downloadTicket, pick} from '../../helpers';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Badge} from '../shared';
import {Card} from 'semantic-ui-react';
import moment from 'moment';

class PackageBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	componentDidMount() {}

	// onConfirmPackageBooking(id) {
	// 	getPackageBookingConfirmation(id)
	// 		.then((response) => {
	// 			swal({
	// 				title: 'Package Booking Confirmation!',
	// 				text: response.data.message,
	// 				icon: 'success',
	// 				button: 'Continue!'
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log('Package booking confirmation error', error);
	// 		});
	// }

	destroyPackageBooking(id) {
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
			text: 'Once delete, your package booking will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deletePackageBooking(id).then((response) => {
					swal('this package booking is deleted', {
						icon: 'success'
					});
					history.push('/admin/package_booking');
				});
			} else {
				swal('Your package booking is not deleted yet');
			}
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
		markComplete(id)
			.then((response) => {
				swal({
					title: 'Response',
					text: response.data.message,
					icon: response.status == 200 ? 'success' : 'error'
				}).then((response) => {
					history.push('/admin/package_booking');
				});
			})
			.catch((v) => {});
	}

	render() {
		const {packageBooking} = this.props.location.state;
		const packageInfo = pick(packageBooking.package, ['name']);

		const contactInfo = pick(packageBooking.inquiry, [
			'first_name',
			'last_name',
			'email_address',
			'address',
			'city',
			'head_traveller_name',
			'nationality',
			'number_of_adult',
			'number_of_child',
			'phone',
			'query'
		]);

		const bookingInfo = pick(packageBooking, ['pickup_location', 'drop_off_location', 'meals_included']);

		const bookingDateInfo = pick(packageBooking, ['start_date', 'end_date', 'pickup_date', 'drop_off_date']);
		const otherInfo = pick(packageBooking, ['idx']);
		const remarks = pick(packageBooking, ['remarks']);
		const {loading} = this.state;
		return (
			<div className='container'>
				<Card fluid>
					<Card.Content>
						<div className='ui segment'>
							<h3 className='ui header'> Booking Details </h3>
							<div className='ui internally celled stackable grid'>
								<div className='row'>
									<div className='eight wide column'>
										<h3 className='ui header'> Package Info </h3>
										<div className='ui grid'>
											{Object.entries(packageInfo).map(([key, value]) => (
												<div className='row'>
													<div className='eight wide column'>{key.titleize()}:</div>
													<div className='eight wide column'>{value}</div>
												</div>
											))}
										</div>
									</div>
									<div className='eight wide column'>
										<h3 className='ui header'> Contact Info </h3>
										<div className='ui grid'>
											{Object.entries(contactInfo).map(([key, value]) => (
												<div className='row'>
													<div className='eight wide column'>{key.titleize()}:</div>
													<div className='eight wide column'>{value}</div>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='eight wide column'>
										<h3 className='ui header'> Booking Info </h3>
										<div className='ui grid'>
											{Object.entries(bookingInfo).map(([key, value]) => (
												<div className='row'>
													<div className='eight wide column'>{key.titleize()}:</div>
													<div className='eight wide column'>{value}</div>
												</div>
											))}
											{Object.entries(bookingDateInfo).map(([key, value]) => (
												<div className='row'>
													<div className='eight wide column'>{key.titleize()}:</div>
													<div className='eight wide column'>
														{moment(value).format('D MMMM, YYYY')}
													</div>
												</div>
											))}
										</div>
									</div>
									<div className='eight wide column'>
										<h3 className='ui header'> Other Info </h3>
										<div className='ui grid'>
											{Object.entries(otherInfo).map(([key, value]) => (
												<div className='row'>
													<div className='eight wide column'>{key.titleize()}:</div>
													<div className='eight wide column'>{value}</div>
												</div>
											))}
											<div className='row'>
												<div className='eight wide column'>Status:</div>
												<div className='eight wide column'>
													<Badge type={packageBooking.status}>{packageBooking.status}</Badge>
												</div>
											</div>
											<h3 className='ui header'> Remarks </h3>
											<div className='ui grid'>
												{Object.entries(remarks).map(([key, value]) => (
													<div className='row'>
														<div className='eight wide column'>{key.titleize()}:</div>
														<div className='eight wide column'>{value}</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card>
				<div className='text-center'>
					{packageBooking.inquiry.status === 'verified' && (
						<span className='text-center py-4'>
							<Button
								primary
								loading={loading}
								className='btn btn-primary btn-large '
								onClick={() => this.download(packageBooking.idx)}
							>
								Download ticket
							</Button>
						</span>
					)}
					{/* {packageBooking.inquiry.status == 'pending' && (
						<span
							className='btn btn-secondary btn-large ml-3'
							onClick={() => this.onConfirmPackageBooking(packageBooking.idx)}
						>
							confirm
						</span>
					)} */}

					{packageBooking.inquiry.status == 'verified' && (
						<td>
							<span>
								<span
									className='btn bg-none text-primary'
									onClick={() => this.onMarkComplete(packageBooking.idx)}
								>
									Mark As Complete
								</span>
							</span>
						</td>
					)}

					{/* <span
						className='btn bg-none text-danger'
						onClick={() => this.destroyPackageBooking(packageBooking.idx)}
					>
						Delete
					</span> */}
				</div>
			</div>
		);
	}
}

export default PackageBookingDetails;
