import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import history from '../../history';
import {deactivateCar, activateCar, showCar, deleteCar} from '../../api/carApi';

class CarDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
            car: {}
        };
	}

	componentDidMount() {
		this.fetchDetails();
    }

    fetchDetails() {
        showCar(this.props.match.params.idx)
        .then((response) => {
            this.setState({
                car: response.data
            });
        })
    }

	onCarActivate(id) {
		activateCar(id)
			.then((response) => {
				swal({
					title: 'Car Activation!',
					text: response.data.message,
					icon: 'success',
					button: 'Continue!'
				});
			})
			.catch((error) => {
				console.log('Car activation error', error);
			});
    }
    
    onCarDeactivate(id){
        deactivateCar(id)
			.then((response) => {
				swal({
					title: 'Car Deactivated!',
					text: response.data.message,
					icon: 'success',
					button: 'Continue!'
				});
			})
			.catch((error) => {
				console.log('Car deactivation error', error);
			});
    }

	destroyCar(id) {
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
				deleteCar(id).then((response) => {
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
		const {car} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<h5>Car Details</h5>
					<table className='table table-striped table-hover table-sm table-responsive' ref='main'>
						<thead>
							<tr>
                                <th>Idx</th>
                                <th>Car Type</th>
                                <th>Image</th>
                                <th>No of seats</th>
                                <th>Price</th>
                                <th>Details</th>
                                <th>Status</th>
                                <th>Created At</th>
                                {/* <th>Partner Name</th> */}
                                <th>Actions</th>
							</tr>
						</thead>
                        
						<tbody>
                            {car.idx != null &&(

							<tr>
								<td>{car.idx}</td>
								<td>{car.car_type} </td>
								<td>{car.image} </td>
								<td>{car.no_of_seats}</td>
								<td>{car.price}</td>
								<td>{car.details}</td>
								<td>{car.status}</td>
								<td>{car.created_at}</td>
								{/* <td>{car.partner.id}</td> */}
                                <td>
                                    <span>
                                        <Link
                                            to={{
                                                pathname: `/admin/car/${car.idx}/edit`,
                                                state: {
                                                    car: car
                                                }
                                            }}
                                        >
                                            <i className='fas fa-contact' />
                                            <span className='btn bg-none text-primary'>edit</span>
                                        </Link>
                                    </span>
                                </td>
								{car.status == 'inactive' &&
									<td>
										<span
											className='btn btn-secondary'
											onClick={() => this.onCarActivate(car.idx)}
										>
											activate
										</span>
									</td>
								} 

								{car.status == 'active'  &&
									<td>
										<span
											className='btn btn-secondary'
											onClick={() => this.onCarDeactivate(car.idx)}
										>
											deactivate
										</span>
									</td>
								}
								<td>
									<span
										className='btn bg-none text-danger'
										onClick={() => this.destroyCar(car.idx)}
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

export default CarDetails;
