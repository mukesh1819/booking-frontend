import React, {Component} from 'react';
import swal from 'sweetalert';
import {confirmInquiry} from '../../api/inquiryApi';
import {Link} from 'react-router-dom';

class InquiryDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	confirmUserPackage(id) {
		confirmInquiry(id)
			.then((response) => {
				// console.log('inquiry response',response.data);
				swal({
					title: 'User Package Response!',
					text: `Your package is confirmed!!! ${response.data.message}`,
					icon: 'success',
					button: 'Continue!'
				});
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'User Package Response!',
					text: error.response.data.errors,
					icon: 'error',
					button: 'Continue!'
				});
			});
	}
	
	rejectUserPackage(id){
		rejectInquiry(id)
		.then((response) => {
			swal({
				title: 'User Package Rejection Response!',
				text: `${response.data.message}`,
				icon: 'success',
				button: 'Continue!'
			});
		})
		.catch((error) => {
			console.log(error);
		})
	}

	render() {
		const {inquiry} = this.props.location.state;
		const totalAmount = (inquiry.number_of_adult + inquiry.number_of_child) * inquiry.package.price;
		return (
			<div className='container'>
				<div className=''>
					<h5>Inquiry</h5>
					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>Inquiry id</th>
								<th>Name</th>
								<th>Email</th>
								<th>Nationality</th>
								<th>Address</th>
								<th>City</th>
								<th>Zip Code</th>
								<th>Queries</th>
								<th>phone Number</th>
								<th>Preferred Date</th>
								<th>Head Traveller Name</th>
								<th>No of Adult</th>
								<th>No of Child</th>
								<th>Status</th>
								<th>Package Name</th>
								<th>Package Price</th>
								<th>Total Price</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>{inquiry.id}</td>
								<td>{inquiry.first_name} {inquiry.last_name}</td>
								<td>{inquiry.email_address} </td>
								<td>{inquiry.nationality}</td>
								<td>{inquiry.address}</td>
								<td>{inquiry.city}</td>
								<td>{inquiry.zip_code}</td>
								<td>{inquiry.query}</td>
								<td>{inquiry.phone}</td>
								<td>{inquiry.preferred_date}</td>
								<td>{inquiry.head_traveller_name}</td>
								<td>{inquiry.number_of_adult}</td>
								<td>{inquiry.number_of_child}</td>
								<td>{inquiry.status}</td>
								<td>{inquiry.package_name}</td>
								<td>{inquiry.package.price}</td>
								<td>{totalAmount}</td>
								<td>
									{inquiry.status === 'pending' && (
										<div>
											<span>
												<Link to={{
													pathname:'/inquiry_form',
													className:'btn btn-secondary',
													state: {
														inquiry: inquiry
													}
												}}
												> Edit
												</Link> 
											</span>

											<span
												className='btn btn-secondary'
												onClick={() => this.confirmUserPackage(inquiry.id)}
											>
												Confirm
											</span>

											<span 
												className='btn btn-secondary'
												onClick={() => this.rejectUserPackage(inquiry.id)}
											>
												Reject
											</span>
										</div>
										
									)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default InquiryDetails;