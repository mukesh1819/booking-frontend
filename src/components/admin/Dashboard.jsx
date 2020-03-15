import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Tooltip from '../shared/Tooltip';
import UsersList from './UsersList';
import {passCsrfToken} from '../../utils/helpers';
import axios from 'axios';
import {getAdminDashboard} from '../../api/flightApi';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: '',
			bookings: '',
			transactions: ''
		};
	}

	componentDidMount() {
		this.fetchAdminDetails();
	}

	fetchAdminDetails() {
		getAdminDashboard()
			.then((response) => {
				console.log(response.data);
				this.setState({
					users: response.data.users_count,
					bookings: response.data.bookings_count,
					transactions: response.data.transactions_count
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const {users, bookings, transactions} = this.state;
		return (
			<div className='dashboard container'>
				<div className='row'>
					<div className='widget col-sm-12 col-md-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>
									<span className='count'>{users}</span>
									<hr />
									<Link to='/admin/users_list' className='action'>
										View all Users
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className='widget col-sm-12 col-md-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>
									<span className='count'>{bookings}</span>
									<hr />
									<Link to='/admin/dashboard_bookings' className='action'>
										View all bookings
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className='widget col-sm-12 col-md-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>
									<span className='count'>{transactions}</span>
									<hr />
									<Link to='/admin/transaction_list' className='action'>
										View all transactions
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Dashboard;
