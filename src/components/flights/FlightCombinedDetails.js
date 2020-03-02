import React, {Component} from 'react';
import store from '../../redux/store';
import {isRefundable} from '../../utils/helpers';
import {connect} from 'react-redux';

const FlightCombinedDetails = (props) => {
	const inbound = flight.inbound;
	const outbound = flight.outbound;
	const {adult, child, flight} = props;
	return (
		<div className='flight-details'>
			<div className='header text-center'>
				<img src={inbound.AirlineLogo} className='p-2' />
				<div className='text-bold'>
					{inbound.Departure} - {inbound.Arrival}
				</div>
				<div className='text-small text-muted'> {inbound.FlightDate} </div>
			</div>
			<div className='body'>
				<div class='text-center'>
					{inbound.DepartureTime} --------- <span class='text-bold text-small'>20min</span> -----------
					{inbound.ArrivalTime}
				</div>
				<div className='text-center text-small text-muted'>
					{inbound.FlightNo}({inbound.FlightClassCode})
				</div>
				<hr />
				<div>
					Fare Details:
					<ul>
						{adult > 0 && <li> Base Fare (1 Adult): {inbound.AdultFare} </li>}
						{child > 0 && <li> Base Fare (1 Child): {inbound.ChildFare} </li>}
						<li> Fuel Surcharge: {inbound.FuelSurcharge} </li>
						<li> Tax: {inbound.Tax} </li>
					</ul>
					<span class='text-bold p-3'> Total: {outbound.total_fare} </span>
					<div class='text-small text-muted'>({isRefundable(inbound.Refundable)})</div>
				</div>
			</div>
			<div className='header text-center'>
				<img src={outbound.AirlineLogo} className='p-2' />
				<div className='text-bold'>
					{outbound.Departure} - {outbound.Arrival}
				</div>
				<div className='text-small text-muted'> {outbound.FlightDate} </div>
			</div>
			<div className='body'>
				<div class='text-center'>
					{outbound.DepartureTime} --------- <span class='text-bold text-small'>20min</span>-----------
					{outbound.ArrivalTime}
				</div>
				<div className='text-center text-small text-muted'>
					{inbound.FlightNo}({inbound.FlightClassCode})
				</div>
				<hr />
				<div>
					Fare Details:
					<ul>
						{adult > 0 && <li> Base Fare (1 Adult): {outbound.AdultFare} </li>}
						{child > 0 && <li> Base Fare (1 Child): {outbound.ChildFare} </li>}
						<li> Fuel Surcharge: {outbound.FuelSurcharge} </li>
						<li> Tax: {outbound.Tax} </li>
					</ul>
					<span class='text-bold p-3'> Total: {outbound.total_fare} </span>
					<div class='text-small text-muted'>({isRefundable(outbound.Refundable)})</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FlightCombinedDetails);
