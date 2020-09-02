import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {getPackageBookingDetails} from '../../api/bookingApi';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import swal from 'sweetalert';
import moment from 'moment';
import {isRefundable, ifNotZero, pick} from '../../helpers';
import {PaymentForm} from '../payments';
import {Timer} from '../shared';
import {Button, ButtonGroup} from 'react-bootstrap';
import {getDuration} from '../../helpers';
import {Package} from '../packages';
import {fetchTicket} from '../../api/flightApi';
import {downloadTicket} from '../../helpers';

const ContactDetails = ({details}) => (
	<div className='ui grid'>
		{Object.entries(details).map(([key, value]) => (
			<div className='row'>
				<div className='eight wide column'>{key.titleize()}:</div>
				<div className='eight wide column'>{value}</div>
			</div>
		))}
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
				inquiry: {}
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

		const packageInfo = pick(booking.package, ['name']);

		const contactInfo = pick(booking.inquiry, [
			'first_name',
			'last_name',
			'phone',
			'email_address',
			'head_traveller_name'
		]);

		const bookingInfo = pick(booking, ['Invoice Number', 'pickup_location', 'drop_off_location', 'meals_included']);
		const booleans = pick(booking, ['meals_included']);

		const bookingDateInfo = pick(booking, ['start_date', 'end_date', 'pickup_date', 'drop_off_date']);

		const remarks = pick(booking, ['remarks']);
		return (
			<div className='ui container segment'>
				<div className='row'>
					<div className='ui internally celled stackable grid'>
						<div className='row'>
							<div className='eight wide column'>
								<h3 className='ui header'> Package Info </h3>
								<div className='ui grid'>
									{Object.entries(packageInfo).map(([key, value]) => (
										<div className='row'>
											<div className='eight wide column'>{key.titleize()}:</div>
											<div className='eight wide column'>{value}</div>
										</div>
									))}
								</div>
							</div>
							<div className='eight wide column'>
								<h3 className='ui header'> Booking Info </h3>
								<div className='ui grid'>
									{Object.entries(bookingInfo).map(([key, value]) => (
										<div className='row'>
											<div className='eight wide column'>{key.titleize()}:</div>
											<div className='eight wide column'>{value}</div>
										</div>
									))}
									{Object.entries(booleans).map(([key, value]) => (
										<div className='row'>
											<div className='eight wide column'>{key.titleize()}:</div>
											<div className='eight wide column'>
												{value ? 'Included' : 'Not Included'}
											</div>
										</div>
									))}
									{Object.entries(bookingDateInfo).map(([key, value]) => (
										<div className='row'>
											<div className='eight wide column'>{key.titleize()}:</div>
											<div className='eight wide column'>
												{moment(value).format('D MMMM, YYYY')}
											</div>
										</div>
									))}
									<div className='row text-danger text-bold'>
										<div className='eight wide column'>Total amount:</div>
										<div className='eight wide column'>Rs. {booking.amount}</div>
									</div>
									<h5 className='ui header'>Addon Information</h5>
									{booking.inquiry &&
										booking.inquiry.addons &&
										booking.inquiry.addons.map((addon) => {
											return (
												<div className='row'>
													<div className='eight wide column'>Name</div>
													<div className='eight wide column'>{addon.name}</div>
													<div className='eight wide column'>Count</div>
													<div className='eight wide column'>{addon.count}</div>
													<div className='eight wide column'>Price</div>
													<div className='eight wide column'>{addon.price}</div>
												</div>
											);
										})}
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='eight wide column'>
								<div className='ui header'>Contact Details</div>
								<ContactDetails details={contactInfo} />
							</div>
							<div className='eight wide column'>
								<div className='ui header'>Other Details</div>
							</div>
						</div>
					</div>
				</div>
				<div className='text-center'>
					{booking.inquiry.status === 'processing' && (
						<div className='text-center p-4'>
							<span onClick={this.onContinueToPayment} className='btn btn-primary'>
								Continue to Payment
							</span>
						</div>
					)}
					{booking.inquiry.status === 'verified' && (
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
					)}
				</div>
			</div>
		);
	}
}
export default PackageBookingDetails;
