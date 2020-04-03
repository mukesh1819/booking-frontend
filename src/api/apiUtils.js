import history from '../history';
import swal from 'sweetalert';
import {
	setError
} from '../redux/actions';

export async function handleResponse(response) {
	if (response.ok) return response.json();
	if (response.status === 400) {
		const error = await response.text();
		throw new Error(error);
	}
	throw new Error('Network response was not ok.');
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
	// eslint-disable-next-line no-console
	console.error('API call failed. ' + error);
	throw error;
}

export function useInterceptor(axios) {
	axios.interceptors.request.use(
		(config) => {
			const AUTH_TOKEN = localStorage.getItem('token');
			if (AUTH_TOKEN) {
				config.headers['Authorization'] = 'Bearer ' + AUTH_TOKEN;
			}
			config.headers['Content-Type'] = 'application/json';
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		function (error) {
			const originalRequest = error.config;
			if (error.message === "Network Error") {
				setError(error.message);
			} else if (error.response.status === 401) {
				history.push('/');
			} else {}
		}
	);
}