import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import TransactionDetails from './TransactionDetails'

const TransactionList = () => {

    return (
        <div className="container-fluid">
			<div className="col-md-8 col-md-offset-2" id="search-form">
    			<h5 className="text-center">Transactionlist</h5>
    			<table className="table table-striped table-bordered">
      				<thead>
      					<tr>
					        <th>Transaction idx</th>
					        <th>state</th>
					        <th>Amount</th>
					        <th>Invoice no</th>
					        <th>Details</th>
      					</tr>
			      	</thead>
			      	<tbody>
				      	<tr>
					        <td>Transaction idx</td>
					        <td>state</td>
					        <td>Amount</td>
					        <td>Invoice No</td>
					        <td><Button variant="primary">
        						transaction details</Button>
  							</td>
				      	</tr>
			      	</tbody>
    			</table>
  			</div>
  			<TransactionDetails />

      		
		</div>

    );

};
export default TransactionList;