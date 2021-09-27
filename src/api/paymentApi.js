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

export function payWithKhalti(payload) {
	return axios({
		method: 'post',
		url: `${API_URL}/payments/pay_with_khalti.json`,
		data: payload
	});
}


export function payWithEsewa(params) {


	console.log(params);
	debugger;

	var path = "https://uat.esewa.com.np/epay/main";
	var path = "https://uat.esewa.com.np/epay/main";
	var form = document.createElement("form");
	form.setAttribute("method", "POST")
	form.setAttribute("action", path);

	for(var key in params){
		var hiddenField = document.createElement("input")
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", params[key]);
		form.appendChild(hiddenField)
	}

	document.body.appendChild(form);
	form.submit()

}

export function esewaPaymentVerification(params) {

	var path = "https//uat.esewa.com.np/epay/transrec";
	var form = document.createElement("form");
	form.setAttribute("method", "POST")
	form.setAttribute("action", path);

	for(var key in params){
		var hiddenField = document.createElement("input")
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", params[key]);
		form.appendChild(hiddenField)
	}

	document.body.appendChild(form);
	form.submit()

}

