import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {USER_API_URL} from '../constants';

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
		url: '/users',
		data: details,
		config: {
			headers: {
				'Content-Type': 'application/json'
			}
		}
	});
};
