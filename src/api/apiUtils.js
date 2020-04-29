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
			if (error.message === 'Network Error') {
				swal({
					title: error.message,
					icon: 'error'
				});
			} else if (error.response.status === 401) {
				history.push('/');
				swal({
					title: "Not Authorized",
					text: "You are not authorized for this action",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Yes",
					closeOnConfirm: false
				}, function () {
					history.push('/');
				});

			} else if (error.response.status === 343) {
				history.push('/not_verified');
			} else if (error.response.status === 422) {
				swal({
					title: '',
					text: error.response.data.errors,
					icon: 'error',
					button: 'Try Again!'
				});
			} else if (error.response.status === 400) {
				swal({
					title: error.response.data.exception,
					text: error.response.data.message,
					icon: 'error',
					button: 'Try Again!'
				});
			} else if (error.response.status === 500) {
				swal({
					title: "Internal Server Error",
					text: error.message,
					icon: 'error',
					button: 'Try Again!'
				});
			} else {}

		}
	);
}