import React, {Component} from 'react';
import SearchPackage from './SearchPackage';
import PackageList from './PackageList';
import './packages.scss';

export default class Packages extends Component {
	render() {
		return (
			<React.Fragment>
				<SearchPackage />
				<PackageList />
			</React.Fragment>
		);
	}
}
