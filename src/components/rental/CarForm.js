import React, {Component} from 'react';
import {Formik, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import {BASE_URL} from '../../constants';
import swal from 'sweetalert';
import * as yup from 'yup';
import {Button, Divider, Grid, Header, Icon, Search, TextArea, Form, Dropdown} from 'semantic-ui-react';
import {phoneValidate, textValidate, alphaNumericValidate, numberValidate} from '../../helpers';
import {createCar, updateCar} from '../../api/carApi';
import {getPartners} from '../../api/partnerApi';

class CarForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partners: []
		};
	}

	componentDidMount() {
		this.fetchDetails();
	}

	fetchDetails(params){
		getPartners(params)
		.then((response) => {
			this.setState({
				partners: response.data.partners
			});
		})
	}

	// uploadImages = (id) => {
	// 	const data = new FormData();
	// 	Array.from(document.querySelector('[type=file]').files).map((v, index) => {
	// 		data.append(`images[${index}]`, v);
	// 	});

	// 	fetch(`${process.env.REACT_APP_BASE_URL}/api/packages/${id}/images`, {
	// 		method: 'PUT',
	// 		body: data
	// 	});
	// };

	render() {
		const {car} = this.props.car != null ? this.props : {car: {}};
		const {partners} = this.state;

		const carDetails = {
			car_type: car.car_type,
			price: car.price,
			no_of_seats: car.no_of_seats,
			details: car.details,
			image: null,
			partner_id: car.partner_id
		};

		const CarSchema = yup.object().shape({
			car_type: yup.string().required('Required'),
			price: yup.string().required('Required'),
			// price: yup.number().typeError('Not a valid amount').min(0, 'should be greater than 0').required('Required'),
			no_of_seats: numberValidate(yup),
			details: yup.string().required('Required')
		});

		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						{/* <form onSubmit={this.uploadImages}>
							<input id='package_images' name='package[images[]]' type='file' multiple />
							<input type='submit' />
						</form> */}
						<Formik
							initialValues={carDetails}
							validationSchema={CarSchema}
							onSubmit={(values, {setSubmitting}) => {
								if (car.id != null) {
									updateCar(car.idx, values)
										.then((response) => {
											setSubmitting(false);
											// this.uploadImages(response.data.idx);
											swal({
												title: 'Car updated Successful!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											});
										})
										.catch((error) => {
											// console.log('Create Package Error', error);
											setSubmitting(false);
											console.log(' Car update error', error);
										});
								} else {
									createCar({...values, image: document.querySelector('[type=file]').files})
										.then((response) => {
											setSubmitting(false);
											// this.uploadImages(response.data.idx);
											swal({
												title: 'Car created Success!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											});
										})
										.catch((error) => {
											// console.log('Create Package Error', error);
											setSubmitting(false);
											console.log(' Car create error', error);
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
											<div className='row'>
												<div className='col-12 col-md-6'>
													<div className='field-box'>
														<Form.Field>
															<label>Car Type</label>
															<Form.Input
																fluid
																name='car_type'
																onBlur={handleBlur}
																onChange={handleChange}
																value={values.car_type}
															/>
														</Form.Field>

														<ErrorMessage name='car_type' />
													</div>
												</div>
											</div>
											<div className='row'>
												<div className='col-12 col-md-6'>
													<div className='field-box'>
														<Form.Field>
															<label>Price</label>
															<Form.Input
																fluid
																icon='fas fa-mail-bulk'
																iconPosition='left'
																name='price'
																onBlur={handleBlur}
																onChange={handleChange}
																value={values.price}
															/>
														</Form.Field>

														<ErrorMessage name='price' />
													</div>
												</div>
											</div>
											<div className='row'>
												<div className='col-12 col-md-6'>
													<div className='field-box'>
														<Form.Field>
															<label>Number of seats</label>
															<Form.Input
																fluid
																icon='fas fa-mail-bulk'
																iconPosition='left'
																name='no_of_seats'
																type='number'
																className=''
																onBlur={handleBlur}
																onChange={handleChange}
																value={values.no_of_seats}
																placeholder='number of seats'
															/>
														</Form.Field>
														<ErrorMessage name='no_of_seats' />
													</div>
												</div>
											</div>

											<div>
												<label for='file'>File upload</label>
												<input
													id='image'
													name='image'
													type='file'
													onChange={(event) => {
														var file = event.target.files[0];
														var reader = new FileReader();
														reader.onload = function(item) {
															setFieldValue('image', item.target.result);
														};
														reader.readAsDataURL(file);
													}}
													className='form-control'
													multiple
												/>
												<img src={values.image} />
												<ErrorMessage name='image' />
											</div>

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
															options={partners.filter((partner) => partner.partner_type === 'rental').map(function(partner) {
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
														<label htmlFor=''>Details</label>
														<TextArea
															className='form-control'
															name='details'
															placeholder='detail'
															onBlur={handleBlur}
															onChange={(e, data) => {
																setFieldValue(`details`, e.target.value);
															}}
															value={values.details}
														/>
														<ErrorMessage name='details' />
													</div>
												</div>
											</div>
										</div>

										<div class='text-center'>
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
		);
	}
}
export default CarForm;
