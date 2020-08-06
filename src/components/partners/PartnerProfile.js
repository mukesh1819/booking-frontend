import React, {Component, useState} from 'react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar, Editable} from '../shared';
import {updateUserDetails, resendConfirmationCode} from '../../api/userApi';
import {updatePartnerDetails} from '../../api/partnerApi';
import ModalExample from '../shared/Modal';
import ChangePasswordForm from '../users/ChangePasswordForm';
import {Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';


// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };
const update = (id, value, loading, setLoading) => {
	setLoading(loading => true)

	updatePartnerDetails(id, value)
			.then((response) => {
				// console.log('details', response.data);
				swal({
					title: 'User Updated!',
					text: 'User updated successfully',
					icon: 'success',
					button: 'Continue!'
				}).then(function() {
					location.reload();
				});
				
				setLoading(loading => false)

			})
			.catch((error) => {
				console.log(' user update error', error);
			});

}

const updatePassword = (id, details, loading, setLoading) => {
	setLoading(loading => true)
	updateUserDetails(id, details)
		.then((response) => {
			// console.log('details', response.data);
			swal({
				title: 'User Updated!',
				text: 'User updated successfully',
				icon: 'success',
				button: 'Continue!'
			}).then(function() {
				location.reload();debugger;
			});
			setLoading(loading => false)

		})
		.catch((error) => {
			// console.log(error);
			console.log(' user update error', error);
		});
}



export const PersonalProfile = (props) => {
	const [editMode, setEditMode] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const {partner, user} = props;
	var canEdit = true;
	const togglePasswordModal = ()	=> {
	setChangePassword(changePassword => !changePassword)
	}
	if(user && user.role==='Admin'){
		canEdit = false
	}
	return (
		<Segment loading={partner.id == undefined || loading}>
			<div className='ui header'>Personal Details</div>
			{/* <div className='text-center'>
				<i className='ui huge user icon' />
				<h3 className='ui header'>
					{partner.first_name}&nbsp;
					{partner.last_name}
				</h3>
			</div> */}
			<div className='list-view'>
				<Editable edit={editMode} canEdit={canEdit} label='First Name' value={partner.first_name} onSubmit={(value) => update(partner.idx, {first_name: value}, loading, setLoading)} />
				<Editable edit={editMode} canEdit={canEdit} label='Last Name' value={partner.last_name} onSubmit={(value) => update(partner.idx, {last_name: value}, loading, setLoading)} />
				<Editable edit={editMode} canEdit={canEdit} label='Contact' value={partner.contact_number} onSubmit={(value) => update(partner.idx, {contact_number: value}, loading, setLoading)} />
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
			{canEdit &&
				<div className='ui button basic' onClick={togglePasswordModal}>Change password</div>
			}
			<div>
				<ModalExample
					title='Change Password'
					show={changePassword}
					toggle={togglePasswordModal}
					// onSuccess={(value) => updatePassword(partner.user.id, value)}
				>
				{changePassword && (
					<ChangePasswordForm
						onChange={(value) => {
							updatePassword(partner.user.id, value, loading, setLoading);
							togglePasswordModal();
						}}
					/>
				)}
				</ModalExample>

			</div>
			
		</Segment>
	);
};

export const CompanyProfile = (props) => {
	const {partner, user} = props;
	const [loading, setLoading] = useState(false);
	var canEdit = true;
	if(user && user.role==='Admin'){
		canEdit = false
	}
	return (
		<Segment loading={partner.id == undefined || loading}>
			<div className='ui header'>Company Details</div>
			<div className='list-view'>
				<Editable label='Name' canEdit={canEdit} value={partner.company_name} onSubmit={(value) => update(partner.idx, {company_name: value}, loading, setLoading)} />
				<Editable label='Email' canEdit={canEdit} value={partner.company_email} onSubmit={(value) => update(partner.idx, {company_email: value}, loading, setLoading)} />
				<Editable label='Contact' canEdit={canEdit} value={partner.company_contact_number} onSubmit={(value) => update(partner.idx, {company_contact_number: value}, loading, setLoading)} />
				<Editable label='Address' canEdit={canEdit} value={partner.company_address} onSubmit={(value) => update(partner.idx, {company_address: value}, loading, setLoading)} />
				<Editable label='Website' canEdit={canEdit} value={partner.website} onSubmit={(value) => update(partner.idx, {website: value}, loading, setLoading)} />

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
		</Segment>
	);
};



const PartnerProfile = (props) => {
	return (
		<div className='ui internally celled stackable grid'>
			<div className='row'>
				<div className='eight wide column'>
					<PersonalProfile {...props} />
				</div>

				<div className='eight wide column'>
					<CompanyProfile {...props} />
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({userStore}) => ({
	user: userStore.currentUser
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerProfile);

{/* <SocialButtonLinks /> */}

