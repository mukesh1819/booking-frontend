import React, {Component} from 'react';
import {passCsrfToken} from '../../helpers';
import axios from 'axios';
import {getAdminBookings} from '../../api/flightApi';
import BookingDetails from './BookingDetails';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Pagination} from 'semantic-ui-react';
import moment from 'moment';
import {ifNotZero} from '../../helpers';
import {Badge} from '../shared';

class DashboardBookings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookings: [],
			currentPage: 1
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		this.setState({currentPage: activePage});
		this.fetchBookings(`page=${activePage}`);
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchBookings();
	}

	fetchBookings(params) {
		getAdminBookings(params)
			.then((response) => {
				// console.log(response);
				this.setState({
					bookings: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'Booking fetch error',
					text: 'Could not fetch booking. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	render() {
		const {bookings} = this.state;
		return (
			<div className='container'>
				<div className='row my-3'>
					<div className='col-7'>
						<button
							onClick={() => this.fetchBookings(`q[status_eq]=pending`)}
							className='btn btn-primary mr-1'
						>
							pending
						</button>

						<button
							onClick={() => this.fetchBookings(`q[status_eq]=verified`)}
							className='btn btn-primary mr-1'
						>
							verified
						</button>

						<button
							onClick={() => this.fetchBookings(`q[status_eq]=completed`)}
							className='btn btn-primary mr-1'
						>
							completed
						</button>

						<button
							onClick={() => this.fetchBookings(`q[status_eq]=processing`)}
							className='btn btn-primary mr-1'
						>
							processing
						</button>

						<button
							onClick={() => this.fetchBookings(`q[status_eq]=cancelled`)}
							className='btn btn-primary'
						>
							cancelled
						</button>
					</div>
					<div className='offset-3 col-2'>
						<Link to='/admin/cancel_requests' className='btn btn-danger'>
							Cancel Request
						</Link>
					</div>
				</div>
				<div>
					{bookings.map((booking) => {
						return <BookingDetails booking={booking} />;
					})}
				</div>

				<div className='text-center'>
					<Pagination
						activePage={this.state.currentPage}
						sizePerPage={5}
						onPageChange={this.changeCurrentPage}
						totalPages={this.state.bookings.length}
					/>
				</div>
			</div>
		);
	}
}
export default DashboardBookings;
