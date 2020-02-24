import React from 'react';
import {Dropdown} from 'react-bootstrap';

export default ({children, className, icon, title, ...rest}) => {
	return (
		<Dropdown alignRight>
			<Dropdown.Toggle id='dropdown-basic' className={`form-control ${className}`}>
				<i className={icon} /> {title}
			</Dropdown.Toggle>
			<Dropdown.Menu className='p-1 dropdown-menu-right'>{children}</Dropdown.Menu>
		</Dropdown>
	);
};
