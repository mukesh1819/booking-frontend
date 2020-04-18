import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {isRefundable, numberWithCommas} from '../../helpers';
import {connect} from 'react-redux';

const Flight = ({type, flight, selected, onFlightSelect, onFlightDeselect, onViewDetails, searchDetails}) => {
	console.log(flight);
	return (
		<div className='flight-card card' key={flight.FlightNo} onClick={() => onViewDetails('OUTBOUND', flight)}>
			<div className='d-flex justify-content-between align-items-center'>
				<div className='col-1 p-1 text-center'>
					<img src={flight.AirlineLogo} className='p-2' />
					<div className='text-small text-muted text-center'>{'Simrik Air'}</div>
				</div>
				<div className='col-7 no-padding'>
					<div className='d-flex justify-content-between'>
						<span className='text-bold'>{flight.DepartureTime}</span>
						<i className='fas fa-clock text-muted' />
						<span className='text-bold'>{flight.ArrivalTime}</span>
					</div>
					<div className='d-flex justify-content-between'>
						<span className='text-small text-muted'>{searchDetails.strSectorFrom}</span>
						<div className='text-small flex-grow-1 text-center lined'>{flight.duration} min</div>
						<span className='text-small text-muted'>{searchDetails.strSectorTo}</span>
					</div>
				</div>
				<div className='col-3 no-padding text-center'>
					<div className=''>
						{flight.Currency}:&nbsp;
						<span className='text-strong'>{numberWithCommas(flight.total_fare)}</span>
						<div className='text-smaller text-muted'>{isRefundable(flight.Refundable)}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({flightStore}) => ({
	searchDetails: flightStore.searchDetails
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Flight);
