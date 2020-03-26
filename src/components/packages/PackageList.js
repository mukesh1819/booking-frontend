import React, {Component} from 'react';
import Package from './Package';
import {getPackages} from '../../api/packageApi';
import {Checkbox, Dropdown} from 'semantic-ui-react';

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
				<div className='row'>
					<div className='d-none d-md-block col-0 col-md-2 p-0'>
						<div className='card'>
							<div className='card-header'>
								<h3>Filter</h3>
							</div>
							<div className='card-body'>
								<Dropdown placeholder='Select Type' fluid selection options={[]} className='mb-4' />
								<Checkbox
									label='Cheapest'
									onChange={console.log('Checkbox changed')}
									className='d-block'
								/>
								<Checkbox
									label='Quickest'
									onChange={console.log('Checkbox changed')}
									className='d-block'
								/>
								<Checkbox
									label='Earliest'
									onChange={console.log('Checkbox changed')}
									className='d-block'
								/>
							</div>
						</div>
					</div>
					<div className='col-12 col-md-10'>
						<div className='d-flex flex-wrap justify-content-around'>
							{this.state.packages.map((aPackage) => {
								return <Package aPackage={aPackage} />;
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default PackageList;
