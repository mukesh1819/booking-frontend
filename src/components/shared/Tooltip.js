import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default ({children, message, ...rest}) => {
	return (
		<OverlayTrigger placement='top' delay={{show: 250, hide: 400}} overlay={<Tooltip>{message}</Tooltip>} {...rest}>
			{children}
		</OverlayTrigger>
	);
};
