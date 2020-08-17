import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import history from '../../history';
import swal from 'sweetalert';
import FilterForm from './FilterForm';
import {CustomMenu} from './Menu';
import {Card, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';
import moment from 'moment';
import {getAddons, deleteAddon} from '../../api/addonApi';

class AddonList extends Component{

    constructor(props){
        super(props);
        this.state={
            pagination: {},
			addons: []
        };
    }

    changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchAddons({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

    componentDidMount(){
		this.fetchAddons(queryString.parse(this.props.location.search));
    }

    fetchAddons(params) {
		getAddons(params)
			.then((response) => {
				this.setState({
					addons: response.data.addons,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				console.log('Addon fetch error', error);
			});
	}

    destroyAddon(id) {
		swal({
			title: 'Are you sure?',
			text: 'Once delete, your addon will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteAddon(id).then((response) => {
					swal('this addon is deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Your addon is not deleted yet');
			}
		});
    }
    
    onFilter = (values) => {
		this.setState({
			addons: values.addons
		});
	};

    render(){
        const {addons, pagination} = this.state;
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
				label: 'Name',
				type: 'text'
            },
            {
				name: 'description_cont',
				label: 'Description',
				type: 'text'
            },
            {
				name: 'price_eq',
				label: 'Amount',
				type: 'text'
            }
            
		];
        return(
            <div className='ui container'>
				<CustomMenu
					submitUrl='addons'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					// items={[
					// 	{
					// 		label: 'Category',
					// 		type: 'dropdown',
					// 		name: 'name_cont',
					// 		objects: [
					// 			{
					// 				label: 'Land Activities',
					// 				value: 'Land Activities'
					// 			},
					// 			{
					// 				label: 'Air Activities',
					// 				value: 'Air Activities'
					// 			},
					// 			{
					// 				label: 'Water Activities',
					// 				value: 'Water Activities'
					// 			}
					// 		]
					// 	}
					// ]}
				/>

				<Card fluid>
					<Card.Content>
						<div className='d-flex justify-content-between'>
							<h3 className='title'>Addons</h3>
							<Link to='/admin/addon_form' className='btn bg-none color-accent'>
								new addons
							</Link>
						</div>

						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
									<th>S. No.</th>
									<th>Name</th>
                                    <th>Price</th>
									<th>Created At</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{addons.map((addon, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{addon.name}</td>
											<td>{addon.price} </td>
											<td>{moment(addon.created_at).format('D MMMM, YYYY')}</td>
											<td>
												<Link
													to={{
														pathname: `/admin/addon_details/${addon.idx}`,
														state: {
															addon: addon
														}
													}}
												>
													<i className='fas fa-contact' />
													<span className='btn bg-none text-primary'>view</span>
												</Link>

												<Link
													to={{
														pathname: `/admin/addon/${addon.idx}/edit`,
														state: {
															addon: addon
														}
													}}
												>
													<i className='fas fa-contact' />
													<span className='btn bg-none text-primary'>edit</span>
												</Link>
												<span
													className='btn bg-none text-danger'
													onClick={() => this.destroyAddon(addon.idx)}
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
export default AddonList;