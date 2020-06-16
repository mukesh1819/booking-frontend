import React, {Component} from 'react';

import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays, ifNotZero} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen} from '../shared';
import {Input, Form, Checkbox, TextArea} from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import {assignPartner} from '../../api/carBookingApi';
import { getPartners } from '../../api/partnerApi';

class AssignCarBookingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
            partners: []
		};
		
    }
    
    componentDidMount(){
        var params ={};
        params['q[partner_type_eq]'] = 'rental';
        this.fetchPartners(params); 
    }

    fetchPartners(params){
        getPartners(params)
        .then((response) => {
            this.setState({
                partners: response.data.partners
            });
        })
        .catch((error) => {
            console.log("partner fetch error", error)
        })
    }

	render() {
        const {carBooking} = this.props.location.state != null ? this.props.location.state : {carBooking: {}};
        const {partners} = this.state;
		const BookingSchema = yup.object().shape({
            partner_id: yup.string().required('Required'),
            remarks: yup.string().required('Required')
		});
       
		const bookingDetails = {
			partner_id: carBooking.partner_id || 1,
			remarks: carBooking.remarks
        };
		return (
			<div className='container bg-white'>
				<Formik
					initialValues={bookingDetails}
					validationSchema={BookingSchema}
					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
                        });
						setSubmitting(false);
						// console.log(values);
						if (carBooking.idx != null) {
							assignPartner(carBooking.idx, values)
								.then((response) => {
									swal({
										title: 'Car Booking updated!',
										text: response.data.message,
										icon: 'success',
										button: 'Continue'
									});
								})
								.catch((error) => {
									console.log('Update Booking Error', error);
								});
						}
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						setFieldValue
						/* and other goodies */
					}) => (
						<div className='inquiry-form'>
							<div className='row'>
								<div className='col-12'>
									{/* <h3>
										Kindly submit the query form below to book your trip and we will contact you
										with the confirmed itinerary.
									</h3> */}
								</div>
							</div>
							<form onSubmit={handleSubmit}>
								<div className='input-section padded bg-white'>

                                    <div className='row'>
                                        <div className='col-12 col-md-6'>
                                            <div className='field-box'>
                                                <label>Select Partners</label>
                                                <Dropdown
                                                    className=''
                                                    name='partner_id'
                                                    placeholder='Select Partners'
                                                    onBlur={handleBlur}
                                                    onChange={(e, data) => {
                                                        setFieldValue(`partner_id`, data.value);
                                                    }}
                                                    value={values.partner_id}
                                                    fluid
                                                    search
                                                    selection
                                                    options={partners.map(function(partner) {
                                                        name = partner.first_name + ' ' + partner.last_name;
                                                        return {
                                                            key: partner.id,
                                                            value: partner.id,
                                                            text: name
                                                        };
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>


									<div className='row'>
                                        <div className='col-12 col-md-6'>
                                            <div className='field-box'>
                                                <label htmlFor=''>Remarks</label>
                                                <TextArea
                                                    className='form-control'
                                                    name='remarks'
                                                    placeholder='remarks'
                                                    onBlur={handleBlur}
                                                    onChange={(e, data) => {
                                                        setFieldValue(`remarks`, e.target.value);
                                                    }}
                                                    value={values.remarks}
                                                />
                                                <ErrorMessage name='remarks' />
                                            </div>
                                        </div>

									</div>
								</div>

								<div className='traveller-details '>
									<div className='input-section padded bg-white'>
										<div className='row'>
											<div className='col-12'>
												<div className='text-center'>
													<button
														className='btn btn-primary m-2'
														type='submit'
														disabled={isSubmitting}
													>
														Update
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					)}
				</Formik>
			</div>
		);
	}
}

export default AssignCarBookingForm;
