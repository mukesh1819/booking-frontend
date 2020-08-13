import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {passCsrfToken, toTableData, pick} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar} from '../shared';
import PartnerProfile from './PartnerProfile';
import {getPartnerServices} from '../../api/partnerServiceApi';
import moment from 'moment';

const Services = (props) => {
	const {service} = props;

	// idx: "0c27bcbee122e0f30791"
	// is_visible: false
	// partner_amount: null
	// status: "processing"

	const bookingInfo = pick(service, ['pickup_location', 'drop_off_location', 'flight_no']);
	const bookingDateInfo = pick(service, ['pickup_date', 'drop_off_date', 'flight_date']);

	const contactInfo = pick(service, ['contact_name', 'mobile_no', 'contact_email']);

	const driverInfo = pick(service, ['driver_name', 'driver_contact', 'car_number', 'car_color']);

	const remarks = pick(service, ['partner_remarks']);

	return (
		<div className='ui segment'>
			<h3 className='ui header'> {service.name} </h3>
			<div className='ui internally celled stackable grid'>
				<div className='row'>
					<div className='eight wide column'>
						<h3 className='ui header'> Booking Info </h3>
						<div className='ui grid'>
							{Object.entries(bookingInfo).map(([key, value]) => (
								<div className='row'>
									<div className='eight wide column'>{key.titleize()}:</div>
									<div className='eight wide column'>{value}</div>
								</div>
							))}
							{Object.entries(bookingDateInfo).map(([key, value]) => (
								<div className='row'>
									<div className='eight wide column'>{key.titleize()}:</div>
									<div className='eight wide column'>{moment(value).format('D MMMM, YYYY')}</div>
								</div>
							))}
						</div>
					</div>
					<div className='eight wide column'>
						<h3 className='ui header'> Contact Info </h3>
						<div className='ui grid'>
							{Object.entries(contactInfo).map(([key, value]) => (
								<div className='row'>
									<div className='eight wide column'>{key.titleize()}:</div>
									<div className='eight wide column'>{value}</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='eight wide column'>
						<h3 className='ui header'> Driver Info </h3>
						<div className='ui grid'>
							{Object.entries(driverInfo).map(([key, value]) => (
								<div className='row'>
									<div className='eight wide column'>{key.titleize()}:</div>
									<div className='eight wide column'>{value}</div>
								</div>
							))}
						</div>
					</div>
					<div className='eight wide column'>
						{service.partner_remarks.map((i) => {
							return (
								<div>
									<div className='text-bold'>{i.remark}</div>
									<div className='text-small'>{moment(i.date).format('D MMMM, YYYY hh:mm')}</div>
									<br />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
