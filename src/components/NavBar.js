import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {logoutUser} from '../redux/actions/sessions';
import {connect} from 'react-redux';
import store from '../redux/store';
import {logout} from '../utils/helpers';
import Sidebar from './shared/Sidebar';
import Dropdown from './shared/Dropdown';
import SignUpForm from './sessions/SignInForm';
import Currencies from './users/Currencies';
import {ListGroup, Button, Modal, Nav, NavItem} from 'react-bootstrap';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state = {
			loggedIn: localStorage.token !== undefined,
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
		const {loggedIn} = this.state;
		const sideBarMenu = [
			{icon: 'icon-home', name: 'home', label: 'Home', value: '', link: '/'},
			{
				icon: 'icon-beamed-note',
				name: 'my_bookings',
				label: 'My Bookings',
				value: '',
				link: '/bookings'
			},
			{icon: 'icon-user', name: 'settings', label: 'My Account', value: '', link: '/profile'},
			{
				icon: 'icon-calculator',
				name: 'currency',
				label: 'Currency',
				value: this.props.currency,
				link: '/currency'
			},
			{
				icon: 'icon-old-mobile',
				name: 'contact_us',
				label: 'Contact Us',
				value: '',
				link: '/contact'
			}
		];
		return (
			<div>
				<nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
					<div className='container'>
						<div className='navbar-header'>
							<Link to='/' className='navbar-brand animated bounce delay-2s'>
								Booking Nepal
							</Link>
						</div>

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

						<div className='collapse navbar-collapse'>
							<ul className='navbar-nav ml-auto align-items-center'>
								<Dropdown title={this.props.currency}>
									<Currencies />
								</Dropdown>
								{/* <li className='mx-3'>
								<NavLink
									className='navbar-font-style'
									to='/flights'
									activeStyle={{
										textDecoration: 'none',
										fontWeight: 'bold',
										color: '#09C6AB'
									}}
								>
									Flights
								</NavLink>
							</li>
							 <li className='mx-3'>
								<NavLink
									className='navbar-font-style'
									to='/hotels'
									activeStyle={{
										textDecoration: 'none',
										fontWeight: 'bold',
										color: '#09C6AB'
									}}
								>
									Hotels
								</NavLink>
							</li> 
							<li className='mx-3'>
								<NavLink
									className='navbar-font-style'
									to='/packages'
									activeStyle={{
										textDecoration: 'none',
										fontWeight: 'bold',
										color: '#09C6AB'
									}}
								>
									Packages
								</NavLink>
							</li> */}
								{/* <Dropdown icon={'icon-user'} title={''}>
								<SignUpForm />
							</Dropdown> */}
								<li className='dropdown mx-3'>
									<div className=' dropdown-toggle navbar-font-style' data-toggle='dropdown'>
										<i className='icon-user' />
									</div>
									<ul className='dropdown-menu dropdown-menu-right'>
										<li>
											{loggedIn && (
												<Link to='/profile' className='dropdown-item'>
													Profile
												</Link>
											)}
										</li>
										<li>
											{loggedIn && (
												<Link to='/bookings' className='dropdown-item'>
													My Bookings
												</Link>
											)}
										</li>
										<li>
											{loggedIn && (
												<a
													className='dropdown-item'
													onClick={() => {
														logout();
														this.setState({
															loggedIn: false
														});
														<Redirect to='/login' />;
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
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className={`sidebar d-md-none ${this.state.sideBarIsVisible ? '' : 'd-none'}`}>
					<Sidebar items={sideBarMenu} side='left' onHide={() => this.toggleSidebar()} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userStore, bookingStore}) => ({
	currentUser: userStore.currentUser,
	currency: bookingStore.currency
});

const mapDispatchToProps = () => ({
	logoutUser
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
