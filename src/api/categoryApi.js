import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError} from './apiUtils';

export function getCategories(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/categories`,
		params: params,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function showCategory(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/categories/${id}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function createCategory(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/categories`,
		data: {category: data},
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function updateCategory(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/categories/${id}`,
		data: {category: data},
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function deleteCategory(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/categories/${id}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}
