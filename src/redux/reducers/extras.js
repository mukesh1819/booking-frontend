const initialState = {
    countries: [],
    language: 'ENG',
    error: ''
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

        case "SET_ERROR": {
            return {
                ...state,
                error: action.payload
            };
        }
        default:
            return state;
    }
}