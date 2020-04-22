import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {getCategories} from '../../api/categoryApi';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../helpers';
import {connect} from 'react-redux';
import history from '../../history';
import {Container, Segment, Dropdown} from 'semantic-ui-react';
import {Button, ButtonGroup} from 'react-bootstrap';
import {Counter, DatePicker, IconInput, Loading as LoadingScreen, Stepper} from '../shared';

import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import PartnerForm from './PartnerForm';
import CompanyForm from './CompanyForm';
import {createPartner} from '../../api/partnerApi';

import PackageForm from './PackageForm';
class BecomePartnerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: {},
			step: 1
		};
	}

	componentDidMount() {}

	nextStep = (data) => {
		this.setState((prevState) => {
			return {
				step: (prevState.step += 1),
				values: {...prevState.values, ...data}
			};
		});

		if (this.state.step == 3) {
			createPartner(this.state.values)
				.then((response) => {
					swal({
						title: 'Partner Request!',
						text: 'Your partnership request is being approved. We will contact you shortly',
						icon: 'success',
						button: 'Continue!'
					}).then((value) => history.push('/'));
				})
				.catch((error) => {
					// console.log('Create Partner Error', error);
					setSubmitting(false);
					swal({
						title: 'Partner Create Error!',
						text: error.response.data.errors.toString(),
						icon: 'error',
						button: 'Try Again!'
					});
				});
		}
	};

	prevStep = () => {
		this.setState((prevState) => {
			return {
				step: (prevState.step -= 1)
			};
		});
	};

	render() {
		const {step} = this.state;
		return (
			<div className='container p-4 become-partner'>
				<div className='card'>
					<div className='card-body'>
						<div className='input-section'>
							<Stepper step={step}>
								{step == 1 && <PartnerForm nextStep={(data) => this.nextStep(data)} />}
								{step == 2 && (
									<CompanyForm prevStep={this.prevStep} nextStep={(data) => this.nextStep(data)} />
								)}
							</Stepper>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BecomePartnerForm;
