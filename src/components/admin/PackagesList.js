import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getPackages} from '../../api/packageApi';
import swal from 'sweetalert';
import {Badge} from '../shared';
import FilterForm from './FilterForm';
import {Segment, Card} from 'semantic-ui-react';
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
			.catch((error) => {
				console.log('Fetch Package Error', error);
			});
	};

	onFilter = (values) => {
		this.setState({
			packages: values
		});
	};

	render() {
		const {packages} = this.state;
		return (
			<div className='ui container'>
				<FilterForm
					submitUrl='packages'
					fields={[
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
							label: 'package name',
							type: 'text'
						},

						{
							name: 'price_eq',
							label: 'price',
							type: 'text'
						},

						{
							name: 'category_name_eq',
							label: 'category name',
							type: 'select',
							options: ['Land Activities', 'Air Activities', 'Water Activities']
						},

						{
							name: 'published_eq',
							label: 'published',
							type: 'select',
							options: ['true', 'false']
						}
					]}
					onSubmit={(values) => this.onFilter(values)}
				/>

				<Card fluid>
					<Card.Content>
						<div className='d-flex justify-content-between'>
							<h3 className='title'>Package List</h3>
							<Link to='/admin/package_form' className='btn bg-none color-accent'>
								add package
							</Link>
						</div>

						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
									<th>Sno</th>
									<th>Name</th>
									<th>Category</th>
									<th>Price</th>
									<th>Published</th>
									<th>Created At</th>
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
												<Badge type={aPackage.published}>
													{aPackage.published ? 'Published' : 'Not Published'}
												</Badge>
											</td>
											<td>{aPackage.created_at}</td>

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
					</Card.Content>
				</Card>
			</div>
		);
	}
}
export default PackagesList;
