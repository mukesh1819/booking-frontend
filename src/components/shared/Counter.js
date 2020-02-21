import {InputGroup, FormControl} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';

export default ({value, onChange, ...rest}) => {
	const min = 0;
	return (
		<InputGroup className='mb-3'>
			<InputGroup.Prepend>
				<InputGroup.Text
					className='btn btn-primary'
					onClick={() => {
						onChange(value - 1 < min ? min : value - 1);
					}}
				>
					-
				</InputGroup.Text>
			</InputGroup.Prepend>
			<FormControl className='m-0 text-center' aria-label='' value={value} {...rest} />
			<InputGroup.Append>
				<InputGroup.Text
					className='btn btn-primary'
					onClick={() => {
						onChange(value + 1);
					}}
				>
					+
				</InputGroup.Text>
			</InputGroup.Append>
		</InputGroup>
	);
};
