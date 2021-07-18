import axios from 'axios';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {USER_API_URL, GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, BASE_URL, API_URL} from '../constants';

useInterceptor(axios);

export function signIn(details) {
	return axios({
		method: 'post',
		url: `${API_URL}/login`,
		data: details
	});
}

export async function signOut(params) {
	return axios({
		method: 'delete',
		url: `${API_URL}/users/sign_out`
	});
}

export const createUser = (details) => {
	return axios({
		method: 'post',
		url: `${API_URL}/sign_up`,
		data: details
	});
};

export const authorizeUser = () => {
	return axios({
		method: 'get',
		url: GOOGLE_AUTH_URL
	});
};
