import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getVehicles} from '../../api/vehicleTypeApi';
import swal from 'sweetalert';
import history from '../../history';
import {Accordion, Icon, Menu, Segment, Input, Card, Dropdown, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';
import {CustomMenu} from './Menu';
import moment from 'moment';

class VehicleTypeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vehicleTypes: [],
			pagination: {}
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchVehicleTypeLists({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchVehicleTypeLists(queryString.parse(this.props.location.search));
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

	fetchVehicleTypeLists = (params) => {
		getVehicles(params)
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					vehicleTypes: response.data.vehicle_types,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				console.log('Fetch vehicle type Error', error);
			});
	};

	// destroyFaq(id) {
		// deleteFaq(id)
		// 	.then((response) => {
		// 		swal({
		// 			title: 'Faq deleted!',
		// 			text: `this Faq is deleted`,
		// 			icon: 'success',
		// 			button: 'Continue!'
		// 		});
		// 		history.go();
		// 	})
		// 	.catch((error) => {
		// 		swal({
		// 			title: 'Faq Delete error',
		// 			text: 'Something went wrong. please try again or contact us',
		// 			icon: 'error',
		// 			button: 'Continue!'
		// 		});
		// 	});

	// 	swal({
	// 		title: 'Are you sure?',
	// 		text: 'Once delete, your faq will be deleted',
	// 		icon: 'warning',
	// 		buttons: true,
	// 		dangerMode: true
	// 	}).then((willDelete) => {
	// 		if (willDelete) {
	// 			deleteFaq(id).then((response) => {
	// 				swal('this faq is deleted', {
	// 					icon: 'success'
	// 				});
	// 				history.go();
	// 			});
	// 		} else {
	// 			swal('Your faq is not deleted yet');
	// 		}
	// 	});
	// }

	onFilter = (values) => {
		this.setState({
			vehicleTypes: values.vehicle_types
		});
	};

	render() {
		const {vehicleTypes, pagination} = this.state;
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
                name: 'no_of_seats_cont',
                label: 'No of Seats',
                type: 'text'
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
					<h3 className='title'>Vehicle Type List</h3>
					{/* <Link to='/admin/faq/faq_form' className='btn bg-none color-accent'>
						Add Faq
					</Link> */}
				</div>
				<CustomMenu
					submitUrl='vehicle_types'
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
									<th>Name</th>
									<th>Created At</th>
									<th>No of Seats</th>
									{/* <th>Actions</th> */}
								</tr>
							</thead>

							<tbody>
								{vehicleTypes.map((vehicleType, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{vehicleType.name}</td>
											<td>{moment(vehicleType.created_at).format('D MMMM, YYYY')}</td>
											<td>{vehicleType.no_of_seats} </td>
											{/* <td>
												<Link
													to={{
														pathname: `/admin/category_details/${category.idx}`,
														state: {
															category: category
														}
													}}
												>
													<i className='fas fa-contact' />
													<span className='btn bg-none text-primary'>view</span>
												</Link>

												<Link
													to={{
														pathname: '/admin/category_form',
														state: {
															category: category
														}
													}}
												>
													<i className='fas fa-contact' />
													<span className='btn bg-none text-primary'>edit</span>
												</Link>
												<span
													className='btn bg-none text-danger'
													onClick={() => this.destroyCategory(category.idx)}
												>
													Delete
												</span>
											</td> */}
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
export default VehicleTypeList;
