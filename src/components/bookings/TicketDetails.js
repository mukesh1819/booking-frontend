import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import {getBookingDetails, downloadTicket} from '../../api/flightApi';

class TicketDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			booking: {}
		};
	}

	componentDidMount() {
		if (this.props.location.state !== undefined) {
			this.setState({
				booking: this.props.location.state.booking
			});
		} else {
			getBookingDetails(this.props.match.params.id)
				.then((response) => {
					this.setState({
						booking: response.data
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	render() {
		const {booking} = this.state;
		return (
			<React.Fragment>
				<div className='container-fluid'>
					<div className='col-md-6 ml-auto mr-auto' id='search-form pdf-mar'>
						<div className='d-flex justify-content-between'>
							<div className=''>
								<h3>Booking Nepal</h3>
							</div>
							<div className=''>
								<h4 className='text-success'>E-Ticket</h4>
							</div>
							<div className=''>
								<Image width='35px' height='37px' src={booking.airline_logo} />
								<span className='booking-text '>airline </span>
							</div>
						</div>
						<h5 className='text-center text-info booking-text'>
							Tickets operated and managed by Booking Nepal Travels and Tours Pvt. Ltd
						</h5>
						<h5 className='text-uppercase text-center booking-text'>
							This <strong>electronic ticket</strong> is not transferable and must be present at check-in{' '}
						</h5>
						<h5 className='text-uppercase text-center booking-text'>
							at check-in please present id card and all necessary travel documents.
						</h5>

						{booking.booking_transaction !== undefined && (
							<div className='row'>
								<div>
									<div className='col-6'>
										<h5 className='d-inline booking-text'>
											Transaction Invoice No -<span>{booking.booking_transaction.idx}</span>
										</h5>
									</div>
								</div>

								<div className='row'>
									<div className='col-6'>
										<h5 className='d-inline booking-text'>
											Transaction Date -<span>{booking.booking_transaction.created_at}</span>
										</h5>
									</div>
								</div>
							</div>
						)}

						<div className='row'>
							<div className='col-6'>
								<h5 className='d-inline booking-text'>
									Outbound PNR No -<span>{booking.pnr_no}</span>
								</h5>
							</div>
							<div className='col-6 d-flex justify-content-end'>
								<h5 className='d-inline booking-text'>
									Refundable -
									{booking.refundable && <span>"Yes"</span>}
									{!booking.refundable && <span> "No" </span>}
								</h5>
							</div>
						</div>

						<table className='table table-bg table-bordered table-sm'>
							<thead>
								<tr>
									<th>Passenger Name</th>
									<th>Nationality</th>
									<th>Passenger Type</th>
									<th>Ticket No</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{booking.passengers !== undefined &&
									booking.passengers.map((passenger) => {
										return (
											<tr>
												<td> {passenger.title + ' ' + passenger.first_name} </td>
												<td> {passenger.nationality} </td>
												<td> {passenger.passenger_type} </td>
												<td> {passenger.ticket_no} </td>
												<td> {passenger.passenger_status} </td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					<div className='col-md-6 ml-auto mr-auto' id='search-form1'>
						<h1 className='text-center booking-text'>Booking Details</h1>
						<table className='table table-bg table-bordered table-sm'>
							<thead>
								<tr>
									<th>Sector</th>
									<th>Flight No</th>
									<th>Flight Time</th>
									<th>Class</th>
									<th>Flight Charge</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{booking.sector}</td>
									<td>{booking.flight_no}</td>
									<td>{booking.flight_date}</td>
									<td>{booking.class_code}</td>
									<td>{booking.total_fare}</td>
									<td>{booking.status}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<h4 className='col-6 ml-auto mr-auto booking-text'>
						Reporting Time - <span>{booking.flight_date}</span>
					</h4>

					<div className='text-center'>
						<span onClick={() => downloadTicket(booking.ruid)} className='btn btn-success'>
							Print ticket
						</span>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default TicketDetails;
