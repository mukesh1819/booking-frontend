import React,{ Component} from 'react';
import {getPartners} from '../../api/partnerApi';
import {CustomMenu} from './Menu';
import queryString from 'query-string';
import axios from 'axios';
import history from '../../history';
import ErrorMessage from '../ErrorMessage';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';
import {Modal as ModalExample, Badge} from '../shared';
import swal from 'sweetalert';
import {Menu, Segment, Pagination, Input, Accordion, Dropdown, Button} from 'semantic-ui-react';
import FilterForm from './FilterForm';
import moment from 'moment';
import {getSummary} from '../../api/serviceTransactionApi';

class SummaryList extends Component{
    constructor(props){
        super(props);
        this.state={
            partners: [],
            summaries: []
        }
    }

    // changeCurrentPage = (e, {activePage}) => {
	// 	var searchQuery = `?page=${activePage}`;
	// 	this.setState({currentPage: activePage});
	// 	this.getSummary({page: activePage});
	// 	history.push({
	// 		pathname: window.location.pathname,
	// 		search: searchQuery
	// 	});
	// };


    componentDidMount(){
        this.fetchPartners();
    }

    fetchPartners(){
        getPartners()
        .then((response) => {
            this.setState({
                partners: response.data.partners
            });
        })
        .catch((error) => {
            console.log(error);
        });

        getSummary(queryString.parse(this.props.location.search))
			.then((response) => {
				this.setState({
                    summaries: response.data
                    // pagination: response.data.meta.pagination
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log('Summary fetch error', error);
			});
        
    }

    onFilter = (values) => {
		this.setState({
			summaries: values.summaries
		});
    };
    
    render(){
        const {partners, summaries, pagination} = this.state;
        
        const filterFields = [
			{
				name: 'created_at_gteq',
				label: 'From Date',
				type: 'date'
			},
			{
				name: 'created_at_lteq',
				label: 'To Date',
				type: 'date'
			},

			{
				name: 'amount_eq',
				label: 'amount',
				type: 'text'
			},

			// {
			// 	name: 'partner_first_name_or_partner_last_name_cont',
			// 	label: 'Partner Name',
			// 	type: 'text'
			// },

			{
				label: 'Partner Name',
				type: 'select',
				//name: 'partner_id_eq',
				name: 'partner_id_eq',
				options: partners.map(function(partner) {
					// key: partner.id
					// value: partner.id
					var pName = partner.first_name + " " +  partner.last_name;
					return{
						key: partner.id,
						value: partner.id,
						text: pName
					};
					 
					
				})
			},

			{
				name: 'closing_balance_eq',
				label: 'Total Transaction',
				type: 'text'
			},

			{
				name: 'remarks_cont',
				label: 'Remarks',
				type: 'text'
			}
		];
        return(
            <React.Fragment>
				{(summaries.length > 0  && partners.length > 0) && (
					<div className='ui container'>
						
						<div className='' id='search-form'>
							<div className='row'>
								<div className='col-4'>
									<h3 className='title'>Transaction Summary</h3>
								</div>
								
							</div>
							

							<CustomMenu
								submitUrl='service_transactions/summary'
								filterFields={filterFields}
								onFilter={(values) => this.onFilter(values)}
								items={[
									{
										label: 'Transaction Type',
										type: 'dropdown',
										name: 'direction_eq',
										objects: [
											{
												label: 'debit',
												value: 'debit'
											},
											{
												label: 'credit',
												value: 'credit'
											}
										]
									}
								]}
							/>


							<Segment>
								<table className='table table-striped table-bordered'>
									<thead>
										<tr>
											<th>S. No.</th>
											<th>Partner</th>
											<th>Total Service Balance</th>
											<th>Total Paid Amount</th>
											<th>Total Due Balance</th>
										</tr>
									</thead>
									<tbody>
										{summaries.map((summary, index) => {
											return (
												<tr>
													<td>{index + 1}</td>
													
                                                    <td>{partners.find((partner) => partner.id == summary.partner_id).full_name} </td>
													<td>{summary.credit}</td>
													<td>{summary.debit}</td>
													<td>{summary.due}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</Segment>
							

							{/* <div className='text-center p-2'>
								<Pagination
									activePage={pagination.current_page}
									sizePerPage={pagination.per_page}
									onPageChange={this.changeCurrentPage}
									totalPages={pagination.total_pages}
								/>
							</div> */}
						</div>
					</div>
				)}
			</React.Fragment>
        );
    }
}

export default SummaryList;