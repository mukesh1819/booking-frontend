import React, {Component, Fragment} from 'react';
import {Formik} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken} from '../../helpers';
import history from '../../history';
import {Form, Container, Segment, Dropdown, Button} from 'semantic-ui-react';

import {Counter, IconInput, DatePicker} from '../shared';
import {Input} from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import {createFaq, updateFaq} from '../../api/supportApi';
import {filter} from '../../api';

class FilterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {submitUrl, fields, onSubmit} = this.props;
		const initialValues = {};
		fields.forEach((field) => (initialValues[name] = ''));

		return (
			<div className='container'>
				<Formik
					initialValues={initialValues}
					onSubmit={(values, {setSubmitting}) => {
						setSubmitting(false);
						var url = `${submitUrl}?`;
						Object.keys(values).forEach(
							(key) => (url = url + values[key] ? `params[q][${key}]=${values[key]}&` : '')
						);
						console.log('Request URL', url);
						filter(url)
							.then((response) => {
								debugger;
								setSubmitting(false);
								onSubmit(response.data);
							})
							.catch((error) => {
								setSubmitting(false);
								console.log('Filter Error', error);
							});
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
						<div className='container'>
							<div className='row'>
								<div className='card'>
									<div className='card-header'>
										<h3>Filter</h3>
									</div>

									<div className='card-body'>
										<Form className='' autocomplete='off' onSubmit={handleSubmit}>
											{fields.map((field) => (
												<Form.Group widths='equal'>
													{field.type == 'text' && (
														<Form.Input
															label={field.label}
															placeholder={field.label}
															name={field.name}
															onChange={handleChange}
															onBlur={handleBlur}
															value={values[field.name]}
															error={
																errors[field.name] &&
																touched[field.name] && {
																	content: errors[field.name],
																	pointing: 'below'
																}
															}
														/>
													)}

													{field.type == 'select' && (
														<Form.Select
															clearable
															label={field.label}
															options={field.options.map((v) => {
																return {
																	key: v,
																	value: v,
																	text: v
																};
															})}
															selection
															name={field.name}
															onChange={(e, data) => {
																setFieldValue(field.name, data.value);
															}}
															onBlur={handleBlur}
															value={values[field.name]}
															placeholder={`Select ${field.label}`}
														/>
													)}

													{field.type == 'date' && (
														<Form.Field>
															<label htmlFor=''>{field.label}</label>
															<DatePicker
																name='strFlightDate'
																className='form-control'
																type='date'
																date={new Date()}
																onBlur={handleBlur}
																onChange={(date) => setFieldValue(field.name, date)}
																value={values[field.name]}
																placeholder={field.label}
															/>
														</Form.Field>
													)}
												</Form.Group>
											))}

											<Button primary type='submit' disabled={isSubmitting}>
												Submit
											</Button>
										</Form>
									</div>
								</div>
							</div>
						</div>
					)}
				</Formik>
			</div>
		);
	}
}

export default FilterForm;
