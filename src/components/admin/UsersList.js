import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Tooltip from '../shared/Tooltip';
import axios from 'axios';
import { passCsrfToken } from '../../utils/helpers';
import EditUserForm from '../users/EditUserForm';
import { getUsers } from '../../api/userApi';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            editing: false,
            selectedUser: null
        }

    }

    componentDidMount() {
        passCsrfToken(document, axios);
        this.fetchUsers();
    }

    fetchUsers = () => {
        getUsers()
            .then((response) => {
                console.log(response.data);
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
							{this.state.users.map((user) => {
								return (
									<tr>
										<td>{user.id}</td>
										<td>{user.name}</td>
										<td>{user.email} </td>
										<td>{user.role.name}</td>
										<td>{user.phone_number}</td>
										
										<td>
											<Link to={{
											  pathname: '/users/edit',
											  state: {
											    user: user
											  }
											}}> Edit </Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
        );
    }
}
export default UsersList;