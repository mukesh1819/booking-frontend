import React from 'react';
import {ErrorMessage} from 'formik';

export default ({name}) => {
	return (
		<span className='validation-msg'>
			<ErrorMessage name={name} />
		</span>
	);
};
