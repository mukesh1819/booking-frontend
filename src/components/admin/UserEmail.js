import React, {Component} from 'react';
import {Formik} from 'formik';
import {Form, TextArea} from 'semantic-ui-react';
import {sendUserEmail} from '../../api/userApi';
import swal from 'sweetalert';
import MailBox from '../shared/MailBox';

const UserEmail = (props) => {
	const {user} = props.location.state;
	return (
		<div>
			<div className='container'>
				<h5>User Information</h5>
				<table className='table table-striped table-hover table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Mobile Number</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email} </td>
							<td>{user.role}</td>
							<td>{user.phone_number}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='container mt-5 pt-5'>
				<div className='row'>
					<div className='offset-1 col-9'>
						<MailBox
							values={{
								description: '',
								subject: '',
								email: user.email
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default UserEmail;
