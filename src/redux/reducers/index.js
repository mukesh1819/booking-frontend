import flights from './flights';
import bookings from './bookings';
import sessions from './sessions';

import {
	combineReducers
} from 'redux';

export default combineReducers({
	flightStore: flights,
	bookingStore: bookings,
	userStore: sessions
});