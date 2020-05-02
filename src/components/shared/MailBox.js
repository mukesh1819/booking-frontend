import React, {Component} from 'react';
import {Formik} from 'formik';
import {Form, TextArea} from 'semantic-ui-react';
import swal from 'sweetalert';

export default ({values, sendEmail}) => {
	return (
		<Formik
			initialValues={values}
			onSubmit={(values, {setSubmitting}) => {
				const variables = {
					user: {
						email: values.email,
						description: values.description,
						subject: values.subject
					}
				};
				sendEmail(variables);
				setSubmitting(false);
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting
				/* and other goodies */
			}) => (
				<form onSubmit={handleSubmit}>
					<Form>
						<Form.Field>
							<label className='font-weight-bold'>Email</label>
							<input
								name='email'
								placeholder='Email Address'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
						</Form.Field>
						<Form.Field>
							<label className='font-weight-bold'>Subject</label>
							<input
								name='subject'
								placeholder='Subject'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.subject}
							/>
						</Form.Field>
						<TextArea
							name='description'
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Message'
							style={{minHeight: 100}}
							value={values.description}
						/>
						<button className='btn btn-primary my-3' type='submit' disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				</form>
			)}
		</Formik>
	);
};
