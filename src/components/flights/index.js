import React, {Component} from 'react';
import SearchFlightForm from './SearchFlightForm';
import FlightList from './FlightList';
import PackageList from '../packages/PackageList';
import './flights.scss';
import TabView from '../shared/TabView';
import Slidebar from '../shared/Slidebar';
import Banner from '../shared/Banner';
import {Tabs, Tab} from 'react-bootstrap';
import {Categories} from '../categories';

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
				<SearchFlightForm />
				<section className='categories'>
					<div className='container'>
						{/* <div className='title'>
							<h2 className='text-center'> Things to do </h2>
						</div> */}
						<Categories />
					</div>
				</section>
				{/* <Tabs id='home-tab' activeKey={key} className='dnav-fill' onSelect={(k) => this.setKey(k)}>
					<Tab eventKey='flights' title='Flights' />
					<Tab eventKey='packages' title='Packages'>
						<div className='container'>
							<h4> Popular Packages </h4>
							<PackageList />
						</div>
					</Tab>
				</Tabs> */}
			</React.Fragment>
		);
	}
}
