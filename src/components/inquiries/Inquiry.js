import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import {Badge} from '../shared';

class Inquiry extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {inquiry, aPackage} = this.props;
		const totalAmount = (inquiry.number_of_adult + inquiry.number_of_child) * aPackage.price;
		return (
			<div className='row'>
				<div className='col-12 col-md-3 offset-md-1 '>
					{/* <img src='' /> */}
					<div className=''>
						<h3 className='title'>Inquirer</h3>
						<h3 className='value text-large text-bold'>
							{inquiry.first_name}&nbsp;{inquiry.last_name}
						</h3>
						<div className='text-small text-muted'>
							<i className='fas fa-envelope' />&nbsp;
							{inquiry.email_address}
						</div>
						<div className='text-small text-muted'>
							<i className='fas fa-globe-americas' />&nbsp;
							{inquiry.nationality}
						</div>
						<div className='text-small text-muted'>
							<i className='fas fa-address-card' />&nbsp;
							{inquiry.address}&nbsp;
							{inquiry.city}&nbsp;
							{inquiry.zip_code}&nbsp;
						</div>
						<div className='text-small text-muted'>
							<i className='fas fa-phone-volume' />&nbsp;
							{inquiry.phone}
						</div>
						<div>
							<Badge type={inquiry.status}> {inquiry.status}</Badge>
						</div>
					</div>
				</div>
				<div className='col-12 col-md-7'>
					<div className='list-view'>
						<h3 className='title'>Package Details</h3>
						<div className='list'>
							<span className='label'>Name</span>
							<span className='value'> {inquiry.package_name}</span>
						</div>
						<div className='list'>
							<span className='label'>Preferred Date</span>
							<span className='value'>{inquiry.preferred_date}</span>
						</div>
						<div className='list'>
							<span className='label'>Unit Price</span>
							<span className='value'>{aPackage.price}</span>
						</div>
						<div className='list'>
							<span className='label'>Total Amount</span>
							<span className='value'>{totalAmount}</span>
						</div>
					</div>

					<div className='list-view'>
						<h3 className='title'>Traveller Details</h3>

						<div className='list'>
							<span className='label'>Head Traveller Name</span>
							<span className='value'> {inquiry.head_traveller_name}</span>
						</div>
						<div className='list'>
							<span className='label'>Number of Adults</span>
							<span className='value'> {inquiry.number_of_adult}</span>
						</div>
						<div className='list'>
							<span className='label'>Number of Child</span>
							<span className='value'> {inquiry.number_of_child}</span>
						</div>
						{inquiry.query !== null && (
							<div className='list'>
								<div className='label'>Queries</div>
								<div className='value'> {inquiry.query}</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Inquiry;
