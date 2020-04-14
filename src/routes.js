import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {FlightList, FlightDetails, PassengerForm} from './components/flights';
import {HotelList} from './components/hotels';
import {PackageList, PackageDetails, InquiryDetails as PackageInquiryDetails} from './components/packages';
import Users from './components/users';
import {SignInForm, SignUpForm} from './components/sessions';
import {BookingDetails, Bookings, TicketDetails} from './components/bookings';
import PrivateRoute from './components/PrivateRoute';
import {
	BecomePartnerForm,
	PartnerProfile,
	PackageForm as AddPackageForm,
	PackageForm as NewPackageForm
} from './components/partners';
import HomePage from './components/pages/HomePage';
import {PageNotFound, UserNotVerified, VerifyUser} from './components/pages';
import {CustomerSupport} from './components/pages';
import {PaymentSuccess} from './components/payments';
import PartnerDashboard from './components/partners/Dashboard';

import EditUserForm from './components/users/EditUserForm';

import TransactionList from './components/admin/TransactionList';
import CreateUser from './components/admin/CreateUser';
import UsersList from './components/admin/UsersList';
import PackageBookingList from './components/admin/PackageBookingList';
import FaqList from './components/admin/FaqList';
import FaqForm from './components/admin/FaqForm';
import UpdateBooking from './components/admin/UpdateBooking';
import TransactionDetails from './components/admin/TransactionDetails';
import AdminBookingDetails from './components/admin/BookingDetails';
import UserEmail from './components/admin/UserEmail';
import DashboardBookings from './components/admin/DashboardBookings';
import Dashboard from './components/admin/Dashboard';
import PartnerList from './components/admin/PartnerList';
import PackagesList from './components/admin/PackagesList';
import PackageBookingDetails from './components/admin/PackageBookingDetails';
import InquiryDetails from './components/admin/InquiryDetails';
import InquiryForm from './components/packages/InquiryForm';
import PartnerDetails from './components/admin/PartnerDetails';
import InquiryList from './components/admin/InquiryList';
import CategoryList from './components/admin/CategoryList';
import CategoryDetail from './components/admin/CategoryDetail';
import CategoriesForm from './components/categories/CategoriesForm';
import EditBooking from './components/flights/EditBooking';
import EditInquiry from './components/admin/EditInquiry';
import AdminPackageDetails from './components/admin/PackageDetails';
import UserLayout from './components/layouts/UserLayout';
import AdminLayout from './components/layouts/AdminLayout';
import AppRoute from './components/AppRoute';
import PartnerLayout from './components/layouts/PartnerLayout';

function About() {
	return <h2>About Us</h2>;
}

