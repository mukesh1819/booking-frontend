import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import {connect} from 'react-redux';
import {Counter, IconInput, Loading as LoadingScreen, DatePicker, Stepper, Thumb} from '../shared';
import {createPackage, updatePackage} from '../../api/packageApi';
import {getCategories} from '../../api/categoryApi';
import {getPackages} from '../../api/packageApi';
import {getPartners} from '../../api/partnerApi';
import {BASE_URL} from '../../constants';
import Package from '../packages/Package';
import swal from 'sweetalert';

class PackageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partnerIsValid: false,
			categories: [],
			packages: [],
			partners: []
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

		var partnerId = this.props.partnerId ? this.props.partnerId : this.props.match.params.partnerId;
		getPackages(`q[partner_id_eq]=${partnerId}`)
			.then((res) => {
				this.setState({
					packages: res.data
				});
			})
			.catch((error) => {
				// console.log('PACKAGES FETCH ERROR');
				swal({
					title: 'Package fetch error!',
					text: 'could not able to fetch package. please try again or contact us',
					icon: 'error',
					button: 'Try Again!'
				});

			});

		getPartners()
			.then((response) => {
				// console.log('Partners List', response.data);
				this.setState({
					partners: response.data
				});
			})
			.catch((error) => {
				// console.log('PARTNER FETCH ERROR');
				swal({
					title: 'Partner fetch error!',
					text: 'could not able to fetch partner. please try again or contact us',
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
					nav: false,
					loop: false
				}
			}
		};
		$('.owl-carousel').owlCarousel(options);
	}

	render() {
		const {aPackage} = this.props.location.state != null ? this.props.location.state : {aPackage: {}};
		const {partnerIsValid, categories, packages, partners} = this.state;
		const {countries, nextStep} = this.props;
		const partnerDetails = {
			name: aPackage.name,
			price: aPackage.price,
			location: aPackage.location,
			description: aPackage.description,
			images: [],
			partner_id: this.props.partnerId ? this.props.partnerId : this.props.match.params.partnerId,
			category_id: aPackage.category != null ? aPackage.category.id : ''
		};
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						<Formik
							initialValues={partnerDetails}
							onSubmit={(values, {setSubmitting}) => {
								this.setState({
									searching: true
								});
								// console.log(values);
								if (aPackage.id != null) {
									updatePackage(aPackage.id, values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
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
									createPackage(values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
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
								<form onSubmit={handleSubmit} autoComplete='off'>
									<div className='input-section'>
										{partnerDetails.partner_id == null && (
											<div className='field-box mt-3'>
												<label>Partners List</label>
												<IconInput icon='icon-paper-plane' iconPosition='left'>
													<Field
														as='select'
														name='partner_id'
														className='form-control'
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.partner_id}
														defaultValue=''
													>
														<option value=''>Select one</option>
														{partners.map((partner) => (
															<option key={partner.id} value={partner.id}>
																{partner.name} ({partner.email})
															</option>
														))}
													</Field>
												</IconInput>
												<ErrorMessage name='partner_id' />
											</div>
										)}

										<div className='field-box'>
											<label>Name</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='name'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.name}
												/>
											</IconInput>
											<ErrorMessage name='name' />
										</div>
										<div className='field-box'>
											<label>Price</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													name='price'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.price}
												/>
											</IconInput>
											<ErrorMessage name='price' />
										</div>
										<div className='field-box'>
											<label>Location</label>
											<IconInput icon='fas fa-location' iconPosition='left'>
												<Field
													name='location'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.location}
												/>
											</IconInput>
											<ErrorMessage name='location' />
										</div>

										<div className='field-box'>
											<label>Category</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
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
											</IconInput>
											<ErrorMessage name='category_id' />
										</div>

										<div>
											<label for='file'>File upload</label>
											<input
												id='images'
												name='images'
												type='file'
												onChange={(event) => {
													setFieldValue('images', event.currentTarget.files);
												}}
												className='form-control'
												multiple
											/>
											<Thumb files={values.images} />
											{aPackage.images.map((image) => (
												<img
													src={`${BASE_URL}/${image}`}
													alt={image}
													className='img-thumbnail mt-2'
													height={200}
													width={200}
												/>
											))}
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
									<div class='text-center'>
										<button className='btn btn-secondary m-2' type='submit' disabled={isSubmitting}>
											Submit
										</button>
									</div>
								</form>
							)}
						</Formik>
						{partnerIsValid && <a href='btn btn-primary'>Add Packages</a>}
					</div>
					<h3> Your other packages</h3>
					<div className='row'>
						{packages.map((aPackage) => (
							<div className='col-md-4'>
								<Package aPackage={aPackage} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({extras}) => ({
	countries: extras.countries
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PackageForm);
