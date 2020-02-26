import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Tooltip from '../shared/Tooltip';
import Flight from './Flight';

const FlightCombination = ({type, flight, selected, onFlightSelect, onFlightDeselect, onViewDetails}) => {
	const inboundFlight = flight.inbound;
	const outboundFlight = flight.outbound;
	return (
		<div className='flight-card d-flex align-items-center' onClick={() => onViewDetails('COMBINATION', flight)}>
			<div className='col-10 no-padding'>
				<div className='d-flex justify-content-between align-items-center'>
					<div className='no-padding'>
						<img src={inboundFlight.AirlineLogo} className='w-100 p-2' />
					</div>
					<div className='flex-grow-1'>
						<div className='d-flex no-padding'>
							<span className=''>{inboundFlight.DepartureTime}</span>
							<span className='line-from-to' />
							<span>{inboundFlight.ArrivalTime}</span>
						</div>
						<div className='d-flex justify-content-between'>
							<span className='text-small text-muted'>{searchDetails.strSectorFrom}</span>
							<span className='text-small m-auto'>{inboundFlight.duration} min</span>
							<span className='text-small text-muted'>{searchDetails.strSectorTo}</span>
						</div>
					</div>
				</div>
				<div className='d-flex justify-content-between align-items-center'>
					<div className='no-padding'>
						<img src={outboundFlight.AirlineLogo} className='w-100 p-2' />
					</div>
					<div className='flex-grow-1'>
						<div className='d-flex no-padding'>
							<span className=''>{outboundFlight.DepartureTime}</span>
							<span className='line-from-to' />
							<span>{outboundFlight.ArrivalTime}</span>
						</div>
						<div className='d-flex justify-content-between'>
							<span className='text-small m-auto'>{outboundFlight.duration} min</span>
						</div>
					</div>
				</div>
			</div>
			<div className='col-2 no-padding'>
				<div className='text-center'>
					<div className='text-strong p-2'>
						NPR:<br />
						<span>{flight.total_fare}</span>
					</div>
					{/* {selected && (
					<Tooltip message='Deselect'>
						<i className='icon-cross circular-icon' onClick={() => onFlightDeselect(type)} />
					</Tooltip>
				)} */}
				</div>
			</div>
		</div>
	);
};
export default FlightCombination;
