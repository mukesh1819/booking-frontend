import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getFlights} from '../../api/flightApi';
import FlightList from './FlightList';
import {Formik, Form, Field, ErrorMessage} from 'formik';

import * as yup from 'yup';
import {passCsrfToken} from '../../helpers/helpers';

import {Container, Button, Segment} from 'semantic-ui-react';

export default class PassengerFields extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		<div>
			<Field
				as='select'
				name={`passengers[${index}].title`}
				className='form-control'
				onBlur={handleBlur}
				onChange={handleChange}
				value={this.props.passenger.title}
			>
				<option value='Mr'> Mr </option> <option value='Mrs'> Mrs </option>
			</Field>
			<Field
				name={`passengers[${index}].firstName`}
				className='form-control'
				onBlur={handleBlur}
				onChange={handleChange}
				value={this.props.passenger.firstName}
			/>
			<Field
				name={`passengers[${index}].lastName`}
				className='form-control'
				onBlur={handleBlur}
				onChange={handleChange}
				value={this.props.passenger.lastName}
			/>
		</div>;
	}
}
