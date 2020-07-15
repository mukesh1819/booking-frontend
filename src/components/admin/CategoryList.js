import React, {Component} from 'react';
import {getCategories, deleteCategory} from '../../api/categoryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {Link} from 'react-router-dom';
import history from '../../history';
import swal from 'sweetalert';
import FilterForm from './FilterForm';
import {CustomMenu} from './Menu';
import {Card, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';
import moment from 'moment';

class CategoryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagination: {},
			categories: []
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchCategories({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		this.fetchCategories(queryString.parse(this.props.location.search));
	}

	fetchCategories(params) {
		getCategories(params)
			.then((response) => {
				// console.log('inquiries', response.data);
				this.setState({
					categories: response.data.categories,
					pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log('Category fetch error', error);
			});
	}

	destroyCategory(id) {
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
			text: 'Once delete, your category will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteCategory(id).then((response) => {
					swal('this category is deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Your category is not deleted yet');
			}
		});
	}

	onFilter = (values) => {
		this.setState({
			categories: values.categories
		});
	};

	render() {
		const {categories, pagination} = this.state;
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
			}
		];
		return (
			<div className='ui container'>
				{/* <FilterForm
					submitUrl='categories'
					fields={}
					onSubmit={(values) => this.onFilter(values)}
				/> */}

				<CustomMenu
					submitUrl='categories'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					items={[
						{
							label: 'Category',
							type: 'dropdown',
							name: 'name_cont',
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
				/>

				<Card fluid>
					<Card.Content>
						<div className='d-flex justify-content-between'>
							<h3 className='title'>Categories</h3>
							<Link to='/admin/category_form' className='btn bg-none color-accent'>
								new category
							</Link>
						</div>

						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
									<th>S. No.</th>
									<th>Name</th>
									<th>Order</th>
									<th>Created At</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{categories.map((category, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{category.name}</td>
											<td>{category.order} </td>
											<td>{moment(category.created_at).format('D MMMM, YYYY')}</td>
											<td>
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
export default CategoryList;
