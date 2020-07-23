import React, {Component, useState} from 'react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar, Editable} from '../shared';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

export const PersonalProfile = (props) => {
	const [editMode, setEditMode] = useState(false);
	const {partner} = props;
	return (
		<div className=''>
			<div className='ui header'>Personal Details</div>
			{/* <div className='text-center'>
				<i className='ui huge user icon' />
				<h3 className='ui header'>
					{partner.first_name}&nbsp;
					{partner.last_name}
				</h3>
			</div> */}
			<div className='list-view'>
				<Editable edit={editMode} label='First Name' value={partner.first_name} onSubmit={(value) => {}} />
				<Editable edit={editMode} label='Last Name' value={partner.last_name} onSubmit={(value) => {}} />
				<Editable edit={editMode} label='Contact' value={partner.contact_number} onSubmit={(value) => {}} />
				<div className='list'>
					<span className='label'>Email</span>
					<span className='value'> {partner.email}</span>
				</div>
				<div className='list'>
					<span className='label'>Status</span>
					<span className='value'>
						<Badge type={partner.status}>{partner.status}</Badge>
					</span>
				</div>
			</div>
			<div className='ui button basic'>Change password</div>
		</div>
	);
};

export const CompanyProfile = (props) => {
	const {partner} = props;
	return (
		<div className=''>
			<div className='ui header'>Company Details</div>
			<div className='list-view'>
				<Editable label='Name' value={partner.company_name} onSubmit={(value) => {}} />
				<Editable label='Email' value={partner.company_email} onSubmit={(value) => {}} />
				<Editable label='Contact' value={partner.company_contact_number} onSubmit={(value) => {}} />
				<Editable label='Address' value={partner.company_address} onSubmit={(value) => {}} />
				<Editable label='Website' value={partner.website} onSubmit={(value) => {}} />

				{/* <div className='list'>
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
				</div> */}
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
