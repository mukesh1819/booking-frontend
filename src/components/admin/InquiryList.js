import React, {Component} from 'react';
import {getInquiries} from '../../api/inquiryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Badge} from '../shared';
import {CustomMenu} from './Menu';
import queryString from 'query-string';
import history from '../../history';
import {Card, Pagination} from 'semantic-ui-react';

class InquiryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
			inquiries: []
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchInquiries({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchInquiries(queryString.parse(this.props.location.search));
	}

	fetchInquiries(params) {
		getInquiries(params)
			.then((response) => {
				// console.log('inquiries', response.data);
				this.setState({
					inquiries: response.data.inquiries,
					pagination: response.data.meta.pagination
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
		const {inquiries, pagination} = this.state;
		const filterFields = [
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
				name: 'preferred_date_eq',
				label: 'Date of Activity',
				type: 'date'
			},
			// {
			// 	name: 'preferred_date_lteq',
			// 	label: 'To Preferred Date',
			// 	type: 'date'
			// },

			{
				name: 'first_name_or_last_name_cont',
				label: 'User Name',
				type: 'text'
			},

			{
				name: 'package_name_cont',
				label: 'Package name',
				type: 'text'
			},

			{
				name: 'email_address_cont',
				label: 'email',
				type: 'text'
			},

			{
				name: 'phone_cont',
				label: 'Mobile Number',
				type: 'text'
			}
		];
		return (
			<div className='ui container'>
				<CustomMenu
					submitUrl='inquiries'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					items={[
						{
							label: 'Status',
							type: 'dropdown',
							name: 'status_eq',
							objects: [
								{
									label: 'Pending',
									value: 'pending'
								},
								{
									label: 'Processing',
									value: 'processing'
								},
								{
									label: 'Verified',
									value: 'verified'
								}
							]
						}
					]}
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

				<div className='text-center p-2'>
					<Pagination
						activePage={pagination.current_page}
						sizePerPage={pagination.per_page}
						onPageChange={this.changeCurrentPage}
						totalPages={pagination.total_pages}
					/>
				</div>
			</div>
		);
	}
}
export default InquiryList;
