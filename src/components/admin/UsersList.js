import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {DataTable} from '../shared';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import EditUserForm from '../users/EditUserForm';
import {getUsers, deleteUser} from '../../api/userApi';
import swal from 'sweetalert';
import history from '../../history';
import {Badge} from '../shared';

class UsersList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			editing: false,
			selectedUser: null
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchUsers();
	}

	fetchUsers = () => {
		getUsers()
			.then((response) => {
				// console.log('List of Users', response.data);
				this.setState({
					users: response.data
				});
			})
			.catch((error) => {
				// console.log(errors);
				this.setState({
					errors
				});
				console.log(' User fetch error', error);
			});
	};

	destroyUser(id) {
		// deleteUser(id)
		// 	.then((response) => {
		// 		swal({
		// 			title: 'User deleted!',
		// 			text: `this user is deleted`,
		// 			icon: 'success',
		// 			button: 'Continue!'
		// 		});
		// 		history.go();
		// 	})
		// 	.catch((error) => {
		// 		swal({
		// 			title: 'User Delete error',
		// 			text: 'Something went wrong. please try again or contact us',
		// 			icon: 'error',
		// 			button: 'Continue!'
		// 		});
		// 	});

		swal({
			title: 'Are you sure?',
			text: 'Once delete, your user will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteUser(id).then((response) => {
					swal('Your user has been deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Your user is not deleted yet');
			}
		});
	}

	render() {
		const {users} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<h3 className='title'>Users</h3>
					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Mobile Number</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{users.map((user) => {
								return (
									<tr>
										<td>{user.id}</td>
										<td>{user.name}</td>
										<td>{user.email} </td>
										<td>
											<Badge type={user.role}>{user.role}</Badge>{' '}
										</td>
										<td>{user.phone_number}</td>

										<td>
											<Link
												to={{
													pathname: '/users/edit',
													state: {
														user: user
													}
												}}
												className='btn bg-none text-primary'
											>
												Edit
											</Link>
											<Link
												to={{
													pathname: '/admin/email',
													state: {
														user: user
													}
												}}
												className='btn bg-none text-primary'
											>
												Contact
											</Link>
											<span
												className='btn bg-none text-danger'
												onClick={() => this.destroyUser(user.idx)}
											>
												Delete
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{/* <DataTable data={toTableData(users)} /> */}
			</div>
		);
	}
}
export default UsersList;
