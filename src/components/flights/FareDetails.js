import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../redux/store';
import {isRefundable, ifNotZero, ifGreaterThanOne} from '../../helpers';

const FareDetails = (props) => {
	const {flight, adult, child} = props;
	return (
		<div>
			<span className='text-center p-3'>
				<div className='text-bold'>
					Total Fare: {flight.Currency} {flight.total_fare}
				</div>
				<div className='text-small text-muted'>
					({adult} Adult {ifNotZero(child, `, ${child} Child`)})
				</div>
			</span>
			<ul className='text-muted text-small'>
				{adult > 0 && (
					<li>
						Base Fare (1 Adult): {flight.Currency} {flight.AdultFare}{' '}
						{ifGreaterThanOne(adult, ` * (${adult})`)}
					</li>
				)}
				{child > 0 && (
					<li>
						Base Fare (1 Child): {flight.Currency} {flight.ChildFare}{' '}
						{ifGreaterThanOne(child, ` * (${child})`)}
					</li>
				)}
				<li>
					Fuel Surcharge: {flight.Currency} {flight.FuelSurcharge}
					{ifGreaterThanOne(adult + child, ` * (${adult} + ${child})`)}
				</li>
				<li>
					Tax: {flight.Currency} {flight.Tax}
					{ifGreaterThanOne(adult + child, ` * (${adult} + ${child})`)}
				</li>
			</ul>
		</div>
	);
};

export default FareDetails;
