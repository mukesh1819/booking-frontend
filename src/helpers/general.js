import {
	BASE_URL
} from '../constants';

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
		redirectUrl = this.props.location.state.from.pathname;
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
		return ''
	} else {
		return returnValue
	}
}