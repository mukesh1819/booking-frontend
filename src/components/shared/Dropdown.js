import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {useState, useEffect} from 'react';

export default ({children, className, icon, title, ...rest}) => {
	const [dropped, setDrop] = useState(true);

	return (
		<div>
			{/* <span>
				<i className={icon} /> {title}
			</span>
			<div className={`drop-menu ${dropped ? 'd-block' : 'd-none'}`}>{children}</div> */}
			<Dropdown alignRight>
				<Dropdown.Toggle id='dropdown-basic' className={`form-control ${className}`}>
					<i className={icon} /> {title}
				</Dropdown.Toggle>
				<Dropdown.Menu className='p-1 dropdown-menu-right'>{children}</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};
