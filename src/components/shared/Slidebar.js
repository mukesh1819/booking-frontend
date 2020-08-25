import React, {Fragment} from 'react';
import {Link, NavLink} from 'react-router-dom';
import history from '../../history';
import SocialLinks from '../sessions/SocialLinks';
import {userInfo} from 'os';

function Slidebar({items = [], user = {}, isVisible, onHide}) {
	return (
		<div className={`slide-nav slide d-md-none ${isVisible ? 'show' : 'closed'}`}>
			<div className='ui relaxed divided list'>
				{items.map(({label, name, details = null, icon, value, link, ...rest}, index) => (
					<Fragment key={index}>
						<div
							className='item'
							key={name}
							onClick={() => {
								history.push(link);
								onHide();
							}}
						>
							<i className={`large icon ${icon} p-2 text-primary`} />
							<div className='content'>
								<a className='black header'>{label}</a>
								<div className='description'>
									{details}
									{value}
								</div>
							</div>
						</div>
					</Fragment>
				))}
			</div>
			{!user.id && <SocialLinks />}
		</div>
	);
}

export default Slidebar;
