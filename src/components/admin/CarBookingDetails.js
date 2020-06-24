import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import history from '../../history';
import {getCarBookingConfirmation, declineCarBooking, deleteCarBooking, showUserCarBooking} from '../../api/carBookingApi';

class CarBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
            carBooking: {}
        };
	}

	componentDidMount() {
		this.fetchDetails();
    }

    fetchDetails() {
        showUserCarBooking(this.props.match.params.idx)
        .then((response) => {
            this.setState({
                carBooking: response.data
            });
        })
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
			})
			.catch((error) => {
				console.log('Car booking confirmation error', error);
			});
    }
	
    onDeclineCarBooking(id){
        declineCarBooking(id)
			.then((response) => {
				swal({
					title: 'Car Booking Rejection!',
					text: response.data.message,
					icon: 'success',
					button: 'Continue!'
				});
			})
			.catch((error) => {
				console.log('Car booking Rejection error', error);
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
		const {carBooking} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<h5>Car Booking</h5>
					<table className='table table-striped table-hover table-sm table-responsive' ref='main'>
						<thead>
							<tr>
								<th>idx</th>
								<th>Name</th>
								<th>Email</th>
								<th>Mobile Number</th>
                                <th>Car Type</th>
								<th>Amount</th>
								<th>booking_transaction_id</th>
								<th>Status</th>
								<th>Pickup Date</th>
								<th>Pickup Location</th>
								<th>Drop Off Date</th>
								<th>Drop Off location</th>
								<th>Remarks</th>
								<th>Actions</th>
							</tr>
						</thead>
                        
						<tbody>
                            {carBooking.idx != null &&(

							<tr>
								<td>{carBooking.idx}</td>
								<td>{carBooking.contact_name} </td>
								<td>{carBooking.contact_email} </td>
								<td>{carBooking.mobile_no}</td>
								<td>{carBooking.car_inquiry.car_type}</td>
								<td>{carBooking.amount}</td>
								<td>{carBooking.booking_transaction_id}</td>
								<td>{carBooking.status}</td>
								<td>{carBooking.pickup_date}</td>
								<td>{carBooking.pickup_location}</td>
								<td>{carBooking.drop_off_date}</td>
								<td>{carBooking.drop_off_location}</td>
								<td>{carBooking.remarks}</td>
                                <td>
                                    <span>
                                        <Link
                                            to={{
                                                pathname: `/car_bookings/${carBooking.idx}/edit`,
                                                state: {
                                                    carBooking: carBooking
                                                }
                                            }}
                                        >
                                            <i className='fas fa-contact' />
                                            <span className='btn bg-none text-primary'>edit</span>
                                        </Link>
                                    </span>
                                </td>
								{(carBooking.status == 'pending' || carBooking.status == 'declined') &&
									<td>
										<span
											className='btn btn-secondary'
											onClick={() => this.onConfirmCarBooking(carBooking.idx)}
										>
											confirm
										</span>
									</td>
								} 

								{(carBooking.status == 'pending' || carBooking.status == 'processing') &&
									<td>
										<span
											className='btn btn-secondary'
											onClick={() => this.onDeclineCarBooking(carBooking.idx)}
										>
											decline
										</span>
									</td>
								}

								{(carBooking.status == 'processing') &&
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
								} 

								<td>
									<span
										className='btn bg-none text-danger'
										onClick={() => this.destroyCarBooking(carBooking.idx)}
									>
										Delete
									</span>
								</td>
							</tr>
                            )}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default CarBookingDetails;
