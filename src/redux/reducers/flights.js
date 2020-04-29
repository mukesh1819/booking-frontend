import {
	subDays,
	addDays
} from '../../helpers';

const initialState = {
	flights: {
		outbounds: [],
		inbounds: [],
		combinations: []
	},
	selectedInboundFlight: null,
	selectedOutboundFlight: null,
	searchDetails: {
		strTripType: 'O',
		strFlightDate: new Date(),
		strReturnDate: new Date(),
		strNationality: '',
		intAdult: 1,
		intChild: 0,
		strSectorFrom: '',
		strSectorTo: ''
	},
	ttlTime: 0
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'SET_SEARCH_DETAILS': {
			return {
				...state,
				searchDetails: action.payload
			};
		}
		case 'SET_FLIGHTS': {
			return {
				...state,
				flights: Object.assign({}, state.flights, {
					outbounds: action.payload.outbounds,
					inboutnds: action.payload.inbounds,
					combinations: action.payload.combinations
				})
			};
		}

		case 'CLEAR_FLIGHTS': {
			return {
				...state,
				flights: Object.assign({}, state.flights, {
					outbounds: [],
					inboutnds: [],
					combinations: []
				})
			};
		}

		case 'SELECT_INBOUND_FLIGHT': {
			return {
				...state,
				selectedInboundFlight: action.payload
			};
		}
		case 'SELECT_OUTBOUND_FLIGHT': {
			return {
				...state,
				selectedOutboundFlight: action.payload
			};
		}
		case 'DESELECT_INTBOUND_FLIGHT': {
			return {
				...state,
				selectedInboundFlight: null
			};
		}
		case 'DESELECT_OUTBOUND_FLIGHT': {
			return {
				...state,
				selectedOutboundFlight: null
			};
		}
		case 'SET_TIMEOUT': {
			return {
				...state,
				ttlTime: action.payload
			};
		}
		default:
			return state;
	}
}