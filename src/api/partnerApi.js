import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getPartners(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/partners`,
		params: params
	});
}

export function getAllPartners(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/admin/partners`,
		params: params
	});
}

export function showPartner(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/partners/${id}`
	});
}

export function createPartner(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/partners`,
		data: {partner: data}
	});
}

export function updatePartner(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/partners/${id}`,
		data: {partner: data}
	});
}

export function deletePartner(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/partners/${id}`
	});
}

export function confirmPartner(id) {
	return axios({
		method: 'put',
		url: `${API_URL}/partners/${id}/confirm`
	});
}

export function partner_details(id){
	return axios({
		method: 'get',
		url: `${API_URL}/users/partner_details/${id}`
	});
}

export function activatePartner(id) {
	return axios({
		method: 'put',
		url: `${API_URL}/partners/${id}/activate`
	});
}

export function deactivatePartner(id) {
	return axios({
		method: 'put',
		url: `${API_URL}/partners/${id}/deactivate`
	});
}

export function getRentalPartners(params){
	return axios({
		method: 'get',
		url: `${API_URL}/rental_partner`,
		params: params
	});
}

export function updatePartnerDetails(id, details){
	return axios({
		method: 'patch',
		url: `${API_URL}/partners/${id}/update_partner_detail`,
		data: {
			partner: details
		}

	});
}