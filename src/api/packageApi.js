import axios from 'axios';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {API_URL, ADMIN_API_URL, BASE_URL} from '../constants';

useInterceptor(axios);

export function showPackage(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/packages/${id}`
	});
}

export function createPackage(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/packages`,
		data: {
			package: data
		},
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
}

export function updatePublish(id, data) {
	return axios({
		method: 'patch',
		url: `${API_URL}/packages/${id}`,
		data: {
			published: data
		}
	});
}

export function updatePackage(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/packages/${id}`,
		data: {
			package: data
		}
	});
}

export function getPackages(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/packages`,
		params: params
	});
}

export function deletePackage(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/packages/${id}`
	});
}
