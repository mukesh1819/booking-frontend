import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import React, {useState} from 'react';

export default ({date, onChange, placeholder, ...rest}) => {
	const [startDate, setStartDate] = useState(date);
	return (
		<SemanticDatepicker
			fluid
			date={startDate}
			onChange={(event, data) => {
				setStartDate(data.value);
				onChange(data.value);
			}}
			iconPosition='left'
			placeholder={placeholder}
			datePickerOnly
			clearable={false}
			format='D MMM, YYYY'
			{...rest}
		/>
	);
};
