import axios from 'axios';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {API_URL, ADMIN_API_URL, BASE_URL} from '../constants';

useInterceptor(axios);

export function getPartnerServices(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/partner_services`,
		params: params
	});
}

