import DatePicker from 'react-datepicker';
import React, {useState} from 'react';

export default ({date, onChange, placeholder, ...rest}) => {
	const [startDate, setStartDate] = useState(date);
	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => {
				onChange(date);
				setStartDate(date);
			}}
			showTimeSelect
			timeFormat='HH:mm'
			timeIntervals={15}
			timeCaption='time'
			dateFormat='MMMM d, yyyy h:mm aa'
			{...rest}
		/>
	);
};
