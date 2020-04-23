import React, {Component} from 'react';
import {connect} from 'react-redux';
import CKEditor from 'ckeditor4-react';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, Stepper, Thumb} from '../shared';
import {createPackage, updatePackage} from '../../api/packageApi';
import {getCategories} from '../../api/categoryApi';
import {BASE_URL} from '../../constants';
import swal from 'sweetalert';
import {setError} from '../../redux/actions';
import * as yup from 'yup';
import {Button, Divider, Grid, Header, Icon, Search, Segment} from 'semantic-ui-react';

class PackageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			activities_attributes: []
		};
		this.fetchDetails = this.fetchDetails.bind(this);
	}

	componentDidMount() {
		this.fetchDetails();
	}

	fetchDetails() {
		getCategories()
			.then((res) => {
				this.setState({
					categories: res.data
				});
			})
			.catch((error) => {
				// console.log('CATEGORIES FETCH ERROR');
				swal({
					title: 'Category fetch error!',
					text: 'could not able to fetch categories. please try again or contact us',
					icon: 'error',
					button: 'Try Again!'
				});
			});

		const options = {
			margin: 10,
			loop: true,
			touchDrag: true,
			rewind: true,
			animateIn: true,
			responsive: {
				0: {
					items: 1,
					nav: false
				},
				600: {
					items: 3,
					nav: false
				},
				1000: {
					items: 4,
					nav: false
				}
			}
		};
		$('.owl-carousel').owlCarousel(options);
	}

	uploadImages = (id) => {
		const data = new FormData();
		Array.from(document.querySelector('[type=file]').files).map((v, index) => {
			data.append(`images[${index}]`, v);
		});

		fetch(`${process.env.REACT_APP_BASE_URL}/api/packages/${id}/images`, {
			method: 'PUT',
			body: data
		});
	};

	render() {
		const activity = {
			description: '',
			duration: '',
			price: ''
		};

		const {aPackage} =
			this.props.location.state != null
				? this.props.location.state
				: {aPackage: {images: [], activities: [activity]}};
		console.log('Package Details', aPackage);
		const {categories, activities_attributes} = this.state;
		const {countries, nextStep} = this.props;

		const packageDetails = {
			name: aPackage.name,
			price: aPackage.price,
			offer_price: aPackage.offer_price,
			location: aPackage.location,
			description: aPackage.description,
			inclusions: aPackage.inclusions,
			exclusions: aPackage.exclusions,
			images: [],
			category_id: aPackage.category != null ? aPackage.category.id : '',
			activities_attributes: aPackage.activities
		};

		const PackageSchema = yup.object().shape({
			name: yup.string().required('Required'),
			price: yup.number().typeError('Not a valid amount').min(0, 'should be greater than 0').required('Required'),
			offer_price: yup
				.number()
				.typeError('Not a valid amount')
				.min(0, 'Should be greater than 0')
				.max(yup.ref('price'), 'should not be greater than actual price'),
			location: yup.string().required('Required'),
			description: yup.string().required('Required'),
			category_id: yup.string().required('Required')
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
							initialValues={packageDetails}
							validationSchema={PackageSchema}
							onSubmit={(values, {setSubmitting}) => {
								if (aPackage.id != null) {
									updatePackage(aPackage.idx, values)
										.then((response) => {
											setSubmitting(false);
											this.uploadImages(response.data.idx);
											swal({
												title: 'Package updated Successful!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											});
										})
										.catch((error) => {
											// console.log('Create Package Error', error);
											setSubmitting(false);
											swal({
												title: 'Package Update Error!',
												text: `${error.message}.. please try again or contact us`,
												icon: 'error',
												button: 'Try Again!'
											});
										});
								} else {
									createPackage({...values, images: document.querySelector('[type=file]').files})
										.then((response) => {
											setSubmitting(false);
											this.uploadImages(response.data.idx);
											swal({
												title: 'Package created Success!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											});
										})
										.catch((error) => {
											// console.log('Create Package Error', error);
											setSubmitting(false);
											swal({
												title: 'Package Create Error!',
												text: `${error.message}.. please try again or contact us`,
												icon: 'error',
												button: 'Try Again!'
											});
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
								<form onSubmit={handleSubmit}>
									<div className='input-section'>
										<div className='row'>
											<div className='col-12'>
												<div className='field-box'>
													<label>Name</label>

													<Field
														name='name'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.name}
													/>

													<ErrorMessage name='name' />
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label>Price</label>

													<Field
														name='price'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.price}
													/>

													<ErrorMessage name='price' />
												</div>
											</div>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label>Offer Price</label>

													<Field
														name='offer_price'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.offer_price}
													/>

													<ErrorMessage name='offer_price' />
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label>Location</label>

													<Field
														name='location'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.location}
													/>

													<ErrorMessage name='location' />
												</div>
											</div>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label>Category</label>

													<Field
														as='select'
														name='category_id'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.category_id}
														defaultValue=''
													>
														<option value=''>Select one</option>
														{categories.map((category) => (
															<option key={category.id} value={category.id}>
																{category.name}
															</option>
														))}
													</Field>

													<ErrorMessage name='category_id' />
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label>Inclusions</label>

													<Field
														name='inclusions'
														component='textarea'
														rows='2'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.inclusions}
													/>

													<ErrorMessage name='inclusions' />
												</div>
											</div>
											<div className='col-12 col-md-6'>
												<div className='field-box'>
													<label>Exclusions</label>

													<Field
														name='exclusions'
														component='textarea'
														rows='2'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.exclusions}
													/>

													<ErrorMessage name='exclusions' />
												</div>
											</div>
										</div>

										<div>
											<label for='file'>File upload</label>
											<input
												id='images'
												name='images'
												type='file'
												onChange={(event) => {
													var file = event.target.files[0];
													var reader = new FileReader();
													reader.onload = function(item) {
														setFieldValue('images', item.target.result);
													};
													reader.readAsDataURL(file);
												}}
												className='form-control'
												multiple
											/>
											<img src={values.images} />
											{/* <Thumb files={values.images} /> */}
											{aPackage.images.map((image) => (
												<img
													src={`${BASE_URL}/${image}`}
													alt={image}
													className='img-thumbnail mt-2'
													height={200}
													width={200}
												/>
											))}
											<ErrorMessage name='images' />
										</div>
										<div className='field-box'>
											<label htmlFor=''>Description</label>
											<CKEditor
												data={values.description}
												onInit={(editor) => {
													// You can store the "editor" and use when it is needed.
													console.log('Editor is ready to use!', editor);
												}}
												onChange={(event, editor) => {
													setFieldValue('description', event.editor.getData());
													// const data = event.editor.getData();
													// console.log({event, editor, data});
												}}
												onBlur={(event, editor) => {
													console.log('Blur.', editor);
												}}
												onFocus={(event, editor) => {
													console.log('Focus.', editor);
												}}
											/>
											<ErrorMessage name='description' />
										</div>
									</div>

									<div className='input-section'>
										<div className='row'>
											<div className='col-12'>
												<div className='d-flex justify-content-between'>
													<h3 className='title'>Activities</h3>
													{/* <span
														className='btn btn-primary'
														onClick={() =>
															setFieldValue('activities_attributes', [
																...values.activities_attributes,
																activity
															])}
													>
														Add
													</span> */}
												</div>
											</div>
										</div>
										<Segment placeholder>
											<div className='row activities'>
												{values.activities_attributes.map((activity, index) => (
													<div className='activity col-4 py-2'>
														<div
															className='text-right'
															onClick={() => {
																values.activities_attributes.splice(index, 1);
																setFieldValue(
																	'activities_attributes',
																	values.activities_attributes
																);
															}}
														>
															<i className='fas fa-times' />
														</div>
														<div className='row'>
															<div className='col-12'>
																<div className='field-box'>
																	<label>Description</label>

																	<Field
																		name={`activities_attributes[${index}].description`}
																		className='form-control'
																		onBlur={handleBlur}
																		onChange={handleChange}
																		value={
																			values.activities_attributes[index]
																				.description
																		}
																	/>

																	<ErrorMessage
																		name={`activities_attributes[${index}].description`}
																	/>
																</div>
															</div>
															<div className='col-12'>
																<div className='field-box'>
																	<label>Duration</label>

																	<Field
																		name={`activities_attributes[${index}].duration`}
																		className='form-control'
																		onBlur={handleBlur}
																		onChange={handleChange}
																		value={
																			values.activities_attributes[index].duration
																		}
																	/>

																	<ErrorMessage
																		name={`activities_attributes[${index}].duration`}
																	/>
																</div>
															</div>
															<div className='col-12'>
																<div className='field-box'>
																	<label>Price</label>

																	<Field
																		name={`activities_attributes[${index}].price`}
																		type='number'
																		className='form-control'
																		onBlur={handleBlur}
																		onChange={handleChange}
																		value={
																			values.activities_attributes[index].price
																		}
																	/>

																	<ErrorMessage
																		name={`activities_attributes[${index}].price`}
																	/>
																</div>
															</div>
														</div>
													</div>
												))}
												<div className='col-4 d-flex activity align-items-center justify-content-center'>
													<Header
														icon
														className='text-primary p-4'
														onClick={() =>
															setFieldValue('activities_attributes', [
																...values.activities_attributes,
																activity
															])}
													>
														<Icon name='fas fa-plus-circle' />
														Add Activity
													</Header>
												</div>
											</div>
										</Segment>
									</div>

									<div class='text-center'>
										<button className='btn btn-secondary m-2' type='submit' disabled={isSubmitting}>
											Submit
										</button>
									</div>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({extras}) => ({
	countries: extras.countries
});

const mapDispatchToProps = {
	setError
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageForm);
