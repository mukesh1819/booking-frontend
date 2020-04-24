import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Checkbox} from 'semantic-ui-react';
import {updatePublish, deletePackage} from '../../api/packageApi';
import history from '../../history';

class PackageDetails extends Component {
	constructor(props) {
		super(props);
	}

	handleChange = (e, data) => {
		swal({
			title: 'Are you sure?',
			text: 'Once checked, your package will be published',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				updatePublish(this.props.location.state.aPackage.idx, data.checked).then((response) => {
					swal('Your package has been published', {
						icon: 'success'
					});
					history.push('/admin/packages');
				});
			} else {
				swal('Your package is not published yet');
			}
		});
	};

	destroyPackage(id) {
		// deletePackage(id)
		// 	.then((response) => {
		// 		swal({
		// 			title: 'Package deleted!',
		// 			text: `this package is deleted`,
		// 			icon: 'success',
		// 			button: 'Continue!'
		// 		});
		// 		history.push('/admin/packages');
		// 	})
		// 	.catch((error) => {
		// 		swal({
		// 			title: 'Package Delete error',
		// 			text: 'Something went wrong. please try again or contact us',
		// 			icon: 'error',
		// 			button: 'Continue!'
		// 		});
		// 	});

		swal({
			title: 'Are you sure?',
			text: 'Once delete, your package will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deletePackage(id).then((response) => {
					swal('Your package has been deleted', {
						icon: 'success'
					});
					history.push('/admin/packages');
				});
			} else {
				swal('Your package is not deleted yet');
			}
		});
	}

	render() {
		const {aPackage} = this.props.location.state;
		return (
			<div className='container'>
				<div className=''>
					<div className='d-flex justify-content-between'>
						<h3>Details</h3>
						<Link
							to={{
								pathname: `/admin/package_form`,
								state: {
									aPackage: aPackage
								}
							}}
							className='btn btn-outline-primary'
						>
							Edit
						</Link>
					</div>

					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Images</th>
								<th>Category</th>
								<th>Price</th>
								<th>Offer Price</th>
								<th>Location</th>
								<th>Duration</th>
								<th>Description</th>
								<th>Inclusions</th>
								<th>Exclusions</th>
								<th>Published</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>{aPackage.id}</td>
								<td>{aPackage.name}</td>
								<td>{aPackage.images}</td>
								<td>{aPackage.category.name} </td>
								<td>{aPackage.price}</td>
								<td>{aPackage.offer_price}</td>
								<td>{aPackage.location}</td>
								<td>{aPackage.duration}</td>
								<td>{aPackage.description}</td>
								<td>{aPackage.inclusions}</td>
								<td>{aPackage.exclusions}</td>
								<td>
									<Checkbox checked={aPackage.published} onChange={this.handleChange} />
								</td>
								<td>
									<span className='btn btn-danger' onClick={() => this.destroyPackage(aPackage.idx)}>
										Delete
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
export default PackageDetails;
