import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';

class PassengerDetails extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {passengers} = this.props;
		return (
			<div className='passenger-details container p-0'>
				<table class='table'>
					<thead>
						<tr className='text-center'>
							<th>Name</th>
							<th>Type</th>
							<th>Nationality</th>
						</tr>
					</thead>
					<tbody>
						{passengers.map((passenger) => {
							return (
								<tr className='text-center'>
									<td className=''>
										{passenger.title} {passenger.first_name} {passenger.last_name}
									</td>
									<td className=''>{passenger.passenger_type}</td>
									<td className=''>{passenger.nationality}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default PassengerDetails;
