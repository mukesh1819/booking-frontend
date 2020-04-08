import React, {Component} from 'react';
import axios from 'axios';
import {passCsrfToken, imageUrl} from '../../helpers';
import {Link} from 'react-router-dom';
import PaymentForm from '../payments/PaymentForm';
import swal from 'sweetalert';
import {showPackageBooking} from '../../api/inquiryApi';
import {Inquiry} from '../inquiries';

class InquiryDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			packageBookingInfo: {},
			showPaymentPage: false
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchDetails();
	}
	fetchDetails() {
		showPackageBooking(this.props.match.params.idx).then((response) => {
			// console.log('inquiry detials', response.data);
			this.setState({
				packageBookingInfo: response.data
			});
		});
	}

	paymentPage() {
		this.setState({
			showPaymentPage: true
		});
	}

	render() {
		const {idx} = this.props.match.params;
		const {packageBookingInfo} = this.state;
		console.log('Package Booking Info', packageBookingInfo);

		if (this.state.showPaymentPage) {
			return <PaymentForm idx={packageBookingInfo.idx} />;
		}

		return (
			<React.Fragment>
				{Object.keys(packageBookingInfo).length != 0 && (
					<div className='container'>
						<div className='mt-3'>
							<div className='row'>
								<div className='col-12'>
									<div className='card inquiry-details'>
										<div className='card-header'>
											<h3>Your Inquiry Details </h3>
										</div>
										<div className='card-body d-flex justify-content-around flex-wrap'>
											{packageBookingInfo.inquiry !== null && (
												<Inquiry
													inquiry={packageBookingInfo.inquiry}
													aPackage={packageBookingInfo.package}
												/>
											)}

											{/* <div className=''>
												<h3>Package Details</h3>
												<div className='card-widget '>
													<a
														href={imageUrl(packageBookingInfo.package.images[0])}
														className='image-popup'
													>
														<figure>
															<img
																src={imageUrl(packageBookingInfo.package.images[0])}
																alt='Image'
																className='img-responsive'
															/>
														</figure>
													</a>
													<div className='details'>
														<Link to={`/package/${packageBookingInfo.package.id}`}>
															<h3>{packageBookingInfo.package.name}</h3>
														</Link>
														<div className='d-flex justify-content-between py-2'>
															<span className='text-small text-muted'>
																<i class='fas fa-map-marker-alt' />&nbsp;
																{packageBookingInfo.package.location}
															</span>
															<span>
																<span className='text-strong'>
																	Rs. {packageBookingInfo.package.price}
																</span>
																<span className='text-small text-muted'> / person</span>
															</span>
														</div>
													</div>
												</div>
											</div> */}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='text-center'>
							<span className=' btn btn-secondary m-3' onClick={() => this.paymentPage()}>
								Continue to Payment
							</span>
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}
export default InquiryDetails;
