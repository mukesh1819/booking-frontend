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
		<div className='user-profile row  m-0'>
			<div className='col-12 p-0'>
				<Editable label='Name' value={user.name} onSubmit={(value) => update({name: value})} />
				<Editable label='Email' value={user.email} onSubmit={(value) => update({email: value})} />
				<Editable
					label='Mobile No'
					value={user.phone_number}
					onSubmit={(value) => updateUserDetails({phone_number: value})}
				/>
			</div>
		</div>
	);
};

export default UserDetailCard;
