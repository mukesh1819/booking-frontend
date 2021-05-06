import React, {Component, useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {Badge, Sidebar} from '../shared';
import PartnerProfile from './PartnerProfile';
import {getPartnerCarBookings} from '../../api/carBookingApi';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Segment} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import RentalServiceDetails from './RentalServiceDetails';

const RentalBookings = (props) => {
	const [services, setServices] = useState([]);
	const [viewDetails, setViewDetails] = useState(false);

	useEffect(() => {
		showPartner(props.currentUser.partner.idx)
			.then((response) => {
				setServices(response.data.car_bookings);
			})
			.catch((error) => console.log(' partner fetch error', error));
	}, []);

	return (
		<div className='container'>
			{!viewDetails && (
				<table className='ui celled unstackable table'>
					<thead>
						<tr>
							<th>Contact Name</th>
							<th>Booking Date</th>
							<th>Amount</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{services.map((carBooking) => (
							<tr>
								<td data-label='contact_name'>{carBooking.contact_name}</td>
								<td data-label='amount'>{moment(carBooking.pickup_date).format('D MMMM, YYYY')}</td>
								<td data-label='date'>{carBooking.partner_amount}</td>
								<td>
									<span
										onClick={() => setViewDetails(carBooking)}
										className='btn bg-none text-primary'
									>
										View
									</span>

									{carBooking.status == 'verified' && (
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
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{viewDetails && <RentalServiceDetails service={viewDetails} />}
		</div>
	);
};

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RentalBookings);
