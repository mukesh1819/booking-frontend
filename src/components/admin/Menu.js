// @flow
import React, {useState, Fragment} from 'react';
import FilterForm from './FilterForm';
import {Dropdown, Menu} from 'semantic-ui-react';
import {filter} from '../../api';

export const CustomMenu = ({filterFields, items = [], onFilter, submitUrl}) => {
	const [showFilter, setFilter] = useState(false);
	const [activeItem, activateItem] = useState('All');

	const onMenuChange = (values) => {
		var url = ``;
		Object.keys(values).forEach((key) => {
			url = url + (values[key] != '' && key != '' ? `q[${key}]=${values[key]}&` : '');
		});
		url = `${submitUrl}?` + url;
		console.log('Request URL', url);
		filter(url)
			.then((response) => {
				onFilter(response.data);
			})
			.catch((error) => {
				console.log('Filter Error', error);
			});
	};

	return (
		<Fragment>
			{showFilter && <FilterForm submitUrl={submitUrl} fields={filterFields} onSubmit={onFilter} />}
			<Menu pointing>
				<Menu.Item
					name={activeItem}
					active={true}
					onClick={() => {
						activateItem('All');
						onFilter();
					}}
				/>
				{items.map((item) => (
					<Menu.Item name={item.name}>
						{item.type == 'dropdown' && (
							<Dropdown clearable text={item.label}>
								<Dropdown.Menu>
									{item.objects.map((object) => (
										<Dropdown.Item
											content={object.label}
											onClick={() => {
												var values = {};
												values[item.name] = object.value;
												onMenuChange(values);
											}}
										/>
									))}
								</Dropdown.Menu>
							</Dropdown>
						)}
					</Menu.Item>
				))}
				<Menu.Menu position='right'>
					<Menu.Item name={filter ? 'Cancel' : 'Filter'} onClick={() => setFilter(!showFilter)} />
				</Menu.Menu>
			</Menu>
		</Fragment>
	);
};
