import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {API_URL, ADMIN_API_URL, BASE_URL} from '../constants';

export function showPackage(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/packages/${id}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function createPackage(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/packages`,
		data: {package: data},
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function updatePackage(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/packages/${id}`,
		data: {package: data},
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function getPackages(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/packages?${params}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function deletePackage(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/packages/${id}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}
