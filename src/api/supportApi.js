import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getFaqs(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/faqs?${params}`
	});
}

export function createFaq(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/faqs`,
		data: {faq: data}
	});
}

export function showFaq(id) {
	return axios({
		method: 'get',
		url: `${API_URL}/faqs/${id}`
	});
}

export function updateFaq(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/faqs/${id}`,
		data: {faq: data}
	});
}

export function deleteFaq(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/faqs/${id}`
	});
}
