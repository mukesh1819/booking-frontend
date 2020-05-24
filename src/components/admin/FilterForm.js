import React, {Component, Fragment} from 'react';
import {Formik} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken} from '../../helpers';
import history from '../../history';
import {Form, Container, Segment, Dropdown, Button, Checkbox, Input, Radio, Select, TextArea} from 'semantic-ui-react';

import {Counter, IconInput, DatePicker} from '../shared';
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

		const options = [
			{key: 'm', text: 'Male', value: 'male'},
			{key: 'f', text: 'Female', value: 'female'},
			{key: 'o', text: 'Other', value: 'other'}
		];

		return (
			<Formik
				initialValues={initialValues}
				onSubmit={(values, {setSubmitting}) => {
					setSubmitting(false);
					var searchUrl = ``;
					Object.keys(values).forEach((key) => {
						searchUrl = searchUrl + (values[key] != '' && key != '' ? `q[${key}]=${values[key]}&` : '');
					});
					const url = `${submitUrl}?` + searchUrl;
					console.log('Request URL', url);
					filter(url)
						.then((response) => {
							setSubmitting(false);
							onSubmit(response.data);
							history.push({
								pathname: window.location.pathname,
								search: `?${searchUrl}`
							});
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
					<div className='ui card fluid'>
						<div className='ui card-header'>
							<h3>Filter</h3>
						</div>

						<div className='ui card-body'>
							<Form className='' autocomplete='off' onSubmit={handleSubmit}>
								<Form.Group widths='equal'>
									{fields.map((field) => (
										<Fragment>
											{field.type == 'text' && (
												<Form.Field>
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
												</Form.Field>
											)}

											{field.type == 'select' && (
												<Form.Field>
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
												</Form.Field>
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
										</Fragment>
									))}
								</Form.Group>

								<Button primary type='submit' disabled={isSubmitting}>
									Submit
								</Button>
							</Form>
						</div>
					</div>
				)}
			</Formik>
		);
	}
}

export default FilterForm;