import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';

function setHeaders() {
	const AUTH_TOKEN = localStorage.getItem('token');
	if (AUTH_TOKEN) {
		axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
	}
}

export function getCities() {
	return axios.get(`${FLIGHT_API_URL}/sectors`, {crossdomain: true, headers: {'Access-Control-Allow-Origin': '*'}});
}

export function getFlights(formData) {
	return axios({
		method: 'get',
		url: `${FLIGHT_API_URL}/search`,
		params: formData,
		config: {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.token}`
			}
		}
	});
}

export function getBookingDetails(ruid) {
	return axios({
		method: 'get',
		url: `${BASE_URL}/ticket_generation/${ruid}`,
		config: {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.token}`
			}
		}
	});
}

export function createBooking(formData) {
	return axios({
		method: 'post',
		url: `${API_URL}/bookings`,
		data: formData,
		responseType: 'json',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function submitPassengers(formData) {
	return axios({
		method: 'put',
		url: `${API_URL}/bookings`,
		data: formData,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function cancelUserTickets(passengers) {
	const data = {
		ids: passengers.map((passenger) => {
			return passenger.id;
		})
	};
	return axios({
		method: 'put',
		url: `${API_URL}/tickets/cancel_request`,
		data: data,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function getAdminBookings(params) {
	return axios({
		method: 'get',
		url: `${BASE_URL}/admin/bookings?${params}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function cancelAdminTicket(id) {
	return axios({
		method: 'put',
		url: `${BASE_URL}/admin/tickets/${id}/cancel`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function ignoreAdminTicket(id) {
	return axios({
		method: 'put',
		url: `${BASE_URL}/admin/tickets/${id}/ignore`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function getAdminDashboard() {
	return axios({
		method: 'get',
		url: `${BASE_URL}/admin/dashboard`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function getCountries() {
	return axios({
		method: 'get',
		url: `${API_URL}/countries`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function downloadTicket(ruid) {
	return axios({
		url: `${BASE_URL}/${ruid}/download_ticket.pdf`,
		method: 'GET',
		responseType: 'blob',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'file.pdf');
		document.body.appendChild(link);
		link.click();
	});
}
