import {InputGroup, FormControl} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';

export default ({className, title, value, onChange, ...rest}) => {
	const min = 0;
	return (
		<div className={`d-flex justify-content-between align-items-center ${className}`}>
			<span
				className='btn btn-primary'
				onClick={() => {
					onChange(value - 1 < min ? min : value - 1);
				}}
			>
				-
			</span>
			<span className='m-0 text-center' aria-label='' {...rest}>
				{title}
			</span>

			<span
				className='btn btn-primary'
				onClick={() => {
					onChange(value + 1);
				}}
			>
				+
			</span>
		</div>
	);
};
