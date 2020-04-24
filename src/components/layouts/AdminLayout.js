import React from 'react';
import {logoutUser} from '../../redux/actions';
import {connect} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {Dropdown} from '../shared';
import {logout, userInitials} from '../../helpers';
import history from '../../history';

const AdminLayout = ({currentUser, children}) => {
	const loggedIn = currentUser.email !== undefined;
	return (
		<div id='content'>
			<nav className='navbar navbar-expand-lg navbar-dark bg-primary sticky-top'>
				<div className='container align-items-stretch'>
					<div className='navbar-header d-flex align-items-center'>
						<Link to='/' className='navbar-brand animated bounce delay-2s'>
							visitallnepal.com
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
			{children}
		</div>
	);
};

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {logoutUser};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
