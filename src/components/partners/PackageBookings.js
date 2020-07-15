import React, {Component, Fragment, useState, useEffect} from 'react';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {connect} from 'react-redux';
import ServiceDetails from './ServiceDetails';

const PackageBookings = (props) => {
	const [services, setServices] = useState([]);
	const [viewDetails, setViewDetails] = useState(false);

	useEffect(() => {
		showPartner(props.currentUser.partner ? props.currentUser.partner.idx : '')
			.then((response) => {
				setServices(response.data.partner_services);
			})
			.catch((error) => console.log(' partner fetch error', error));
	}, []);

	return (
		<Fragment>
			{!viewDetails &&
			services.length > 0 && (
				<Fragment>
					<h3 className='title'> Services </h3>
					{services.map((service) => (
						<div className='card'>
							<div className='card-body'>
								<div>
									<div onClick={() => setViewDetails(service)}>
										<h3 className='ui header'> {service.name} </h3>
										<div className='text-muted'> {service.details} </div>
									</div>
								</div>
							</div>
						</div>
					))}
					{services.map((service) => (
						<div className='card'>
							<div className='card-body'>
								<div>
									<div>
										<h3 className='ui header'> {service.name} </h3>
										<div className='text-muted'> {service.details} </div>
									</div>
								</div>
							</div>
						</div>
					))}
				</Fragment>
			)}
			{viewDetails && <ServiceDetails service={viewDetails} />}
		</Fragment>
	);
};

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PackageBookings);
