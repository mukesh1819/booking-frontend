// @flow
import React, {useState, Fragment} from 'react';
import FilterForm from './FilterForm';
import {Dropdown, Menu, Label} from 'semantic-ui-react';
import {filter} from '../../api';
import history from '../../history';

export const CustomMenu = ({filterFields, items = [], onFilter, submitUrl, setParams = () => {}}) => {
	const [showFilter, setFilter] = useState(false);
	const [activeItem, activateItem] = useState('All');

	const onMenuChange = (values) => {
		var slug = ``;
		var params = {};
		{
			!values.all &&
				Object.keys(values).forEach((key) => {
					slug = slug + (values[key] != '' && key != '' ? `q[${key}]=${values[key]}&` : '');
					params[`q[${key}]`] = values[key];
				});
		}
		setParams(params);
		history.push({
			pathname: window.location.pathname,
			search: `?${slug}`
		});
		filter(submitUrl, params)
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
						onMenuChange({all: true});
					}}
				>
					{activeItem}
					{activeItem != 'All' && <i className='times icon' />}
				</Menu.Item>
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
												activateItem(object.value);
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
					<Menu.Item name={showFilter ? 'Cancel' : 'Filter'} onClick={() => setFilter(!showFilter)} />
				</Menu.Menu>
			</Menu>
		</Fragment>
	);
};
