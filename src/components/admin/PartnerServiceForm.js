import React, {Component, useState} from 'react';
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
	const [editMode, setEditMode] = useState(false);
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
									text: `${name } (${partner.company_name})`
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

					<div className='field-box'>
						<label>Amount</label>

						<Field
							type='number'
							rows='4'
							name={`partner_services_attributes[${index}].amount`}
							className='form-control'
							onBlur={onBlur}
							onChange={(e) => onChange(`amount`, e.target.value)}
							value={partner.amount}
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
									onChange={(date) => {
										partner.extras['start_date'] = `${date}`;
										onChange('extras', partner.extras);
									}}
									value={partner.extras['start_date']}
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
									onChange={(date) => {
										partner.extras['end_date'] = `${date}`;
										onChange('extras', partner.extras);
									}}
									value={partner.extras['end_date']}
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
									onChange={(date) => {
										partner.extras['pickup_date'] = `${date}`;
										onChange('extras', partner.extras);
									}}
									value={partner.extras['pickup_date']}
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
									onChange={(date) => {
										partner.extras['drop_off_date'] = `${date}`;
										onChange('extras', partner.extras);
									}}
									value={partner.extras['drop_off_date']}
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
									onChange={(event) => {
										partner.extras['pickup_location'] = event.target.value;
										onChange('extras', partner.extras);
									}}
									value={partner.extras['pickup_location']}
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
									onChange={(event) => {
										partner.extras['drop_off_location'] = event.target.value;
										onChange('extras', partner.extras);
									}}
									value={partner.extras['drop_off_location']}
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
									onChange={(event, data) => {
										partner.extras['meals_included'] = data.checked;
										onChange('extras', partner.extras);
									}}
									value={partner.extras['meals_included']}
									onBlur={onBlur}
									className=''
									checked={partner.extras.meals_included}
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
									onChange={(event) => {
										partner.extras['remarks'] = event.target.value;
										onChange('extras', partner.extras);
									}}
									value={partner.extras['remarks']}
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
					{Object.keys(partner.extras).map((key) => {
						console.log(`${key}: ${partner.extras[key]}`);
						return (
							<div className='editable'>
								<div className='list'>
									<span className='label'>{key}</span>
									<div>
										<span className='value mr-2'> {partner.extras[key]}</span>
										<span className='actions'>
											{!editMode && (
												<React.Fragment>
													<i
														className='fas fa-edit p-1 text-primary'
														onClick={() => setEditMode(true)}
													/>
													<i
														className='fas fa-times p-1 text-primary'
														onClick={() => {
															delete partner.extras[key];
															onChange('extras', partner.extras);
														}}
													/>
												</React.Fragment>
											)}
											{editMode && (
												<React.Fragment>
													<i
														className='fas fa-times p-1 text-primary'
														onClick={() => setEditMode(false)}
													/>
												</React.Fragment>
											)}
										</span>
									</div>
								</div>
								{editMode && (
									<div className='d-flex justify-content-end'>
										<input
											type='text'
											onChange={(e) => {
												partner.extras[key] = e.target.value;
												onChange('extras', partner.extras);
											}}
											value={partner.extras[key]}
										/>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
