import React, {Component} from 'react';
import Package from './Package';
import {getPackages} from '../../api/packageApi';

class PackageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			context: props.context,
			packages: []
		};
	}

	componentDidMount() {
		this.fetchDetails();
	}

	fetchDetails() {
		console.log('Fetching all packages');
		getPackages()
			.then((response) => {
				console.log(response.data);
				this.setState({
					packages: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className='container p-4'>
				{/* <div className='row'>
					<div className='col-2'>
						<div className='side-nav' />
					</div>
					<div className='col-10' />
				</div> */}
				<div className='d-flex flex-wrap justify-content-around'>
					{this.state.packages.map((aPackage) => {
						return <Package aPackage={aPackage} />;
					})}
				</div>
			</div>
		);
	}
}
export default PackageList;
