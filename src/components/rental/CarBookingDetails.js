import React, {Component} from 'react';

import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, DateTimePicker} from '../shared';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Input, Form, Checkbox, TextArea} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import {createCarBooking, updateCarBooking, showUserRentalBooking} from '../../api/carBookingApi';

class CarBookingDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carBooking: {}
		};
	}

	componentDidMount(){
		this.fetchUserBookingDetails();
	}

	fetchUserBookingDetails(){
		showUserRentalBooking(this.props.match.params.booking_idx)
		.then((response) => {
			this.setState({
				carBooking: response.data
			});
		})
	}

	render() {
		const {carBooking} = this.state;
		return (
			<div className='container bg-white'>
				Booking Details
				{carBooking.status === 'processing' && <span className='btn btn-primary'>Continue to Payment</span>}
				{carBooking.status === 'verified' && <span className='btn btn-primary'>Download ticket</span>}
			</div>
		);
	}
}

export default CarBookingDetails;
