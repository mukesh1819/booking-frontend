import React, {Component} from 'react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar} from '../shared';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

class PartnerProfile extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {partner} = this.props;
		const sideBarMenu = [
			{icon: 'icon-home', name: 'profile', label: 'Profile', value: '', link: '/'},
			{
				icon: 'icon-beamed-note',
				name: 'company',
				label: 'Company Details',
				value: '',
				link: '/bookings'
			}
		];
		return (
			<div className='container partner-profile'>
				<div className='card'>
					<div className='card-body'>
						<div className='row'>
							{/* <div className='col-12 col-md-2 p-0'>
								<Sidebar items={sideBarMenu} />
							</div> */}
							<div className='col-12 col-md-2 offset-md-2 '>
								{/* <img src='' /> */}
								<div className=''>
									<i className='fas fa-user user-icon' />
									<h3 className='title'>
										{partner.first_name}&nbsp;
										{partner.last_name}
									</h3>
									<div className='text-small text-muted'>
										<i className='fas fa-envelope' />&nbsp;
										{partner.email}
									</div>
									<div className='text-small text-muted'>
										<i className='fas fa-address-card' />&nbsp;
										{partner.address}
									</div>
									<div className='text-small text-muted'>
										<i className='fas fa-phone-volume' />&nbsp;
										{partner.contact_number}
									</div>
									<div className=''>
										<Badge type={partner.status}>{partner.status}</Badge>
									</div>
								</div>
							</div>
							{/* <div className='col-12 col-md-6 list-view'>
								<div className='list'>
									<span className='label'>First Name</span>
									<span className='value'>{partner.first_name}</span>
								</div>
								<div className='list'>
									<span className='label'>Last Name</span>
									<span className='value'>{partner.last_name}</span>
								</div>
								<div className='list'>
									<span className='label'>Email</span>
									<span className='value'> {partner.email}</span>
								</div>
								<div className='list'>
									<span className='label'>Address</span>
									<span className='value'> </span>
								</div>
								<div className='list'>
									<span className='label'>Contact</span>
									<span className='value'>{partner.contact_number}</span>
								</div>
								<div className='list'>
									<span className='label'>Status</span>
									<span className='value'>
										<Badge type={partner.status}>{partner.status}</Badge>
									</span>
								</div>
							</div> */}
							<div className='col-12 col-md-6 list-view'>
								<h3 className='title'>Company Details</h3>
								<div className='list'>
									<span className='label'>Name</span>
									<span className='value'>{partner.company_name}</span>
								</div>
								<div className='list'>
									<span className='label'>Email</span>
									<span className='value'>{partner.company_email}</span>
								</div>
								<div className='list'>
									<span className='label'>Contact</span>
									<span className='value'>{partner.company_contact_number}</span>
								</div>
								<div className='list'>
									<span className='label'>Address</span>
									<span className='value'> {partner.company_address}</span>
								</div>
								<div className='list'>
									<span className='label'>Website</span>
									<span className='value'>{partner.website}</span>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-12 col-md-8 offset-md-2' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PartnerProfile;
