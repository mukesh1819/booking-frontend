import React, {
	Component
} from 'react';
import {
	Link
} from 'react-router-dom';
import axios from 'axios';
import {
	passCsrfToken,
	toTableData
} from '../../helpers/helpers';
import {
	getPackages
} from '../../api/packageApi';

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
				console.log('List of Packages', response.data);
				this.setState({
					packages: response.data
				});
			})
			.catch((errors) => {
				console.log('Fetch Package Error', errors);
			});
	};

	render() {
		const {
			packages
		} = this.state;
		return ( <
			div className = 'container' >
			<
			div className = '' >
			<
			h5 > Packages < /h5> <
			table className = 'table table-striped table-hover table-sm'
			ref = 'main' >
			<
			thead >
			<
			tr >
			<
			th > ID < /th> <
			th > Name < /th> <
			th > Category < /th> <
			th > Partner < /th> <
			th > Price < /th> <
			th > Actions < /th> <
			/tr> <
			/thead>

			<
			tbody > {
				packages.map((aPackage) => {
					return ( <
						tr >
						<
						td > {
							aPackage.id
						} < /td> <
						td > {
							aPackage.name
						} < /td> <
						td > {
							aPackage.category.name
						} < /td> <
						td >
						<
						Link to = {
							{
								pathname: `/admin/partner/${aPackage.partner.id}`,
								state: {
									partner: aPackage.partner
								}
							}
						} >
						<
						span className = 'px-1' > a {
							aPackage.partner.name
						} < /span> <
						/Link> <
						/td> <
						td > {
							aPackage.price
						} < /td>

						<
						td >
						<
						Link to = {
							{
								pathname: '/packages/edit',
								state: {
									aPackage: aPackage
								}
							}
						} >
						<
						i className = 'fas fa-contact' / >
						<
						span className = 'px-1' > Edit < /span> <
						/Link> <
						/td> <
						/tr>
					);
				})
			} <
			/tbody> <
			/table> <
			/div> <
			/div>
		);
	}
}
export default PackagesList;