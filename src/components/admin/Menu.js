// @flow
import React, {useState} from 'react';

export class Menu extends React.Component {
	render() {
		return (
			<Menu pointing>
				<Menu.Item name={activeItem} active={activeItem === 'All'} onClick={this.handleItemClick} />
				<Menu.Item>
					<Dropdown clearable text='Status'>
						<Dropdown.Menu>
							<Dropdown.Item content='Verified' onClick={() => this.onStatusChange('verified')} />
							<Dropdown.Item content='Processing' onClick={() => this.onStatusChange('processing')} />
							<Dropdown.Item content='Cancelled' onClick={() => this.onStatusChange('cancelled')} />
							<Dropdown.Item content='Completed' onClick={() => this.onStatusChange('completed')} />
							<Dropdown.Item content='Declined' onClick={() => this.onStatusChange('declined')} />
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
				<Menu.Item>
					{/* <Input icon='search' placeholder='Search...' /> */}
					<Link to='/admin/cancel_requests' className='text-danger'>
						Cancel Requests
					</Link>
				</Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item name={showFilter ? 'Cancel' : 'Filter'} onClick={this.toggleFilter} />
				</Menu.Menu>
			</Menu>
		);
	}
}
