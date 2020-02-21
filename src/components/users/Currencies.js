import React from 'react';
import {connect} from 'react-redux';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {setCurrency} from '../../redux/actions/bookingActions';

const Currencies = (props) => {
	const currencies = ['USD', 'EUR', 'IC'];
	return (
		<ul>
			{currencies.map((currency) => {
				return <li onClick={() => props.setCurrency(currency)}> {currency} </li>;
			})}
		</ul>
	);
};

const mapStateToProps = ({currency}) => {
	return {
		currency
	};
};

const mapDispatchToProps = {
	setCurrency
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
