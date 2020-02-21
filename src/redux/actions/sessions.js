export const signOut = () => {
	event.preventDefault();
	localStorage.removeItem('token');
	return dispatch(logoutUser());
};

export const loginUser = (user) => ({
	type: 'LOGIN_USER',
	payload: user
});

export const logoutUser = () => ({
	type: 'LOGOUT_USER'
});