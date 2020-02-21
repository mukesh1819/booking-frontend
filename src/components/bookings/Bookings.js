import React, { Component } from 'react';
import { getBookings } from '../../api/userApi';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { passCsrfToken } from '../../utils/helpers';
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
                console.log(response, 'response');
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

    componentWillUnmount() {
        $('.data-table-wrapper').find('table').DataTable().destroy(true);
    }

    setDataTable = (data) => {
        const columns = [{
                title: 'ID',
                width: 120,
                data: 'id'
            },
            {
                title: 'Created at',
                width: 180,
                data: 'date'
            },
            {
                title: 'Status',
                width: 180,
                data: 'status'
            },
            {
                title: 'Actions',
                width: 180,
                data: 'actions'
            }
        ];
        $(this.refs.main).DataTable({
            ordering: true,
            searching: true,
            paging: true
        });
    };

    render() {
        const { bookings } = this.state;
        console.log(this.state, 'state');
        if (this.state.bookings.length == 0) {
            return <EmptyContent>No bookings yet.</EmptyContent>;
        }
        return (
            <div className='card'>
				<div className='card-body'>
					<h5>Bookings</h5>
					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Created at</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{bookings.map(function(booking) {
								return (
									<tr>
										<td>{booking.id}</td>
										<td>{moment(booking.created_at, 'YYYYMMDD').fromNow()}</td>
										<td>
											<Badge type={booking.status} content={booking.status} />
										</td>
										<td>
											<span className="mr-4 btn">
												<Link to={{
												  pathname: '/ticket_details',
												  state: {
												    booking: booking
												  }
												}}>Ticket</Link>
											</span>

											<span className="btn">
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

export default Bookings;