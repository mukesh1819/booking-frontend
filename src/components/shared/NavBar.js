import React, {Component, useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {logoutUser} from '../../redux/actions';
import {connect} from 'react-redux';
import store from '../../redux/store';
import {logout, userInitials, isAdmin, isLoggedIn, supportedLanguages} from '../../helpers';
import Slidebar from './Slidebar';
import Dropdown from './Dropdown';
import SignUpForm from '../sessions/SignInForm';
import Currencies from '../users/Currencies';
import {ListGroup, Button, Modal, Nav, NavItem} from 'react-bootstrap';
import history from '../../history';
import axios from 'axios';
import {Flag, Segment} from 'semantic-ui-react';
import '../../i18n';
import {useTranslation, initReactI18next} from 'react-i18next';

const NavBar = ({sideBarIsVisible, toggleSidebar, currentUser, language, logoutUser}) => {
	const loggedIn = currentUser.email !== undefined;
	const {t, i18n} = useTranslation();
	console.log(supportedLanguages, i18n.language);

	return (
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
						onClick={toggleSidebar}
					>
						<i className={sideBarIsVisible ? 'icon-cross' : 'icon-menu'} />
					</button>
					<Link to='/' className='navbar-brand animated bounce delay-2s'>
						<span>{t('visitallnepal')}</span>
					</Link>
				</div>

				<div className='navbar-collapse collapse align-items-stretch'>
					<span className='navbar-nav ml-auto align-items-stretch'>
						{!currentUser.partner && (
							<NavLink
								className='link text-white'
								to='/partners/new'
								activeStyle={{
									textDecoration: 'none',
									fontWeight: 'bold'
								}}
							>
								{t('BecomePartner')}
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
							{t('CustomerSupport')}
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
								{t('MyBookings')}
							</NavLink>
						)}
						<Dropdown
							icon={`${supportedLanguages[i18n.language].flag} flag`}
							title={supportedLanguages[i18n.language].label}
							className='text-white px-3'
						>
							<div className='d-flex select-countries text-normal'>
								<div className=''>
									<span className='text-bold'>Languages</span>
									<Currencies requestData='languages' onChange={(lang) => onChange(lang)} />
								</div>
							</div>
						</Dropdown>
					</span>
				</div>
				<div className='d-flex align-items-stretch'>
					{loggedIn && (
						<Dropdown icon='fas fa-user' title={userInitials(currentUser)} className='text-white pl-3'>
							<ul className='text-normal'>
								<li className='m-0'>
									<Link to='/profile' className='item text-bold'>
										{t('Profile')}
									</Link>
								</li>
								<li className='m-0'>
									<a
										className='item text-bold'
										onClick={() => {
											logoutUser();
											history.push('/login');
											logout();
										}}
									>
										{t("Logout")}
									</a>
								</li>
							</ul>
						</Dropdown>
					)}

					{!loggedIn && (
						<div className='d-flex align-items-center login'>
							<Link to='/login' className='text-bold text-white pl-3'>
								<i className='fas fa-user' />&nbsp; {t('Login')}
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

const mapStateToProps = ({userStore, extras}) => ({
	currentUser: userStore.currentUser,
	language: extras.language
});

const mapDispatchToProps = {logoutUser};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
