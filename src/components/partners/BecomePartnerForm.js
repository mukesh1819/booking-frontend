import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {getCategories} from '../../api/categoriesApi';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../utils/helpers';
import {connect} from 'react-redux';
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
import PartnerForm from './PartnerForm';
import CompanyForm from './CompanyForm';
import PackageForm from './PackageForm';
class BecomePartnerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partnerIsValid: false,
			step: 1
		};
	}

	componentDidMount() {}

	render() {
		const {partnerIsValid, step} = this.state;
		const {countries} = this.props;
		const partnerDetails = {
			name: '',
			email: '',
			company_name: '',
			company_address: '',
			contact_number: ''
		};
		return (
			<div className='container p-4'>
				<div className='card'>
					<div className='card-body'>
						<Stepper step={step}>
							{step == 1 && <PartnerForm />}
							{step == 2 && <CompanyForm />}
							{step == 3 && <PackageForm />}
						</Stepper>
						{partnerIsValid && <a href='btn btn-primary'>Add Packages</a>}
					</div>
				</div>
			</div>
		);
	}
}

export default BecomePartnerForm;
