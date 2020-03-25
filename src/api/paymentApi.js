import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {PAYMENT_URL, API_URL} from '../constants';

// export function newPayment(idx) {
// 	window.open(`payments/new?idx=${idx}`, '_blank');
// }

export function newPayment(idx, value) {
	return axios({
		method: 'get',
		url: `${API_URL}/payments/new?idx=${idx}&value=${value}`,
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`
		}
	});
}


