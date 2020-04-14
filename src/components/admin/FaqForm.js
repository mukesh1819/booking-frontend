import React,{Component} from 'react';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken} from '../../helpers';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';

import {Counter, IconInput} from '../shared';
import {Input} from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import {createFaq, updateFaq} from '../../api/supportApi';

class FaqForm extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        const {faq} = this.props.location.state != null ? this.props.location.state : {faq: {}};
        const faqDetails = {
			question: faq.question,
            answer: faq.answer,
			category: faq.category,
		};
        return(
            <div className='container'>
				<Formik
					initialValues={faqDetails}
    					onSubmit={(values, {setSubmitting}) => {
						this.setState({
							searching: true
						});
						setSubmitting(false);
						// console.log(values);
						if (faq.id != null) {
							updateFaq(faq.idx, values)
								.then((response) => {
									swal({
										title: 'faq updated!',
										text: response.data.message,
										icon: 'Success',
										button: 'Continue'
									});
									history.push();
								})
								.catch((error) => {
									swal({
										title: 'Sorry!',
										text: 'something went wrong',
										icon: 'error',
										button: 'Try Again!'
									});
								});
						} else {
							createFaq(values)
								.then((response) => {
									setSubmitting(false);
									swal({
										title: 'Faq Created!',
										text: response.data.message,
										icon: 'Success',
										button: 'Continue'
									});
									history.push();
								})
								.catch((error) => {
									// console.log('inquiry create error', error);
									setSubmitting(false);
									swal({
										title: 'Sorry!',
										text: 'something went wrong',
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
						<div className='inquiry-form'>
							<div className='row'>
								<div className='col-12'>
                                    <h3>
										Frequently Asked Question.
									</h3> 
								</div>
							</div>
							<form onSubmit={handleSubmit} autoComplete='off'>
                                <div className='input-section'>
                                    <div className='field-box'>
                                        <label>Question</label>
                                        <IconInput icon='fas fa-location' iconPosition='left'>
                                            <Field
                                                name='question'
                                                className='form-control'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.question}
                                            />
                                        </IconInput>
                                        <ErrorMessage name='question' />
                                    </div>

                                    <div className='field-box'>
                                        <label>Answer</label>
                                        <IconInput icon='icon-paper-plane' iconPosition='left'>
                                            <Field
                                                name='answer'
                                                className='form-control'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.answer}
                                            />
                                        </IconInput>
                                        <ErrorMessage name='answer' />
                                    </div>

                                    <div className='field-box'>
                                        <label htmlFor=''>Category</label>
                                        <Dropdown
                                            className='form-control'
                                            name='category'
                                            placeholder='Select Category'
                                            onBlur={handleBlur}
                                            onChange={(e, data) => {
                                                setFieldValue(`category`, data.value);
                                            }}
                                            value={values.category}
                                            fluid
                                            search
                                            selection
                                            options= {[
                                                {
                                                    key: 1,
                                                    value: 'flight',
                                                    text: 'flight'
                                                },

                                                {
                                                    key: 2,
                                                    value: 'package',
                                                    text: 'package'
                                                }
                                            ]
                                                
                                            }
                                        />
                                        <ErrorMessage name='nationality' />
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
						</div>
					)}
				</Formik>
			</div>
        );
    }
}

export default FaqForm;