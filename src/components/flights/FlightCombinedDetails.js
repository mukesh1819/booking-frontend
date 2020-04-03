import React, {Component} from 'react';
import store from '../../redux/store';
import {isRefundable, ifNotZero} from '../../helpers';
import {connect} from 'react-redux';
import FlightDetails from './FlightDetails';

const FlightCombinedDetails = (props) => {
	const {adult, child, flight} = props;
	const inbound = flight.inbound;
	const outbound = flight.outbound;
	return (
		<div className='flight-details'>
			<span className='text-bold'>Departure:</span>
			<hr />
			<FlightDetails flight={outbound} />
			<hr />
			<span className='text-bold'>Arrival:</span>
			<hr />
			<FlightDetails flight={inbound} />
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
