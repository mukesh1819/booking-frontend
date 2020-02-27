import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';

export default ({children, className, icon, title, ...rest}) => {
	const [dropped, setDrop] = useState(true);

	return (
		<Dropdown alignRight>
			<Dropdown.Toggle id='dropdown-basic' className={`dropdown form-control ${className}`}>
				<i className={icon} /> {title}
			</Dropdown.Toggle>
			<Dropdown.Menu className='p-1 dropdown-menu-right'>{children}</Dropdown.Menu>
		</Dropdown>
	);
};
