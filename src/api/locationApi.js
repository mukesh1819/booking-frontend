import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getLocations(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/admin/locations`,
		params: params
	});
}

export function createLocation(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/admin/locations`,
		data: {location: data}
	});
}

export function updateLocation(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/admin/locations/${id}`,
		data: {location: data}
	});
}

export function deleteLocation(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/admin/locations/${id}`
	});
}
