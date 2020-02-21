import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {logoutUser} from '../redux/actions/sessions';
import {connect} from 'react-redux';
import store from '../redux/store';
import {logout} from '../utils/helpers';
import Sidebar from './shared/Sidebar';
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

	updateModal(sideBarIsVisible) {
		this.state.sideBarIsVisible = sideBarIsVisible;
		this.forceUpdate();
	}

	render() {
		const {loggedIn} = this.state;
		return (
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
						data-target='#s'
						aria-controls='navbarNavAltMarkup'
						aria-expanded='false'
						aria-label='Toggle navigation'
						onClick={() => this.updateModal(true)}
					>
						<span className='navbar-toggler-icon' />
					</button>

					<div className='collapse navbar-collapse' id='sidebar'>
						<Sidebar
							side='left'
							sideBarIsVisible={this.state.sideBarIsVisible}
							onHide={() => this.updateModal(false)}
						>
							<Nav>
								<NavItem href='#'>Item 1</NavItem>
								<NavItem href='#'>Item 2</NavItem>
								<NavItem href='#'>Item 3</NavItem>
								<NavItem href='#'>Item 4</NavItem>
								<NavItem href='#'>Item 5</NavItem>
							</Nav>
						</Sidebar>
					</div>
					<div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
						<ul className='navbar-nav ml-auto'>
							<li className='mx-3'>
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
							</li>
							<li className='dropdown mx-3'>
								<div className=' dropdown-toggle navbar-font-style' data-toggle='dropdown'>
									Account
								</div>
								<ul className='dropdown-menu'>
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
		);
	}
}

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = () => ({
	logoutUser
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
