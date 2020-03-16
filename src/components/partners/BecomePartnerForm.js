import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';
import {getCategories} from '../../api/categoryApi';
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
			partnerId: null,
			step: 1
		};
		this.nextStep = this.nextStep.bind(this);
	}

	componentDidMount() {}

	nextStep(data) {
		this.setState((prevState) => {
			return {
				step: (prevState.step += 1),
				partnerId: data.id
			};
		});
	}

	render() {
		const {partnerId, step} = this.state;
		return (
			<div className='container p-4'>
				<div className='card'>
					<div className='card-body'>
						<Stepper step={step}>
							{step == 1 && <PartnerForm nextStep={(data) => this.nextStep(data)} />}
							{step == 2 && (
								<CompanyForm nextStep={(data) => this.nextStep(data)} partnerId={partnerId} />
							)}
							{step == 3 && (
								<PackageForm nextStep={(data) => this.nextStep(data)} partnerId={partnerId} />
							)}
						</Stepper>
					</div>
				</div>
			</div>
		);
	}
}

export default BecomePartnerForm;
