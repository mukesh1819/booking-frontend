import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import PassengerForm from './components/flights/PassengerForm';
import Flights from './components/flights';
import App from './App';
import PageNotFound from './components/PageNotFound';
import FlightList from './components/flights/FlightList';
import FlightDetails from './components/flights/FlightDetails';
import HotelList from './components/hotels/HotelList';
import Packages from './components/packages';
import Users from './components/users';
import SignInForm from './components/sessions/SignInForm';
import SignUpForm from './components/sessions/SignUpForm';
import EditUserForm from './components/users/EditUserForm';
import BookingDetails from './components/bookings/BookingDetails';
import TicketDetails from './components/bookings/TicketDetails';
import TransactionList from './components/admin/TransactionList';
import CreateUser from './components/admin/CreateUser';
import UsersList from './components/admin/UsersList';
import Bookings from './components/bookings/Bookings';
import UpdateBooking from './components/admin/UpdateBooking';
import TransactionDetails from './components/admin/TransactionDetails';
import AdminBookingDetails from './components/admin/BookingDetails';
import UserEmail from './components/admin/UserEmail';
import DashboardBookings from './components/admin/DashboardBookings';
import Dashboard from './components/admin';
import PrivateRoute from './components/PrivateRoute';
import BecomePartnerForm from './components/partners/BecomePartnerForm';
import PackageDetails from './components/packages/PackageDetails';
import PackagesList from './components/admin/PackagesList';
import PartnerDetails from './components/admin/PartnerDetails';

function About() {
	return <h2>About Us</h2>;
}

const routing = (
	<Switch>
		<Route exact path='/' component={Flights} />

		<Route path='/login' component={SignInForm} />
		<Route path='/signup' component={SignUpForm} />
		<Route path='/flights' component={FlightList} />
		<Route path='/hotels' component={HotelList} />
		<Route path='/packages' component={Packages} />
		<Route path='/package/:id' component={PackageDetails} />
		<Route path='/about' component={About} />

		<PrivateRoute path='/book_flight' component={PassengerForm} />
		<PrivateRoute path='/bookings' component={Bookings} />
		<PrivateRoute path='/transactions' component={Users} />
		<PrivateRoute path='/records' component={Users} />
		<PrivateRoute path='/profile' component={Users} />
		<PrivateRoute path='/users/edit' component={EditUserForm} />
		<PrivateRoute path='/booking_details/:id' component={BookingDetails} />
		<PrivateRoute path='/ticket/:id' component={TicketDetails} />
		<PrivateRoute path='/partners/new' component={BecomePartnerForm} />

		<PrivateRoute path='/admin/transaction_details' component={TransactionDetails} />
		<PrivateRoute path='/admin/transaction_list' component={TransactionList} />
		<PrivateRoute path='/admin/create_user' component={CreateUser} />
		<PrivateRoute path='/admin/users_list' component={UsersList} />
		<PrivateRoute path='/admin/packages' component={PackagesList} />
		<PrivateRoute path='/admin/partner/:id' component={PartnerDetails} />

		<PrivateRoute path='/admin/update_booking' component={UpdateBooking} />
		<PrivateRoute path='/admin/dashboard_bookings' component={DashboardBookings} />
		<PrivateRoute path='/admin/bookings' component={AdminBookingDetails} />
		<PrivateRoute path='/admin/email' component={UserEmail} />
		<PrivateRoute path='/admin' component={Dashboard} />

		<Route component={PageNotFound} />
	</Switch>
);

export default routing;
