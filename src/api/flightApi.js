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
	setHeaders();
	return axios({
		method: 'get',
		url: `${FLIGHT_API_URL}/search`,
		params: formData,
		config: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	});
}

export function createBooking(formData) {
	return axios({
		method: 'post',
		url: `api/bookings`,
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
		url: `/bookings`,
		data: formData,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localstorage.token}`
		}
	});
}
