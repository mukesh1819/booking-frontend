import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {FLIGHT_API_URL} from '../constants/index.js';

function setHeaders() {
	const AUTH_TOKEN = localStorage.getItem('token');
	if (AUTH_TOKEN) {
		axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
	}
}

export function getCities() {
	return axios.get(`${FLIGHT_API_URL}/sectors`);
}

export function getFlights(formData) {
	return axios({
		method: 'get',
		url: `${FLIGHT_API_URL}/search`,
		params: formData,
		config: {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.token}`
			}
		}
	});
}

export function getBookingDetails(ruid) {
	return axios({
		method: 'get',
		url: `/api/bookings/${ruid}`,
		config: {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.token}`
			}
		}
	});
}

export function createBooking(formData) {
	return axios({
		method: 'post',
		url: `/api/bookings`,
		data: formData,
		responseType: 'json',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function submitPassengers(formData) {
	return axios({
		method: 'put',
		url: `/api/bookings`,
		data: formData,
		headers: {
			'Content-Type': 'application/json',
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
		url: `/tickets/cancel_request`,
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function getAdminBookings(params) {
	return axios({
		method: 'get',
		url: `/admin/bookings?${params}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer $(localStorage.token)`
		}
	});
}

export function cancelAdminTicket(id) {
	return axios({
		method: 'put',
		url: `/admin/tickets/${id}/cancel`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer $(localStorage.token)`
		}
	});
}

export function ignoreAdminTicket(id) {
	return axios({
		method: 'put',
		url: `/admin/tickets/${id}/ignore`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer $(localStorage.token)`
		}
	});
}

export function getAdminDashboard() {
	return axios({
		method: 'get',
		url: `/admin/dashboard`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer $(LocalStorage.token)`
		}
	});
}

export function getCountries() {
	return axios({
		method: 'get',
		url: '/api/countries',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer $(LocalStorage.token)`
		}
	});
}

export function downloadTicket(ruid) {
	return axios({
		url: `/${ruid}/download_ticket.pdf`,
		method: 'GET',
		responseType: 'blob' // important
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'file.pdf');
		document.body.appendChild(link);
		link.click();
	});
}
