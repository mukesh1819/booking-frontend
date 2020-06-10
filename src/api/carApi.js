import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getCars(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/cars`,
		params: params
	});
}

export function createCar(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/cars`,
		data: {car: data}
	});
}

export function updateCar(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/cars/${id}`,
		data: {car: data}
	});
}
