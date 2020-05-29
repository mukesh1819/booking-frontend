import axios from 'axios';
import {TRANSACTION_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getUserTransaction(params) {
	return axios({
		method: 'get',
		url: `${API_URL}/payments`,
		params: params
	});
}

export function deleteTransaction(id) {
	return axios({
		method: 'delete',
		url: `${API_URL}/payments/${id}`
	});
}

export function onTransactionSuccess(id, details){
	return axios({
		method: 'put',
		url: `${API_URL}/payments/${id}`,
		data: {
			transaction: details
		}
	});
}

export function getCsvTransaction() {
	return axios({
		method: 'get',
		url: `${API_URL}/payments.csv`
	});
}

export function getXlsTransaction() {
	return axios({
		method: 'get',
		url: `${API_URL}/payments.xls`
	});
}
