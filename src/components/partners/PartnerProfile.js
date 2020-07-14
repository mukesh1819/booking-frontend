import React, {Component} from 'react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar} from '../shared';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

export const PersonalProfile = (props) => {
	const {partner} = props;
	return (
		<div className=''>
			<div className='ui header'>Personal Details</div>
			<i className='ui huge user icon' />
			<h2 className='ui sub header'>
				{partner.first_name}&nbsp;
				{partner.last_name}
			</h2>
			<div className='text-small text-muted'>
				<i className='fas fa-envelope' />&nbsp;
				{partner.email}
			</div>
			<div className='text-small text-muted'>
				<i className='fas fa-address-card' />&nbsp;
				{partner.address}
			</div>
			<div className='text-small text-muted'>
				<i className='fas fa-phone-volume' />&nbsp;
				{partner.contact_number}
			</div>
			<div className=''>
				<Badge type={partner.status}>{partner.status}</Badge>
			</div>
			{/* <div className='col-12 col-md-6 list-view'>
								<div className='list'>
									<span className='label'>First Name</span>
									<span className='value'>{partner.first_name}</span>
								</div>
								<div className='list'>
									<span className='label'>Last Name</span>
									<span className='value'>{partner.last_name}</span>
								</div>
								<div className='list'>
									<span className='label'>Email</span>
									<span className='value'> {partner.email}</span>
								</div>
								<div className='list'>
									<span className='label'>Address</span>
									<span className='value'> </span>
								</div>
								<div className='list'>
									<span className='label'>Contact</span>
									<span className='value'>{partner.contact_number}</span>
								</div>
								<div className='list'>
									<span className='label'>Status</span>
									<span className='value'>
										<Badge type={partner.status}>{partner.status}</Badge>
									</span>
								</div>
							</div> */}
		</div>
	);
};

export const CompanyProfile = (props) => {
	const {partner} = props;
	return (
		<div className=''>
			<div className='ui header'>Company Details</div>
			<div className='list-view'>
				<div className='list'>
					<span className='label'>Name</span>
					<span className='value'>{partner.company_name}</span>
				</div>
				<div className='list'>
					<span className='label'>Email</span>
					<span className='value'>{partner.company_email}</span>
				</div>
				<div className='list'>
					<span className='label'>Contact</span>
					<span className='value'>{partner.company_contact_number}</span>
				</div>
				<div className='list'>
					<span className='label'>Address</span>
					<span className='value'> {partner.company_address}</span>
				</div>
				<div className='list'>
					<span className='label'>Website</span>
					<span className='value'>{partner.website}</span>
				</div>
			</div>
		</div>
	);
};

export const PartnerProfile = (props) => {
	const {partner} = props;
	return (
		<div className='ui internally celled stackable grid'>
			<div className='row'>
				<div className='eight wide column'>
					<PersonalProfile partner={partner} />
				</div>

				<div className='eight wide column'>
					<CompanyProfile partner={partner} />
				</div>
			</div>
		</div>
	);
};
