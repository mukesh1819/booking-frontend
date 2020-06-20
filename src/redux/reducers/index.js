import flights from './flights';
import bookings from './bookings';
import sessions from './sessions';
import rentals from './rentals';
import extras from './extras';

import {
	combineReducers
} from 'redux';

export default combineReducers({
	flightStore: flights,
	bookingStore: bookings,
	userStore: sessions,
	rentalStore: rentals,
	extras: extras
});