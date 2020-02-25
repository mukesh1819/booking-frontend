import React, { Component } from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import TransactionDetails from './TransactionDetails';
import {getUserTransaction} from '../../api/transactionApi';
import { passCsrfToken } from '../../utils/helpers';
import axios from 'axios';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

class TransactionList extends Component{

	constructor(props){
		super(props);
		this.state = {
			transactions: []
		}
	}

	componentDidMount(){
		passCsrfToken(document, axios);
		this.fetchUserTransaction();
	}

	fetchUserTransaction(){
		getUserTransaction()
		.then((response) => {
			console.log(response);
			this.setState({
				transactions: response.data
			})
		})
		.catch((error) => {
			console.log(error);
		});
	}

	render(){

		return (
			<React.Fragment>
				{this.state.transactions !== null && (
					<div className="container-fluid">
					<div className="col-md-8 col-md-offset-2" id="search-form">
						<h5 className="text-center">Transactionlist</h5>
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
								<th>Transaction Invoice</th>
								<th>state</th>
								<th>Amount</th>
								<th>Details</th>
								</tr>
							</thead>
							<tbody>
								{this.state.transactions.map((transaction) => {
									return(
	
										<tr>
											<td>{transaction.idx}</td>
											<td>{transaction.state}</td>
											<td>{transaction.amount}</td>
											<td><Link 
												to={{
													pathname: '/admin/transaction_details',
													state: {
														transaction: transaction
													}
												}}
											>Transaction details</Link>
											</td>
											
										</tr>
									);
									
								})}
							</tbody>
						</table>
					  </div>
					</div>
				)}
				
			</React.Fragment>
			
	
		);

	}

}

export default TransactionList;