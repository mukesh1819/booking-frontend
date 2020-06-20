const initialState = {
    carInquiryDetails: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_CAR_INQUIRY_DETAILS": {
            return {
                ...state,
                carInquiryDetails: action.payload
            };
        }
        default:
            return state;
    }
}