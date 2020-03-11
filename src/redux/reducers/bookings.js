const initialState = {
    booking: null,
    currency: 'NPR',
    language: 'ENG'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "CREATE_BOOKING": {
            return {
                ...state,
                booking: action.payload
            };
        }
        case "SET_CURRENCY": {
            return {
                ...state,
                currency: action.payload
            }
        }
        case "SET_LANGUAGE": {
            return {
                ...state,
                language: action.payload
            }
        }
        default:
            return state;
    }
}