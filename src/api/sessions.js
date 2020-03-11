import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {USER_API_URL, GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL} from '../constants';

export function signIn(details) {
	return axios({
		method: 'post',
		url: `/login`,
		data: details,
		config: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
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
		url: '/sign_up',
		data: details,
		config: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	});
};

export const authorizeUser = () => {
	return axios({
		method: 'get',
		url: GOOGLE_AUTH_URL,
		headers: {
			Authorization: `Bearer ${localStorage.token}`
		}
	});
};
