import axios from 'axios';
import {API_URL, ADMIN_API_URL, BASE_URL} from '../constants';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getUserDetails(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/user/profile`,
		params: params
	});
}

export function updateUserDetails(details) {
	return axios({
		method: 'put',
		url: `${API_URL}/members`,
		data: details
	});
}

export function getBookings(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/bookings?${params}`
	});
}

export function getUsers() {
	return axios({
		method: 'get',
		url: `${ADMIN_API_URL}/users`
	});
}

export function sendUserEmail(data) {
	return axios({
		method: 'post',
		url: `${BASE_URL}/admin/user_email`,
		data: data
	});
}

export function authorizeGoogle(data) {
	return axios({
		method: 'post',
		url: `${BASE_URL}/google/authorize`,
		data: {
			user_details: data
		}
	});
}

export function authorizeFb(data) {
	return axios({
		method: 'post',
		url: `${BASE_URL}/fb/authorize`,
		data: {
			user_details: data
		}
	});
}

export function verifyEmail(token) {
	return axios({
		method: 'get',
		url: `${BASE_URL}/verify/${token}`
	});
}
