import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {TRANSACTION_API_URL, BASE_URL, API_URL} from '../constants/index.js';

function setHeaders() {
	const AUTH_TOKEN = localStorage.getItem('token');
	if (AUTH_TOKEN) {
		axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
	}
}

export function getUserTransaction(){
    setHeaders();
    return axios({
        method: 'get',
        url: `${API_URL}/payments`,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}