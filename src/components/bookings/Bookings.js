import React, {Component} from 'react';
import {getBookings} from '../../api/userApi';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {passCsrfToken} from '../../utils/helpers';
import moment from 'moment';
import EmptyContent from '../EmptyContent';
import Badge from '../shared/Badge';

class Bookings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bookings: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		getBookings()
			.then((response) => {
				debugger;
				console.log(response, 'booking response');
				console.log('Bookings List', response);
				this.setState({
					bookings: response.data
				});
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					error
				});
			});
	}

	componentWillUnmount() {}

	render() {
		const {bookings} = this.state;
		if (this.state.bookings.length == 0) {
			return <EmptyContent>No bookings yet.</EmptyContent>;
		}
		return (
			<div className='booking-list card'>
				<div className='card-body'>
					<h5>Bookings</h5>
					{bookings.map(function(booking) {
						return (
							<div className='booking d-flex'>
								<div className='mr-auto'>
									<span> {booking.ruid}</span>
									<div>
										<span className='text-small text-muted'>
											{moment(booking.created_at, 'YYYYMMDD').fromNow()}
										</span>
										<span>
											<Badge type={booking.status} content={booking.status} />
										</span>
									</div>
								</div>
								<span>
									<span className='btn'>
										<Link
											to={{
												pathname: `/ticket/${booking.ruid}`,
												state: {
													booking: booking
												}
											}}
										>
											Ticket
										</Link>
									</span>

									<span className='btn'>
										<Link
											to={{
												pathname: '/booking_details',
												state: {
													booking: booking
												}
											}}
										>
											Edit
										</Link>
									</span>
								</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Bookings;
