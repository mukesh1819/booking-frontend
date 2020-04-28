import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {updateBooking} from '../../api/flightApi';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setBooking} from '../../redux/actions';
import ErrorMessage from '../ErrorMessage';
import FinalBookingDetails from './FinalBookingDetails';
import swal from 'sweetalert';
import {Timer, Accordion} from '../shared';
import {setTTLtime} from '../../redux/actions/flightActions';
import {Dropdown, Input} from 'semantic-ui-react';
import {getPassengers} from '../../redux/selectors';

import './flights.scss';

import {Formik, Form, Field} from 'formik';

import * as yup from 'yup';
import {passCsrfToken, nationGroup} from '../../helpers';

import {Container, Button, Segment} from 'semantic-ui-react';
import {newPayment} from '../../api/paymentApi';
import {sortObjectBy} from '../../helpers';
import {PassengerForm} from '.';

class EditPassengers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewDetails: false,
			passengers: []
		};
		this.toggleView = this.toggleView.bind(this);
	}

	toggleView() {
		this.setState(function(prevState) {
			return {viewDetails: !prevState.viewDetails};
		});
	}

	onSubmit = (values) => {
		updateBooking(this.props.booking.idx, {
			booking: {
				passengers_attributes: values.passengers
			}
		})
			.then((response) => {
				this.setState({
					passengers: values.passengers,
					viewDetails: true
				});
				this.props.setBooking(response.data);
			})
			.catch((error) => {
				// console.log(error);
				console.log(' booking create error', error);
			});
	};

	componentDidMount() {}

	render() {
		const {nationality, currentUser, countries} = this.props;
		const {booking, passengers} = this.props.location.state;
		const {viewDetails} = this.state;
		debugger;

		return (
			<div id='passenger-form'>
				{!viewDetails && (
					<Container className='p-0'>
						<PassengerForm passengers={passengers} onSubmit={(values) => this.onSubmit(values)} />
					</Container>
				)}

				{viewDetails && <FinalBookingDetails passengers={this.state.passengers} />}
			</div>
		);
	}
}

const mapStateToProps = ({flightStore, bookingStore, userStore, extras}) => {
	return {
		passengers: getPassengers(flightStore.searchDetails),
		booking: bookingStore.booking,
		currentUser: userStore.currentUser
	};
};

const mapDispatchToProps = {
	setTTLtime,
	setBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassengers);
