import React, {Component, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';

const Editable = (props) => {
	const {label, value, onSubmit} = props;
	const [editMode, setEditMode] = useState(false);
	const [fieldValue, setValue] = useState(value);

	return (
		<div className='field'>
			<div className='d-flex label align-items-center'>
				<span className='mr-auto'>{label}</span>
				{editMode && (
					<span className='text-primary' onClick={() => setEditMode(false)}>
						<i className='icon-cross' />
					</span>
				)}
			</div>
			<div className='d-flex value'>
				{!editMode && <span className='mr-auto'>{value}</span>}
				{editMode && (
					<input
						className='form-control'
						value={fieldValue}
						onChange={(e) => {
							setValue(e.target.value);
						}}
					/>
				)}
				{editMode && (
					<span className='btn btn-sm btn-primary' onClick={() => onSubmit(fieldValue)}>
						Update
					</span>
				)}
				{!editMode && (
					<span className='text-primary' onClick={() => setEditMode(true)}>
						Edit
					</span>
				)}
			</div>
		</div>
	);
};

export default Editable;
