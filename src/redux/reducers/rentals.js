const initialState = {
    carInquiryDetails: {},
    selectedCar: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_CAR_INQUIRY_DETAILS": {
            return {
                ...state,
                carInquiryDetails: action.payload
            };
        }
        case "SELECT_CAR": {
            return {
                ...state,
                selectedCar: action.payload
            };
        }
        default:
            return state;
    }
}