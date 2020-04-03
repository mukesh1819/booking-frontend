import React, {Component} from 'react';
import swal from 'sweetalert';
import {confirmInquiry} from '../../api/inquiryApi';

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

	render() {
		const {inquiry} = this.props.location.state;

		return (
			<div className='container'>
				<div className=''>
					<h5>Inquiry</h5>
					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>phone Number</th>
								<th>Date</th>
								<th>No of passenger</th>
								<th>Status</th>
								<th>Package Name</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>{inquiry.name}</td>
								<td>{inquiry.email_address} </td>
								<td>{inquiry.phone}</td>
								<td>{inquiry.preferred_date}</td>
								<td>{inquiry.no_of_pax}</td>
								<td>{inquiry.status}</td>
								<td>{inquiry.package_name}</td>
								<td>
									{inquiry.status === 'pending' && (
										<span
											className='btn btn-secondary'
											onClick={() => this.confirmUserPackage(inquiry.id)}
										>
											Confirm
										</span>
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
