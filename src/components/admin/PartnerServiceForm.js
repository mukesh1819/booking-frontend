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

export default ({inquiry, partners, index, partner, onChange, onBlur}) => {
	console.log('Inquiry at Partner Service', inquiry);
	return (
		<div className='row my-2'>
			<div className='col-12 col-md-6'>
				<h3 className='title'>Service Details</h3>
				<div className=' p-3 bg-body'>
					<div className='field-box'>
						<label>Service Name</label>

						<Field
							name={`partner_services_attributes[${index}].name`}
							className='form-control'
							type='text'
							onBlur={onBlur}
							onChange={(e) => onChange(`name`, e.target.value)}
							value={partner.name}
						/>

						<ErrorMessage name={`partner_services_attributes[${index}].name`} />
					</div>

					<div className='field-box'>
						<label htmlFor=''>Select Partner</label>
						<Dropdown
							className='form-control'
							name={`partner_services_attributes[${index}].partner_id`}
							placeholder='Select Partner'
							onBlur={onBlur}
							onChange={(e, data) => onChange(`partner_id`, data.value)}
							value={partner.partner_id}
							fluid
							search
							selection
							options={partners.map(function(partner) {
								name = partner.first_name + ' ' + partner.last_name;
								return {
									key: partner.id,
									value: partner.id,
									text: name
								};
							})}
						/>
						<ErrorMessage name={`partner_services_attributes[${index}].partner_id`} />
					</div>

					<div className='field-box'>
						<label>Service Details</label>

						<Field
							component='textarea'
							rows='4'
							name={`partner_services_attributes[${index}].details`}
							className='form-control'
							onBlur={onBlur}
							onChange={(e) => onChange(`details`, e.target.value)}
							value={partner.details}
						/>

						<ErrorMessage name={`partner_services_attributes[${index}].details`} />
					</div>

					<div className='row'>
						<div className='col-12 col-md-6'>
							<div className='field-box'>
								<label className='d-block'>Start Date</label>

								<DatePicker
									name='start_date'
									className='form-control'
									type='date'
									date={partner.start_date}
									minDate={new Date()}
									onBlur={onBlur}
									onChange={(date) => onChange(`start_date`, date)}
									value={partner.start_date}
									placeholder='Arrival Date'
								/>

								<ErrorMessage name='start_date' />
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='field-box'>
								<label className='d-block'>End Date</label>

								<DatePicker
									name='end_date'
									className='form-control'
									type='date'
									date={partner.end_date}
									minDate={new Date()}
									onBlur={onBlur}
									onChange={(date) => onChange('end_date', date)}
									value={partner.end_date}
									placeholder='Return Date'
								/>

								<ErrorMessage name='end_date' />
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-12 col-md-6'>
							<div className='field-box'>
								<label className='d-block'>Pickup Date</label>

								<DatePicker
									name='pickup_date'
									className='form-control'
									type='date'
									date={partner.pickup_date}
									minDate={new Date()}
									onBlur={onBlur}
									onChange={(date) => onChange('pickup_date', date)}
									value={partner.pickup_date}
									placeholder='Pickup Date'
								/>

								<ErrorMessage name='pickup_date' />
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='field-box'>
								<label className='d-block'>Drop off Date</label>

								<DatePicker
									name='drop_off_date'
									className='form-control'
									type='date'
									date={partner.drop_off_date}
									minDate={new Date()}
									onBlur={onBlur}
									onChange={(date) => onChange('drop_off_date', date)}
									value={partner.drop_off_date}
									placeholder='Drop off Date'
								/>

								<ErrorMessage name='drop_off_date' />
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-12 col-md-6'>
							<div className='field-box'>
								<label className='d-block'>Pickup location</label>

								<Field
									name='pickup_location'
									className='form-control'
									onBlur={onBlur}
									onChange={(email_address) => onChange('pickup_location', e.target.value)}
									value={partner.pickup_location}
								/>

								<ErrorMessage name='pickup_location' />
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='field-box'>
								<label className='d-block'>Drop off location</label>

								<Field
									name='drop_off_location'
									className='form-control'
									onBlur={onBlur}
									onChange={(e) => onChange('drop_off_location', e.target.value)}
									value={partner.drop_off_location}
								/>

								<ErrorMessage name='drop_off_location' />
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='col-12'>
							<div className='field-box'>
								<Checkbox
									name='meals_included'
									className=''
									label={'Meals Included?'}
									onChange={(event, data) => onChange('meals_included', data.checked)}
									onBlur={onBlur}
									className=''
									checked={partner.meals_included}
								/>
								<ErrorMessage name='meals_included' />
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='col-12'>
							<div className='field-box'>
								<label>Remarks</label>

								<Field
									name='remarks'
									className='form-control'
									onBlur={onBlur}
									onChange={(date) => onChange('remarks', date)}
									value={partner.remarks}
								/>

								<ErrorMessage name='remarks' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='col-12 col-md-6'>
				<div className='list-view'>
					<h3 className='title'>Inquiry Details</h3>
					<div className='list'>
						<span className='label'>Package Name</span>
						<span className='value'> {inquiry.package_name}</span>
					</div>
					<div className='list'>
						<span className='label'>Head Person</span>
						<span className='value'> {inquiry.head_traveller_name}</span>
					</div>
					<div className='list'>
						<span className='label'>Email Address</span>
						<span className='value'> {inquiry.email_address}</span>
					</div>
					<div className='list'>
						<span className='label'>Address</span>
						<span className='value'>
							{' '}
							{inquiry.address}, {inquiry.city}
						</span>
					</div>
					<div className='list'>
						<span className='label'>Nationality</span>
						<span className='value'> {inquiry.nationality}</span>
					</div>
					<div className='list'>
						<span className='label'>Package Name</span>
						<span className='value'> {inquiry.package_name}</span>
					</div>

					<div className='list'>
						<span className='label'>Number of Person</span>
						<span className='value'>
							Adult - {inquiry.number_of_adult}, Child - {inquiry.number_of_child}
						</span>
					</div>

					<div className='list'>
						<span className='label'>Phone Number</span>
						<span className='value'>{inquiry.phone}</span>
					</div>
					<div className='list'>
						<span className='label'>Invoice Number</span>
						<span className='value'>{inquiry.idx}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
