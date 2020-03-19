import React, {component, Component} from 'react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../utils/helpers';
import {getPartners} from '../../api/partnerApi';
import {Link} from 'react-router-dom';

class PartnerList extends Component{

    constructor(props){
        super(props);
        this.state={
            partners:[]
        }
    }

    componentDidMount(){
		passCsrfToken(document, axios);
		this.fetchPartners();
    }

    fetchPartners(){
        getPartners()
        .then((response) => {
            console.log('response', response.data);
            this.setState({
                partners: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        const {partners} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<h5>Users</h5>
					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Company Name</th>
								<th>Contact Number</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{partners.map((partner) => {
								return (
									<tr>
										<td>{partner.name}</td>
										<td>{partner.email} </td>
                                        <td>{partner.company_name}</td>
										<td>{partner.contact_number}</td>

										<td>
											<Link
												to={{
													pathname: '/admin/partner_profile',
													state: {
														partner: partner
													}
												}}
											>
												<i className='fas fa-contact' />
												<span className='px-1'>view</span>
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

}
export default PartnerList;
