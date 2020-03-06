import React, {Component} from 'react';
import store from '../../redux/store';
import {isRefundable} from '../../utils/helpers';
import {connect} from 'react-redux';

const FlightCombinedDetails = (props) => {
	const {adult, child, flight} = props;
	const inbound = flight.inbound;
	const outbound = flight.outbound;
	return (
		<div className='flight-details'>
			<div className='header d-flex justify-content-between align-items-center text-small text-muted'>
				<span>
					<img src={inbound.AirlineLogo} className='p-2' />

					<div className='text-center'>
						{inbound.FlightNo}({inbound.FlightClassCode})
					</div>
				</span>
				<span className=''> {inbound.FlightDate} </span>
				<span className='text-center'>
					Class: {inbound.FlightClassCode}
					<div className='text-bold text-success'>{isRefundable(inbound.Refundable)}</div>
					<div>FreeBaggage: {inbound.FreeBaggage}</div>
				</span>
			</div>
			<hr />
			<div className='body'>
				<div class='d-flex justify-content-between align-items-center'>
					<span className='text-center'>
						{inbound.DepartureTime} <div className='text-bold'>{inbound.Departure}</div>
					</span>
					<span class='text-small text-muted'>{flight.duration} </span>
					<span className='text-center'>
						{inbound.ArrivalTime}
						<div className='text-bold'>{inbound.Arrival}</div>
					</span>
				</div>
				<div className='text-center text-small text-muted' />
				<hr />
				<div>
					<span className='text-center p-3'>
						<div className='text-bold'>Total Fare: {inbound.total_fare}</div>
						<div className='text-small text-muted'>
							({adult} Adult, {child} Child)
						</div>
					</span>
					<ul className='text-muted text-small'>
						{adult > 0 && <li> Base Fare (1 Adult): {inbound.AdultFare} </li>}
						{child > 0 && <li> Base Fare (1 Child): {inbound.ChildFare} </li>}
						<li> Fuel Surcharge: {inbound.FuelSurcharge} </li>
						<li> Tax: {inbound.Tax} </li>
					</ul>
				</div>
			</div>
			<div className='header d-flex justify-content-between align-items-center text-small text-muted'>
				<span>
					<img src={outbound.AirlineLogo} className='p-2' />

					<div className='text-center'>
						{outbound.FlightNo}({outbound.FlightClassCode})
					</div>
				</span>
				<span className=''> {inbound.FlightDate} </span>
				<span className='text-center'>
					Class: {outbound.FlightClassCode}
					<div className='text-bold text-success'>{isRefundable(outbound.Refundable)}</div>
					<div>FreeBaggage: {inbound.FreeBaggage}</div>
				</span>
			</div>
			<hr />
			<div className='body'>
				<div class='d-flex justify-content-between align-items-center'>
					<span className='text-center'>
						{outbound.DepartureTime} <div className='text-bold'>{outbound.Departure}</div>
					</span>
					<span class='text-small text-muted'>{flight.duration} </span>
					<span className='text-center'>
						{outbound.ArrivalTime}
						<div className='text-bold'>{outbound.Arrival}</div>
					</span>
				</div>
				<div className='text-center text-small text-muted' />
				<hr />
				<div>
					<span className='text-center p-3'>
						<div className='text-bold'>Total Fare: {outbound.total_fare}</div>
						<div className='text-small text-muted'>
							({adult} Adult, {child} Child)
						</div>
					</span>
					<ul className='text-muted text-small'>
						{adult > 0 && <li> Base Fare (1 Adult): {outbound.AdultFare} </li>}
						{child > 0 && <li> Base Fare (1 Child): {outbound.ChildFare} </li>}
						<li> Fuel Surcharge: {outbound.FuelSurcharge} </li>
						<li> Tax: {outbound.Tax} </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(FlightCombinedDetails);
