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
