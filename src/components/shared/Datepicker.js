import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, {useState} from 'react';

export default ({date, onChange, ...rest}) => {
	const [startDate, setStartDate] = useState(date);
	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => {
				setStartDate(date);
				onChange(date);
			}}
			{...rest}
		/>
	);
};
