const initialState = {
    countries: [],
    language: 'ENG'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_COUNTRIES": {
            return {
                ...state,
                countries: action.payload
            };
        }

        case "SET_LANGUAGE": {
            return {
                ...state,
                language: action.payload
            };
        }
        default:
            return state;
    }
}