import React, {Component} from 'react';
import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import history from '../../history';
import {Container, Segment, Dropdown, Form, TextArea} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, Stepper, Thumb} from '../shared';
import {Input} from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import {sortObjectBy, phoneValidate, textValidate, numberValidate, alphaNumericValidate} from '../../helpers';
import {markComplete} from '../../api/carBookingApi';

const RentalRemarksForm = (props) => {
    const RemarkSchema = yup.object().shape({
        remarks: alphaNumericValidate(yup).required('Required')
    });
    const {idx} = props.match.params;
   
    return(
        <div className='container bg-white'>
				<Formik
                    initialValues={{
                        remarks: ''
                    }}
					validationSchema={RemarkSchema}
					onSubmit={(values, {setSubmitting}) => {
                        // console.log(values);
                        markComplete(idx, values)
                            .then((response) => {
                                setSubmitting(false);
                                swal({
                                    title: 'Response',
                                    text: response.data.message,
                                    icon: response.status == 200 ? 'success' : 'error'
                                }).then((response) => {
                                    history.push('/admin/car_bookings');
                                });
                            })
                            .catch((v) => {});
                                        
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
							<Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label>Remarks</label>
                                    <TextArea
                                        name='remarks'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Remarks'
                                        style={{minHeight: 100}}
                                        value={values.remarks}
                                        error={
                                            touched.remarks &&
                                            errors.remarks && {
                                                content: errors.remarks,
                                                pointing: 'above'
                                            }
                                        }
                                    />
                                    <ErrorMessage name='remarks' />
                                </Form.Field>
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
														submit
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Form>
						</div>
					)}
				</Formik>
			</div>
    );
};
export default RentalRemarksForm;
