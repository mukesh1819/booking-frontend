import React, {useState, useEffect} from 'react';
import {Form} from 'semantic-ui-react';
import moment from 'moment';

const PackageRemarksForm = ({remarks = [], partners = [], partner_services = [], onSubmit}) => {
	const [entries, setRemarks] = useState(remarks);
	const [isOpen, setOpen] = useState(false);
	const [input, setInput] = useState({
		idx: '',
		value: ''
	});

	useEffect(
		() => {
			setRemarks(remarks);
		},
		[remarks]
	);

	const getPartner = (id) => {
		return partners.find((p) => p.id == id) || {};
	};

	return (
		<div className=''>
			<h3 className='ui header'>Partner Remarks </h3>

			{isOpen && (
				<Form
					onSubmit={() => {
						var partner_id = partner_services.find((v) => v.idx == input.idx).partner_id;
						var hash = {};
						hash[partner_id] = [
							{remark: input.value, date: new Date(), user: 'You'},
							...entries[partner_id]
						];
						setRemarks({...entries, ...hash});
						onSubmit(input);
					}}
				>
					<Form.Select
						id='partner_service_idx'
						label='Select Partner'
						options={partner_services.map((v) => {
							var p = getPartner(v.partner_id);
							return {
								key: v.idx,
								value: v.idx,
								text: p.full_name
							};
						})}
						onChange={(e, data) => setInput({...input, idx: data.value})}
					/>
					<Form.TextArea
						id='new_remark'
						label='New Remark'
						placeholder='Add new remark...'
						onChange={(e, data) => setInput({...input, value: data.value})}
					/>
					<button type='submit' className='ui basic button green'>
						Submit
					</button>
					<div className='ui basic button red' onClick={() => setOpen(false)}>
						Cancel
					</div>
				</Form>
			)}

			{!isOpen && (
				<div className='ui basic button mb-3' onClick={() => setOpen(true)}>
					Add remarks
				</div>
			)}

			{Object.entries(entries).map(([k, v]) => {
				return (
					<div>
						<div class='ui styled accordion'>
							<div class='title active'>
								<i class='dropdown icon' />
								{getPartner(k).full_name}
							</div>
							<div class='content active'>
								<p class='transition visible'>
									{v.map((i) => (
										<div>
											<div className='text-bold'>{i.remark}</div>
											<div className='text-small'>
												{moment(i.date).format('D MMMM, YYYY hh:mm')}
											</div>
											<div className='text-small'>{i.user}</div>
											<br />
										</div>
									))}
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default PackageRemarksForm;
