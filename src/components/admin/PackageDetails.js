import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Checkbox} from 'semantic-ui-react';
import {updatePackage} from '../../api/packageApi';

class PackageDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			published: false
		};
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
				this.setState({
					published: data.checked
				});
				updatePackage(this.props.location.state.aPackage.idx, this.state.published).then((response) => {
					swal('Poof! Your package has been published', {
						icon: 'success'
					});
				});
			} else {
				swal('Your package is not published yet');
			}
		});
	};

	render() {
		const {aPackage} = this.props.location.state;
		const {published} = this.state;

		return (
			<div className='container'>
				<div className=''>
					<h3>Details</h3>

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
									<Checkbox checked={published} onChange={this.handleChange} />
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
