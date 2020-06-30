import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {getPackageBookingDetails} from '../../api/bookingApi';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import swal from 'sweetalert';
import moment from 'moment';
import {isRefundable, ifNotZero} from '../../helpers';
import {PaymentForm} from '../payments';
import {Timer} from '../shared';
import {Button, ButtonGroup} from 'react-bootstrap';
import {getDuration} from '../../helpers';
import {Package} from '../packages';
import {fetchTicket} from '../../api/flightApi';
import {downloadTicket} from '../../helpers';

const ContactDetails = ({details}) => (
	<div className='widget'>
		<div className='card'>
			<div className='card-header'>
				<div className='d-flex justify-content-between'>
					<h3 className='title'>Contact Details</h3>
				</div>
			</div>

			<div className='card-body'>
				<div>
					<span className='text-bold'>Name:</span> {details.first_name + details.last_name}
				</div>
				<div>
					<span className='text-bold'>Phone:</span> {details.phone}
				</div>
				<div>
					<span className='text-bold'>Email:</span> {details.email_address}
				</div>
				<div>
					<span className='text-bold'>Head Traveller Name:</span> {details.head_traveller_name}
				</div>
			</div>
		</div>
	</div>
);

class PackageBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			booking: {
				booking_transaction: {},
				package: {
					images: []
				},
				inquiry: {},
			},
			redirectToPayment: false,
			loading: false

		};
	}

	componentDidMount() {
		getPackageBookingDetails(this.props.match.params.id)
			.then((response) => {
				console.log('Booking DAtA', response.data);
				this.setState({
					booking: response.data
				});
			})
			.catch((error) => {
				console.log('Package Booking fetch error', error);
			});
	}

	onContinueToPayment = () => {
		this.setState({
			redirectToPayment: true
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

	render() {
		const {booking, redirectToPayment, loading} = this.state;

		if (redirectToPayment) {
			return <PaymentForm transaction={booking.booking_transaction} idx={booking.booking_transaction.idx} />;
		}
		return (
			<div className='container bg-white'>
				<div className='d-flex justify-content-between p-2'>
					<h3 className='text-primary title'>. </h3>
				</div>

				<div className='row'>
					<div className='col-12 col-md-3'>
						<div className='widget mb-4'>
							<Package aPackage={booking.package} />
						</div>
						<ContactDetails details={booking.inquiry} />
					</div>
					<div className='col-12 col-md-9'>
						<div className='widget mb-4'>
							<div className='list-view'>
								<h3 className='title'>Booking Details</h3>
								<div className='list'>
									<span className='label'>Invoice</span>
									<span className='value'>{booking.booking_transaction.idx}</span>
								</div>
								<div className='list'>
									<span className='label'>Pickup Date</span>
									<span className='value'>{moment(booking.pickup_date).format('D MMMM, YYYY')}</span>
								</div>
								<div className='list'>
									<span className='label'>Dropoff Date</span>
									<span className='value'>
										{moment(booking.drop_off_date).format('D MMMM, YYYY')}
									</span>
								</div>
								<div className='list'>
									<span className='label'>Start Date</span>
									<span className='value'>{moment(booking.start_date).format('D MMMM, YYYY')}</span>
								</div>
								<div className='list'>
									<span className='label'>End Date</span>
									<span className='value'>{moment(booking.end_date).format('D MMMM, YYYY')}</span>
								</div>

								<div className='list'>
									<span className='label'>Pickup Location</span>
									<span className='value'>{booking.pickup_location}</span>
								</div>
								<div className='list'>
									<span className='label'>Drop off Location</span>
									<span className='value'>{booking.drop_off_location}</span>
								</div>
								<div className='list'>
									<span className='label'>Meals</span>
									<span className='value'>{booking.meals_included}</span>
								</div>
								<div>
									<span className='text-center p-3'>
										<div className='text-bold'>Total Amount: {booking.amount}</div>
									</span>
								</div>

								{booking.inquiry.status === "processing" && (
									<div className='text-center p-4'>
										<span onClick={this.onContinueToPayment} className='btn btn-primary'>
											Continue to Payment
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='col-12 col-md-4'>
						<ContactDetails details={booking.inquiry} />
					</div>
				</div>
				{booking.inquiry.status === "verified" && (
					<div className='text-center p-4'>
						<span className='text-center py-4'>
							<Button
								primary
								loading={loading}
								className='btn btn-primary btn-large '
								onClick={() => this.download(booking.idx)}
							>
								Download ticket
							</Button>
						</span>
					</div>
				)}
			</div>
		);
	}
}
export default PackageBookingDetails;
