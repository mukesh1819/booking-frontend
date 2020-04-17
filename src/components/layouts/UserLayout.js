import React, {Component} from 'react';
import {logoutUser} from '../../redux/actions';
import {connect} from 'react-redux';
import {Slidebar, NavBar} from '../shared';
class UserLayout extends Component {
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
		const {currentUser, language, currency, children} = this.props;
		const {sideBarIsVisible} = this.state;

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
			// {
			// 	icon: 'fas fa-money-bill-alt',
			// 	name: 'currency',
			// 	label: 'Currency',
			// 	value: currency,
			// 	link: '/profile'
			// },
			{
				icon: 'icon-user',
				name: 'settings',
				label: 'Language',
				details: '',
				value: language,
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
			<div id='content'>
				<NavBar sideBarIsVisible={sideBarIsVisible} toggleSidebar={this.toggleSidebar} />
				<Slidebar
					isVisible={this.state.sideBarIsVisible}
					items={sideBarMenu}
					side='left'
					onHide={() => this.toggleSidebar()}
				/>
				{children}
			</div>
		);
	}
}

const mapStateToProps = ({userStore, extras}) => ({
	currentUser: userStore.currentUser,
	language: extras.language
});

const mapDispatchToProps = {logoutUser};

export default connect(mapStateToProps, mapDispatchToProps)(UserLayout);
