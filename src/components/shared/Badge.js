import React from 'react';
import {Badge} from 'react-bootstrap';

export default ({type = 'light', content}) => {
	var design;
	switch (type) {
		case 'pending':
			design = 'warning';
		case 'verified':
			design = 'success';
		case 'cancelled':
			design = 'danger';
		default:
			design = type;
	}
	console.log(design);
	return <Badge variant={design}>{content}</Badge>;
};
