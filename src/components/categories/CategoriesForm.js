import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';

import {Counter, DatePicker, IconInput, Loading as LoadingScreen, Stepper, Thumb} from '../shared';
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {createPackage, getPackages} from '../../api/packageApi';
import {getCategories, createCategory, updateCategory} from '../../api/categoryApi';

class CategoriesForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {category} = this.props.location.state != null ? this.props.location.state : {category: {}};

		const CategoriesSchema = yup.object().shape({
			name: yup.string().required('Required'),
			order: yup.number().required('Required')
		});

		const initialParams = {
			name: category.name,
			order: category.order
		};

		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						Category Form
						<Formik
							initialValues={initialParams}
							validationSchema={CategoriesSchema}
							onSubmit={(values, {setSubmitting}) => {
								this.setState({
									searching: true
								});
								console.log(values);
								if (category.id != null) {
									updateCategory(category.idx, values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
											swal({
												title: 'Category updated Successful!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											});
										})
										.catch((error) => {
											console.log('Create Package Error', error);
											setSubmitting(false);
											swal({
												title: 'Sorry!',
												text: error.message,
												icon: 'error',
												button: 'Try Again!'
											});
										});
								} else {
									createCategory(values)
										.then((response) => {
											setSubmitting(false);
											// nextStep(response.data);
											swal({
												title: 'Category created Success!',
												text: response.data.message,
												icon: 'success',
												button: 'continue!'
											});
										})
										.catch((error) => {
											console.log('Create Package Error', error);
											setSubmitting(false);
											swal({
												title: 'Sorry!',
												text: error.message,
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
										<div className='field-box'>
											<label>Name</label>
											<IconInput icon='fas fa-location' iconPosition='left'>
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
											<label>Order</label>
											<IconInput icon='icon-paper-plane' iconPosition='left'>
												<Field
													// hidden
													name='order'
													className='form-control'
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.order}
												/>
											</IconInput>
											<ErrorMessage name='order' />
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

export default CategoriesForm;
