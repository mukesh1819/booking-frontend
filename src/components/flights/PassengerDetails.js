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
				<table className='table'>
					<thead>
						<tr className=''>
							<th>Name</th>
							<th>Type</th>
							<th>Nationality</th>
						</tr>
					</thead>
					<tbody>
						{passengers.map((passenger) => {
							return (
								<tr className=''>
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
