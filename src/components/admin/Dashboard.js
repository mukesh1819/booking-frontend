import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {getAdminDashboard} from '../../api/flightApi';
import swal from 'sweetalert';
import history from '../../history';
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: '',
			bookings: '',
			transactions: ''
		};
	}

	componentDidMount() {
		this.fetchAdminDetails();
	}

	fetchAdminDetails() {
		getAdminDashboard()
			.then((response) => {
				console.log(response.data);
				this.setState({
					users: response.data.users_count,
					bookings: response.data.bookings_count,
					transactions: response.data.transactions_count,
					packages: response.data.packages_count,
					partners: response.data.partners_count,
					inquiries: response.data.inquiries_count,
					categories: response.data.categories_count,
					packageBooking: response.data.package_booking_count,
					faq: response.data.faq_count,
					cars: response.data.car_count,
					carBooking: response.data.car_booking_count,
					rentalPartner: response.data.rental_partner_count,
					location: response.data.location_count,
					carInquiry: response.data.car_inquiry_count
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log('Dashboard fetch error', error);
			});
	}

	render() {
		const {
			users,
			bookings,
			transactions,
			packages,
			partners,
			inquiries,
			categories,
			packageBooking,
			faq,
			cars,
			carBooking,
			rentalPartner,
			location,
			carInquiry
		} = this.state;

		const section = this.props.location.hash;

		return (
			<React.Fragment>
				<div className='dashboard container'>
					<div className='row'>
						{(section == '' || section == '#users') && (
							<div className='widget col-sm-12 col-md-4'>
								<div className='card'>
									<div className='card-body'>
										<div className='text-center'>
											<span className='count'> {users} </span> <hr />
											<Link to='/admin/users_list' className='action'>
												View all Users
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
						{(section == '' || section == '#flights') && (
							<Fragment>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {bookings} </span> <hr />
												<Link to='/admin/flight_bookings' className='action'>
													View all bookings
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {0} </span> <hr />
												<Link to='/admin/cancel_requests' className='action'>
													View all Cancel Requests
												</Link>
											</div>
										</div>
									</div>
								</div>
							</Fragment>
						)}

						{(section == '' || section == '#others') && (
							<Fragment>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {transactions} </span> <hr />
												<Link to='/admin/transaction_list' className='action'>
													View all transactions
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {faq} </span> <hr />
												<Link to='/admin/faqs' className='action'>
													View all Faqs
												</Link>
											</div>
										</div>
									</div>
								</div>
							</Fragment>
						)}

						{(section == '' || section == '#packages') && (
							<Fragment>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {partners} </span> <hr />
												<Link to='/admin/partners' className='action'>
													View all Partners
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {packages} </span> <hr />
												<Link to='/admin/packages' className='action'>
													View all Packages
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {categories} </span> <hr />
												<Link to='/admin/categories' className='action'>
													View all Categories
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {inquiries} </span> <hr />
												<Link to='/admin/inquiries' className='action'>
													View all Inquiries
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {packageBooking} </span> <hr />
												<Link to='/admin/package_booking' className='action'>
													View all Package Bookings
												</Link>
											</div>
										</div>
									</div>
								</div>
							</Fragment>
						)}

						{(section == '' || section == '#rentals') && (
							<Fragment>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {carBooking} </span> <hr />
												<Link to='/admin/car_bookings' className='action'>
													View all Car Bookings
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {cars} </span> <hr />
												<Link to='/admin/cars' className='action'>
													View all Cars
												</Link>
											</div>
										</div>
									</div>
								</div>

								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {rentalPartner} </span> <hr />
												<Link to='/admin/rental_partners' className='action'>
													View all Rental Partners
												</Link>
											</div>
										</div>
									</div>
								</div>

								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {location} </span> <hr />
												<Link to='/admin/locations' className='action'>
													View all location
												</Link>
											</div>
										</div>
									</div>
								</div>

								<div className='widget col-sm-12 col-md-4'>
									<div className='card'>
										<div className='card-body'>
											<div className='text-center'>
												<span className='count'> {carInquiry} </span> <hr />
												<Link to='/admin/car_inquiries' className='action'>
													View all Car Inquiry
												</Link>
											</div>
										</div>
									</div>
								</div>
							</Fragment>
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default Dashboard;
