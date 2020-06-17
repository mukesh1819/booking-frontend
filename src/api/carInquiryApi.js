import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);


export function createCarInquiry(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/car_inquiries`,
		data: {car_inquiry: data}
	});
}

export function updateCarInquiry(id, data) {
	return axios({
		method: 'put',
		url: `${API_URL}/car_inquiries/${id}`,
		data: {car_inquiry: data}
	});
}

export function getCarInquiries(params){
	return axios({
		method: 'get',
		url: `${API_URL}/admin/car_inquiries`,
		params: params
	});
}

export function showCarInquiry(id){
	return axios({
		method: 'get',
		url: `${API_URL}/car_inquiries/${id}`
	});
}
