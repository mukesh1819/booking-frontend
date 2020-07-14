import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {passCsrfToken, toTableData, pick} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar} from '../shared';
import PartnerProfile from './PartnerProfile';
import {getPartnerServices} from '../../api/partnerServiceApi';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

const Services = (props) => {
	const {service} = props;
	const packageInfo = service.extras.pick(['Package Name']);
	const contactInfo = service.extras.pick([
		'Head Person',
		'Email Address',
		'Address',
		'Nationality',
		'Number of Person',
		'Phone Number'
	]);
	const bookingInfo = service.extras.pick([
		'Invoice Number',
		'pickup_location',
		'drop_off_location',
		'meals_included',
		'start_date',
		'end_date',
		'pickup_date',
		'drop_off_date'
	]);
	const remarks = service.extras.pick(['remarks']);

	return (
		<div className='ui segment'>
			<h3 className='ui header'> {service.name} </h3>
			<div className='ui internally celled stackable grid'>
				<div className='row'>
					<div className='eight wide column'>
						<h3 className='ui header'> Package Info </h3>
						<div className='ui grid'>
							{Object.entries(packageInfo).map(([key, value]) => (
								<div className='row'>
									<div className='eight wide column'>{key.titleize()}:</div>
									<div className='eight wide column'>{value}</div>
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
						<h3 className='ui header'> Booking Info </h3>
						<div className='ui grid'>
							{Object.entries(bookingInfo).map(([key, value]) => (
								<div className='row'>
									<div className='eight wide column'>{key.titleize()}:</div>
									<div className='eight wide column'>{value}</div>
								</div>
							))}
						</div>
					</div>
					<div className='eight wide column'>
						<h3 className='ui header'> Remarks </h3>
						<div className='ui grid'>
							{Object.entries(remarks).map(([key, value]) => (
								<div className='row'>
									<div className='eight wide column'>{key.titleize()}:</div>
									<div className='eight wide column'>{value}</div>
								</div>
							))}
						</div>
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
