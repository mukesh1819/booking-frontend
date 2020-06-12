import React from 'react';
import FlightBookings from './FlightBookings';
import PackageBookings from './PackageBookings';
import RentalBookings from './RentalBookings';
import {Tab} from 'semantic-ui-react';

export default function Bookings() {
	const panes = [
		{
			menuItem: 'Flights',
			render: () => (
				<Tab.Pane attached={false}>
					<FlightBookings />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Packages',
			render: () => (
				<Tab.Pane attached={false}>
					<PackageBookings />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Car Rentals',
			render: () => (
				<Tab.Pane attached={false}>
					<RentalBookings />
				</Tab.Pane>
			)
		}
	];
	return (
		<div className='booking-list container'>
			<div className='card-body'>
				<h3 className='title'>Bookings</h3>
				<div className='card mb-2'>
					<div className='card-body'>
						<div className='row'>
							<div className='col-12 p-0'>
								<Tab menu={{secondary: true}} panes={panes} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
