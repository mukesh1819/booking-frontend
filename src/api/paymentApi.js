import axios from 'axios';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {PAYMENT_URL, API_URL} from '../constants';

useInterceptor(axios);

export function newPayment(idx) {
	return axios({
		method: 'get',
		url: `${API_URL}/payments/new?idx=${idx}`
	});
}
