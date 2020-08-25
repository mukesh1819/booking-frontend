import React, {Component} from 'react';
import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import {BASE_URL} from '../../constants';
import swal from 'sweetalert';
import * as yup from 'yup';
import {Button, Divider, Grid, Header, Icon, Search, TextArea, Form, Dropdown} from 'semantic-ui-react';
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import {createLocation, updateLocation} from '../../api/locationApi';
import {getPartners} from '../../api/partnerApi';
import history from '../../history';

class LocationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// partners: []
		};
	}

	// componentDidMount() {
	// 	this.fetchDetails(params);
	// }

	// fetchDetails(params){
	// }

	render() {
		const {location} = this.props.location.state != null ? this.props.location.state : {location: {}};
		const {partners} = this.state;

		const locationDetails = {
			name: location.name,
			location_type: location.location_type
		};

		const LocationSchema = yup.object().shape({
			name: yup.string().required('Required'),
			location_type: yup.string().required('Required')
		});

		return (
			<div className='container'>
				<div className='row'>
					<div className='col-12 col-md-4 offset-md-4'>
						<div className='card'>
							<div className='card-body'>
								{/* <form onSubmit={this.uploadImages}>
							<input id='package_images' name='package[images[]]' type='file' multiple />
							<input type='submit' />
						</form> */}
								<div className='container'>
									<h3>Location Form</h3>
									<Formik
										initialValues={locationDetails}
										validationSchema={LocationSchema}
										onSubmit={(values, {setSubmitting}) => {
											if (location.idx != null) {
												updateLocation(location.idx, values)
													.then((response) => {
														setSubmitting(false);
														// this.uploadImages(response.data.idx);
														swal({
															title: 'location updated Successful!',
															text: response.data.message,
															icon: 'success',
															button: 'continue!'
														}).then((value) => {
															history.push('/admin/locations');
														});
													})
													.catch((error) => {
														// console.log('Create Package Error', error);
														setSubmitting(false);
														console.log(' location update error', error);
													});
											} else {
												createLocation(values)
													.then((response) => {
														setSubmitting(false);
														// this.uploadImages(response.data.idx);
														swal({
															title: 'location created Success!',
															text: response.data.message,
															icon: 'success',
															button: 'continue!'
														}).then((value) => {
															history.push('/');
														});
													})
													.catch((error) => {
														// console.log('Create Package Error', error);
														setSubmitting(false);
														console.log(' location create error', error);
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
										}) => {
											return (
												<form onSubmit={handleSubmit}>
													<div className='input-section'>
														<div className='field-box'>
															<label>Select Type</label>
															<Dropdown
																className=''
																name='location_type'
																placeholder='Select Location Type'
																onBlur={handleBlur}
																onChange={(e, data) => {
																	setFieldValue(`location_type`, data.value);
																}}
																value={values.location_type}
																fluid
																search
																selection
																options={[
																	{
																		id: 1,
																		value: 'city',
																		text: 'city'
																	},

																	{
																		id: 2,
																		value: 'airport',
																		text: 'airport'
																	}
																]}
															/>
															<ErrorMessage name='type' />
														</div>

														<div className='field-box'>
															<Form.Field>
																<label>Location Name</label>
																<Form.Input
																	fluid
																	name='name'
																	onBlur={handleBlur}
																	onChange={handleChange}
																	value={values.name}
																/>
															</Form.Field>

															<ErrorMessage name='name' />
														</div>
													</div>

													<div className='text-center'>
														<button
															className='btn btn-secondary m-2'
															type='submit'
															disabled={isSubmitting}
														>
															Submit
														</button>
													</div>
												</form>
											);
										}}
									</Formik>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default LocationForm;
