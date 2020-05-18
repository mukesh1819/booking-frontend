import React, {Component} from 'react';
import {getInquiries} from '../../api/inquiryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Badge} from '../shared';
import FilterForm from './FilterForm';
import {Card} from 'semantic-ui-react';

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
				console.log('inquiry fetch error', error);
			});
	}

	onFilter = (values) => {
		this.setState({
			inquiries: values
		});
	};

	render() {
		const {inquiries} = this.state;
		return (
			<div className='ui container'>
				<FilterForm
					submitUrl='inquiries'
					fields={[
						{
							name: 'created_at_gteq',
							label: 'From Date',
							type: 'date'
						},
						{
							name: 'created_at_lteq',
							label: 'To Date',
							type: 'date'
						},

						{
							name: 'preferred_date_gteq',
							label: 'From Preferred Date',
							type: 'date'
						},
						{
							name: 'preferred_date_lteq',
							label: 'To Preferred Date',
							type: 'date'
						},

						{
							name: 'first_name_or_last_name_cont',
							label: 'name',
							type: 'text'
						},

						{
							name: 'package_name_cont',
							label: 'package name',
							type: 'text'
						},

						{
							name: 'email_address_cont',
							label: 'email',
							type: 'text'
						},

						{
							name: 'status_eq',
							label: 'status',
							type: 'select',
							options: ['pending', 'processing', 'verified']
						},

						{
							name: 'phone_cont',
							label: 'Mobile Number',
							type: 'text'
						}
					]}
					onSubmit={(values) => this.onFilter(values)}
				/>

				<Card fluid>
					<Card.Content>
						<h3 className='title'>Inquiries</h3>
						{inquiries.map((inquiry) => {
							var total_passenger = inquiry.number_of_adult + inquiry.number_of_child;
							return (
								<div className='card'>
									<div className='card-body row'>
										<div className='col-4'>
											<div>{inquiry.sno}</div>
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
											<div>Created At - {inquiry.created_at}</div>
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
													pathname: `/admin/inquiry_details/${inquiry.package.idx}`,
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
					</Card.Content>
				</Card>
			</div>
		);
	}
}
export default InquiryList;
