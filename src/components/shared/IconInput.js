import React from 'react';
import {Badge} from 'react-bootstrap';

export default ({icon = 'icon-paper-plane icon', iconPosition = 'left', children}) => {
	return (
		<React.Fragment>
			{children}
			{/* <div class='d-flex form-control align-items-center py-0'>
			{iconPosition == 'left' && <i aria-hidden='true' class={`text-primary ${icon}`} />}
			{iconPosition == 'right' && <i aria-hidden='true' class={icon} />}
		</div> */}
		</React.Fragment>
	);
};
