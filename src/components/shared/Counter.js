import {InputGroup, FormControl} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';

export default ({className, title, value, onChange, min = 0, max = Infinity, ...rest}) => {
	return (
		<div className={`counter d-flex justify-content-between align-items-center ${className}`}>
			<span
				className='btn btn-primary'
				onClick={() => {
					onChange(value - 1 < min ? min : value - 1);
				}}
			>
				-
			</span>
			<span className='title p-2 text-center' aria-label='' {...rest}>
				{title}
			</span>

			<span
				className='btn btn-primary'
				onClick={() => {
					onChange(value + 1 > max ? max : value + 1);
				}}
			>
				+
			</span>
		</div>
	);
};
