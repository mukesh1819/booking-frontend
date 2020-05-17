import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getAdminDashboard} from '../../api/flightApi';
import swal from 'sweetalert';
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
					faq: response.data.faq_count
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
			faq
		} = this.state;

		const section = this.props.location.hash;
		debugger;

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
						)}
						{(section == '' || section == '#others') && (
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
						)}
						{(section == '' || section == '#packages') && (
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
						)}
						{(section == '' || section == '#packages') && (
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
						)}
						{(section == '' || section == '#packages') && (
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
						)}
						{(section == '' || section == '#packages') && (
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
						)}
						{(section == '' || section == '#packages') && (
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
						)}
						{(section == '' || section == '#others') && (
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
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default Dashboard;
