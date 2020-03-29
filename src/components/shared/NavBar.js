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
					<div className='container'>
						<div className='navbar-header d-flex'>
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

						<div className='navbar-collapse collapse'>
							<ul className='navbar-nav ml-auto align-items-center'>
								<li>
									{currentUser.partner && (
										<NavLink
											className='text-white'
											to={`/partners/package_form/${currentUser.partner.id}`}
											activeStyle={{
												textDecoration: 'none',
												fontWeight: 'bold'
											}}
										>
											Add Packages
										</NavLink>
									)}
								</li>
								<li>
									{!currentUser.partner && (
										<NavLink
											className='text-white'
											to='/partners/new'
											activeStyle={{
												textDecoration: 'none',
												fontWeight: 'bold'
											}}
										>
											BECOME A PARTNER
										</NavLink>
									)}
								</li>
								<li>
									<NavLink
										className='text-white'
										to='/support'
										activeStyle={{
											textDecoration: 'none',
											fontWeight: 'bold'
										}}
									>
										CUSTOMER SUPPORT
									</NavLink>
								</li>
								{loggedIn && (
									<li>
										<NavLink
											className='text-white'
											to='/bookings'
											activeStyle={{
												textDecoration: 'none',
												fontWeight: 'bold'
											}}
										>
											My Bookings
										</NavLink>
									</li>
								)}
								{isAdmin(currentUser) && (
									<li>
										<NavLink
											className='text-white'
											to='/bookings'
											activeStyle={{
												textDecoration: 'none',
												fontWeight: 'bold'
											}}
										>
											Admin
										</NavLink>
									</li>
								)}
								{/* <Dropdown icon={'icon-user'} title={''}>
								<SignUpForm />
							</Dropdown> */}
								<li>
									<Dropdown
										icon={`${flagFor(language)} flag`}
										title={language}
										className='text-white'
									>
										<div className='d-flex select-countries text-normal'>
											<div className=''>
												<span>Languages</span>
												<Currencies requestData='languages' />
											</div>
										</div>
									</Dropdown>
								</li>
							</ul>
						</div>
						<div>
							<ul className='navbar-nav ml-auto align-items-center'>
								<li>
									<Dropdown icon='icon-user' title={userInitials(currentUser)} className='text-white'>
										<ul class='text-normal'>
											<li>
												{loggedIn && (
													<Link to='/profile' className='dropdown-item'>
														Profile
													</Link>
												)}
											</li>
											<li>
												{loggedIn && (
													<a
														className='dropdown-item'
														onClick={() => {
															logoutUser();
															history.push('/login');
															logout();
														}}
													>
														Logout
													</a>
												)}
											</li>
											<li>
												{!loggedIn && (
													<Link to='/login' className='dropdown-item'>
														Login
													</Link>
												)}
											</li>
											<li>
												{!loggedIn && (
													<Link to='/signup' className='dropdown-item'>
														Sign up
													</Link>
												)}
											</li>
										</ul>
									</Dropdown>
								</li>
							</ul>
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
