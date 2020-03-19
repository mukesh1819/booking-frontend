import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../utils/helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import Counter from '../shared/Counter';
import DatePicker from '../shared/Datepicker';

import IconInput from '../shared/IconInput';
import {Input} from 'semantic-ui-react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import ReactDOM from 'react-dom';
import LoadingScreen from '../shared/Loading';
import Stepper from '../shared/Stepper';
import Thumb from '../shared/Thumb';
import {createPackage} from '../../api/packageApi';
import {getCategories, createCategory, updateCategory} from '../../api/categoryApi';
import {getPackages} from '../../api/packageApi';

class CategoriesForm extends Component {
	constructor(props) {
		super(props);
    }
    
	render() {
        const {category} = this.props.location.state != null? this.props.location.state : {category:{}}

        
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
							onSubmit={(values, {setSubmitting}) => {
								this.setState({
									searching: true
								});
                                console.log(values);
                                if(category.id != null){
                                    updateCategory(category.id, values)
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
                                }
                                else{
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
								<form onSubmit={handleSubmit} autoComplete='off'>
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

									<div class='text-center'>
										<button
											className='search-btn btn btn-secondary m-2'
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
