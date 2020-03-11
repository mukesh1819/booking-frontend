import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Tooltip from '../shared/Tooltip';
import {isRefundable} from '../../utils/helpers';
import {connect} from 'react-redux';

const Flight = ({type, flight, selected, onFlightSelect, onFlightDeselect, onViewDetails, searchDetails}) => {
	console.log(flight);
	return (
		<div className='flight-card' key={flight.FlightNo} onClick={() => onViewDetails('OUTBOUND', flight)}>
			<div className='d-flex justify-content-between align-items-center'>
				<div className='col-2 no-padding'>
					<img src={flight.AirlineLogo} className='w-100 p-2' />
				</div>
				<div className='col-6 no-padding'>
					<div className='d-flex justify-content-between'>
						<span>{flight.DepartureTime}</span>
						<span className='line-from-to' />
						<span>{flight.ArrivalTime}</span>
					</div>
					<div className='d-flex justify-content-between'>
						<span className='text-small text-muted'>{searchDetails.strSectorFrom}</span>
						<span className='text-small m-auto'>{flight.duration} min</span>
						<span className='text-small text-muted'>{searchDetails.strSectorTo}</span>
					</div>
				</div>
				<div className='col-4 no-padding text-center'>
					<div className=''>
						{flight.Currency}:&nbsp;
						<span className='text-strong'>{flight.total_fare}</span>
						<div class='text-smaller text-muted'>{isRefundable(flight.Refundable)}</div>
					</div>
				</div>
			</div>
			{/* <div className='d-flex justify-content-between'>
				<span className='text-small text-muted'>
					{flight.FlightNo}({flight.FlightClassCode})
				</span>
				<Tooltip message='Flight Details'>
					<i className='icon-info circular-icon' onClick={() => onViewDetails(flight)} />
				</Tooltip>
				{!selected && (
					<span
						onClick={() => {
							onFlightSelect(type, flight);
						}}
						className='btn d-none'
					>
						Book
					</span>
				)}
				{selected && (
					<Tooltip message='Deselect'>
						<i className='icon-cross circular-icon' onClick={() => onFlightDeselect(type)} />
					</Tooltip>
				)}
			</div> */}
		</div>
	);
};

const mapStateToProps = ({flightStore}) => ({
	searchDetails: flightStore.searchDetails
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Flight);
