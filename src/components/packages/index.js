import React, {Component} from 'react';
import SearchPackage from './SearchPackage';
import PackageList from './PackageList';

export default class Packages extends Component {
	render() {
		return (
			<React.Fragment>
				<PackageList />
			</React.Fragment>
		);
	}
}
