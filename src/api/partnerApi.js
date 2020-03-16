import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError} from './apiUtils';

export function getPartners(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/partners`,
		params: params,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function showPartner(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/partners/${id}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function createPartner(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/partners`,
		data: {partner: data},
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function updatePartner(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/partners/${id}`,
		data: {partner: data},
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function deletePartner(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/partners/${id}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}
