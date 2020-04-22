import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import history from '../../history';
import {getPackageBookingConfirmation, deletePackageBooking} from '../../api/packageBookingApi';

class PackageBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	onConfirmPackageBooking(id) {
		getPackageBookingConfirmation(id)
			.then((response) => {
				swal({
					title: 'Package Booking Confirmation!',
					text: response.data.message,
					icon: 'success',
					button: 'Continue!'
				});
			})
			.catch((error) => {
				swal({
					title: 'Sorry!',
					text: error.response != null ? error.response.data.errors : 'sorry something went wrong',
					icon: 'error',
					button: 'Try Again!'
				});
			});
	}

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

	render() {
		const {packageBooking} = this.props.location.state;
		return (
			<div className='container'>
				<div className=''>
					<h5>Package Booking</h5>
					<table className='table table-striped table-hover table-sm table-responsive' ref='main'>
						<thead>
							<tr>
								<th>ID</th>
								<th>idx</th>
								<th>package_id</th>
								<th>user_id</th>
								<th>amount</th>
								<th>inquiry_id</th>
								<th>booking_transaction_id</th>
								<th>status</th>
								<th>start_date</th>
								<th>end_date</th>
								<th>pickup_date</th>
								<th>pickup_location</th>
								<th>drop_off_date</th>
								<th>drop_off_location</th>
								<th>meals_included</th>
								<th>remarks</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>{packageBooking.id}</td>
								<td>{packageBooking.idx}</td>
								<td>{packageBooking.package_id} </td>
								<td>{packageBooking.user_id} </td>
								<td>{packageBooking.amount}</td>
								<td>{packageBooking.inquiry_id}</td>
								<td>{packageBooking.booking_transaction_id}</td>
								<td>{packageBooking.status}</td>
								<td>{packageBooking.start_date}</td>
								<td>{packageBooking.end_date}</td>
								<td>{packageBooking.pickup_date}</td>
								<td>{packageBooking.pickup_location}</td>
								<td>{packageBooking.drop_off_date}</td>
								<td>{packageBooking.drop_off_location}</td>
								<td>{packageBooking.meals_included}</td>
								<td>{packageBooking.remarks}</td>
								<td>
									<span
										className='btn btn-secondary'
										onClick={() => this.onConfirmPackageBooking(packageBooking.idx)}
									>
										confirm
									</span>
								</td>
								<td>
									<span
										className='btn bg-none text-danger'
										onClick={() => this.destroyPackageBooking(packageBooking.idx)}
									>
										Delete
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default PackageBookingDetails;
