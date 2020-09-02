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

export function getPartnerServiceDetails(idx) {
	return axios({
		method: 'get',
		url: `${API_URL}/partner_services/${idx}`
	});
}

export function set_package_remarks(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/partner_services/${id}/set_remarks`,
		data: {
			partner_service: data
		}
	});
}
