export const setSearchDetails = details => ({
    type: "SET_SEARCH_DETAILS",
    payload: details
});

export const setFlights = flights => ({
    type: "SET_FLIGHTS",
    payload: flights
});

export const selectInboundFlight = flight => ({
    type: "SELECT_INBOUND_FLIGHT",
    payload: flight
})

export const selectOutboundFlight = flight => ({
    type: "SELECT_OUTBOUND_FLIGHT",
    payload: flight
})

export const deselectFlight = flightType => ({
    type: flightType == "OUTBOUND" ? "DESELECT_OUTBOUND_FLIGHT" : "DESELECT_INBOUND_FLIGHT"
})