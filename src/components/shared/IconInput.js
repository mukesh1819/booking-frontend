import React from 'react';
import {Badge} from 'react-bootstrap';

export default ({icon = 'icon-paper-plane icon', iconPosition = 'left', children}) => {
	return (
		<div class='icon-input d-flex form-control align-items-center py-0'>
			{iconPosition == 'left' && <i aria-hidden='true' class={`text-primary ${icon}`} />}
			{children}
			{iconPosition == 'right' && <i aria-hidden='true' class={icon} />}
		</div>
	);
};
