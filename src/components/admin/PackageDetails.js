import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Checkbox, Card} from 'semantic-ui-react';
import {updatePublish, deletePackage} from '../../api/packageApi';
import history from '../../history';
import {Package} from '../packages';
import {showPackage} from '../../api/packageApi';

class PackageDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			aPackage: {
				images: [],
				addons: [],
				activities: [],
				category: {}
			}
		};
		showPackage(this.props.match.params.idx)
			.then((response) => {
				this.setState({
					aPackage: response.data
				});
			})
			.catch((error) => {
				console.log('PACKAGE DETAILS ERROR', error);
			});
	}

	publish = (shouldPublish) => {
		swal({
			title: 'Are you sure?',
			text: `Are you sure you want to ${shouldPublish ? 'publish' : 'unpublish'} this package?`,
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((action) => {
			if (action) {
				updatePublish(this.props.location.state.aPackage.idx, shouldPublish).then((response) => {
					swal(`Your package has been ${shouldPublish ? 'published' : 'unpublished'}`, {
						icon: 'success'
					});
					history.push('/admin/packages');
				});
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
		}).then((action) => {
			if (action) {
				deletePackage(id).then((response) => {
					swal('Your package has been deleted', {
						icon: 'success'
					});
					history.push('/admin/packages');
				});
			}
		});
	}

	render() {
		const {aPackage} = this.state;
		return (
			<div className='row'>
				<div className='col-12 col-md-4'>
					<Package aPackage={aPackage} />
					{!aPackage.published && (
						<div className=''>
							<span className='btn btn-outline-primary' onClick={() => this.publish(true)}>
								Publish Package
							</span>
						</div>
					)}

					{aPackage.published && (
						<div className=''>
							<span className='btn btn-outline-danger' onClick={() => this.publish(false)}>
								Unpublish Package
							</span>
						</div>
					)}
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
									<span className='value'>{`${aPackage.published}`}</span>
								</div>
							</div>

							<div>
								<h3 className='title'>Addons</h3>
								{aPackage.addons.map((addon) => {
									return (
										<div
											className='ui label'
											data-tooltip={addon.description}
											data-position='bottom left'
										>
											{addon.name}
										</div>
									);
								})}
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
