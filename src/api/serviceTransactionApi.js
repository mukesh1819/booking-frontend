import axios from 'axios';
import {TRANSACTION_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getServiceTransactions(params){
	return axios({
		method: 'get',
		url: `${API_URL}/service_transactions`,
		params: params
	});
}

export function createServiceTransaction(data) {
	return axios({
		method: 'post',
		url: `${API_URL}/service_transactions`,
		data: {service_transaction: data}
	});
}