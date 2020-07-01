import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar} from '../shared';
import PartnerProfile from './PartnerProfile';
import {getPartnerServices} from '../../api/partnerServiceApi';

// const PartnerProfile = () => {
// 	return 'PARTNER PROFILE';
// };

const Services = (props) => {
	const {services} = props;
	return (
		<div className='container'>
			{services.length > 0 &&
				<div className='card'>
					<div className='card-body'>
						<div className='row'>
							<div className='col-12 col-md-8 offset-md-2'>
								<h3 className='title'>Services</h3>
								{services.map((service) => (
									<div className='card'>
										<div className='card-body'>
											<div className='list-view'>
												<div className='list'>
													<div className='label'>Service Name - {service.name}</div>
													<div className='label'>Service Details - {service.details}</div>
												</div>
											</div>
											<h3>Service Info</h3>
											{Object.entries(service.extras).map(([key, value]) =>  (
												// arr.push(json[key]);
												<div>{key} - {value}</div>
											))}
											{/* <div>{service.extras}</div> */}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
}

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
