import React from 'react';
import {Badge} from 'react-bootstrap';

export default ({type = 'light', content, children}) => {
	var design;
	switch (type) {
		case 'pending':
			design = 'warning';
			break;
		case 'processing':
			design = 'info';
			break;
		case 'verified':
			design = 'success';
			break;
		case 'cancelled':
			design = 'danger';
			break;
		default:
			design = type;
	}
	return <Badge variant={design}>{children}</Badge>;
};
