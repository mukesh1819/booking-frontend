import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Profile from './Profile';
import {Bookings} from '../bookings';
import './users.scss';
import '../shared/tab.scss';
import {Sidebar} from '../shared';
import history from '../../history';

const Transactions = () => 'Transactions';
const Reports = () => 'Reports';

export default class Users extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ActiveComponent: Profile,
			section: 'profile'
		};
	}

	activateTab = (value) => {
		const components = {profile: Profile, bookings: Bookings};
		this.setState({
			section: value,
			ActiveComponent: components[value]
		});
	};

	render() {
		const {ActiveComponent, section} = this.props.location.state || this.state;
		const sideBarMenu = [
			{
				icon: 'fas fa-user',
				name: 'profile',
				label: 'Profile',
				value: '',
				link: `/profile`,
				active: section == 'profile'
			},
			{
				icon: 'fas fa-book',
				name: 'bookings',
				label: 'My Bookings',
				value: '',
				link: `/bookings`,
				active: section == 'bookings'
			}
		];

		return (
			<div className='container p-0'>
				<div className='card'>
					<div className='card-body'>
						<div className='row'>
							<div className='col-0 col-md-2 p-0'>
								<Sidebar items={sideBarMenu} onItemSelect={(value) => this.activateTab(value)} />
							</div>
							<div className='col-12 col-md-10 p-0 pl-md-3'>{ActiveComponent && <ActiveComponent />}</div>
						</div>
						{/* <nav className='nav nav-tabs'>
					<div className='nav nav-tabs nav-fill' id='nav-tab' role='tablist'>
						<a
							className='nav-item nav-link active'
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
					</div>
				</nav> */}

						{/* <div className='tab-content' id='nav-tabContent'>
					<div
						className='tab-pane fade show active'
						id='nav-profile'
						role='tabpanel'
						aria-labelledby='nav-profile-tab'
					/>
					<div className='tab-pane fade' id='nav-bookings' role='tabpanel' aria-labelledby='nav-bookings-tab' />
					<ActiveComponent />
				</div> */}
					</div>
				</div>
			</div>
		);
	}
}
