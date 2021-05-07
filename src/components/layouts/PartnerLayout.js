import React, {useState} from 'react';
import {logoutUser} from '../../redux/actions';
import {connect} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import {Dropdown, Sidebar} from '../shared';
import {logout, userInitials} from '../../helpers';
import history from '../../history';
import '../../i18n';
import {useTranslation, initReactI18next} from 'react-i18next';

const PartnerLayout = ({currentUser, children}) => {
	const loggedIn = currentUser.email !== undefined;
	const [section, setSection] = useState('');
	const {t, i18n} = useTranslation();

	const sideBarMenu = [
    {
      icon: 'fas fa-columns',
			name: '',
			label: 'My Dashboard',
			value: '',
			active: section === ''
		},
		{
			icon: 'fas fa-briefcase',
			name: 'packages',
			label: 'Packages',
			active: section == 'packages'
		},
		{
			icon: 'fas fa-car',
			name: 'rentals',
			label: 'Rentals',
			value: '',
			active: section == 'rentals'
		},
		{
			icon: 'fas fa-wallet',
			name: 'transactions',
			label: 'Transactions',
			value: '',
			active: section == 'transactions'
		}
	];

	return (
		<div id='content'>
			<nav className='navbar navbar-expand-lg navbar-dark bg-primary sticky-top'>
				<div className='container align-items-stretch'>
					<div className='navbar-header d-flex align-items-center'>
						<Link to='/' className='navbar-brand animated bounce delay-2s'>
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
									<li className='m-0'>
										<Link to={`/partner#profile`} className='item text-bold'>
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
											Logout
										</a>
									</li>
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
					<Sidebar items={sideBarMenu} onItemSelect={(data) => {
            setSection(data)
            history.push(`/partner#${data}`)}
          } />
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

export default connect(mapStateToProps, mapDispatchToProps)(PartnerLayout);
