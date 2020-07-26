import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {confirmPartner, showPartner} from '../../api/partnerApi';
import {Badge, Sidebar} from '../shared';
import {PersonalProfile, CompanyProfile} from './PartnerProfile';
import Services from './ServiceDetails';
import RentalBooking from './RentalBookings';
import PackageBookings from './PackageBookings';
import {PartnerProfile} from '.';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partner: {
				partner_services: [],
				car_bookings: []
			}
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.currentUser.email != null && prevState.partner.id == null) {
			this.fetchPartner();
		}
	}

	fetchPartner = () => {
		showPartner(this.props.currentUser.partner.idx)
			.then((response) => {
				this.setState({
					partner: response.data
				});
			})
			.catch((error) => console.log(' partner fetch error', error));
	};

	render() {
		const section = this.props.location.hash;
		const {partner} = this.state;
		const {user} = this.props.currentUser;
		return (
			<div>
				<div className='dashboard container'>
					<div className='row'>
						{(section == '' || section == '#packages') && (
							<div className='widget col-sm-12 col-md-4'>
								<div className='card'>
									<div className='card-body'>
										<div className='text-center'>
											<span className='count'> {partner.partner_services.length} </span> <hr />
											<Link to='/partner/package_bookings' className='action'>
												View all Package Bookings
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
						{(section == '' || section == '#rentals') && (
							<div className='widget col-sm-12 col-md-4'>
								<div className='card'>
									<div className='card-body'>
										<div className='text-center'>
											<span className='count'> {partner.car_bookings.length} </span> <hr />
											<Link to='/partner/car_bookings' className='action'>
												View all Car Bookings
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
						{(section == '' || section == '#transactions') && (
							<div className='widget col-sm-12 col-md-4'>
								<div className='card'>
									<div className='card-body'>
										<div className='text-center'>
											<span className='count'> 0 </span> <hr />
											<Link to='/partner/transactions' className='action'>
												View all Transactions
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}

						{(section == '' || section == '#service_transactions') && (
							<div className='widget col-sm-12 col-md-4'>
								<div className='card'>
									<div className='card-body'>
										<div className='text-center'>
											<span className='count'> 0 </span> <hr />
											<Link to='/partner/service_transactions' className='action'>
												View all Service Transactions
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className='ui segment'>{section == '#profile' && <PartnerProfile partner={partner} />}</div>
				</div>

				<div />
			</div>
		);
	}
}

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
