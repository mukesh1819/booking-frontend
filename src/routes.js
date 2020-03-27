import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import {FlightList, FlightDetails, PassengerForm} from './components/flights';
import App from './App';
import PageNotFound from './components/PageNotFound';
import {HotelList} from './components/hotels';
import {PackageList, PackageDetails, InquiryDetails as PackageInquiryDetails} from './components/packages';
import Users from './components/users';
import {SignInForm, SignUpForm} from './components/sessions';
import EditUserForm from './components/users/EditUserForm';
import {BookingDetails, Bookings, TicketDetails} from './components/bookings';
import TransactionList from './components/admin/TransactionList';
import CreateUser from './components/admin/CreateUser';
import UsersList from './components/admin/UsersList';
import UpdateBooking from './components/admin/UpdateBooking';
import TransactionDetails from './components/admin/TransactionDetails';
import AdminBookingDetails from './components/admin/BookingDetails';
import UserEmail from './components/admin/UserEmail';
import DashboardBookings from './components/admin/DashboardBookings';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import {
	BecomePartnerForm,
	PartnerProfile,
	PackageForm as AddPackageForm,
	PackageForm as NewPackageForm
} from './components/partners';

import {PaymentSuccess} from './components/payments';
import PartnerList from './components/admin/PartnerList';
import PackagesList from './components/admin/PackagesList';
import InquiryDetails from './components/admin/InquiryDetails';
import PartnerDetails from './components/admin/PartnerDetails';
import InquiryList from './components/admin/InquiryList';
import CategoryList from './components/admin/CategoryList';
import CategoryDetail from './components/admin/CategoryDetail';
import CategoriesForm from './components/categories/CategoriesForm';

function About() {
	return <h2>About Us</h2>;
}

const routing = (
	<Switch>
		<Route exact path='/' component={HomePage} />

		<Route path='/login' component={SignInForm} />
		<Route path='/signup' component={SignUpForm} />
		<Route path='/flights' component={FlightList} />
		<Route path='/hotels' component={HotelList} />
		<Route path='/packages' component={PackageList} />
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
		<PrivateRoute path='/partners/package_form/:partnerId' component={AddPackageForm} />
		<PrivateRoute path='/admin/partners/package_form' component={NewPackageForm} />
		<PrivateRoute path='/inquiry_details/:idx' component={PackageInquiryDetails} />
		<PrivateRoute path='/payment_success/:idx' component={PaymentSuccess} />

		<PrivateRoute path='/admin/transaction_details' component={TransactionDetails} />
		<PrivateRoute path='/admin/transaction_list' component={TransactionList} />
		<PrivateRoute path='/admin/create_user' component={CreateUser} />
		<PrivateRoute path='/admin/users_list' component={UsersList} />
		<PrivateRoute path='/admin/packages' component={PackagesList} />
		<PrivateRoute path='/admin/partners' component={PartnerList} />
		<PrivateRoute path='/admin/partner_profile' component={PartnerProfile} />
		<PrivateRoute path='/admin/inquiry_details' component={InquiryDetails} />
		<PrivateRoute path='/admin/inquiries' component={InquiryList} />
		<PrivateRoute path='/admin/categories' component={CategoryList} />
		<PrivateRoute path='/admin/category_details' component={CategoryDetail} />
		<PrivateRoute path='/admin/categories/category_form' component={CategoriesForm} />
		<PrivateRoute path='/admin/partner/:id' component={PartnerProfile} />

		<PrivateRoute path='/admin/update_booking' component={UpdateBooking} />
		<PrivateRoute path='/admin/dashboard_bookings' component={DashboardBookings} />
		<PrivateRoute path='/admin/bookings' component={AdminBookingDetails} />
		<PrivateRoute path='/admin/email' component={UserEmail} />
		<PrivateRoute path='/admin' component={Dashboard} />

		<Route component={PageNotFound} />
	</Switch>
);

export default routing;
