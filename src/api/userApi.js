import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {API_URL, ADMIN_API_URL, BASE_URL} from '../constants';

export function getUserDetails(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/user/profile`,
		params: params,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function updateUserDetails(details) {
	return axios({
		method: 'put',
		url: `${API_URL}/members`,
		data: {user: details},
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function getBookings(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/bookings`,
		params: params,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function getUsers() {
	return axios({
		method: 'get',
		url: `${ADMIN_API_URL}/users`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function sendUserEmail(data) {
	return axios({
		method: 'post',
		url: `${BASE_URL}/admin/user_email`,
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function authorizeGoogle(data) {
	return axios({
		method: 'post',
		url: `/authorize_google`,
		data: {user_details: data.uc},
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
