import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Tooltip from '../shared/Tooltip';
import UsersList from './UsersList';
import {passCsrfToken} from '../../utils/helpers';
import axios from 'axios';
import {getAdminDashboard} from '../../api/flightApi';

class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state= {
			users:'',
			bookings:'',
			transactions:''
		};
	}

	componentDidMount(){
		passCsrfToken(document, axios);
		this.fetchAdminDetails();

	}

	fetchAdminDetails(){
		getAdminDashboard()
		.then((response) => {
			debugger;
			console.log(response.data);
			this.setState({
				users: response.data.users_count,
				bookings: response.data.bookings_count,
				transactions: response.data.transactions_count
			})
		})
		.catch((error) => {
			console.log(error);
		})
	}
	render(){
		return (
			<div className='container mt-5'>
				{/* <div className='card'>
					<div className='card-body'> Dashboard </div> <UsersList />
				</div>{' '} */}
				<div className='row'>
					<div className='col-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>{this.state.users} </div>
								<Link to='/admin/users_list' className='d-flex justify-content-center pt-2 pb-2'>View all Users</Link> 
							</div>
						</div>
					</div>

					<div className='col-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>{this.state.bookings}</div>
								<Link to='/admin' className='d-flex justify-content-center pt-2 pb-2'>View all bookings</Link>
								{/* <Link to=
								{{
									pathname:'/admin/booking_details',
									className='d-flex justify-content-center pt-2 pb-2',
									state:{
										bookings:
									}
								}}
								>Booking List</Link> */}
							</div>
						</div>
					</div>
					
					<div className='col-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>{this.state.transactions} </div>
								<Link to='/' className='d-flex justify-content-center pt-2 pb-2'>View all transactions</Link> 
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}

};
export default Dashboard;
