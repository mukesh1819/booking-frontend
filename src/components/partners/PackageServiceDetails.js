import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {passCsrfToken, toTableData, pick} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar, RemarksForm} from '../shared';
import PartnerProfile from './PartnerProfile';
import {getPartnerServices, getPartnerServiceDetails} from '../../api/partnerServiceApi';
import moment from 'moment';
import {set_package_remarks} from '../../api/partnerServiceApi';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

const Services = (props) => {
	var [partnerService, setPartnerService] = useState({});
	var {service} = props;
	var idx = service != null ? service.idx : props.match.params.idx;
	useEffect(
		() => {
			getPartnerServiceDetails(idx).then((v) => {
				setPartnerService(v.data);
			});
		},
		[service]
	);

	if(service == null){
		service = partnerService;
	}
	const packageInfo = pick(service.extras, ['Package Name']);
	const addonInfo = pick(service.extras, ['addons']);
	const contactInfo = pick(service.extras, [
		'Head Person',
		'Email Address',
		'Address',
		'Nationality',
		'Number of Person',
		'Phone Number'
	]);

	const bookingInfo = pick(service.extras, [
		'Invoice Number',
		'pickup_location',
		'drop_off_location',
		'meals_included'
	]);

	const bookingDateInfo = pick(service.extras, ['start_date', 'end_date', 'pickup_date', 'drop_off_date']);

	const remarks = pick(service.extras, ['remarks']);

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
							{addonInfo.addons !== undefined && (
								<Fragment>
									<h3 className='ui header'>Addons</h3>
									{(JSON.parse(addonInfo.addons) || []).map((addon) => (
										<div className='row'>
											<div className='eight wide column'>{addon.name}</div>
											<div className='eight wide column'>{addon.count}</div>
										</div>
									))}
								</Fragment>
							)}
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
							{Object.entries(bookingDateInfo).map(([key, value]) => (
								<div className='row'>
									<div className='eight wide column'>{key.titleize()}:</div>
									<div className='eight wide column'>{moment(value).format('D MMMM, YYYY')}</div>
								</div>
							))}
						</div>
					</div>
					<div className='eight wide column'>
						<div className='ui grid'>
							<div className='row'>
								<div className='column'>
									<RemarksForm
										remarks={partnerService.remarks}
										onSubmit={(value) => {
											set_package_remarks(partnerService.idx, {
												partner_remarks: value
											}).then((v) => {
											});
										}}
									/>
								</div>
							</div>
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
