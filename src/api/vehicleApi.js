import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getVehicles(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/vehicle_types`,
		params: params
	});
}


export function getVehicleRates(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/vehicle_rates`,
		params: params
	});
}


export function getRouteRates(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/route_rates`,
		params: params
	});
}

export function createRouteRate(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/route_rates`,
		data: {route_rate: data}
	});
}

export function showRouteRate(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/route_rates/${id}`
	});
}

export function updateRouteRate(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/route_rates/${id}`,
		data: {route_rate: data}
	});
}

export function deleteRouteRate(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/route_rates/${id}`
	});
}