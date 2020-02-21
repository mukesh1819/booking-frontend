import React, { Component } from 'react';
import { getAdminBookings } from '../../api/flightApi';
import { passCsrfToken } from '../../utils/helpers';
import axios from 'axios';
import { cancelAdminTicket } from '../../api/flightApi';
import { ignoreAdminTicket } from '../../api/flightApi';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';

class UpdateBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: []
        };
    }

    componentDidMount() {
        debugger;
        passCsrfToken(document, axios);
        this.fetchBookings();
    }

    fetchBookings() {
        getAdminBookings()
            .then((response) => {
                console.log(response);
                this.setState({
                    bookings: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    adminCancelRequest(passenger_id) {
        cancelAdminTicket(passenger_id)
            .then((response) => {
                console.log(repsonse);
                swal({
                    title: 'Tickets cancellation!',
                    text: 'Your ticket is cancelled',
                    icon: 'success',
                    button: 'Continue!'
                });
            })
            .catch((error) => {
                console.log(error);
                swal({
                    title: 'Tickets cancellation!',
                    text: error.message,
                    icon: 'error',
                    button: 'Continue!'
                });
            });

    }

    adminIgnoreRequest(passenger_id) {
        ignoreAdminTicket(passenger_id)
            .then((response) => {
                console.log(repsonse);
                swal({
                    title: 'Tickets Ignored!',
                    text: 'Your ticket is ignored and can continue happy flying',
                    icon: 'success',
                    button: 'Continue!'
                });
                history.push('/booking_list');

            })
            .catch((error) => {
                console.log(error);
                swal({
                    title: 'Tickets cancellation!',
                    text: error.message,
                    icon: 'error',
                    button: 'Continue!'
                });
            });
    }

    render() {

        return (
            <React.Fragment>
            {this.state.bookings !== null && (
            	<div className="container-fluid">
					<div className="col-md-9 ml-auto mr-auto" id="search-form1">
				      <h3 className="text-success">Cancel Request</h3>
				      <table className="table table-striped table-sm">
				        <thead>
				          <tr>
				            <th>Passenger Name</th>
				            <th>Nationality</th>
				            <th>Passenger Type</th>
				            <th>Ticket No</th>
				            <th>Cancel status</th>
				          </tr>
				        </thead>
				        <tbody>
				        	
				          		{bookings.map((booking) => {
						          	booking.passenger.map((passenger) => {
						          		<tr>
					          			<td>{  passenger.title + " " + passenger.first_name}</td>
						                <td>{ passenger.nationality }</td>
						                <td>{ passenger.passenger_type }</td>
						                <td>{ passenger.ticket_no }</td>
						                <td>{ passenger.passenger_status }</td>
						                { passenger.passenger_status !== 'cancelled' && (

						                	<td><span className="btn btn-lg btn-danger d-flex align-items-end" onClick={() => this.adminCancelRequest(passenger.id)}>cancel</span>
						                	<span className="btn btn-lg d-flex align-items-end btn-secondary" onClick={() => this.adminIgnoreRequest(passenger.id)}>ignore</span></td>
						                )}
						                  
						                {passenger.passenger_status === 'cancelled' && <td><p className="text-danger text-center font-weight-bolder text-lg mt-2"> Ticket Cancelled </p></td> }
						                </tr>
						          	})	
					          	})}
			              	
				        </tbody>
				      </table>
				    </div>
				</div>

        	)}
				
			</React.Fragment>
        );
    }
}

export default UpdateBooking;