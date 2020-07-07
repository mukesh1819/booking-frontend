import React, {Component} from 'react';
import {getLocations, deleteLocation} from '../../api/locationApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {Link} from 'react-router-dom';
import history from '../../history';
import swal from 'sweetalert';
import FilterForm from './FilterForm';
import {CustomMenu} from './Menu';
import {Card, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';

class LocationList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
			locations: []
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchLocations({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		this.fetchLocations(queryString.parse(this.props.location.search));
	}

	fetchLocations(params) {
		getLocations(params)
			.then((response) => {
				// console.log('inquiries', response.data);
				this.setState({
					locations: response.data.locations,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log('Location fetch error', error);
			});
	}

	destroyLocation(id) {
		// deleteCategory(id)
		// 	.then((response) => {
		// 		swal({
		// 			title: 'Category deleted!',
		// 			text: `this category is deleted`,
		// 			icon: 'success',
		// 			button: 'Continue!'
		// 		});
		// 		history.go();
		// 	})
		// 	.catch((error) => {
		// 		swal({
		// 			title: 'Category Delete error',
		// 			text: 'Something went wrong. please try again or contact us',
		// 			icon: 'error',
		// 			button: 'Continue!'
		// 		});
		// 	});

		swal({
			title: 'Are you sure?',
			text: 'Once delete, your location will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteLocation(id).then((response) => {
					swal('this location is deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Your location is not deleted yet');
			}
		});
	}

	onFilter = (values) => {
		this.setState({
			locations: values.locations
		});
	};

	render() {
		const {locations, pagination} = this.state;
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
				name: 'name_cont',
				label: 'Location Name',
				type: 'text'
			},
			{
				name: 'location_type_eq',
				label: 'Location Type',
				type: 'select',
				options: ['airport', 'city']
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
					submitUrl='admin/locations'
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
							<h3 className='title'>Locations</h3>
							<Link to='/admin/location_form' className='btn bg-none color-accent'>
								add location
							</Link>
						</div>

						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
									<th>S. No.</th>
									<th>Name</th>
									<th>Type</th>
									<th>Created At</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{locations.map((location, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{location.name}</td>
											<td>{location.location_type} </td>
											<td>{location.created_at}</td>
											<td>
												{/* <Link
													to={{
														pathname: `/admin/location_details/${location.idx}`,
														state: {
															location: location
														}
													}}
												>
													<i className='fas fa-contact' />
													<span className='btn bg-none text-primary'>view</span>
												</Link> */}

												<Link
													to={{
														pathname: `/admin/location_form/${location.idx}/edit`,
														state: {
															location: location
														}
													}}
												>
													<i className='fas fa-contact' />
													<span className='btn bg-none text-primary'>edit</span>
												</Link>
												<span
													className='btn bg-none text-danger'
													onClick={() => this.destroyLocation(location.idx)}
												>
													Delete
												</span>
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
export default LocationList;
