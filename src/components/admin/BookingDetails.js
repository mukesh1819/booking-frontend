import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import moment from 'moment';
import {ifNotZero} from '../../helpers';
import {Badge} from '../shared';
import {Accordion} from 'semantic-ui-react';
import {getBookingDetails} from '../../api/flightApi';
import {fetchTicket} from '../../api/flightApi';
import {downloadTicket} from '../../helpers';
import {Button, ButtonGroup} from 'react-bootstrap';


class BookingDetails extends Component {
	constructor(props){
		super(props);
		this.state = {
			booking: {}
		}
	}
	componentDidMount(){
		this.fetchBooking(this.props.match.params.ruid)
	}

	fetchBooking(ruid) {
		getBookingDetails(ruid)
		.then((response) => {
			this.setState({
				booking: response.data.departing_flight,
				loading: false
			});
		})
	}

	destroyBooking = (id) => {
		// deleteBooking(id)
		// .then((response) => {
		// 	swal({
		// 		title: 'Flight Booking deleted!',
		// 		text: `this flight booking is deleted`,
		// 		icon: 'success',
		// 		button: 'Continue!'
		// 	});
		// 	history.go();

		// })
		// .catch((error) => {
		// 	swal({
		// 		title: 'Flight Booking Delete error',
		// 		text: 'Something went wrong. please try again or contact us',
		// 		icon: 'error',
		// 		button: 'Continue!'
		// 	});
		// })

		swal({
			title: 'Are you sure?',
			text: 'Once delete, your flight booking will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteBooking(id).then((response) => {
					swal('this flight booking is deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Your flight booking is not deleted yet');
			}
		});
	};

	download = (idx) => {
		fetchTicket(idx).then((response) => {
			this.setState({
				loading: false
			});
			downloadTicket(response.data);
		});
	};


	render(){
		const {booking, loading} = this.state;

		return (
			<React.Fragment>
				<div className='text-small d-flex justify-content-between'>
					<div>
						<h5>Flight Details</h5>
						<div>Flight Id - {booking.flight_id}</div>
						<div>{booking.airline}</div>
						<div>{booking.flight_no}</div>
						<div>Class code - {booking.class_code}</div>
						<div>Check-in Baggage - {booking.free_baggage}</div>
					</div>
					<div>
						<h5>Booking Details</h5>
						<div>{booking.booking_date_time}</div>
						<div>Pnr No - {booking.pnr_no}</div>
						<div>{booking.departure_flight_time}</div>
						<div>Refundable - {booking.refundable}</div>
						<div>Reporting time - {booking.reporting_time}</div>
						<div>Created At - {booking.created_at}</div>
					</div>
					<div>
						{booking.status === 'verified' && 
							<span className='text-center py-4'>
								<Button
									primary
									loading={loading}
									className='btn btn-primary btn-large '
									onClick={() => this.download(booking.booking_transaction.idx)}
								>
									Download ticket
								</Button>
							</span>
						}

						<span className='btn bg-none text-danger' onClick={() => destroyBooking(booking.ruid)}>
							Delete
						</span>
					</div>
				</div>
			</React.Fragment>
		);
	}

};
export default BookingDetails;
