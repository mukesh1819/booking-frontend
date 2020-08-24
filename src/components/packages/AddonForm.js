import React, {Fragment, useState} from 'react';
import {Form} from 'semantic-ui-react';

export default function AddonForm({selected = [], addons = [], onChange}) {
	debugger;
	const [selectedAddons, setSelectedAddons] = useState(selected);
	return (
		<Fragment>
			<Form.Field>
				<label htmlFor=''>Addons</label>
				<Form.Select
					placeholder='Addons'
					fluid
					multiple
					selection
					value={selectedAddons}
					onChange={(e, data) => {
						onChange(data.value);
						setSelectedAddons(data.value);
					}}
					options={addons.map((v) => {
						return {
							key: v.id,
							text: v.name,
							value: v.id
						};
					})}
				/>
			</Form.Field>

			{addons.map((addon) => {
				if (selectedAddons.includes(addon.id)) {
					return;
				}
				return (
					<div
						class='ui button'
						data-tooltip={addon.description}
						data-position='bottom left'
						onClick={() => {
							onChange([...selectedAddons, addon.id]);
							setSelectedAddons([...selectedAddons, addon.id]);
						}}
					>
						{addon.name}
					</div>
				);
			})}
		</Fragment>
	);
}
