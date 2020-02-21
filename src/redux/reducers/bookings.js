const initialState = {
    booking: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "CREATE_BOOKING": {
            return {
                ...state,
                booking: action.payload
            };
        }
        default:
            return state;
    }
}