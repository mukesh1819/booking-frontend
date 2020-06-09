import axios from 'axios';
import {API_URL, ADMIN_API_URL, BASE_URL} from '../constants';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

export function getPackageBookings(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/package_bookings`,
		params: params
	});
}
