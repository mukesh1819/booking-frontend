const initialState = {
    countries: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_COUNTRIES": {
            return {
                ...state,
                countries: action.payload
            };
        }
        default:
            return state;
    }
}