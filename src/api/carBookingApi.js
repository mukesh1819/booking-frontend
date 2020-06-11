import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);


export function createCarBooking(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/car_bookings`,
		data: {car_booking: data}
	});
}

export function updateCarBooking(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/car_bookings/${id}`,
		data: {car_booking: data}
	});
}
