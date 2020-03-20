import React, {Component} from 'react';
import {Formik} from 'formik';
import {Form, TextArea} from 'semantic-ui-react';
import {sendUserEmail} from '../../api/userApi';
import swal from 'sweetalert';

const UserEmail = (props) => {
	const {user} = props.location.state;
	return (
		<div>
			<div className='container'>
				<h5>User Information</h5>
				<table className='table table-striped table-hover table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Mobile Number</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email} </td>
							<td>{user.role}</td>
							<td>{user.phone_number}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<Formik
				initialValues={{
					description: '',
					subject: '',
					email: user.email
				}}
				onSubmit={(values, {setSubmitting}) => {
					const variables = {
						user: {
							email: values.email,
							description: values.description,
							subject: values.subject
						}
					};
					sendUserEmail(variables)
						.then((response) => {
							console.log(response);
							swal({
								title: 'Email Sent!',
								text: response.message,
								icon: 'success',
								button: 'Continue!'
							});
						})
						.catch((error) => {
							console.log(error);
							swal({
								title: 'Tickets cancellation!',
								text: error.message,
								icon: 'error',
								button: 'Continue!'
							});
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
					isSubmitting
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit}>
						<div className='container mt-5 pt-5'>
							<div className='row'>
								<div className='offset-1 col-9'>
									<Form>
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
										<button className='btn btn-secondary' type='submit' disabled={isSubmitting}>
											Submit
										</button>
									</Form>
								</div>
							</div>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};
export default UserEmail;
