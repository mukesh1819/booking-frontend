import React, {Component} from 'react';
import SearchFlightForm from './SearchFlightForm';
import FlightList from './FlightList';
import PackageList from '../packages/PackageList';
import './flights.scss';
import TabView from '../shared/TabView';
import Sidebar from '../shared/Sidebar';
import Banner from '../shared/Banner';
import {Tabs, Tab} from 'react-bootstrap';

export default class Flights extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key: 'flights'
		};
	}

	setKey(key) {
		this.setState({
			key: key
		});
	}

	render() {
		const {key} = this.state;
		const tabs = [{name: 'flights', label: 'Flights'}, {name: 'packages', label: 'Packages'}];
		return (
			<React.Fragment>
				<Tabs id='home-tab' activeKey={key} className='dnav-fill' onSelect={(k) => this.setKey(k)}>
					<Tab eventKey='flights' title='Flights'>
						<SearchFlightForm />
						<div className='container text-center'>
							<h4> Things to do </h4>
							{/* <PackageList /> */}
						</div>
					</Tab>
					<Tab eventKey='packages' title='Packages'>
						<div className='container'>
							<h4> Popular Packages </h4>
							<PackageList />
						</div>
					</Tab>
				</Tabs>
			</React.Fragment>
		);
	}
}
