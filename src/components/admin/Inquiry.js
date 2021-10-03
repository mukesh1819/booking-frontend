import React, {Component, useState, useEffect} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import {Badge} from '../shared';
import {getPartnerServices} from '../../api/partnerServiceApi';
import moment from 'moment';
import {pick} from '../../helpers';

const Inquiry = (props) => {
	const package_booking = props.inquiry.package_booking;
	const [partnerServices, setPartnerServices] = useState([]);

	const fetchPartnerServices = (params) => {
		getPartnerServices(params).then((response) => {
			setPartnerServices(response.data);
		});
	};

	useEffect(
		() => {
			var params = {};
			if (package_booking) {
				params['q[package_booking_id_eq'] = package_booking.id;
				fetchPartnerServices(params);
			}
		},
		[package_booking]
	);

	const {inquiry, aPackage, reject, destroy, setActions} = props;
	const packageInfo = pick(inquiry.package, ['name']);
	const contactInfo = pick(inquiry, [
		'first_name',
		'last_name',
		'email_address',
		'address',
		'city',
		'phone',
		'zip_code'
	]);
	const inquiryInfo = pick(inquiry, [
		'head_traveller_name',
		'number_of_adult',
		'number_of_child',
		'pickup_location',
		'drop_off_location'
	]);
	var activityInfo = {};
	if (inquiry.activity != null) {
		activityInfo = pick(inquiry.activity, ['description', 'price']);
	}
	const inquiryDateInfo = pick(inquiry, ['preferred_date', 'start_date', 'end_date']);
	const otherInfo = pick(inquiry, ['idx']);
	const detailsInfo = pick(inquiry.package_booking, ['details']);

	return (
		<div className='row'>
			<div className='ui segment'>
				<div className='ui grid'>
					<div className='eight wide column'>
						<h3 className='ui header'> Details </h3>
					</div>
					<div className='eight wide column right floated'>
						{inquiry.status === 'pending' && (
							<span
								onClick={() => {
									setActions({
										showOtherForm: true,
										showDetails: false
									});
								}}
								className='ui right floated positive button'
							>
								Send Confirmation to User&nbsp;
							</span>
						)}

						{inquiry.status === 'processing' && (
							<span
								onClick={() => {
									setActions({
										showOtherForm: true,
										showDetails: false,
										editInquiry: true
									});
								}}
								className='ui right floated primary button'
							>
								Edit&nbsp;
							</span>
						)}
						{inquiry.status === "verified" && partnerServices.length == 0 && (
							<span
								onClick={() => {
									setActions({
										showPartnerForm: true,
										showDetails: false
									});
								}}
								className='ui right floated positive button'
							>
								Assign Partners&nbsp;
							</span>
						)}

							{!detailsInfo.details && inquiry.status == "verified" && 
                             (
                                    <span className="u">
                                        <Link
                                            to={{
                                                pathname: `/admin/${inquiry.idx}/set_package_details`,
                                                state: {
                                                    inquiry: inquiry,
                                                },
                                            }}
                                        >
                                            <i className="fas fa-contact" />
                                            <span className="ui right floated button positive">
                                                Set Package Details
                                            </span>
                                        </Link>
                                    </span>
                                )}

						{inquiry.status === 'pending' && (
							<span className='ui right floated negative button' onClick={() => reject(inquiry.idx)}>
								Reject
							</span>
						)}
					</div>
				</div>
				<br></br>
				<div className='ui internally celled stackable grid section-layout'>
					<div className='row'>
						<div className='eight wide column section'>
							<h3 className='ui header'> Package Info </h3>
							<div className='ui grid'>
								{Object.entries(packageInfo).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
								{Object.entries(activityInfo).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
							</div>
						</div>
						<div className='eight wide column section'>
							<div className='d-flex align-items-center justify-content-between'>
								<h3 className='ui header'>Inquiry Info</h3>
								<div>
									<span>
										<Link
											to={{
												pathname: `/admin/inquiry/${inquiry.idx}/edit`,
												state: {
													inquiry: inquiry
												}
											}}
											className='btn bg-none color-accent'
										>
											Edit
										</Link>
									</span>
									<span className='btn bg-none text-danger' onClick={() => destroy(inquiry.idx)}>
										Delete
									</span>
								</div>
							</div>
							<div className='ui grid'>
								{Object.entries(inquiryInfo).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
								{Object.entries(inquiryDateInfo).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{moment(value).format('D MMMM, YYYY')}</div>
									</div>
								))}
								{inquiry.addons &&
									inquiry.addons.map((addon) => {
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
						<div className='eight wide column section'>
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
						<div className='eight wide column section'>
							<div className='d-flex align-items-center justify-content-between'>
								<h3 className='ui header'>Partner Details</h3>
								{(inquiry.status === 'processing' || inquiry.status === 'verified') && (
									<div>
										<span
											className='btn bg-none color-accent'
											onClick={() => {
												setActions({
													showPartnerForm: true,
													showDetails: false
												});
											}}
										>
											Edit
										</span>
									</div>
								)}
							</div>
							<div className='ui grid'>
								{partnerServices.map((service) => (
									<div className='row'>
										<div className='column'>{service.name}</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='eight wide column section'>
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
										<Badge type={inquiry.status}>{inquiry.status}</Badge>
									</div>
								</div>
								<div className='row'>
									<div className='eight wide column'>Queries</div>
									<div className='eight wide column'> {inquiry.query}</div>
								</div>
							</div>
						</div>
						{detailsInfo.details && 
							<div className='eight wide column section'>

								<div className='d-flex align-items-center justify-content-between'>
									<h3 className='ui header'> Package Details </h3>
									<div>
										<span>
											<Link
												to={{
													pathname: `/admin/${inquiry.idx}/set_package_details`,
													state: {
														inquiry: inquiry,
													},
												}}
												className='btn bg-none color-accent'
											>
												Edit
											</Link>
										</span>
									</div>
								</div>
								
								<div className='eight wide column'>
									{detailsInfo.details}
								</div>

							</div>
						}
					</div>

					
				</div>
			</div>
		</div>
	);
};

export default Inquiry;
