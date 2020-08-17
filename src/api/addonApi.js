import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getAddons(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/addons`,
		params: params
	});
}

export function createAddon(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/addons`,
		data: {addon: data}
	});
}

export function showAddon(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/addons/${id}`
	});
}

export function updateAddon(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/addons/${id}`,
		data: {addon: data}
	});
}

export function deleteAddon(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/addons/${id}`
	});
}