const routing = (
	<Switch>
		<AppRoute exact path='/' component={HomePage} layout={UserLayout} />

		<AppRoute path='/login' component={SignInForm} layout={UserLayout} />
		<AppRoute path='/signup' component={SignUpForm} layout={UserLayout} />
		<AppRoute path='/flights' component={FlightList} layout={UserLayout} />
		<AppRoute path='/hotels' component={HotelList} layout={UserLayout} />
		<AppRoute path='/packages' component={PackageList} layout={UserLayout} />
		<AppRoute path='/package/:id' component={PackageDetails} layout={UserLayout} />
		<AppRoute path='/about' component={About} layout={UserLayout} />
		<AppRoute path='/partners/new' component={BecomePartnerForm} layout={UserLayout} />
		<AppRoute path='/support' component={CustomerSupport} layout={UserLayout} />
		<AppRoute path='/not_verified' component={UserNotVerified} layout={UserLayout} />
		<AppRoute path='/inquiry' component={InquiryForm} layout={UserLayout} />

		<PrivateRoute path='/verify/:token' component={VerifyUser} layout={UserLayout} />
		<PrivateRoute path='/passengers' component={PassengerForm} layout={UserLayout} />
		<PrivateRoute path='/bookings' component={Bookings} layout={UserLayout} />
		<PrivateRoute path='/transactions' component={Users} layout={UserLayout} />
		<PrivateRoute path='/records' component={Users} layout={UserLayout} />
		<PrivateRoute path='/profile' component={Users} layout={UserLayout} />
		<PrivateRoute path='/users/edit' component={EditUserForm} layout={UserLayout} />
		<PrivateRoute path='/booking/:id' component={BookingDetails} layout={UserLayout} />
		<PrivateRoute path='/booking/:idx/edit' component={EditBooking} layout={UserLayout} />
		<PrivateRoute path='/ticket/:id' component={TicketDetails} layout={UserLayout} />

		<PrivateRoute path='/partners/package_form/:partnerId' component={AddPackageForm} layout={UserLayout} />
		<PrivateRoute path='/admin/partners/package_form' component={NewPackageForm} layout={UserLayout} />
		<PrivateRoute path='/admin/partners/:id' component={PartnerProfile} layout={UserLayout} />
		<PrivateRoute path='/inquiry_details/:idx' component={PackageInquiryDetails} layout={UserLayout} />
		<PrivateRoute path='/inquiry_form' component={InquiryForm} layout={UserLayout} />
		<PrivateRoute path='/admin/edit_inquiry' component={EditInquiry} layout={UserLayout} />
		<PrivateRoute path='/admin/package_booking_details/:id' component={PackageBookingDetails} layout={UserLayout} />

		<PrivateRoute path='/admin/transaction_details' component={TransactionDetails} layout={AdminLayout} />
		<PrivateRoute path='/admin/transaction_list' component={TransactionList} layout={AdminLayout} />
		<PrivateRoute path='/admin/create_user' component={CreateUser} layout={AdminLayout} />
		<PrivateRoute path='/admin/users_list' component={UsersList} layout={AdminLayout} />
		<PrivateRoute path='/admin/packages' component={PackagesList} layout={AdminLayout} />
		<PrivateRoute path='/admin/package_details' component={AdminPackageDetails} layout={AdminLayout} />
		<PrivateRoute path='/admin/partners' component={PartnerList} layout={AdminLayout} />
		<PrivateRoute path='/admin/inquiry_details' component={InquiryDetails} layout={AdminLayout} />
		<PrivateRoute path='/admin/inquiries' component={InquiryList} layout={AdminLayout} />
		<PrivateRoute path='/admin/categories' component={CategoryList} layout={AdminLayout} />
		<PrivateRoute path='/admin/package_booking' component={PackageBookingList} layout={AdminLayout} />
		<PrivateRoute path='/admin/faqs' component={FaqList} layout={AdminLayout} />
		<PrivateRoute path='/admin/category_details' component={CategoryDetail} layout={AdminLayout} />
		<PrivateRoute path='/admin/category_form' component={CategoriesForm} layout={AdminLayout} />
		<PrivateRoute path='/admin/faq/faq_form' component={FaqForm} layout={AdminLayout} />
		<PrivateRoute path='/admin/faq/edit/:id' component={FaqForm} layout={AdminLayout} />
		<PrivateRoute path='/payment_success/:idx' component={PaymentSuccess} layout={AdminLayout} />

		<PrivateRoute path='/admin/partner/:id' component={PartnerDetails} layout={AdminLayout} />
		<PrivateRoute path='/admin/update_booking' component={UpdateBooking} layout={AdminLayout} />
		<PrivateRoute
			path='/admin/dashboard_bookings'
			component={DashboardBookings}
			layout={UserLayout}
		/>
		<PrivateRoute path='/admin/bookings' component={AdminBookingDetails} layout={AdminLayout} />
		<PrivateRoute path='/admin/email' component={UserEmail} layout={AdminLayout} />
		<PrivateRoute path='/admin' component={Dashboard} layout={AdminLayout} />
		<PrivateRoute path='/partner' component={PartnerDashboard} layout={PartnerLayout} />

		<AppRoute component={PageNotFound} layout={UserLayout} />
	</Switch>
);

export default routing;
