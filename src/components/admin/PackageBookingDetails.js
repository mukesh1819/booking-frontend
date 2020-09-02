import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import history from '../../history';
import {
	getPackageBookingDetails,
	getPackageBookingConfirmation,
	deletePackageBooking,
	markComplete
} from '../../api/packageBookingApi';
import {set_package_remarks} from '../../api/partnerServiceApi';
import {fetchTicket} from '../../api/flightApi';
import {downloadTicket, pick} from '../../helpers';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Badge, RemarksForm, PackageRemarksForm} from '../shared';
import {Card, Form} from 'semantic-ui-react';
import moment from 'moment';
import {getPartners} from '../../api/partnerApi';

class PackageBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			partners: [],
			user_remarks: [],
			partner_remarks: [],
			isRemarksFormOpen: false,
			packageBooking: {
				user_remarks: [],
				booking_transaction: {},
				inquiry: {},
				package: {},
				partner_services: []
			}
		};
	}

	componentDidMount() {
		getPackageBookingDetails(this.props.match.params.idx).then((v) => {
			this.setState({
				packageBooking: v.data,
				user_remarks: v.data.user_remarks,
				partner_remarks: v.data.partner_remarks
			});
		});

		getPartners().then((response) => {
			this.setState({
				partners: response.data.partners
			});
		});
	}

	// onConfirmPackageBooking(id) {
	// 	getPackageBookingConfirmation(id)
	// 		.then((response) => {
	// 			swal({
	// 				title: 'Package Booking Confirmation!',
	// 				text: response.data.message,
	// 				icon: 'success',
	// 				button: 'Continue!'
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log('Package booking confirmation error', error);
	// 		});
	// }

	destroyPackageBooking(id) {
		swal({
			title: 'Are you sure?',
			text: 'Once delete, your package booking will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deletePackageBooking(id).then((response) => {
					swal('this package booking is deleted', {
						icon: 'success'
					});
					history.push('/admin/package_booking');
				});
			} else {
				swal('Your package booking is not deleted yet');
			}
		});
	}

	download = (idx) => {
		fetchTicket(idx).then((response) => {
			this.setState({
				loading: false
			});
			downloadTicket(response.data);
		});
	};

	onMarkComplete(id) {
		markComplete(id)
			.then((response) => {
				swal({
					title: 'Response',
					text: response.data.message,
					icon: response.status == 200 ? 'success' : 'error'
				}).then((response) => {
					history.push('/admin/package_booking');
				});
			})
			.catch((v) => {});
	}

	render() {
		const {packageBooking, partners, user_remarks, partner_remarks} = this.state;
		const packageInfo = pick(packageBooking.package, ['name']);
		const contactInfo = pick(packageBooking.inquiry, [
			'first_name',
			'last_name',
			'email_address',
			'address',
			'city',
			'head_traveller_name',
			'nationality',
			'number_of_adult',
			'number_of_child',
			'phone',
			'query'
		]);

		const bookingInfo = pick(packageBooking, ['pickup_location', 'drop_off_location']);
		const booleans = pick(packageBooking, ['meals_included']);

		const bookingDateInfo = pick(packageBooking, ['start_date', 'end_date', 'pickup_date', 'drop_off_date']);
		const otherInfo = pick(packageBooking, ['idx']);
		const {loading} = this.state;
		return (
			<div className='container'>
				<Card fluid>
					<Card.Content>
						<div className='ui segment'>
							<h3 className='ui header'> Booking Details </h3>
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
											<div className='row'>
												<div className='eight wide column'>
													<h3 className='ui header'> Inquiry Details </h3>
												</div>
												<div className='eight wide column right floated'>
													<div
														className='ui basic button right aligned'
														onClick={() =>
															history.push(
																`/admin/inquiry_details/${packageBooking.inquiry.idx}`
															)}
													>
														View
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='eight wide column'>
										<h3 className='ui header'> Contact Info </h3>
										<div className='ui grid'>
											{Object.entries(contactInfo).map(([key, value]) => (
												<div className='row'>
													<div className='eight wide column'>{key.titleize()}:</div>
													<div className='eight wide column'>{value}</div>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className='row'>
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
											{packageBooking.inquiry &&
												packageBooking.inquiry.addons &&
												packageBooking.inquiry.addons.map((addon) => {
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
									<div className='eight wide column'>
										<h3 className='ui header'> Other Info </h3>
										<div className='ui grid'>
											{Object.entries(otherInfo).map(([key, value]) => (
												<div className='row'>
													<div className='eight wide column'>{key.titleize()}:</div>
													<div className='eight wide column'>{value}</div>
												</div>
											))}
											<div className='row'>
												<div className='eight wide column'>Status:</div>
												<div className='eight wide column'>
													<Badge type={packageBooking.status}>{packageBooking.status}</Badge>
												</div>
											</div>

											<div className='row'>
												<div className='eight wide column'>User Remarks:</div>
												<div className='eight wide column'>{packageBooking.user_remarks}</div>
											</div>

											<div className='row'>
												<div className='column'>
													<PackageRemarksForm
														remarks={packageBooking.partner_remarks}
														partners={partners}
														partner_services={packageBooking.partner_services}
														onSubmit={(data) => {
															set_package_remarks(data.idx, {
																partner_remarks: data.value
															}).then((v) => {
																debugger;
															});
														}}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card>
				<div className='text-center'>
					{packageBooking.inquiry.status === 'verified' && (
						<span className='text-center py-4'>
							<Button
								primary
								loading={loading}
								className='btn btn-primary btn-large '
								onClick={() => this.download(packageBooking.idx)}
							>
								Download ticket
							</Button>
						</span>
					)}
					{/* {packageBooking.inquiry.status == 'pending' && (
						<span
							className='btn btn-secondary btn-large ml-3'
							onClick={() => this.onConfirmPackageBooking(packageBooking.idx)}
						>
							confirm
						</span>
					)} */}

					{packageBooking.status === 'verified' && (
						<td>
							<span>
								<span
									className='btn bg-none text-primary'
									onClick={() => this.onMarkComplete(packageBooking.idx)}
								>
									Mark As Complete
								</span>
							</span>
						</td>
					)}

					{/* <span
						className='btn bg-none text-danger'
						onClick={() => this.destroyPackageBooking(packageBooking.idx)}
					>
						Delete
					</span> */}
				</div>
			</div>
		);
	}
}

export default PackageBookingDetails;
