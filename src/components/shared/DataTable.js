import React from 'react';
import {MDBDataTable} from 'mdbreact';

const Datatable = ({data}) => {
	console.log('Formatted Data', data);
	debugger;
	return <MDBDataTable striped bordered hover data={data} />;
};

export default Datatable;
