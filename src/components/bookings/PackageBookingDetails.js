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
import {getDuration} from '../../helpers';
import {Package} from '../packages';

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
				inquiry: {}
			},
			redirectToPayment: false
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

	render() {
		const {booking, redirectToPayment} = this.state;

		if (redirectToPayment) {
			return <PaymentForm transaction={booking.booking_transaction} idx={booking.booking_transaction.idx} />;
		}

		return (
			<div className='container bg-white'>
				<div className='d-flex justify-content-between p-2'>
					<h3 className='text-primary title'>. </h3>
				</div>

				<div className='row'>
					<div className='col-12 col-md-4'>
						<div className='widget mb-4'>
							<div className='card'>
								<h3 className='card-header'>Package Details</h3>

								<div className='card-body'>
									<Package aPackage={booking.package} />
								</div>
							</div>
						</div>
					</div>
					<div className='col-12 col-md-4'>
						<div className='widget mb-4'>
							<div className='card'>
								<h3 className='card-header'>Booking Details</h3>
								<div className='card-body'>
									<div className='p-2'>
										<div className=''>
											<div>
												<span className='text-bold'>Invoice:&nbsp;</span>
												<span className='text-small'>{booking.booking_transaction.idx}</span>
											</div>
											<div>
												<span className='text-bold'>Pickup Date:&nbsp;</span>
												<span className='text-small'>
													{moment(booking.pickup_date).format('D MMMM, YYYY')}
												</span>
											</div>
											<div>
												<span className='text-bold'>Dropoff Date:&nbsp;</span>
												<span className='text-small'>
													{moment(booking.drop_off_date).format('D MMMM, YYYY')}
												</span>
											</div>
											<div>
												<span className='text-bold'>Start Date:&nbsp;</span>
												<span className='text-small'>
													{moment(booking.start_date).format('D MMMM, YYYY')}
												</span>
											</div>
											<div>
												<span className='text-bold'>End Date:&nbsp;</span>
												<span className='text-small'>
													{moment(booking.end_date).format('D MMMM, YYYY')}
												</span>
											</div>
											<div>
												<span className='text-bold'>Pickup Location:&nbsp;</span>
												<span className='text-small'>{booking.pickup_location}</span>
											</div>
											<div>
												<span className='text-bold'>Drop off Location:&nbsp;</span>
												<span className='text-small'>{booking.drop_off_location}</span>
											</div>
											<div>
												<span className='text-bold'>Meals:&nbsp;</span>
												<span className='text-small'>{booking.meals_included}</span>
											</div>

											<div>
												<span className='text-center p-3'>
													<div className='text-bold'>Total Amount: {booking.amount}</div>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-12 col-md-4'>
						<ContactDetails details={booking.inquiry} />
					</div>
				</div>

				<div className='text-center p-4'>
					<span onClick={this.onContinueToPayment} className='btn btn-primary'>
						Continue to Payment
					</span>
				</div>
			</div>
		);
	}
}
export default PackageBookingDetails;
