import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getVehicleRates, deleteVehicleRate} from '../../api/vehicleApi';
import swal from 'sweetalert';
import history from '../../history';
import {Accordion, Icon, Menu, Segment, Input, Card, Dropdown, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';
import {CustomMenu} from './Menu';
import moment from 'moment';

class VehicleRateList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vehicleRates: [],
			pagination: {}
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchVehicleRateLists({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchVehicleRateLists(queryString.parse(this.props.location.search));
	}

	// handleItemClick = (e, {name}) => {
	// 	var searchQuery = name == 'All' ? '' : `q[category_eq]=${name.toLowerCase()}`;
	// 	this.fetchFaqLists(searchQuery);
	// 	this.setState({activeMenuItem: name});
	// };

	// handleClick = (e, titleProps) => {
	// 	const {index} = titleProps;
	// 	const {activeIndex} = this.state;
	// 	const newIndex = activeIndex === index ? -1 : index;

	// 	this.setState({activeIndex: newIndex});
	// };

	fetchVehicleRateLists = (params) => {
		getVehicleRates(params)
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					vehicleRates: response.data.vehicle_rates,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				console.log('Fetch vehicle type Error', error);
			});
	};

	destroyRouteRate(id) {
		swal({
			title: 'Are you sure?',
			text: 'Do you want to delete this vehicle rate?',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteVehicleRate(id).then((response) => {
					swal('Vehicle rate deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Vehicle rate not deleted yet.');
			}
		});
	}

	onFilter = (values) => {
		this.setState({
			vehicleRates: values.vehicle_rates
		});
	};

	render() {
		const {vehicleRates, pagination} = this.state;
		const filterFields = [
			// {
			// 	name: 'category_eq',
			// 	label: 'Category',
			// 	type: 'select',
			// 	options: ['flight', 'package']
			// },
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
                label: 'Name',
                type: 'text',
                name: 'name_cont'	
            }
		];
		return (
			<div className='ui container'>
				<div className='d-flex justify-content-between'>
					<h3 className='title'>Vehicle Rate List</h3>
					<Link to='/admin/vehicle_rate/vehicle_rate_form' className='btn bg-none color-accent'>
						Add Vehicle Rate
					</Link>
				</div>
				<CustomMenu
					submitUrl='vehicle_rates'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					items={[
						
                        
            
					]}
				/>

                <Card fluid>
					<Card.Content>
						{/* <div className='d-flex justify-content-between'>
							<h3 className='title'>Vehicle Type List</h3>
							{/* <Link to='/admin/category_form' className='btn bg-none color-accent'>
								new category
							</Link> */}
						{/* </div> */} 
						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
									<th>S. No.</th>
									<th>Vehicle</th>
									<th>Description</th>
									<th>Rate</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{vehicleRates.map((vehicleRate, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{vehicleRate.vehicle_type.name}</td>
											<td>{vehicleRate.description}</td>
											<td>{vehicleRate.price} </td>
											<td>
												<Link
													to={{
														pathname: `/admin/vehicle_rate/vehicle_rate_form/${vehicleRate.idx}`,
														state: {
															vehicleRate: vehicleRate
														}
													}}
												>
													<i className='fas fa-contact' />
													<span className='btn bg-none text-primary'>edit</span>
												</Link>
												<span
													className='btn bg-none text-danger'
													onClick={() => this.destroyVehicleRate(vehicleRate.idx)}
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
export default VehicleRateList;
