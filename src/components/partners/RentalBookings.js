import React, {Component, useState, useEffect} from 'react';
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

const BookingDetails = ({bookings}) => {
	return (
		<div className='list-view'>
			{bookings.map((carBooking) => (
				<div className='list'>
					<div className='label'>{carBooking.contact_name}</div>
					<div className='value'>{carBooking.mobile_no}</div>
					<div className='value'>{carBooking.contact_email}</div>
					<div className='value'>{carBooking.amount}</div>
					<div className='value'>{moment(carBooking.pickup_date).format('D MMMM, YYYY HH:mm:ss')}</div>
					<div className='value'>{carBooking.pickup_location}</div>
					<div className='value'>{moment(carBooking.drop_off_date).format('D MMMM, YYYY HH:mm:ss')}</div>
					<div className='value'>{carBooking.drop_off_location}</div>
					<div>
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
					</div>
				</div>
			))}
		</div>
	);
};

const RentalBookings = (props) => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		showPartner(props.currentUser.partner.idx)
			.then((response) => {
				setServices(response.data.car_bookings);
			})
			.catch((error) => console.log(' partner fetch error', error));
	}, []);

	return (
		<div className='container'>
			<Segment placeholder={services.length == 0}>
				<h3 className='ui header'>Car Bookings</h3>
				<BookingDetails bookings={services} />
			</Segment>
		</div>
	);
};

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RentalBookings);
