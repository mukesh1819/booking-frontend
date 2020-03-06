const initialState = {
	currentUser: {}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			console.log(action, 'reduce');
			return Object.assign({}, state, {
				currentUser: action.payload
			});
			// return {...state, currentUser: action.payload};
		case 'LOGOUT_USER':
			return Object.assign({}, state, {
				currentUser: {}
			});
		default:
			return state;
	}
}