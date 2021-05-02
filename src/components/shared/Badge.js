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
		case 'confirmed':
			design = 'success';
			break;
		case 'completed':
			design = 'success';
			break;
		case 'approved':
			design = 'success';
			break;
		case 'active':
			design = 'success';
			break;

		case 'cancelled':
			design = 'danger';
			break;
		case 'declined':
			design = 'danger';
			break;

		case true:
			design = 'success';
			break;
		case false:
			design = 'danger';
			break;

		case 'Admin':
			design = 'danger';
			break;
		case 'Support':
			design = 'warning';
			break;
		case 'General':
			design = 'success';
			break;
		default:
			design = type;
	}
	return <Badge variant={design}>{children}</Badge>;
};
