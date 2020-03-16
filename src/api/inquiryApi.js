import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError} from './apiUtils';
import {func} from 'prop-types';

export function getInquiries(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/inquiries`,
		params: params,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer {localStorage.token}`
		}
	});
}

export function showInquiry(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/inquiries/${id}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function createInquiry(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/inquiries`,
		data: {inquiry: data},
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function updateInquiry(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/inquiries/${id}`,
		data: {inquiry: data},
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function deleteInquiry(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/inquiries/${id}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}
