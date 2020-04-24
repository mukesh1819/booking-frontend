import React, {Component} from 'react';
import Profile from '../users/Profile';

const UserDetails = ({user}) => {
	return (
		<div className='container bg-white p-4'>
			<div className='row'>
				<div className='col-12 col-md-3 offset-md-1'>
					<i className='fas fa-user user-icon fa-3x' />
					<h3 className='title'>{user.name}&nbsp;</h3>
					<div className='text-small text-muted'>
						<i className='fas fa-envelope' />&nbsp;
						{user.email}
					</div>
					<div className='text-small text-muted'>
						<i className='fas fa-phone-volume' />&nbsp;
						{user.phone_number}
					</div>
				</div>
				<div className='col-12 col-md-7 list-view'>
					<h3 className='title'>User Information</h3>
					<div className='list'>
						<span className='label'>ID</span>
						<span className='value'>{user.id}</span>
					</div>
					<div className='list'>
						<span className='label'>Role</span>
						<span className='value'>
							{' '}
							<Badge type={user.role}>{user.role}</Badge>
						</span>
					</div>
					<h3 className='py-2'>Email</h3>
					<MailBox
						values={{
							description: '',
							subject: '',
							email: user.email
						}}
					/>
				</div>
			</div>
		</div>
	);
};
export default UserDetails;
