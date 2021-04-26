import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getRouteRates, deleteRouteRate} from '../../api/vehicleApi';
import swal from 'sweetalert';
import history from '../../history';
import {Accordion, Icon, Menu, Segment, Input, Card, Dropdown, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';
import {CustomMenu} from './Menu';
import moment from 'moment';

class RouteRateList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			routeRates: [],
			pagination: {}
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchRouteRateLists({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchRouteRateLists(queryString.parse(this.props.location.search));
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

	fetchRouteRateLists = (params) => {
		getRouteRates(params)
			.then((response) => {
				console.log('List of Rates', response.data);
				this.setState({
					routeRates: response.data.route_rates,
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
			text: 'Do you want to delete this route rate?',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteRouteRate(id).then((response) => {
					swal('Route rate deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Route rate not deleted yet.');
			}
		});
	}

	onFilter = (values) => {
		this.setState({
			routeRates: values.route_rates
		});
	};

	render() {
		const {routeRates, pagination} = this.state;
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
                name: 'vehicle_type_name_cont'	
            }
		];
		return (
			<div className='ui container'>
				<div className='d-flex justify-content-between'>
					<h3 className='title'>Route Rate List</h3>
					<Link to='/admin/route_rate/route_rate_form' className='btn bg-none color-accent'>
						Add Route Rate
					</Link>
				</div>
				<CustomMenu
					submitUrl='route_rates'
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
									<th>From</th>
									<th>To</th>
									<th>Rate</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{routeRates.map((routeRate, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{routeRate.vehicle_type.name}</td>
											<td>{routeRate.source}</td>
											<td>{routeRate.destination}</td>
											<td>{routeRate.price} </td>
											<td>
												<Link
													to={{
														pathname: `/admin/route_rate/route_rate_form/${routeRate.idx}`,
														state: {
															routeRate: routeRate
														}
													}}
												>
													<i className='fas fa-contact' />
													<span className='btn bg-none text-primary'>edit</span>
												</Link>
												<span
													className='btn bg-none text-danger'
													onClick={() => this.destroyRouteRate(routeRate.idx)}
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
export default RouteRateList;
