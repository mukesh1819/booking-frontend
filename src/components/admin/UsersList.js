import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {DataTable} from '../shared';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import EditUserForm from '../users/EditUserForm';
import {getUsers} from '../../api/userApi';
import swal from 'sweetalert';

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
			.catch((errors) => {
				// console.log(errors);
				this.setState({
					errors
				});
				swal({
					title: 'User fetch error',
					text: 'could not able to fetch users. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	};

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
