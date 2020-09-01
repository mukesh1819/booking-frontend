import React, {Fragment, useState} from 'react';
import {Form, Popup, Button, Grid, Header} from 'semantic-ui-react';
import {Counter} from '../shared';

export default function AddonForm({selected = {}, addons = [], onChange}) {
	const [selectedAddons, setSelectedAddons] = useState(selected);

	const getCount = (id) => {
		return (selectedAddons[id] || {count: 0}).count;
	};

	const setCount = (addon, value) => {
		var hash = {};
		hash[addon.id] = {...addon, count: value};
		setSelectedAddons({...selectedAddons, ...hash});
		onChange({...selectedAddons, ...hash});
	};

	const isSelected = (id) => {
		return selectedAddons[id] !== undefined;
	};

	const deselect = (id) => {
		var hash = {};
		hash[id] = undefined;
		setSelectedAddons({...selectedAddons, ...hash});
		onChange({...selectedAddons, ...hash});
	};

	return (
		<Fragment>
			{addons.map((addon) => {
				return (
					<Popup
						trigger={
							<Button
								color={isSelected(addon.id) ? 'green' : ''}
								onClick={(e) => {
									e.preventDefault();
								}}
							>
								{addon.name} {getCount(addon.id)}
							</Button>
						}
						flowing
						hoverable
					>
						<div>
							<div className='ui grid'>
								<div className='ten wide column'>
									<Header as='h4'>Add {addon.name}</Header>
								</div>
								<div className='six wide column right floated' />
							</div>
							<div className='my-2'>
								<Counter
									title={`${getCount(addon.id)} Travellers`}
									value={getCount(addon.id)}
									onChange={(value) => {
										setCount(addon, value);
									}}
								/>
							</div>

							<div className='text-center'>
								<div className='ui basic red button' onClick={() => deselect(addon.id)}>
									Remove
								</div>
							</div>
							<hr />
							<p>{addon.description}</p>
						</div>
					</Popup>
				);
			})}
		</Fragment>
	);
}
