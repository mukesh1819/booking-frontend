import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../redux/store';
import {isRefundable} from '../../utils/helpers';

const FlightDetails = (props) => {
	const {flight, adult, child} = props;
	return (
		<div className='flight-details'>
			<div className='header d-flex justify-content-between align-items-center text-small text-muted'>
				<span>
					<img src={flight.AirlineLogo} className='p-2' />

					<div className='text-center'>
						{flight.FlightNo}({flight.FlightClassCode})
					</div>
				</span>
				<span className=''> {flight.FlightDate} </span>
				<span className='text-center'>
					Class: {flight.FlightClassCode}
					<div className='text-bold text-success'>{isRefundable(flight.Refundable)}</div>
					<div>FreeBaggage: {flight.FreeBaggage}</div>
				</span>
			</div>
			<hr />
			<div className='body'>
				<div class='d-flex justify-content-between align-items-center'>
					<span className='text-center'>
						{flight.DepartureTime} <div className='text-bold'>{flight.Departure}</div>
					</span>
					<span class='text-small text-muted'>{flight.duration} </span>
					<span className='text-center'>
						{flight.ArrivalTime}
						<div className='text-bold'>{flight.Arrival}</div>
					</span>
				</div>
				<div className='text-center text-small text-muted' />
				<hr />
				<div>
					<span className='text-center p-3'>
						<div className='text-bold'>Total Fare: {flight.total_fare}</div>
						<div className='text-small text-muted'>
							({adult} Adult, {child} Child)
						</div>
					</span>
					<ul className='text-muted text-small'>
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
