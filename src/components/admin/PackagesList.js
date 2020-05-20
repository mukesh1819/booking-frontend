import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getPackages} from '../../api/packageApi';
import swal from 'sweetalert';
import {Badge} from '../shared';
import FilterForm from './FilterForm';
import {CustomMenu} from './Menu';
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
				name: 'price_eq',
				label: 'Price',
				type: 'text'
			}
		];

		return (
			<div className='ui container'>
				{/* <FilterForm submitUrl='packages' fields={filterFields} onSubmit={(values) => this.onFilter(values)} /> */}
				<CustomMenu
					submitUrl='packages'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					items={[
						{
							label: 'Status',
							type: 'dropdown',
							name: 'published_eq',
							objects: [
								{
									label: 'Published',
									value: true
								},
								{
									label: 'Unpublished',
									value: false
								}
							]
						},
						{
							label: 'Category',
							type: 'dropdown',
							name: 'category_name_cont',
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
							<h3 className='title'>Package List</h3>
							<Link to='/admin/package_form' className='btn bg-none color-accent'>
								add package
							</Link>
						</div>

						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
									<th>S. No.</th>
									<th>Name</th>
									<th>Category</th>
									<th>Price</th>
									<th>Published</th>
									<th>Created At</th>
									<th>Actions</th>
								</tr>
							</thead>

							<tbody>
								{packages.map((aPackage, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
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
														pathname: `/admin/package_details/${aPackage.idx}`,
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
