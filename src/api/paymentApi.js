import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {PAYMENT_URL, API_URL} from '../constants';

export function newPayment(idx) {
	window.open(`${PAYMENT_URL}/new?idx=${idx}`, '_blank');
}
