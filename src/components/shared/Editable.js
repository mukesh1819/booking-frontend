import React, {Component, useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Flag, Segment, Dropdown} from 'semantic-ui-react';

const Editable = (props) => {
	const {edit, label, value, name, type = "text", options, onSubmit} = props;
	const [editMode, setEditMode] = useState(false);
	const [fieldValue, setValue] = useState(value);

	useEffect(() => {
		if(edit){
			setEditMode(false)
		}
	}, [edit])


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
				{editMode && type == "text"&&  (
					<input
						className='form-control'
						value={fieldValue}
						onChange={(e) => {
							setValue(e.target.value);
						}}
					/>
				)}

{editMode && type == "select" && 	<Dropdown
						className='form-control'
						name={name}
						value={fieldValue}
						onChange={(e,data) => {
							setValue(data.value);
						}}
						fluid
						search
						selection
						options={options}></Dropdown>	

					// 	<select
					// 	className='form-control'
					// 	name={name}
					// 	onChange={(e) => {
					// 		setValue(e.target.value);
					// 	}}
				  	// >
					// 	  {options.map((option) => {
					// 		  return <option value={option.key}> <Flag name={option.flag} />
					// 		  {option.value}</option>
					// 		})}
					  // </select>
				}

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
