import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Tooltip} from '../shared';
import Flight from './Flight';
import {connect} from 'react-redux';
import {isRefundable} from '../../helpers';

const FlightCombination = ({
	type,
	flight,
	selected,
	onFlightSelect,
	onFlightDeselect,
	onViewDetails,
	searchDetails
}) => {
	const inboundFlight = flight.inbound;
	const outboundFlight = flight.outbound;
	return (
		<div className='flight-card card' onClick={() => onViewDetails('COMBINATION', flight)}>
			<div className=' d-flex align-items-center'>
				<div className='flex-grow-1'>
					<div className='d-flex justify-content-between align-items-center'>
						<div className='text-center px-3'>
							<img src={inboundFlight.AirlineLogo} className='p-1' />
							<div className='text-small text-muted'>{'Simrik Air'}</div>
						</div>
						<div className='flex-grow-1'>
							<div className='d-flex justify-content-between'>
								<span className='text-bold'>{inboundFlight.DepartureTime}</span>
								<span className='text-bold'>{inboundFlight.ArrivalTime}</span>
							</div>
							<div className='d-flex justify-content-between'>
								<span className='text-small text-muted'>{searchDetails.strSectorFrom}</span>
								<div className='text-small flex-grow-1 text-center lined'>
									<i className='fas fa-clock text-muted' />
									&nbsp;{inboundFlight.duration} min
								</div>
								<span className='text-small text-muted'>{searchDetails.strSectorTo}</span>
							</div>
						</div>
					</div>
					<div className='d-flex justify-content-between align-items-center'>
						<div className='text-center px-3'>
							<img src={outboundFlight.AirlineLogo} className='w-100 p-1' />
							<div className='text-small text-muted'>{'Simrik Air'}</div>
						</div>
						<div className='flex-grow-1'>
							<div className='d-flex justify-content-between'>
								<span className='text-bold'>{outboundFlight.DepartureTime}</span>
								<span className='text-bold'>{outboundFlight.ArrivalTime}</span>
							</div>
							<div className='d-flex justify-content-between'>
								<span className='text-small text-muted'>{searchDetails.strSectorTo}</span>
								<div className='text-small flex-grow-1 text-center lined'>
									<i className='fas fa-clock text-muted' />
									&nbsp;{outboundFlight.duration} min
								</div>
								<span className='text-small text-muted'>{searchDetails.strSectorFrom}</span>
							</div>
						</div>
					</div>
				</div>
				<div className=''>
					<div className='text-center'>
						<div className='p-3'>
							{outboundFlight.Currency}:&nbsp;
							<span className='text-strong '>{flight.total_fare}</span>
							<div className='text-smaller text-muted'>{isRefundable(flight.Refundable)}</div>
						</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FlightCombination);
