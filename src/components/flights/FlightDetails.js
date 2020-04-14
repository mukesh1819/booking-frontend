import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../redux/store';
import {isRefundable, ifNotZero} from '../../helpers';
import FareDetails from './FareDetails';

const FlightDetails = (props) => {
	const {flight, adult, child} = props;
	return (
		<div className='flight-details'>
			<div className='header d-flex justify-content-between align-items-center text-small text-muted'>
				<span>
					<img src={flight.AirlineLogo} className='p-2' />
					<div className='text-center'>{flight.FlightNo}</div>
				</span>
				<span className='text-center'>
					<i className='fas fa-plane fa-2x departure text-primary' />
					<div>{flight.FlightDate}</div>
				</span>
				<span className='text-right'>
					Class: {flight.FlightClassCode} |{' '}
					<span className='text-info'> {isRefundable(flight.Refundable)}</span>
					<div>FreeBaggage: {flight.FreeBaggage}</div>
					<div>
						{flight.FlightNo}({flight.FlightClassCode})
					</div>
				</span>
			</div>
			<hr />
			<div className='body'>
				<div className='d-flex justify-content-between align-items-center'>
					<span className='text-center'>
						{flight.DepartureTime} <div className='text-bold'>{flight.Departure}</div>
					</span>
					<span className='text-small text-muted text-center'>
						<i className='fas fa-clock text-primary' />
						<div>{flight.duration} min</div>
					</span>
					<span className='text-center'>
						{flight.ArrivalTime}
						<div className='text-bold'>{flight.Arrival}</div>
					</span>
				</div>
				<div className='text-center text-small text-muted' />
				<hr />
				<FareDetails flight={flight} adult={adult} child={child} />
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
