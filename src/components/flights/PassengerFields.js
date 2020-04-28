import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';

import * as yup from 'yup';
import {passCsrfToken} from '../../helpers';

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
