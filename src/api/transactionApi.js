import axios from 'axios';
import {TRANSACTION_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError, useInterceptor} from './apiUtils';

useInterceptor(axios);

export function getUserTransaction() {
	return axios({
		method: 'get',
		url: `${API_URL}/payments`
	});
}
