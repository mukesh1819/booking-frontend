const BASE_URL = process.env.BASE_URL
console.log(process.env)
export const API_URL = `${BASE_URL}/api`;

export const FLIGHT_API_URL = `/api/flights`;
export const USER_API_URL = `/api/members`
export const GOOGLE_AUTH_URL = `${BASE_URL}/users/auth/google_oauth2`
export const FACEBOOK_AUTH_URL = `${BASE_URL}/users/auth/facebook`
export const ADMIN_API_URL = `/api/admin`
export const TRANSACTION_API_URL = `/admin`
export const PAYMENT_URL = `${BASE_URL}/payments`