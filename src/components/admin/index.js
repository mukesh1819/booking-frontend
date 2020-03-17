import React, {Component} from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import UsersList from './UsersList';

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ActiveComponent: null
		};
	}

	componentDidMount() {}

	render() {
		const {ActiveComponent} = this.state;
		const sideBarMenu = [
			{icon: 'icon-home', name: 'users', label: 'Users', value: '', link: '/'},
			{
				icon: 'icon-beamed-note',
				name: 'bookings',
				label: 'Bookings',
				value: '',
				link: '/bookings'
			},
			{
				icon: 'icon-user',
				name: 'transactions',
				label: 'Transactions',
				value: '',
				link: '/transactions'
			},
			{
				icon: 'icon-calculator',
				name: 'inquiries',
				label: 'Inquiries',
				link: '/profile'
			}
		];
		return (
			<React.Fragment>
				<div className='row'>
					<div className='col-0 col-md-2 p-0'>
						<Sidebar items={sideBarMenu} />
					</div>
					<div className='col-12 col-md-10 p-4'>
						<Dashboard />
						{ActiveComponent && <ActiveComponent />}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
