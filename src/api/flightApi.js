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
	return axios({
		method: 'get',
		url: `${FLIGHT_API_URL}/search`,
		params: formData
	});
}

export function getBookingDetails(ruid) {
	return axios({
		method: 'get',
		url: `${BASE_URL}/ticket_generation/${ruid}`
	});
}

export function createBooking(formData) {
	return axios({
		method: 'post',
		url: `${API_URL}/bookings`,
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

export function downloadTicket(ruid) {
	return axios({
		url: `${BASE_URL}/${ruid}/download_ticket.pdf`,
		method: 'GET',
		responseType: 'blob'
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'file.pdf');
		document.body.appendChild(link);
		link.click();
	});
}
