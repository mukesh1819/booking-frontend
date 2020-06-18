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

export function showCar(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/cars/${id}`
	});
}

export function updateCar(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/cars/${id}`,
		data: {car: data}
	});
}

export function activateCar(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/admin/cars/${id}/activate`,
		data: {car: data}
	});
}

export function deactivateCar(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/admin/cars/${id}/deactivate`,
		data: {car: data}
	});
}

export function deleteCar(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/admin/cars/${id}`
	});
}

export function submitFormData(url, idx, values) {
	const data = new FormData();
	const {image, ...newValues} = values;
	Object.keys(newValues).forEach((key) => {
		data.append(key, values[key]);
	});
	Array.from(image).map((v, index) => {
		data.append(`image[${index}]`, v);
	});
	return axios({
		url: `${API_URL}/${url}`,
		method: idx ? 'PUT' : 'POST',
		data: data,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}
