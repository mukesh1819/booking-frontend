import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import {getPackageBookingConfirmation} from '../../api/packageBookingApi';

class PackageBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}
    
    onConfirmPackageBooking(id){
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
                                    <span className='btn btn-secondary' onClick={() => this.onConfirmPackageBooking(packageBooking.idx)}>confirm</span>
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