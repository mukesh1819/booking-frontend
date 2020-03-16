import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {API_URL, ADMIN_API_URL, BASE_URL, FLIGHT_API_URL} from '../constants';

export function getCategories(formData) {
	return axios({
		method: 'get',
		url: `${FLIGHT_API_URL}/search`,
		params: formData,
		config: {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.token}`
			}
		}
	});
}
