import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getPackages} from '../../api/packageApi';
import swal from 'sweetalert';
import {Badge} from '../shared';

class PackagesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			packages: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchPackages();
	}

	fetchPackages = () => {
		getPackages()
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					packages: response.data
				});
			})
			.catch((errors) => {
				// console.log('Fetch Package Error', errors);
				swal({
					title: 'Package fetch error',
					text: 'could not able to fetch package. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	};

	render() {
		const {packages} = this.state;
		return (
			<div className='container p-4'>
				<div className=''>
					<div className='d-flex justify-content-between'>
						<h3 className='title'>Package List</h3>
						<Link to='/admin/package_form' className='btn bg-none text-secondary'>
							add package
						</Link>
					</div>

					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Category</th>
								<th>Price</th>
								<th>Published</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{packages.map((aPackage) => {
								return (
									<tr>
										<td>{aPackage.id}</td>
										<td>{aPackage.name}</td>
										<td>{aPackage.category.name} </td>
										<td>{aPackage.price}</td>
										<td>
											<Badge type={`${aPackage.published}`}>{aPackage.published ? 'Published' : 'Not Published'}</Badge>
										</td>

										<td>
											<Link
												to={{
													pathname: `/admin/package_details`,
													state: {
														aPackage: aPackage
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
				</div>
			</div>
		);
	}
}
export default PackagesList;
