import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getCarBookings(params){
	return axios({
		method: 'get',
		url: `${API_URL}/admin/car_bookings`,
		params: params
	});
}

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

export function showUserCarBooking(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/admin/car_bookings/${id}`
	});
}

export function getCarBookingConfirmation(id, params){
    return axios({
        method: 'put',
        url: `${API_URL}/admin/rentals/${id}/confirm`,
        params: params
    });
}

export function declineCarBooking(id, params){
    return axios({
        method: 'put',
        url: `${API_URL}/admin/rentals/${id}/decline`,
        params: params
    });
}

export function deleteCarBooking(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/admin/car_bookings/${id}`
	});
}

export function assignPartner(id, details){
	return axios({
		method: 'patch',
		url: `${API_URL}/admin/rentals/${id}/assign_partner`,
		data: {car_booking: details}
	});
}

export function showUserRentalBooking(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/car_bookings/${id}`
	});
}