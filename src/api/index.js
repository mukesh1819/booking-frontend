import axios from 'axios';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import history from '../history';
import swal from 'sweetalert';

useInterceptor(axios);

export function filter(url) {
	return axios({
		method: 'get',
		url: `${API_URL}/${url}`
	});
}
