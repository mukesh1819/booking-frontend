import axios from 'axios';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import history from '../history';
import swal from 'sweetalert';

useInterceptor(axios);

export function getCities() {
	return axios.get(`${FLIGHT_API_URL}/sectors`);
}

export function getFlights(formData) {
	var flightDate = formData.strFlightDate;
	var returnDate = formData.strReturnDate;
	flightDate.setHours(12, 0, 0);
	returnDate.setHours(12, 0, 0);
	return axios({
		method: 'get',
		url: `${FLIGHT_API_URL}/search`,
		params: {
			...formData,
			strFlightDate: flightDate,
			strReturnDate: returnDate
		}
	});
}

export function getBookingDetails(ruid) {
	return axios({
		method: 'get',
		url: `${BASE_URL}/ticket_generation/${ruid}`
	});
}

export function getPassengerDetails(ruid) {
	return axios({
		method: 'get',
		url: `${API_URL}/api/bookings/${ruid}/passengers`
	});
}

export function deleteBooking(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/bookings/${id}`
	});
}

export function createBooking(formData) {
	return axios({
		method: 'post',
		url: `${API_URL}/bookings`,
		data: formData
	});
}

export function updateBooking(idx, formData) {
	return axios({
		method: 'put',
		url: `${API_URL}/bookings/${idx}`,
		data: formData
	});
}

export function cancelUserTickets(ids) {
	return axios({
		method: 'put',
		url: `${API_URL}/tickets/cancel_request`,
		data: ids
	});
}

export function getAdminBookings(params) {
	return axios({
		method: 'get',
		url: `${BASE_URL}/admin/bookings?${params}`
	});
}

export function cancelAdminTicket(id) {
	return axios({
		method: 'put',
		url: `${BASE_URL}/admin/tickets/${id}/cancel`
	});
}

export function ignoreAdminTicket(id) {
	return axios({
		method: 'put',
		url: `${BASE_URL}/admin/tickets/${id}/ignore`
	});
}

export function getAdminDashboard() {
	return axios({
		method: 'get',
		url: `${BASE_URL}/admin/dashboard`
	});
}

export function getCountries() {
	return axios({
		method: 'get',
		url: `${API_URL}/countries`
	});
}

export function fetchTicket(ruid) {
	return axios({
		url: `${BASE_URL}/${ruid}/download_ticket.pdf`,
		method: 'GET',
		responseType: 'blob'
	});
}
