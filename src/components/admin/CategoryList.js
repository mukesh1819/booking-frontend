import React, {Component} from 'react';
import {getCategories, deleteCategory} from '../../api/categoryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {Link} from 'react-router-dom';
import history from '../../history';
import swal from 'sweetalert';

class CategoryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchCategories();
	}

	fetchCategories() {
		getCategories()
			.then((response) => {
				// console.log('inquiries', response.data);
				this.setState({
					categories: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'category fetch error',
					text: 'Something went wrong. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	destroyCategory(id){
		deleteCategory(id)
		.then((response) => {
			swal({
				title: 'Category deleted!',
				text: `this category is deleted`,
				icon: 'success',
				button: 'Continue!'
			});
			history.go();

		})
		.catch((error) => {
			swal({
				title: 'Category Delete error',
				text: 'Something went wrong. please try again or contact us',
				icon: 'error',
				button: 'Continue!'
			});
		})
	}

	render() {
		const {categories} = this.state;
		return (
			<div className='container p-4'>
				<div className=''>
					<div className='d-flex justify-content-between'>
						<h3 className='title'>Categories</h3>
						<Link to='/admin/category_form' className='btn bg-none text-secondary'>
							new category
						</Link>
					</div>

					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>Name</th>
								<th>order</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{categories.map((category) => {
								return (
									<tr>
										<td>{category.name}</td>
										<td>{category.order} </td>

										<td>
											<Link
												to={{
													pathname: '/admin/category_details',
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
											<span className='btn btn-danger ml-5' onClick={() => this.destroyCategory(category.idx)}>
												Delete
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
export default CategoryList;
