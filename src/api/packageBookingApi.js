import axios from 'axios';
import {handleResponse, handleError, useInterceptor} from './apiUtils';
import {API_URL, ADMIN_API_URL, BASE_URL} from '../constants';

useInterceptor(axios);

export function getPackageBookings(params){
    return axios({
        method: 'get',
        url: `${API_URL}/package_bookings`,
        params: params
    });
}

export function getPackageBookingConfirmation(id, params){
    return axios({
        method: 'put',
        url: `${API_URL}/package_bookings/${id}/confirm`,
        params: params
    });
}