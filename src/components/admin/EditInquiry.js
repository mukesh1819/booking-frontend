import React, {useState, useEffect} from 'react';
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
import {confirmInquiry, showInquiry} from '../../api/inquiryApi';
import {Tab, Checkbox} from 'semantic-ui-react';
import PartnerServiceForm from './PartnerServiceForm';
import {showPackage} from '../../api/packageApi';

const EditInquiry = (props) => {
	const [aPackage, setPackage] = useState({
		price: 0,
		addons: []
	});
	const [inquiry, setInquiry] = useState({
		preferred_date: new Date(),
		head_traveller_name: null,
		number_of_adult: 1,
		number_of_child: 0,
		activity: {
			price: 0
		},
		activity_id: null,
		addons: [],
		total_amount: 0
	});
	const idx = inquiry.idx;

	useEffect(
		() => {
			if (idx) {
				showPackage(inquiry.package.idx).then((v) => {
					setPackage(v.data);
				});
			} else {
				showInquiry(props.match.params.idx).then((v) => {
					setInquiry(v.data);
				});
			}
		},
		[idx]
	);

	return (
		<div className='ui container'>
			<h3 className='title'>Edit Inquiry</h3>
			<div className='card'>
				<div className='card-body'>
					<div className='row'>
						<div className='col-12'>
							<InquiryForm inquiry={inquiry} aPackage={aPackage} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default EditInquiry;
