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
		passCsrfToken(document, axios);
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
			<div className='container mt-5'>
				<h5>Dashboard</h5>
				<div className='row'>
					<div className='col-sm-12 col-md-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>{users} </div>
								<Link to='/admin/users_list' className='d-flex justify-content-center pt-2 pb-2'>
									View all Users
								</Link>
							</div>
						</div>
					</div>

					<div className='col-sm-12 col-md-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>{bookings}</div>
								<Link to='/admin/dashboard_bookings' className='d-flex justify-content-center pt-2 pb-2'>
									View all bookings
								</Link>
								{/* <Link to=
								{{
									pathname:'/admin/dashboard_bookings',
									className='d-flex justify-content-center pt-2 pb-2',
									state:{
										bookings:
									}
								}}
								>View all bookings</Link> */}
							</div>
						</div>
					</div>

					<div className='col-sm-12 col-md-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>{transactions} </div>
								<Link to='/admin/transaction_list' className='d-flex justify-content-center pt-2 pb-2'>
									View all transactions
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Dashboard;
