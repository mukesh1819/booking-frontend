import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Editable from '../shared/Editable';
import {updateUserDetails} from '../../api/userApi';

function update(details) {
	updateUserDetails(details)
		.then(function(response) {
			console.log(response.data);
		})
		.catch(function(error) {
			console.log(error);
		});
}

const UserDetailCard = (props) => {
	const {user} = props;
	return (
		<div className='user-profile row'>
			<div className='col-12 p-0'>
				<Editable label='Name' value={user.name} onSubmit={(value) => update({id: user.id, name: value})} />
				<Editable label='Email' value={user.email} onSubmit={(value) => update({id: user.id, email: value})} />
				<Editable
					label='Mobile No'
					value={user.phone_number}
					onSubmit={(value) => updateUserDetails({id: user.id, phone_number: value})}
				/>
				<Editable
					label='Currency'
					value={user.currency}
					onSubmit={(value) => updateUserDetails({id: user.id, currency: value})}
				/>
				<Editable
					label='Nationality'
					value={user.country}
					onSubmit={(value) => updateUserDetails({id: user.id, country_id: value})}
				/>
			</div>
		</div>
	);
};

export default UserDetailCard;
