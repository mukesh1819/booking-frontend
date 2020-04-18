import React, {Component} from 'react';
import {getInquiries} from '../../api/inquiryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Badge} from '../shared';

class InquiryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inquiries: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchInquiries();
	}

	fetchInquiries() {
		getInquiries()
			.then((response) => {
				// console.log('inquiries', response.data);
				this.setState({
					inquiries: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'Inquiry fetch error',
					text: 'could not able to fetch inquiry. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	render() {
		const {inquiries} = this.state;
		return (
			<div className='container p-4'>
				<div className=''>
					<h3 className='title'>Inquiries</h3>
					{inquiries.map((inquiry) => {
						var total_passenger = inquiry.number_of_adult + inquiry.number_of_child;
						return (
							<div className='card'>
								<div className='card-body row'>
									<div className='col-4'>
										<h3>
											{inquiry.first_name} {inquiry.last_name}
										</h3>
										<div className='text-muted text-small'>{inquiry.email_address}</div>
										<div className='text-muted text-small'>{inquiry.phone}</div>
									</div>

									<div className='col-4'>
										<div>
											<Badge type={inquiry.status}> {inquiry.status}</Badge>
										</div>
										<div>{inquiry.preferred_date}</div>
									</div>

									<div className='col-3'>
										<span className='title'>Package: </span>
										<span>{inquiry.package_name}</span>
										<div className='text-small text-muted'>
											<span className='text-strong'>Total Passengers: </span>
											{total_passenger}
										</div>
									</div>
									<div className='col-1'>
										<Link
											to={{
												pathname: '/admin/inquiry_details',
												state: {
													inquiry: inquiry
												}
											}}
										>
											<i className='fas fa-contact' />
											<span className='btn bg-none text-primary'>view</span>
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
export default InquiryList;
