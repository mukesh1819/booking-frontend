import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Form} from 'semantic-ui-react';

export default function RemarksForm({title = 'Remarks', remarks = [], onSubmit}) {
	const [entries, setRemarks] = useState(remarks);
	const [isOpen, setOpen] = useState(false);
	const [value, setValue] = useState(null);

	useEffect(
		() => {
			setRemarks(remarks);
		},
		[remarks]
	);

	return (
		<div className=''>
			<h3 className='ui header'> {title} </h3>

			{isOpen && (
				<Form>
					<Form.TextArea
						id='new_remark'
						label='New Remark'
						placeholder='Add new remark...'
						onChange={(e, data) => setValue(data.value)}
					/>
					<div
						className='ui basic button green'
						onClick={() => {
							setRemarks([{remark: value, date: new Date(), user: 'You'}, ...remarks]);
							onSubmit(value);
						}}
					>
						Submit
					</div>
					<div className='ui basic button red' onClick={() => setOpen(false)}>
						Cancel
					</div>
				</Form>
			)}

			{!isOpen && (
				<div className='ui basic button' onClick={() => setOpen(true)}>
					Add remarks
				</div>
			)}

			{entries.map((i) => {
				return (
					<div>
						<div className='text-bold'>{i.remark}</div>
						<div className='text-small'>{moment(i.date).format('D MMMM, YYYY hh:mm')}</div>
						<div className='text-small'>{i.user}</div>
						<br />
					</div>
				);
			})}
		</div>
	);
}
