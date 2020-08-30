import React, {Fragment, useState} from 'react';
import {Form, Popup, Button, Grid, Header} from 'semantic-ui-react';
import {Counter} from '../shared';

export default function AddonForm({selected = {}, addons = [], onChange}) {
	const [selectedAddons, setSelectedAddons] = useState({...selected});

	const getCount = (id) => {
		return selectedAddons[id] || 0;
	};

	const setCount = (id, value) => {
		var hash = {};
		hash[id] = value;
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
							<Button color={isSelected(addon.id) ? 'green' : ''}>
								{addon.name} {getCount(addon.id)}
							</Button>
						}
						flowing
						hoverable
					>
						<div>
							<Header as='h4'>Add {addon.name}</Header>
							<Counter
								title={`${getCount(addon.id)} Travellers`}
								value={getCount(addon.id)}
								onChange={(value) => {
									setCount(addon.id, value);
								}}
							/>
							<hr />
							<div className='text-center'>
								<div className='ui basic red button' onClick={() => deselect(addon.id)}>
									Remove
								</div>
							</div>

							<p>{addon.description}</p>
						</div>
					</Popup>
				);
			})}
		</Fragment>
	);
}
