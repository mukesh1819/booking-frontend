import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';

import PassengerForm from './components/flights/PassengerForm';
import NavBar from './components/NavBar';
import Footer from './components/shared/Footer';
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
import history from './history';
import Bookings from './components/bookings/Bookings';
import UpdateBooking from './components/admin/UpdateBooking';
import TransactionDetails from './components/admin/TransactionDetails';
import AdminBookingDetails from './components/admin/BookingDetails';
import UserEmail from './components/admin/UserEmail';
import Dashboard from './components/admin';
import PrivateRoute from './components/PrivateRoute';

function About() {
	return <h2>About Us</h2>;
}

const routing = (
	<Router history={history}>
		<NavBar />
		<Switch>
			<Route exact path='/' component={Flights} />

			<Route path='/login' component={SignInForm} />
			<Route path='/signup' component={SignUpForm} />
			<Route path='/flights' component={FlightList} />
			<Route path='/hotels' component={HotelList} />
			<Route path='/packages' component={Packages} />
			<Route path='/about' component={About} />

			<PrivateRoute path='/book_flight' component={PassengerForm} />
			<PrivateRoute path='/booking_list' component={Bookings} />
			<PrivateRoute path='/transactions' component={Users} />
			<PrivateRoute path='/records' component={Users} />
			<PrivateRoute path='/profile' component={Users} />
			<PrivateRoute path='/users/edit' component={EditUserForm} />
			<PrivateRoute path='/booking_details' component={BookingDetails} />
			<PrivateRoute path='/ticket_details' component={TicketDetails} />

			<PrivateRoute path='/admin/transaction_details' component={TransactionDetails} />
			<PrivateRoute path='/admin/transaction_list' component={TransactionList} />
			<PrivateRoute path='/admin/create_user' component={CreateUser} />
			<PrivateRoute path='/admin/users_list' component={UsersList} />
			<PrivateRoute path='/admin/update_booking' component={UpdateBooking} />
			<PrivateRoute path='/admin/booking_details' component={AdminBookingDetails} />
			<PrivateRoute path='/admin/email' component={UserEmail} />
			<PrivateRoute path='/admin' component={Dashboard} />

			<Route component={PageNotFound} />
		</Switch>
		<Footer />
	</Router>
);

export default routing;