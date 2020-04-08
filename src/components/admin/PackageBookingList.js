import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getPackageBookings} from '../../api/packageBookingApi';
import swal from 'sweetalert';

class PackageBookingList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			packageBookings: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchPackageBookings();
	}

	fetchPackageBookings = () => {
		getPackageBookings()
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					packageBookings: response.data
				});
			})
			.catch((errors) => {
				// console.log('Fetch Package Error', errors);
				swal({
					title: 'PackageBookings fetch error',
					text: 'could not able to fetch PackageBookings. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	};
    
	render() {
        const {packageBookings} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<div className='col-12 d-flex justify-content-between'>
						<h5>Package Booking List</h5>
					</div>

					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>ID</th>
								<th>IDX</th>
								<th>package ID</th>
								<th>User ID</th>
								<th>Amount</th>
								<th>Inquiry ID</th>
								<th>Booking Transaction ID</th>
								<th>Status</th>
								<th>Start Date</th>
								<th>End Date</th>
								<th>Pickup Date</th>
								<th>Pickup Location</th>
								<th>Drop off Date</th>
								<th>Drop off Location</th>
								<th>Meals Included</th>
								<th>Remarks</th>
								<th>Actions</th>

							</tr>
						</thead>

						<tbody>
							{packageBookings.map((packageBooking) => {
                                if (packageBooking.status === 'processing'){ 
                                    return (
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
                                                <Link
                                                    to={{
                                                        pathname: `/admin/package_booking_details/${packageBooking.id}`,
                                                        state: {
                                                            packageBooking: packageBooking
                                                        }
                                                    }}
                                                >
                                                    <i className='fas fa-contact' />
                                                    <span className='px-1'>view</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
export default PackageBookingList;

