import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {Badge, Sidebar} from '../shared';
import PartnerProfile from './PartnerProfile';
import {getPartnerCarBookings} from '../../api/carBookingApi';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

const Services = (props) => {
	const {carBookings} = props;
	return (
		<div className='container'>
		{carBookings.length > 0 &&
			<div className='card'>
				<div className='card-body'>
					<div className='row'>
						<div className='col-12 col-md-8 offset-md-2'>
							<h3 className='title'>Car Bookings</h3>
							<div className='list-view'>
								{carBookings.map((carBooking) => (
									<div className='list'>
										<div className='label'>{carBooking.contact_name}</div>
										<div className='value'>{carBooking.mobile_no}</div>
										<div className='value'>{carBooking.contact_email}</div>
										<div className='value'>{carBooking.amount}</div>
										<div className='value'>{carBooking.pickup_date}</div>
										<div className='value'>{carBooking.pickup_location}</div>
										<div className='value'>{carBooking.drop_off_date}</div>
										<div className='value'>{carBooking.drop_off_location}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			}
		</div>
	);
}

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
