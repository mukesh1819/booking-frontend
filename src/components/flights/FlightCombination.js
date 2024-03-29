import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Tooltip from '../shared/Tooltip';
import Flight from './Flight';
import {connect} from 'react-redux';
import {isRefundable} from '../../utils/helpers';

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
		<div className='flight-card d-flex align-items-center' onClick={() => onViewDetails('COMBINATION', flight)}>
			<div className='flex-grow-1'>
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
							<span className='text-small text-muted'>{searchDetails.strSectorTo}</span>
							<span className='text-small m-auto'>{outboundFlight.duration} min</span>
							<span className='text-small text-muted'>{searchDetails.strSectorFrom}</span>
						</div>
					</div>
				</div>
			</div>
			<div className=''>
				<div className='text-center'>
					<div className='p-2'>
						{outboundFlight.Currency}:&nbsp;
						<span className='text-strong '>{flight.total_fare}</span>
						<div class='text-smaller text-muted'>{isRefundable(flight.Refundable)}</div>
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

const mapStateToProps = ({flightStore}) => ({
	searchDetails: flightStore.searchDetails
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FlightCombination);
