export const BASE_URL = process.env.REACT_APP_BASE_URL

console.log("REACT_APP_BASE_URL", process.env.REACT_APP_BASE_URL)
export const API_URL = `${BASE_URL}/api`;

export const FLIGHT_API_URL = `${API_URL}/flights`;
export const USER_API_URL = `${API_URL}/members`
export const GOOGLE_AUTH_URL = `${BASE_URL}/users/auth/google_oauth2`
export const FACEBOOK_AUTH_URL = `${BASE_URL}/users/auth/facebook`
export const ADMIN_API_URL = `${API_URL}/admin`
export const TRANSACTION_API_URL = `${BASE_URL}/admin`
export const PAYMENT_URL = `${BASE_URL}/payments`