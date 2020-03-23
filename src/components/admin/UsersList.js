import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {DataTable} from '../shared';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers/helpers';
import EditUserForm from '../users/EditUserForm';
import {getUsers} from '../../api/userApi';

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
				console.log('List of Users', response.data);
				this.setState({
					users: response.data
				});
			})
			.catch((errors) => {
				console.log(errors);
				this.setState({
					errors
				});
			});
	};

	render() {
		const {users} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<h5>Users</h5>
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
										<td>{user.role}</td>
										<td>{user.phone_number}</td>

										<td>
											<Link
												to={{
													pathname: '/users/edit',
													state: {
														user: user
													}
												}}
											>
												{' '}
												Edit{' '}
											</Link>
										</td>

										<td>
											<Link
												to={{
													pathname: '/admin/email',
													state: {
														user: user
													}
												}}
											>
												Contact
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<DataTable data={toTableData(users)} />
			</div>
		);
	}
}
export default UsersList;
