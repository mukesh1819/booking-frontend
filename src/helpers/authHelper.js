import {authenticationApi} from '../api/authenticationApi';

export function authHeader() {
	// return authorization header with jwt token
	const currentUser = authenticationService.currentUserValue;
	if (currentUser && currentUser.token) {
		return {
			Authorization: `Bearer ${currentUser.token}`
		};
	} else {
		return {};
	}
}

export function isAdmin(user) {
	if (isLoggedIn(user) && ['Admin', 'Support'].indexOf(user.role) !== -1) {
		return true;
	} else {
		return false;
	}
}

export function isLoggedIn(user) {
	user.email !== undefined;
}

function csrfToken(document) {
	return document.querySelector('[name="csrf-token"]') ? document.querySelector('[name="csrf-token"]').content : null;
}

export function passCsrfToken(document, axios) {
	axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken(document);
}

export function logout() {
	localStorage.removeItem('token');
}
