import React, {Component, useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Flag, Segment, Dropdown} from 'semantic-ui-react';

const Editable = (props) => {
	const {edit, label, value, name, type = 'text', options, onSubmit} = props;
	const [editMode, setEditMode] = useState(false);
	const [fieldValue, setValue] = useState(value);

	useEffect(
		() => {
			if (edit) {
				setEditMode(false);
			}
		},
		[edit]
	);

	return (
		<div>
			<div className='list'>
				<span className='label'>{label}</span>

				{!editMode && (
					<span className='value text-right'>
						{value}&nbsp;
						{!editMode && (
							<span className='text-bold text-primary edit-action' onClick={() => setEditMode(true)}>
								Edit
							</span>
						)}
					</span>
				)}
				{editMode && (
					<span>
						<span className='btn bg-none text-secondary' onClick={() => onSubmit(fieldValue)}>
							Update
						</span>
						<span className='text-primary' onClick={() => setEditMode(false)}>
							<i className='icon-cross text-danger' />
						</span>
					</span>
				)}
			</div>
			{editMode &&
			type == 'text' && (
				<input
					className='form-control'
					value={fieldValue}
					onChange={(e) => {
						setValue(e.target.value);
					}}
				/>
			)}

			{editMode &&
			type == 'select' && (
				<Dropdown
					className='form-control'
					name={name}
					value={fieldValue}
					onChange={(e, data) => {
						setValue(data.value);
					}}
					fluid
					search
					selection
					options={options}
				/>
			)}
		</div>
	);
};

export default Editable;
