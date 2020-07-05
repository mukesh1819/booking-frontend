import React, {Component} from 'react';
import {getCarInquiries} from '../../api/carInquiryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {Link} from 'react-router-dom';
import history from '../../history';
import swal from 'sweetalert';
import FilterForm from './FilterForm';
import {CustomMenu} from './Menu';
import {Card, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';
import {Badge} from '../shared';
// import '../../i18n';
// import {useTranslation, initReactI18next} from 'react-i18next';

class CarInquiryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
			carInquiries: []
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchInquiry({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		this.fetchInquiry(queryString.parse(this.props.location.search));
	}

	fetchInquiry(params) {
		getCarInquiries(params)
			.then((response) => {
				// console.log('inquiries', response.data);
				this.setState({
					carInquiries: response.data.car_inquiries,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log('car inquiry fetch error', error);
			});
	}

	// destroyLocation(id) {
	// 	// deleteCategory(id)
	// 	// 	.then((response) => {
	// 	// 		swal({
	// 	// 			title: 'Category deleted!',
	// 	// 			text: `this category is deleted`,
	// 	// 			icon: 'success',
	// 	// 			button: 'Continue!'
	// 	// 		});
	// 	// 		history.go();
	// 	// 	})
	// 	// 	.catch((error) => {
	// 	// 		swal({
	// 	// 			title: 'Category Delete error',
	// 	// 			text: 'Something went wrong. please try again or contact us',
	// 	// 			icon: 'error',
	// 	// 			button: 'Continue!'
	// 	// 		});
	// 	// 	});

	// 	swal({
	// 		title: 'Are you sure?',
	// 		text: 'Once delete, your location will be deleted',
	// 		icon: 'warning',
	// 		buttons: true,
	// 		dangerMode: true
	// 	}).then((willDelete) => {
	// 		if (willDelete) {
	// 			deleteLocation(id).then((response) => {
	// 				swal('this location is deleted', {
	// 					icon: 'success'
	// 				});
	// 				history.go();
	// 			});
	// 		} else {
	// 			swal('Your location is not deleted yet');
	// 		}
	// 	});
	// }

	onFilter = (values) => {
		this.setState({
			carInquiries: values.car_inquiries
		});
	};

	render() {
		const {carInquiries, pagination} = this.state;
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
				name: 'source_eq',
				label: 'Source',
				type: 'text'
			},
			{
				name: 'destination_eq',
				label: 'Destination',
				type: 'text'
			},

			{
				name: 'start_date_gteq',
				label: 'To Start Date',
				type: 'date'
			},
			{
				name: 'start_date_lteq',
				label: 'From Start Date',
				type: 'date'
			},
			{
				name: 'car_type_cont',
				label: 'Car Type',
				type: 'text'
			}
		];
		return (
			<div className='ui container'>
				{/* <FilterForm
					submitUrl='locations'
					fields={}
					onSubmit={(values) => this.onFilter(values)}
				/> */}

				<CustomMenu
					submitUrl='admin/car_inquiries'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					items={[
						{
							label: 'Location Type',
							type: 'dropdown',
							name: 'location_type_cont',
							objects: [
								{
									label: 'Airport',
									value: 'airport'
								},

								{
									label: 'City',
									value: 'city'
								}
							]
						}
					]}
				/>

				<Card fluid>
					<Card.Content>
						<div className='d-flex justify-content-between'>
							<h3 className='title'>Car Inquiries</h3>
						</div>

						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
									<th>S. No.</th>
									<th>Car Type</th>
									<th>No of days</th>
									<th>Airport Transfer</th>
									<th>Within City</th>
									<th>Created At</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{carInquiries.map((carInquiry, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{carInquiry.car_type}</td>
											<td>{carInquiry.no_of_days} </td>
											<td>
												<Badge type={carInquiry.airport_transfer}>
													{carInquiry.airport_transfer ? 'True' : 'False'}
												</Badge>
											</td>
											<td>
												<Badge type={carInquiry.within_city}>
													{carInquiry.within_city ? 'True' : 'False'}
												</Badge>
											</td>

											<td>{carInquiry.created_at}</td>
											<td>
												<Link
													to={{
														pathname: `/admin/car_inquiry_details/${carInquiry.idx}`,
														state: {
															carInquiries: carInquiry
														}
													}}
												>
													<i className='fas fa-contact' />
													<span className='btn bg-none text-primary'>view</span>
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
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
export default CarInquiryList;
