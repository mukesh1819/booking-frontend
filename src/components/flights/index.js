import React, {Component} from 'react';
import SearchFlightForm from './SearchFlightForm';
import FlightList from './FlightList';
import PackageList from '../packages/PackageList';
import './flights.scss';
import TabView from '../shared/TabView';
import Sidebar from '../shared/Sidebar';
import Banner from '../shared/Banner';
export default class Flights extends Component {
	render() {
		const tabs = [{name: 'flights', label: 'Flights'}, {name: 'packages', label: 'Packages'}];
		return (
			<React.Fragment>
				<TabView tabs={tabs}>
					<div
						class='tab-pane fade active show bg-body'
						id='nav-flights'
						role='tabpanel'
						aria-labelledby='nav-flights-tab'
					>
						<SearchFlightForm />
						<div className='container text-center'>
							<h4> Things to do </h4>
							{/* <PackageList /> */}
						</div>
					</div>
					<div class='tab-pane fade' id='nav-packages' role='tabpanel' aria-labelledby='nav-packages-tab'>
						<div className='container'>
							<h4> Popular Packages </h4>
							<PackageList />
						</div>
					</div>
				</TabView>
				<Sidebar />
			</React.Fragment>
		);
	}
}
