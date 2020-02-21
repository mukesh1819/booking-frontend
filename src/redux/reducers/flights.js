const initialState = {
    flights: {
        outbounds: [],
        inbounds: [],
        combinations: []
    },
    selectedInboundFlight: null,
    selectedOutboundFlight: null,
    searchDetails: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_SEARCH_DETAILS": {
            return {
                ...state,
                searchDetails: action.payload
            };
        }
        case "SET_FLIGHTS": {
            return {
                ...state,
                flights: Object.assign({}, state.flights, {
                    outbounds: action.payload.outbounds,
                    inboutnds: action.payload.inbounds,
                    combinations: action.payload.combinations,
                })
            };
        }
        case "SELECT_INBOUND_FLIGHT": {
            return {
                ...state,
                selectedInboundFlight: action.payload
            }
        }
        case "SELECT_OUTBOUND_FLIGHT": {
            return {
                ...state,
                selectedOutboundFlight: action.payload
            }
        }
        case "DESELECT_INTBOUND_FLIGHT": {
            return {
                ...state,
                selectedInboundFlight: null
            }
        }
        case "DESELECT_OUTBOUND_FLIGHT": {
            return {
                ...state,
                selectedOutboundFlight: null
            }
        }
        default:
            return state;
    }
}