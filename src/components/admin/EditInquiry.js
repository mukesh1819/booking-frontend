import React, {Component} from 'react';
import {InquiryForm} from '../packages';
import {IconInput, DatePicker} from '../shared';
import {passCsrfToken} from '../../helpers';
import * as yup from 'yup';
import {Formik, Form, Field} from 'formik';
import ErrorMessage from '../ErrorMessage';
import {Dropdown} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {Input} from 'semantic-ui-react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {getPartners} from '../../api/partnerApi';
import {confirmInquiry} from '../../api/inquiryApi';
import {Tab, Checkbox} from 'semantic-ui-react';
import PartnerServiceForm from './PartnerServiceForm';

class EditInquiry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partners: []
		};
	}

	componentDidMount() {}

	render() {
		const {inquiry} = this.props.location != null ? this.props.location.state : {inquiry: {}};
		return (
			<div className='container p-4'>
				<h3 className='title'>Edit Inquiry</h3>
				<div className='card'>
					<div className='card-body'>
						<div className='row'>
							<div className='col-12'>
								<InquiryForm inquiry={inquiry} aPackage={inquiry.package} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default EditInquiry;
