import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {createBooking} from '../../api/flightApi';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setBooking} from '../../redux/actions';
import ErrorMessage from '../ErrorMessage';
import FinalBookingDetails from './FinalBookingDetails';
import swal from 'sweetalert';
import {Timer, Accordion} from '../shared';
import {setTTLtime} from '../../redux/actions/flightActions';
import {Dropdown, Input} from 'semantic-ui-react';
import {passengerSelector} from '../../redux/selectors';
import history from '../../history';

import './flights.scss';

import {Formik, Form, Field} from 'formik';

import * as yup from 'yup';
import {passCsrfToken, nationGroup} from '../../helpers';

import {Container, Button, Segment} from 'semantic-ui-react';
import {newPayment} from '../../api/paymentApi';
import {sortObjectBy} from '../../helpers';
import {PassengerForm} from '.';

class AddPassengers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
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
		createBooking({
			booking: {
				outbound_flight: this.props.selectedOutboundFlight,
				inbound_flight: this.props.selectedInboundFlight,
				passengers_attributes: values.passengers,
				...values.user
			}
		})
			.then((response) => {
				this.setState({
					passengers: values.passengers,
					// viewDetails: true,
					user: values.user
				});
				this.props.setBooking(response.data);
				history.push(`/booking/${response.data[0].ruid}`);
			})
			.catch((error) => {
				// console.log(error);
				console.log(' booking create error', error);
			});
	};

	componentDidMount() {
		this.props.setTTLtime(15);
	}

	render() {
		const {passengers, nationality, currentUser, countries, selectedOutboundFlight} = this.props;
		const {viewDetails} = this.state;
		currentUser.code = currentUser.country;

		if (passengers.length == 0 || !selectedOutboundFlight) {
			return <Redirect to='/' />;
		}

		return (
			<div id='passenger-form'>
				{!viewDetails && (
					<Container className='p-0'>
						<PassengerForm
							passengers={passengers}
							contactDetails={{
								contact_name: currentUser.name,
								mobile_no: currentUser.phone_number,
								email: currentUser.email
							}}
							onSubmit={(values) => this.onSubmit(values)}
						/>
					</Container>
				)}

				{viewDetails && <FinalBookingDetails passengers={this.state.passengers} />}
			</div>
		);
	}
}

const mapStateToProps = ({flightStore, bookingStore, userStore, extras}) => {
	return {
		selectedInboundFlight: flightStore.selectedInboundFlight,
		selectedOutboundFlight: flightStore.selectedOutboundFlight,
		passengers: passengerSelector(flightStore.searchDetails),
		nationality: flightStore.searchDetails.strNationality,
		booking: bookingStore.booking,
		currentUser: userStore.currentUser,
		ttlTime: flightStore.ttlTime,
		countries: extras.countries
	};
};

const mapDispatchToProps = {
	setTTLtime,
	setBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPassengers);
