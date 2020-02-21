import React from 'react';
import {Dropdown} from 'react-bootstrap';

export default ({children, title, ...rest}) => {
	return (
		<Dropdown>
			<Dropdown.Toggle id='dropdown-basic' className='form-control'>
				{title}
			</Dropdown.Toggle>
			<Dropdown.Menu className='p-1'>{children}</Dropdown.Menu>
		</Dropdown>
	);
};
