import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {API_URL, ADMIN_API_URL, BASE_URL} from '../constants';

export function getPackageDetails(id, params) {
	return axios({
		method: 'get',
		url: `${API_URL}/packages/${id}`,
		params: params,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function createPackage(data){
	return axios({
		method: 'post',
		url: `${API_URL}/api/packages`,
		data: data,
		headers:{
			'content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function updatePackage(data){
	return axios({
		method: 'put',
		url: `${API_URL}/packages/:id`,
		data: data,
		headers:{
			'content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function showPackage(params){
	return axios({
		method: 'get',
		url: `${API_URL}/packages/:id`,
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}

export function deletePackage(params){
	return axios({
		method: 'delete',
		url:`${API_URL}/packages/:id`,
		params:params,
		headers:{
			'content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}

	});
}