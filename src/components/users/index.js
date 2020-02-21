import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Profile from './Profile';
import Bookings from '../bookings/Bookings';
import './users.scss';
import '../shared/tab.scss';

const Transactions = () => 'Transactions';
const Reports = () => 'Reports';

export default class Users extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ActiveComponent: Profile
		};
	}

	activateTab = (comp) => {
		this.setState({
			ActiveComponent: comp
		});
	};

	render() {
		const {ActiveComponent} = this.state;
		return (
			<div className='container p-0'>
				<h3> Profile </h3>
				<nav className='nav nav-tabs'>
					<div class='nav nav-tabs nav-fill' id='nav-tab' role='tablist'>
						<a
							class='nav-item nav-link active'
							id='nav-profile-tab'
							data-toggle='tab'
							href='#nav-profile'
							role='tab'
							aria-controls='nav-home'
							aria-selected='true'
							onClick={() => this.activateTab(Profile)}
						>
							<i className='icon-dribbble' />Details
						</a>
						<a
							class='nav-item nav-link'
							id='nav-bookings-tab'
							data-toggle='tab'
							href='#nav-bookings'
							role='tab'
							aria-controls='nav-home'
							aria-selected='true'
							onClick={() => this.activateTab(Bookings)}
						>
							<i className='icon-dribbble' />Bookings
						</a>
						{/* <a
							class='nav-item nav-link'
							id='nav-transactions-tab'
							data-toggle='tab'
							href='#nav-transactions'
							role='tab'
							aria-controls='nav-home'
							aria-selected='true'
							onClick={() => this.activateTab(Transactions)}
						>
							<i className='icon-dribbble' />Transactions
						</a>
						<a
							class='nav-item nav-link'
							id='nav-details-tab'
							data-toggle='tab'
							href='#details'
							role='tab'
							aria-controls='nav-home'
							aria-selected='true'
							onClick={() => this.activateTab(Reports)}
						>
							<i className='icon-dribbble' />Reports
						</a> */}
					</div>
				</nav>

				<div class='tab-content' id='nav-tabContent'>
					<div
						class='tab-pane fade show active'
						id='nav-profile'
						role='tabpanel'
						aria-labelledby='nav-profile-tab'
					/>
					<div class='tab-pane fade' id='nav-bookings' role='tabpanel' aria-labelledby='nav-bookings-tab' />
					<ActiveComponent />
				</div>
			</div>
		);
	}
}
