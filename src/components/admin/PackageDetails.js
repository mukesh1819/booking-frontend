import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Checkbox, Card} from 'semantic-ui-react';
import {updatePublish, deletePackage} from '../../api/packageApi';
import history from '../../history';
import {Package} from '../packages';

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
			<div className='row'>
				<div className='col-12 col-md-4'>
					<Package aPackage={aPackage} />
					<div className=''>
						<span className='btn btn-outline-primary' onChange={this.handleChange}>
							Publish Package
						</span>
					</div>
				</div>

				<div className='col-12 col-md-8'>
					<Card fluid>
						<Card.Content>
							<div className='d-flex justify-content-between'>
								<h3 className='title'>Details</h3>
								<div>
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
									<span
										className='btn btn-outline-danger'
										onClick={() => this.destroyPackage(aPackage.idx)}
									>
										Delete
									</span>
								</div>
							</div>
							<div className='list-view'>
								<div className='list'>
									<span className='label'>Category</span>
									<span className='value'>{aPackage.category.name}</span>
								</div>
								<div className='list'>
									<span className='label'>Published</span>
									<span className='value'>{aPackage.published}</span>
								</div>
							</div>

							<div>
								<h3 className='title'>Descriptions</h3>
								<div
									dangerouslySetInnerHTML={{
										__html: aPackage.description
									}}
								/>
							</div>
							<div className='row'>
								<div className='col-6'>
									<h3 className='title'>Inclusions</h3>
									{aPackage.inclusions}
								</div>
								<div className='col-6'>
									<h3 className='title'>Exclusions</h3>
									{aPackage.exclusions}
								</div>
							</div>
						</Card.Content>
					</Card>
				</div>
			</div>
		);
	}
}
export default PackageDetails;
