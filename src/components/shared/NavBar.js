import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {logoutUser} from '../../redux/actions';
import {connect} from 'react-redux';
import store from '../../redux/store';
import {logout, userInitials, isAdmin, isLoggedIn, flagFor} from '../../helpers';
import Slidebar from './Slidebar';
import Dropdown from './Dropdown';
import SignUpForm from '../sessions/SignInForm';
import Currencies from '../users/Currencies';
import {ListGroup, Button, Modal, Nav, NavItem} from 'react-bootstrap';
import history from '../../history';
import axios from 'axios';
import {Flag, Segment} from 'semantic-ui-react';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sideBarIsVisible: false
		};
	}

	componentDidMount() {}

	toggleSidebar() {
		this.setState((prevState, props) => {
			return {sideBarIsVisible: !prevState.sideBarIsVisible};
		});
	}

	render() {
		const {currentUser, language, logoutUser, currency} = this.props;
		const loggedIn = currentUser.email !== undefined;

		const sideBarMenu = [
			{icon: 'icon-home', name: 'home', label: 'Home', value: '', link: '/'},
			{
				icon: 'fas fa-file-invoice',
				name: 'my_bookings',
				label: 'My Bookings',
				value: '',
				link: '/bookings'
			},
			{
				icon: 'icon-user',
				name: 'settings',
				label: 'My Account',
				details: currentUser.name,
				value: '',
				link: '/profile'
			},
			{
				icon: 'fas fa-money-bill-alt',
				name: 'currency',
				label: 'Currency',
				value: currency,
				link: '/profile'
			},
			{
				icon: 'fas fa-blender-phone',
				name: 'contact_us',
				label: 'Contact Us',
				value: '',
				link: '/contact'
			}
		];
		return (
			<React.Fragment>
				<nav className='navbar navbar-expand-lg navbar-dark bg-primary sticky-top'>
					<div className='container align-items-stretch'>
						<div className='navbar-header d-flex align-items-center'>
							<button
								className='navbar-toggler'
								type='button'
								data-toggle='collapse'
								data-target='#sidebar'
								aria-controls='sidebar'
								aria-expanded='false'
								aria-label='Toggle navigation'
								onClick={() => this.toggleSidebar()}
							>
								<i className={this.state.sideBarIsVisible ? 'icon-cross' : 'icon-menu'} />
							</button>
							<Link to='/' className='navbar-brand animated bounce delay-2s'>
								visitallnepal.com
							</Link>
						</div>

						<div className='navbar-collapse collapse align-items-stretch'>
							<span className='navbar-nav ml-auto align-items-stretch'>
								{currentUser.partner && (
									<NavLink
										className='link text-white'
										to={`/partners/package_form/${currentUser.partner.id}`}
										activeStyle={{
											textDecoration: 'none',
											fontWeight: 'bold'
										}}
									>
										Add Packages
									</NavLink>
								)}
								{!currentUser.partner && (
									<NavLink
										className='link text-white'
										to='/partners/new'
										activeStyle={{
											textDecoration: 'none',
											fontWeight: 'bold'
										}}
									>
										BECOME A PARTNER
									</NavLink>
								)}
								<NavLink
									className='link text-white'
									to='/support'
									activeStyle={{
										textDecoration: 'none',
										fontWeight: 'bold'
									}}
								>
									CUSTOMER SUPPORT
								</NavLink>
								{loggedIn && (
									<NavLink
										className='link text-white'
										to='/bookings'
										activeStyle={{
											textDecoration: 'none',
											fontWeight: 'bold'
										}}
									>
										My Bookings
									</NavLink>
								)}
								{isAdmin(currentUser) && (
									<NavLink
										className='link text-white'
										to='/bookings'
										activeStyle={{
											textDecoration: 'none',
											fontWeight: 'bold'
										}}
									>
										Admin
									</NavLink>
								)}
								<Dropdown
									icon={`${flagFor(language)} flag`}
									title={language}
									className='text-white px-3'
								>
									<div className='d-flex select-countries text-normal'>
										<div className=''>
											<span className='text-bold'>Languages</span>
											<Currencies requestData='languages' />
										</div>
									</div>
								</Dropdown>
							</span>
						</div>
						<div className='d-flex align-items-stretch'>
							{loggedIn && (
								<Dropdown
									icon='icon-user'
									title={userInitials(currentUser)}
									className='text-white pl-3'
								>
									<ul className='text-normal'>
										{loggedIn && (
											<li className='m-0'>
												<Link to='/profile' className='item text-bold'>
													Profile
												</Link>
											</li>
										)}
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
								<div className='d-flex align-items-center'>
									<Link to='/login' className='text-bold text-white pl-3'>
										LOGIN
									</Link>
								</div>
							)}
						</div>
					</div>
				</nav>
				<Slidebar
					isVisible={this.state.sideBarIsVisible}
					items={sideBarMenu}
					side='left'
					onHide={() => this.toggleSidebar()}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({userStore, extras}) => ({
	currentUser: userStore.currentUser,
	language: extras.language
});

const mapDispatchToProps = {logoutUser};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
