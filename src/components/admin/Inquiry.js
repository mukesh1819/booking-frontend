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
		'package_name',
		'head_traveller_name',
		'number_of_adult',
		'number_of_child',
		'pickup_location',
		'drop_off_location',
		'total_amount'
	]);
	var activityInfo = {};
	if (inquiry.activity != null) {
		activityInfo = pick(inquiry.activity, ['description', 'price']);
	}
	const inquiryDateInfo = pick(inquiry, ['preferred_date', 'start_date', 'end_date']);
	const otherInfo = pick(inquiry, ['idx']);

	return (
		<div className='row'>
			<div className='ui segment'>
				<div className='ui grid'>
					<div className='eight wide column'>
						<h3 className='ui header'> Details </h3>
					</div>
					<div className='eight wide column right-aligned'>
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
						{(inquiry.status === 'processing' || inquiry.status === 'verified') && (
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
						{inquiry.status === 'pending' && (
							<span className='ui right floated negative button' onClick={() => reject(inquiry.idx)}>
								Reject
							</span>
						)}
					</div>
				</div>
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
								{Object.entries(activityInfo).map(([key, value]) => (
									<div className='row'>
										<div className='eight wide column'>{key.titleize()}:</div>
										<div className='eight wide column'>{value}</div>
									</div>
								))}
							</div>
						</div>
						<div className='eight wide column'>
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
							</div>
						</div>
					</div>
					<div className='row'>
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
						<div className='eight wide column'>
							<div className='d-flex align-items-center justify-content-between'>
								<h3 className='ui header'>Partner Details</h3>
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
							</div>
						</div>
					</div>
					<div className='row'>
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
										<Badge type={inquiry.status}>{inquiry.status}</Badge>
									</div>
								</div>
								<div className='row'>
									<div className='eight wide column'>Queries</div>
									<div className='eight wide column'> {inquiry.query}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Inquiry;
