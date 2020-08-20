import React, {useState} from 'react';
import moment from 'moment';
import {Form} from 'semantic-ui-react';

export default function RemarksForm({remarks = [], onSubmit}) {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className=''>
			<h3 className='ui header'> Remarks </h3>

			{remarks.map((i) => {
				return (
					<div>
						<div className='text-bold'>{i.remark}</div>
						<div className='text-small'>{moment(i.date).format('D MMMM, YYYY hh:mm')}</div>
						<br />
					</div>
				);
			})}

			{isOpen && (
				<Form>
					<Form.TextArea id='new_remark' label='New Remark' placeholder='Add new remark...' />
					<div
						className='ui basic button green'
						onClick={() => {
							var value = $('#new_remark').val();
							remarks.push({remark: value, date: new Date()});
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
		</div>
	);
}
