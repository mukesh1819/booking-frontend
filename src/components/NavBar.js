import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {logoutUser} from '../redux/actions/sessions';
import {connect} from 'react-redux';
import store from '../redux/store';
import {logout, userInitials} from '../utils/helpers';
import Sidebar from './shared/Sidebar';
import Dropdown from './shared/Dropdown';
import SignUpForm from './sessions/SignInForm';
import Currencies from './users/Currencies';
import {ListGroup, Button, Modal, Nav, NavItem} from 'react-bootstrap';
import history from '../history';

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
		const {currentUser} = this.props;

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
								Booking Nepal
							</Link>
						</div>
						<div className='navbar-collapse collapse'>
							<ul className='navbar-nav ml-auto align-items-center'>
								{/* <Dropdown title={this.props.currency}>
									<Currencies />
								</Dropdown> */}
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

								<li className='mx-3'>
									<Dropdown title={userInitials(currentUser)}>
										<ul>
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
															history.push('/login');
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
				<Sidebar
					isVisible={this.state.sideBarIsVisible}
					items={sideBarMenu}
					side='left'
					onHide={() => this.toggleSidebar()}
				/>
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
