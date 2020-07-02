import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import {Badge} from '../shared';
import { getPartnerServices } from '../../api/partnerServiceApi';

class Inquiry extends Component {
	constructor(props) {
		super(props);
		this.state={
			partnerServices: []
		};
	}
	componentDidMount(){
		var params = {};
		if(this.props.inquiry.package_booking){
			params["package_booking_id_eq"] = this.props.inquiry.package_booking.id;
		}
		this.fetchPartnerServices(params);
	}

	fetchPartnerServices(params){
		getPartnerServices(params)
		.then((response) => {
			this.setState({
				partnerServices: response.data
			});
		})
	}

	render() {
		const {inquiry, aPackage, reject, destroy, setActions} = this.props;
		const {partnerServices} = this.state;
		const totalAmount = (inquiry.number_of_adult + inquiry.number_of_child) * aPackage.price;
		return (
			<div className='row'>
				<div className='col-12 col-md-3 offset-md-1 '>
					{/* <img src='' /> */}
					<div className=''>
						<h3 className='title'>Inquirer</h3>
						<i className='fas fa-user user-icon fa-3x' />
						<h3 className='value text-large text-bold'>
							{inquiry.first_name}&nbsp;{inquiry.last_name}
						</h3>
						<div className='text-small text-muted'>
							<i className='fas fa-envelope' />&nbsp;
							{inquiry.email_address}
						</div>
						<div className='text-small text-muted'>
							<i className='fas fa-globe-americas' />&nbsp;
							{inquiry.nationality}
						</div>
						<div className='text-small text-muted'>
							<i className='fas fa-address-card' />&nbsp;
							{inquiry.address}&nbsp;
							{inquiry.city}&nbsp;
							{inquiry.zip_code}&nbsp;
						</div>
						<div className='text-small text-muted'>
							<i className='fas fa-phone-volume' />&nbsp;
							{inquiry.phone}
						</div>
						<div>
							<Badge type={inquiry.status}> {inquiry.status}</Badge>
						</div>
						<div className='mt-3'>
							<div
								className='cursor-pointer'
								onClick={() => {
									setActions({
										showOtherForm: true,
										showDetails: false
									});
								}}
							>
								{inquiry.status === 'pending' && (
									<span className='text-success text-bold'>
										Send Confirmation to User&nbsp; <i className='fas fa-chevron-right' />
									</span>
								)}
							</div>
							<div
								className='cursor-pointer'
								onClick={() => {
									setActions({
										showPartnerForm: true,
										showDetails: false
									});
								}}
							>
								{inquiry.status === 'processing' && (
									<span className='text-success text-bold'>
										Assign Partners&nbsp; <i className='fas fa-chevron-right' />
									</span>
								)}
							</div>
							<div className='cursor-pointer'>
								{inquiry.status === 'pending' && (
									<span className='text-danger text-bold' onClick={() => reject(inquiry.idx)}>
										Reject
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className='col-12 col-md-7'>
					<div className='list-view'>
						<div className='d-flex align-items-center justify-content-between'>
							<h3 className='title'>Package Details</h3>
							<div>
								<span>
									<Link
										to={{
											pathname: '/admin/edit_inquiry',
											state: {
												inquiry: inquiry
											}
										}}
										className='btn bg-none color-accent'
									>
										Edit
									</Link>
								</span>
								<span className='btn bg-done text-danger' onClick={() => destroy(inquiry.idx)}>
									Delete
								</span>
							</div>
						</div>
						<div className='list'>
							<span className='label'>Name</span>
							<span className='value'> {inquiry.package_name}</span>
						</div>
						<div className='list'>
							<span className='label'>Preferred Date</span>
							<span className='value'>{inquiry.preferred_date}</span>
						</div>
						<div className='list'>
							<span className='label'>Unit Price</span>
							<span className='value'>{aPackage.price}</span>
						</div>
						<div className='list'>
							<span className='label'>Total Amount</span>
							<span className='value'>{totalAmount}</span>
						</div>
					</div>

					<div className='list-view'>
						<h3 className='title'>Traveller Details</h3>

						<div className='list'>
							<span className='label'>Head Traveller Name</span>
							<span className='value'> {inquiry.head_traveller_name}</span>
						</div>
						<div className='list'>
							<span className='label'>Number of Adults</span>
							<span className='value'> {inquiry.number_of_adult}</span>
						</div>
						<div className='list'>
							<span className='label'>Number of Child</span>
							<span className='value'> {inquiry.number_of_child}</span>
						</div>
						{inquiry.query !== null && (
							<div className='list'>
								<div className='label'>Queries</div>
								<div className='value'> {inquiry.query}</div>
							</div>
						)}
					</div>
					{inquiry.status == 'processing' && (
						<React.Fragment>
							<div className='list-view'>
								<div className='d-flex align-items-center justify-content-between'>
									<h3 className='title'>Other Details</h3>
									<div>
										<span
											className='btn bg-none color-accent'
											onClick={() => {
												setActions({
													showOtherForm: true,
													showDetails: false
												});
											}}
										>
											Edit
										</span>
									</div>
								</div>

								<div className='list'>
									<span className='label'>Start Date</span>
									<span className='value'> {inquiry.package_booking.start_date}</span>
								</div>
								<div className='list'>
									<span className='label'>End date</span>
									<span className='value'> {inquiry.package_booking.end_date}</span>
								</div>
								<div className='list'>
									<span className='label'>Pickup Location</span>
									<span className='value'> {inquiry.package_booking.pickup_location}</span>
								</div>

								<div className='list'>
									<span className='label'>Drop off Location</span>
									<span className='value'> {inquiry.package_booking.drop_off_location}</span>
								</div>
								{inquiry.query !== null && (
									<div className='list'>
										<div className='label'>Queries</div>
										<div className='value'> {inquiry.query}</div>
									</div>
								)}
							</div>

							<div className='list-view'>
								<div className='d-flex align-items-center justify-content-between'>
									<h3 className='title'>Partner Details</h3>
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

								{partnerServices.map((partnerService, index) => {
									return(
										<React.Fragment>
											<h4 className='title'>Partner {index + 1}</h4>
											{Object.entries(partnerService.extras).map(([key, value]) =>  (
												<div className='list'>
													<span className='label'>{key}</span>
													<span className='value'>{value}</span>
												</div>
											))}
										</React.Fragment>
									);
								})}
								{/* <div className='list'>
									<span className='label'>Start Date</span>
									<span className='value'> {inquiry.head_traveller_name}</span>
								</div>
								<div className='list'>
									<span className='label'>End date</span>
									<span className='value'> {inquiry.number_of_adult}</span>
								</div>
								<div className='list'>
									<span className='label'>Pickup Location</span>
									<span className='value'> {inquiry.number_of_child}</span>
								</div>

								<div className='list'>
									<span className='label'>Drop off Location</span>
									<span className='value'> {inquiry.number_of_child}</span>
								</div> */}
								{inquiry.query !== null && (
									<div className='list'>
										<div className='label'>Queries</div>
										<div className='value'> {inquiry.query}</div>
									</div>
								)}
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
		);
	}
}

export default Inquiry;
