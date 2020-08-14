import React, {Fragment} from 'react';
import {Link, NavLink} from 'react-router-dom';
import history from '../../history';
import SocialLinks from '../sessions/SocialLinks';

function Slidebar({items = [], isVisible, onHide}) {
	return (
		<div className={`slide-nav slide d-md-none ${isVisible ? 'show' : 'closed'}`}>
			<div className='ui relaxed divided list'>
				{items.map(({label, name, details = null, icon, value, link, ...rest}) => (
					<Fragment>
						<div
							className='item'
							key={name}
							onClick={() => {
								history.push(link);
								onHide();
							}}
						>
							<i className={`large icon ${icon} p-2 text-primary`} />
							<div class='content'>
								<a class='black header'>{label}</a>
								<div class='description'>
									{details}
									{value}
								</div>
							</div>
						</div>
					</Fragment>
				))}
			</div>
			{/* <SocialLinks /> */}
		</div>
	);
}

export default Slidebar;
