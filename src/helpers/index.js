import {handleResponse} from './handleResponse';
import {authHeader, isAdmin, isLoggedIn, passCsrfToken, logout} from './authHelper';
import {
	sortObjectBy,
	subDays,
	addDays,
	getDuration,
	isRefundable,
	userInitials,
	redirectUrl,
	imageUrl,
	toTableData,
	ifNotZero,
	ifGreaterThanOne,
	calculatePackagePrice,
	nationGroup,
	numberWithCommas
} from './general';
import {flagFor, companyDetails} from './variables';

export {
	handleResponse,
	authHeader,
	isAdmin,
	isLoggedIn,
	sortObjectBy,
	passCsrfToken,
	subDays,
	addDays,
	getDuration,
	logout,
	isRefundable,
	userInitials,
	redirectUrl,
	imageUrl,
	toTableData,
	ifNotZero,
	flagFor,
	companyDetails,
	ifGreaterThanOne,
	calculatePackagePrice,
	nationGroup,
	numberWithCommas
};
