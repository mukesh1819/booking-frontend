import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {func} from 'prop-types';

useInterceptor(axios);

export function getInquiries(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/inquiries`,
		params: params
	});
}

export function showInquiry(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/inquiries/${id}`
	});
}

export function createInquiry(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/inquiries`,
		data: {inquiry: data}
	});
}

export function updateInquiry(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/inquiries/${id}`,
		data: {inquiry: data}
	});
}

export function deleteInquiry(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/inquiries/${id}`
	});
}

export function confirmInquiry(id, values) {
	return axios({
		method: 'put',
		url: `${API_URL}/inquiries/${id}/confirm`,
		params: values
	});
}

export function assignPartner(id, values) {
	return axios({
		method: 'put',
		url: `${API_URL}/inquiries/${id}/assign_partner`,
		params: values
	});
}

export function updateAssignPartner(id, values) {
	return axios({
		method: 'put',
		url: `${API_URL}/inquiries/${id}/update_assign_partner`,
		params: values
	});
}

export function showPackageBooking(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/package_bookings/${id}`
	});
}

export function rejectInquiry(id){
	return axios({
		method: 'get',
		url: `${API_URL}/inquiries/${id}/reject`
	});
}