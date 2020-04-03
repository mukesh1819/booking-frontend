import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getCategories(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/categories`,
		params: params
	});
}

export function showCategory(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/categories/${id}`
	});
}

export function createCategory(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/categories`,
		data: {category: data}
	});
}

export function updateCategory(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/categories/${id}`,
		data: {category: data}
	});
}

export function deleteCategory(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/categories/${id}`
	});
}
