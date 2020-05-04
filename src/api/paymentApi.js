import axios from 'axios';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {PAYMENT_URL, API_URL, BASE_URL} from '../constants';

useInterceptor(axios);

export function newPayment(idx) {
	return axios({
		method: 'get',
		url: `${API_URL}/payments/new?idx=${idx}`
	});
}

export function makePayment(transaction) {
	return axios({
		method: 'post',
		url: `${API_URL}/payments.json`,
		data: {
			paymentGatewayID: '9100534445',
			respCode: '00',
			fraudCode: '90',
			Pan: '462437******1190',
			Amount: transaction.amount,
			invoiceNo: transaction.idx,
			tranRef: '742447',
			approvalCode: '772979',
			Eci: '06',
			dateTime: '20200124133441',
			Status: 'RST',
			failReason: 'Approved',
			userDefined1: 'sxSBWL3udfo8KuPoA9tRZi',
			userDefined2: 'HbHG8GUY',
			hashValue: '795492D704973B19AFCD63257E06D84BE81FDE23'
		}
	});
}
