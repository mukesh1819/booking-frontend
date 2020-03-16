import axios from 'axios';
import {FLIGHT_API_URL, BASE_URL, API_URL} from '../constants/index.js';
import {handleResponse, handleError} from './apiUtils';

export function getCategories(params){
    return axios({
        method: 'get',
        url:`${API_URL}/categories`,
        params: params,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}

export function showCategory(params){
    return axios({
        method: 'get',
        url: `${API_URL}/categories/:id`,
        params: params,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}

export function createCategory(data){
    return axios({
        method: 'post',
        url: `${API_URL}/categories`,
        data: data,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}

export function updateCategory(data){
    return axios({
        method: 'put',
        url: `${API_URL}/categories/:id`,
        data: data,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}

export function deleteCategory(params){
    return axios({
        method: 'delete',
        url: `${API_URL}/categories/:id`,
        params: params,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`
        }
    });
}