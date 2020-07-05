import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import history from '../../history';
import {deactivateCar, activateCar, showCar, deleteCar} from '../../api/carApi';
import {Car} from '../rental';

class CarDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			car: {image: []}
		};
	}

	componentDidMount() {
		this.fetchDetails();
	}

	fetchDetails() {
		showCar(this.props.match.params.idx).then((response) => {
			this.setState({
				car: response.data
			});
		});
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
				history.push('/admin/cars');
			})
			.catch((error) => {
				console.log('Car activation error', error);
			});
	}

	onCarDeactivate(id) {
		deactivateCar(id)
			.then((response) => {
				swal({
					title: 'Car Deactivated!',
					text: response.data.message,
					icon: 'success',
					button: 'Continue!'
				});
				history.push('/admin/cars');
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
					history.push('/admin/cars');
				});
			} else {
				swal('Your Car is not deleted yet');
			}
		});
	}

	render() {
		const {car} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<h3 className='title'>Car Details</h3>
					<Car car={car} />
					<div className='text-center'>
						<span className='m-2'>
							<Link
								to={{
									pathname: `/admin/car/${car.idx}/edit`,
									state: {
										car: car
									}
								}}
							>
								<i className='fas fa-contact' />
								<span className='btn btn-primary'>edit</span>
							</Link>
						</span>
						{car.status == 'inactive' && (
							<span className='btn btn-success m-2' onClick={() => this.onCarActivate(car.idx)}>
								activate
							</span>
						)}

						{car.status == 'active' && (
							<span className='btn btn-outline-danger m-2' onClick={() => this.onCarDeactivate(car.idx)}>
								deactivate
							</span>
						)}

						<span className='btn btn-danger m-2' onClick={() => this.destroyCar(car.idx)}>
							Delete
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default CarDetails;
