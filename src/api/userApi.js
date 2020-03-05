import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {API_URL, ADMIN_API_URL} from '../constants';

export function getUserDetails(params) {
	const token = localStorage.token;
	return axios({
		method: 'get',
		url: `${API_URL}/user/profile`,
		params: params,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
}

export function updateUserDetails(details) {
	return axios({
		method: 'put',
		url: `/users`,
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
		url: `/admin/user_email`,
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}
