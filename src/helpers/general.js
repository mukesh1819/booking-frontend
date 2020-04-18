import {
	BASE_URL
} from '../constants';
import moment from 'moment';
import _ from 'lodash';

export function sortObjectBy(obj, key) {
	obj = obj.sort((a, b) => {
		const bandA = a[key].toUpperCase();
		const bandB = b[key].toUpperCase();

		let comparison = 0;
		if (bandA > bandB) {
			comparison = 1;
		} else if (bandA < bandB) {
			comparison = -1;
		}
		return comparison;
	});

	return obj;
}

export function subDays(date, days) {
	const finalDate = new Date(date);
	finalDate.setDate(finalDate.getDate() - days);
	return finalDate;
}

export function addDays(date, days) {
	const finalDate = new Date(date);
	finalDate.setDate(finalDate.getDate() + days);
	return finalDate;
}

export function getDuration(time) {
	var currentTime = moment().format('YYYY MM DD HH:mm:ss');
	var bookingTime = moment.utc(time).format('YYYY MM DD HH:mm:ss');
	var start = moment.utc(currentTime, 'HH:mm:ss');
	var end = moment.utc(bookingTime, 'HH:mm:ss');
	var diff = moment.duration(end.diff(start));
	console.log('START', start);
	console.log('END', end);
	console.log('DiFF', diff);
	return diff;
}

export function isRefundable(type) {
	if (type == 'T') {
		return 'Refundable';
	}
	return 'Non - Refundable';
}

export function userInitials(user) {
	if (user.name === undefined) {
		return 'LOGIN';
	} else if (user.name === null) {
		return 'User';
	} else {
		return user.name.charAt(0).toUpperCase() + user.name.slice(1);
	}
}

export function redirectUrl(state) {
	var redirectUrl = '/';
	if (state !== undefined) {
		redirectUrl = state.from.pathname;
	}
	return redirectUrl;
}

export function imageUrl(path) {
	return `${BASE_URL}${path}`;
}

export function toTableData(data) {
	const refData = {
		columns: [{
				label: 'Name',
				field: 'name',
				sort: 'asc',
				width: 150
			},
			{
				label: 'Position',
				field: 'position',
				sort: 'asc',
				width: 270
			}
		]
	};
	if (data.length == 0) {
		return refData;
	}
	var columns = Object.keys(data[0]).map(function (v) {
		return {
			label: v.toUpperCase(),
			field: v,
			sort: 'asc',
			width: 150
		};
	});

	var rows = JSON.parse(JSON.stringify(data).replace(/null/g, '""'));

	return {
		columns: columns,
		rows: data
	};
}

export function ifNotZero(value, returnValue) {
	if (value == 0) {
		return '';
	} else {
		return returnValue;
	}
}

export function ifGreaterThanOne(value, returnValue) {
	if (value > 1) {
		return returnValue;
	} else {
		return '';
	}
}

export function calculatePackagePrice(aPackage) {
	var price = aPackage.price;
	var discount = 0;
	if (aPackage.offer_price) {
		discount = aPackage.price - aPackage.offer_price;
		price = price - discount;
	}
	return [price, discount]
}

export function nationGroup(countries, group) {
	if (group == "NP" || group == "IN") {
		return _.filter(countries, function (e) {
			return e.value == "NP" || e.value == "IN";
		})
	} else {
		return _.filter(countries, function (e) {
			return e.value != "NP" && e.value != "IN";
		})
	}

}

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}