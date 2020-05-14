import React from 'react';
import {logoutUser} from '../../redux/actions';
import {connect} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {Dropdown} from '../shared';
import {logout, userInitials} from '../../helpers';
import history from '../../history';
import {Sidebar} from '../shared';

const AdminLayout = ({currentUser, children}) => {
	const loggedIn = currentUser.email !== undefined;

	const sideBarMenu = [
		{
			icon: 'fas fa-plane departure',
			name: 'flights',
			label: 'Flights',
			value: '',
			active: section == 'flights'
		},
		{
			icon: 'fas fa-briefcase',
			name: 'packages',
			label: 'Packages',
			active: section == 'packages'
		},
		{
			icon: 'fas fa-users',
			name: 'users',
			label: 'Users',
			value: '',
			active: section == 'users'
		},
		{
			icon: 'fas fa-wallet',
			name: 'others',
			label: 'Others',
			value: '',
			active: section == 'others'
		}
	];

	return (
		<div id='content'>
			<nav className='navbar navbar-expand-lg navbar-dark bg-primary sticky-top'>
				<div className='container align-items-stretch'>
					<div className='navbar-header d-flex align-items-center'>
						<Link to='/admin' className='navbar-brand animated bounce delay-2s'>
							{process.env.REACT_APP_URL}
						</Link>
					</div>

					<div className='navbar-collapse collapse align-items-stretch'>
						<span className='navbar-nav ml-auto align-items-stretch' />
					</div>
					<div className='d-flex align-items-stretch'>
						{loggedIn && (
							<Dropdown icon='icon-user' title={userInitials(currentUser)} className='text-white pl-3'>
								<ul className='text-normal'>
									{loggedIn && (
										<li className='m-0'>
											<a
												className='item text-bold'
												onClick={() => {
													logoutUser();
													history.push('/login');
													logout();
												}}
											>
												Logout
											</a>
										</li>
									)}
								</ul>
							</Dropdown>
						)}

						{!loggedIn && (
							<div className='d-flex align-items-center login'>
								<Link to='/login' className='text-bold text-white pl-3'>
									LOGIN
								</Link>
							</div>
						)}
					</div>
				</div>
			</nav>
			<div className='row'>
				<div className='d-none d-md-block col-md-2 p-0'>
					<Sidebar items={sideBarMenu} onItemSelect={(data) => this.onSideBarSelect(data)} />
				</div>
				<div div className='col-12 col-md-10 p-4'>
					{children}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {logoutUser};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
