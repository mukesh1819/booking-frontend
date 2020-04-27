export const getFlights = store => store.flights;


export function getPassengers(state) {
    const passenger = {
        title: 'Mr',
        first_name: '',
        last_name: '',
        passenger_type: '',
        gender: 'M',
        nationality: state.strNationality
    };

    var passengers = []

    var i;
    for (i = 0; i < state.intAdult; i++) {
        var a = Object.assign({}, passenger);
        a.passenger_type = 'ADULT';
        passengers.push(a);
    }

    for (i = 0; i < state.intChild; i++) {
        var a = Object.assign({}, passenger);
        a.passenger_type = 'CHILD';
        passengers.push(a);
    }
    return passengers;
}