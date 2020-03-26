import React, {Component} from 'react';
import SearchFlightForm from './SearchFlightForm';
import FlightList from './FlightList';
import PackageList from '../packages/PackageList';
import './flights.scss';
import {TabView, Slidebar, Banner} from '../shared';
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
				<nav>
					<div className='container'>
						<div class='nav nav-tabs nav-fill' id='nav-tab' role='tablist'>
							<a
								class='nav-item nav-link active'
								id='nav-home-tab'
								data-toggle='tab'
								href='#nav-flights'
								role='tab'
								aria-controls='nav-flights'
								aria-selected='true'
							>
								<i className='fas fa-plane departure' />&nbsp;Flights
							</a>
							<a
								class='nav-item nav-link'
								id='nav-profile-tab'
								data-toggle='tab'
								href='#nav-packages'
								role='tab'
								aria-controls='nav-packages'
								aria-selected='false'
							>
								<i class='fas fa-briefcase' />&nbsp;Packages
							</a>
						</div>
					</div>
				</nav>
				<div class='tab-content px-sm-0' id='nav-tabContent'>
					<div
						class='tab-pane fade show active'
						id='nav-flights'
						role='tabpanel'
						aria-labelledby='nav-flights-tab'
					>
						<SearchFlightForm />
					</div>
					<div class='tab-pane fade' id='nav-packages' role='tabpanel' aria-labelledby='nav-packages-tab'>
						<div className='container'>
							<h4> Popular Packages </h4>
							<PackageList />
						</div>
					</div>
				</div>
				{/* <Tabs id='home-tab' activeKey={key} className='dnav-fill' onSelect={(k) => this.setKey(k)}>
					<Tab eventKey='flights' title='Flights'>
						<SearchFlightForm />
					</Tab>
					<Tab eventKey='packages' title='Packages'>
						<div className='container'>
							<h4> Popular Packages </h4>
							<PackageList />
						</div>
					</Tab>
				</Tabs> */}
				<section className='categories'>
					<div className='container'>
						{/* <div className='title'>
							<h2 className='text-center'> Things to do </h2>
						</div> */}
						<Categories />
					</div>
				</section>
			</React.Fragment>
		);
	}
}
