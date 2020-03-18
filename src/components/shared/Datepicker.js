import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import React, {useState} from 'react';

export default ({date, onChange, ...rest}) => {
	const [startDate, setStartDate] = useState(date);
	return (
		<SemanticDatepicker
			date={startDate}
			onChange={(date) => {
				setStartDate(date);
				onChange(date);
			}}
			iconPosition='left'
			minDate={new Date()}
		/>
	);
};
