import React, { Component } from 'react';
import store from '../../redux/store';

const FlightDetails = ({ flight }) => {
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
					Fare Details:
					<ul>
						<li> Base Fare (1 Adult): {flight.AdultFare} </li>
						<li> Base Fare (1 Child): {flight.ChildFare} </li>
						<li> Fuel Surcharge: {flight.FuelSurcharge} </li>
						<li> Tax: {flight.Tax} </li>
					</ul>
					<span class='text-bold'> Total: {flight.total_fare} </span>
				</div>
			</div>
		</div>
    );
};

export default FlightDetails;