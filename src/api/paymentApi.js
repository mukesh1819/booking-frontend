import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';
import {API_URL} from '../constants';

export function newPayment(idx) {
	window.open(`/payments/new?idx=${idx}`);
}
