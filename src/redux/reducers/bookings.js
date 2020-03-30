const initialState = {
    booking: [{
        booking_transaction: {}
    }],
    currency: 'NPR'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_BOOKING": {
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
        default:
            return state;
    }
}