import React, {Component} from 'react';
import {getCategories} from '../../api/categoryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers/helpers';
import {Link} from 'react-router-dom';

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
				console.log('inquiries', response.data);
				this.setState({
					categories: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const {categories} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<div className='col-12 d-flex justify-content-between'>
						<h5>Category List</h5>
						<Link to='/admin/categories/category_form'>new category</Link>
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
												<span className='px-1'>view</span>
											</Link>

											<Link
												to={{
													pathname: '/categories/category_form',
													state: {
														category: category
													}
												}}
											>
												<i className='fas fa-contact' />
												<span className='px-1'>edit</span>
											</Link>
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
