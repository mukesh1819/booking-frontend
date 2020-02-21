import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cancelUserTickets } from '../../api/flightApi';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';

class BookingDetails extends Component {

    cancelUserRequest(passengers) {
        cancelUserTickets(passengers)
            .then((repsonse) => {
                console.log(repsonse);
                swal({
                    title: 'Tickets cancellation!',
                    text: 'Your ticket cancellation is in process',
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
        const { booking } = this.props.location.state;
        return (
            <React.Fragment>
    <div className="container-fluid">
        <h3 className="text-center text-success">Tickets Details</h3>

        <div className="row">
            <div className="col-6">
                <h5 className="d-inline booking-text">Transaction Invoice No -<span>{booking.booking_transaction.idx}</span></h5>
            </div>
        </div>

        <div className="row">
            <div className="col-6">
                <h5 className="d-inline booking-text">Transaction Date -<span>{booking.booking_transaction.created_at}</span></h5>
            </div>
        </div>

        <div className="col-md-6 ml-auto mr-auto" id="search-form">
            <div className="row">
                <div className="col-6">
                    <h5 className="d-inline booking-text">Outbound PNR No -<span>{booking.pnr_no}</span></h5>
                </div>

                <div className="col-6 d-flex justify-content-end">
                    <h5 className="d-inline booking-text">Refundable -
                        {booking.refundable &&  <span>"Yes"</span>} 
                        {!booking.refundable && <span> "No" </span>}
                    </h5>
                </div>

            </div>
            <table className="table table-bg table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Passenger Name</th>
                        <th>Nationality</th>
                        <th>Passenger Type</th>
                        <th>Ticket No</th>
                        <th>Cancel ticket</th>
                    </tr>
                </thead>

                <tbody>
                    {booking.passengers.map((passenger) => {
                        return(
                            <tr>
                                <td> {passenger.title + " " + passenger.first_name } </td>
                                <td> {passenger.nationality} </td>
                                <td> {passenger.passenger_type} </td>
                                <td> {passenger.ticket_no} </td>
                                { passenger.passenger_status === 'verified' && <td><span className="btn btn-danger d-flex align-items-end" onClick={() => this.cancelUserRequest([passenger])}>Cancel tickets</span></td> }
                                { passenger.passenger_status !== 'verified' && <td> {passenger.passenger_status} </td>}
                            </tr>
                        );

                    })}
                </tbody>
            </table>

        </div>

        <div className="col-md-6 ml-auto mr-auto" id="search-form1">
            <h1 className="text-center booking-text">Booking Details</h1>
            <table className="table table-bg table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Sector</th>
                        <th>Flight No</th>
                        <th>Flight Time</th>
                        <th>Class</th>
                        <th>Flight Charge</th>
                        <th>Cancel all tickets </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{booking.sector}</td>
                        <td>{booking.flight_no}</td>
                        <td>{booking.flight_date}</td>
                        <td>{booking.class_code}</td>
                        <td>{booking.total_fare}</td>
                        { booking.status === 'verified' && <td><span className="btn btn-danger d-flex align-items-end" onClick={() => this.cancelUserRequest(booking.passengers)}>Cancel All tickets</span></td> }
                        { booking.status !== 'verified' && <td>{booking.status}</td> }
                    </tr>
                </tbody>

            </table>
        </div>

        <h4 className="col-6 ml-auto mr-auto booking-text">Reporting Time - <span>{booking.flight_date}</span></h4>
        
        <div className="offset-2 col-4 p-3">
            <Link 
                to={{
                    pathname: '/ticket_details',
                    state:{
                        booking: booking
                    }
                }}
            >
                view ticket
            </Link>
        </div>

    </div>
</React.Fragment>
        );
    }

};
export default BookingDetails;