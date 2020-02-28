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
import Dashboard from './components/admin';
import TicketDetails from './components/bookings/TicketDetails';
import TransactionList from './components/admin/TransactionList';
import CreateUser from './components/admin/CreateUser';
import UsersList from './components/admin/UsersList';
import history from './history';
import Bookings from './components/bookings/Bookings';
import UpdateBooking from './components/admin/UpdateBooking';
import TransactionDetails from './components/admin/TransactionDetails'
import AdminBookingDetails from './components/admin/BookingDetails'
import UserEmail from './components/admin/UserEmail';

function About() {
	return <h2>About Us</h2>;
}

const routing = (
	<Router history={history}>
		<NavBar />
		<Switch>
			<Route exact path='/' component={Flights} />
			<Route path='/flights' component={FlightList} />
			<Route path='/hotels' component={HotelList} />
			<Route path='/packages' component={Packages} />
			<Route path='/about' component={About} />
			<Route path='/book_flight' component={PassengerForm} />
			<Route path='/profile' component={Users} />
			<Route path='/booking_list' component={Bookings} />
			<Route path='/transactions' component={Users} />
			<Route path='/records' component={Users} />
			<Route path='/login' component={SignInForm} />
			<Route path='/signup' component={SignUpForm} />
			<Route path='/users/edit' component={EditUserForm} />
			<Route path='/booking_details' component={BookingDetails} />
			<Route path='/ticket_details' component={TicketDetails} />
			<Route path='/admin/transaction_details' component={TransactionDetails} />
			<Route path='/admin/transaction_list' component={TransactionList} />
			<Route path='/admin/create_user' component={CreateUser} />
			<Route path='/admin/users_list' component={UsersList} />
			<Route path='/admin/update_booking' component={UpdateBooking} />
			<Route path='/admin/booking_details' component={AdminBookingDetails} />
			<Route path='/admin/email' component={UserEmail} />
			<Route path='/admin' component={Dashboard} />
			<Route component={PageNotFound} />
		</Switch>
		<Footer />
	</Router>
);

export default routing;
