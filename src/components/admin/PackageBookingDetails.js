import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import history from '../../history';
import {getPackageBookingConfirmation, deletePackageBooking, markComplete} from '../../api/packageBookingApi';
import {fetchTicket} from '../../api/flightApi';
import {downloadTicket} from '../../helpers';
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

	render() {
		const {packageBooking} = this.props.location.state;
		const {loading} = this.state;
		return (
			<div className='container'>
				<Card fluid>
					<Card.Content>
						<div className='row'>
							<div className='col-12 col-md-4 text-center'>
								<i className='huge icon book' />
								<h3 className='ui header'>{packageBooking.idx}</h3>
								<Badge type={packageBooking.status}>{packageBooking.status}</Badge>
							</div>
							<div className='col-12 col-md-8'>
								<div className='list-view'>
									<h3 className='title'>Booking Details</h3>
									<div className='list'>
										<span className='label'>Pickup Date</span>
										<span className='value'>
											{moment(packageBooking.pickup_date).format('D MMMM, YYYY')}
										</span>
									</div>
									<div className='list'>
										<span className='label'>Pickup Location</span>
										<span className='value'>{packageBooking.pickup_location}</span>
									</div>
									<div className='list'>
										<span className='label'>Drop off Date</span>
										<span className='value'>
											{moment(packageBooking.drop_off_date).format('D MMMM, YYYY')}
										</span>
									</div>
									<div className='list'>
										<span className='label'>Drop off Location</span>
										<span className='value'>{packageBooking.drop_off_location}</span>
									</div>
									<div className='list'>
										<span className='label'>Meals</span>
										<span className='value'>{`${packageBooking.meals_included}`}</span>
									</div>
									<div className='list'>
										<span className='label'>Start Date</span>
										<span className='value'>
											{moment(packageBooking.start_date).format('D MMMM, YYYY')}
										</span>
									</div>
								</div>
								<div>Remarks: {packageBooking.remarks}</div>
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
