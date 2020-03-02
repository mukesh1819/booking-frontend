import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../redux/store';

const FlightDetails = (props) => {
	const {flight, adult, child} = props;
	return (
		<div className='flight-details'>
			<div className='header text-center'>
				<img src={flight.AirlineLogo} className='p-2' />
				<div className='text-bold'>
					{flight.Departure} - {flight.Arrival}
				</div>
				<span className='text-small text-muted'> {flight.FlightDate} </span>
			</div>
			<div className='body'>
				<div class='text-center'>
					{flight.DepartureTime} --------- <span class='text-small text-bold'>10h 10min</span> -----------
					{flight.ArrivalTime}
				</div>
				<div className='text-center text-small text-muted'>
					{flight.FlightNo}({flight.FlightClassCode})
				</div>
				<hr />
				<div>
					<div class='text-bold text-center p-3'> Total: {flight.total_fare} </div>
					Fare Details:
					<ul>
						{adult > 0 && <li> Base Fare (1 Adult): {flight.AdultFare} </li>}
						{child > 0 && <li> Base Fare (1 Child): {flight.ChildFare} </li>}
						<li> Fuel Surcharge: {flight.FuelSurcharge} </li>
						<li> Tax: {flight.Tax} </li>
					</ul>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({flightStore}) => {
	return {
		adult: flightStore.searchDetails.intAdult,
		child: flightStore.searchDetails.intChild
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetails);
