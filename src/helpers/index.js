import {handleResponse} from './handleResponse';
import {authHeader, isAdmin, isLoggedIn, passCsrfToken, logout} from './authHelper';
import {
	sortObjectBy,
	subDays,
	addDays,
	isRefundable,
	userInitials,
	redirectUrl,
	imageUrl,
	toTableData,
	ifNotZero
} from './general';
import {flagFor} from './variables';

export {
	handleResponse,
	authHeader,
	isAdmin,
	isLoggedIn,
	sortObjectBy,
	passCsrfToken,
	subDays,
	addDays,
	logout,
	isRefundable,
	userInitials,
	redirectUrl,
	imageUrl,
	toTableData,
	ifNotZero,
	flagFor
};
