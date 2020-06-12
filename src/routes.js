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
import {HomePage, PageNotFound, UserNotVerified, VerifyUser, InfoPage, Blogs} from './components/pages';
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
import UpdateBooking from './components/admin/CancelRequests';
import TransactionDetails from './components/admin/TransactionDetails';
import AdminBookingDetails from './components/admin/BookingDetails';
import UserEmail from './components/admin/UserEmail';
import FlightBookings from './components/admin/FlightBookings';
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
import AddPassengers from './components/flights/AddPassengers';
import EditPassengers from './components/flights/EditPassengers';
import CarInquiryForm from './components/rental/CarInquiryForm';
import CarForm from './components/rental/CarForm';
import CarBookingForm from './components/rental/CarBookingForm';
import CardBookingDetails from './components/admin/CarBookingDetails';

const routes = [
	{private: false, path: '/login', component: SignInForm, layout: UserLayout, footer: true},
	{private: false, path: '/signup', component: SignUpForm, layout: UserLayout, footer: true},
	{private: false, path: '/flights', component: FlightList, layout: UserLayout},
	{private: false, path: '/hotels', component: HotelList, layout: UserLayout},
	{private: false, path: '/packages', component: PackageList, layout: UserLayout, footer: true},
	{private: false, path: '/package/:id', component: PackageDetails, layout: UserLayout, footer: true},
	{private: false, path: '/blogs', component: Blogs, layout: UserLayout, footer: true},
	{private: false, path: '/about', component: InfoPage, layout: UserLayout, footer: true},
	{private: false, path: '/partners/new', component: BecomePartnerForm, layout: UserLayout},
	{private: false, path: '/support', component: CustomerSupport, layout: UserLayout, footer: true},
	{private: false, path: '/not_verified', component: UserNotVerified, layout: UserLayout, footer: true},
	{private: false, path: '/inquiry', component: InquiryForm, layout: UserLayout},
	{private: false, path: '/verify/:token', component: VerifyUser, layout: UserLayout, footer: true},

	{private: true, path: '/passengers/:idx/edit', component: EditPassengers, layout: UserLayout},
	{private: true, path: '/passengers', component: AddPassengers, layout: UserLayout},
	{private: true, path: '/bookings', component: Bookings, layout: UserLayout},
	{private: true, path: '/transactions', component: Users, layout: UserLayout},
	{private: true, path: '/records', component: Users, layout: UserLayout},
	{private: true, path: '/profile/:idx', component: Users, layout: UserLayout},
	{private: true, path: '/users/edit', component: EditUserForm, layout: UserLayout},
	{private: true, path: '/booking/:id', component: BookingDetails, layout: UserLayout},
	{private: true, path: '/booking/:idx/edit', component: EditBooking, layout: UserLayout},
	{private: true, path: '/ticket/:id', component: TicketDetails, layout: UserLayout},

	{private: true, path: '/partners/package_form/:partnerId', component: AddPackageForm, layout: UserLayout},
	{private: true, path: '/admin/package_form', component: NewPackageForm, layout: UserLayout},
	{private: true, path: '/admin/partners/:id', component: PartnerProfile, layout: UserLayout},
	{private: true, path: '/inquiry_details/:idx', component: PackageInquiryDetails, layout: UserLayout},
	{private: true, path: '/inquiry_form/:idx', component: InquiryForm, layout: UserLayout},
	{private: true, path: '/admin/edit_inquiry', component: EditInquiry, layout: UserLayout},
	{private: true, path: '/admin/package_booking_details/:id', component: PackageBookingDetails, layout: UserLayout},
	{private: true, path: '/payment_success/:idx', component: PaymentSuccess, layout: UserLayout},

	{private: true, path: '/car_inquiry_form', component: CarInquiryForm, layout: UserLayout},
	{private: true, path: '/car_form', component: CarForm, layout: UserLayout},
	{private: true, path: '/car_booking_form', component: CarBookingForm, layout: UserLayout},

	
	{private: true, path: '/admin/car_bookings/:idx', component: CardBookingDetails, layout: AdminLayout},
	{private: true, path: '/car_bookings/:idx/edit', component: CarBookingForm, layout: UserLayout},

	
	{private: true, path: '/admin/transaction/:idx', component: TransactionDetails, layout: AdminLayout},
	{private: true, path: '/admin/transaction_list', component: TransactionList, layout: AdminLayout},
	{private: true, path: '/admin/create_user', component: CreateUser, layout: AdminLayout},
	{private: true, path: '/admin/users_list', component: UsersList, layout: AdminLayout},
	{private: true, path: '/admin/packages', component: PackagesList, layout: AdminLayout},
	{private: true, path: '/admin/package_details', component: AdminPackageDetails, layout: AdminLayout},
	{private: true, path: '/admin/partners', component: PartnerList, layout: AdminLayout},
	{private: true, path: '/admin/inquiry_details', component: InquiryDetails, layout: AdminLayout},
	{private: true, path: '/admin/inquiries', component: InquiryList, layout: AdminLayout},
	{private: true, path: '/admin/categories', component: CategoryList, layout: AdminLayout},
	{private: true, path: '/admin/package_booking', component: PackageBookingList, layout: AdminLayout},
	{private: true, path: '/admin/faqs', component: FaqList, layout: AdminLayout},
	{private: true, path: '/admin/category_details', component: CategoryDetail, layout: AdminLayout},
	{private: true, path: '/admin/category_form', component: CategoriesForm, layout: AdminLayout},
	{private: true, path: '/admin/faq/faq_form', component: FaqForm, layout: AdminLayout},
	{private: true, path: '/admin/faq/edit/:id', component: FaqForm, layout: AdminLayout},

	{private: true, path: '/admin/partner/:id', component: PartnerDetails, layout: AdminLayout},
	{private: true, path: '/admin/cancel_requests', component: UpdateBooking, layout: AdminLayout},
	{private: true, path: '/admin/flight_bookings', component: FlightBookings, layout: AdminLayout},
	{private: true, path: '/admin/bookings', component: AdminBookingDetails, layout: AdminLayout},
	{private: true, path: '/admin/email', component: UserEmail, layout: AdminLayout},
	{private: true, path: '/admin/:section', component: Dashboard, layout: AdminLayout},
	{private: true, path: '/admin', component: Dashboard, layout: AdminLayout},
	{private: true, path: '/partner', component: PartnerDashboard, layout: PartnerLayout}
];

const routing = (
	<Switch>
		<AppRoute exact path='/' component={HomePage} layout={UserLayout} footer={true} />
		{routes.map(
			(route) =>
				route.private ? (
					<PrivateRoute
						path={route.path}
						component={route.component}
						layout={route.layout}
						footer={route.footer}
					/>
				) : (
					<AppRoute
						path={route.path}
						component={route.component}
						layout={route.layout}
						footer={route.footer}
					/>
				)
		)}
		<AppRoute component={PageNotFound} layout={UserLayout} footer={true} />
	</Switch>
);

export default routing;
