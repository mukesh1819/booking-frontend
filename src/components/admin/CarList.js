import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getCars} from '../../api/carApi';
import swal from 'sweetalert';
import {Badge} from '../shared';
import FilterForm from './FilterForm';
import {CustomMenu} from './Menu';
import history from '../../history';
import queryString from 'query-string';
import {Segment, Card, Pagination} from 'semantic-ui-react';

class PackagesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cars: [],
			pagination: {}
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchCars({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchCars(queryString.parse(this.props.location.search));
	}

	fetchCars = (params) => {
		getCars(params)
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					cars: response.data.cars,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				console.log('Fetch Car Error', error);
			});
	};

	onFilter = (values) => {
		this.setState({
			cars: values.cars
		});
	};

	render() {
		const {cars, pagination} = this.state;
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
				name: 'car_type_cont',
				label: 'Car Type',
				type: 'text'
			},

			{
				name: 'price_eq',
				label: 'Price',
				type: 'text'
			},

			{
				name: 'status_eq',
				label: 'status',
				type: 'select',
				options: ['active', 'inactive']
			}
		];

		return (
			<div className='ui container'>
				<FilterForm submitUrl='admin/cars' fields={filterFields} onSubmit={(values) => this.onFilter(values)} />
				{/* <CustomMenu
					submitUrl='packages'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					items={[
						{
							label: 'Status',
							type: 'dropdown',
							name: 'published_eq',
							objects: [
								{
									label: 'Published',
									value: true
								},
								{
									label: 'Unpublished',
									value: false
								}
							]
						},
						{
							label: 'Category',
							type: 'dropdown',
							name: 'category_name_cont',
							objects: [
								{
									label: 'Land Activities',
									value: 'Land Activities'
								},
								{
									label: 'Air Activities',
									value: 'Air Activities'
								},
								{
									label: 'Water Activities',
									value: 'Water Activities'
								}
							]
						}
					]}
				/> */}

				<Card fluid>
					<Card.Content>
						<div className='d-flex justify-content-between'>
							<h3 className='title'>Car List</h3>
							<Link to='/admin/car_form' className='btn bg-none color-accent'>
								add car
							</Link>
						</div>

						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
									<th>S. No.</th>
									<th>Car Type</th>
									<th>No of seats</th>
									<th>Price</th>
									<th>Details</th>
                                    <th>Status</th>
									<th>Created At</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{cars.map((car, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{car.car_type}</td>
											<td>{car.no_of_seats} </td>
											<td>{car.price}</td>
											<td>{car.details}</td>
											<td>{car.status}</td>
											<td>{car.created_at}</td>

											<td>
												<Link
													to={{
														pathname: `/admin/car_details/${car.idx}`,
														state: {
															car: car
														}
													}}
													className='btn bg-none text-primary'
												>
													View
												</Link>
												{/* <Link
												to={{
													pathname: `/partners/package_form/${aPackage.id}`,
													state: {
														aPackage: aPackage
													}
												}}
											>
												<i className='fas fa-contact' />
												<span className='px-1'>Edit</span>
											</Link> */}
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
export default PackagesList;
