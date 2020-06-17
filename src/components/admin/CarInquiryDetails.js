import React, {Component} from 'react';
import {showCarInquiry} from '../../api/carInquiryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {Link} from 'react-router-dom';
import history from '../../history';
import swal from 'sweetalert';
import {Card} from 'semantic-ui-react';
import {Badge} from '../shared';


class CarInquiryDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carInquiry: {}
		};
	}

	
	componentDidMount() {
		this.fetchCarInquiry();
	}

	fetchCarInquiry() {
		showCarInquiry(this.props.match.params.idx)
			.then((response) => {
				// console.log('inquiries', response.data);
				this.setState({
					carInquiry: response.data,
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log('car inquiry fetch error', error);
			});
	}

    render() {
        const {carInquiry} = this.state;
		return (
			<div className='container'>
				<Card fluid>
					<Card.Content>
						<div className='d-flex justify-content-between'>
							<h3 className='title'>Car Inquiries</h3>
							
						</div>

						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
                                    <th>Car Id</th>
                                    <th>No of Passenger</th>
                                    <th>Source</th>
                                    <th>Destination</th>
                                    <th>Start Date</th>
									<th>Car Type</th>
									<th>No of days</th>
                                    <th>Airport Transfer</th>
                                    <th>Within City</th>
									<th>Created At</th>
								</tr>
							</thead>
                            
							<tbody>
                                <tr>
                                    <td>{carInquiry.car != null ? carInquiry.car.id : ''}</td>
                                    <td>{carInquiry.no_of_pax}</td>
                                    <td>{carInquiry.source}</td>
                                    <td>{carInquiry.destination}</td>
                                    <td>{carInquiry.start_date}</td>
                                    <td>{carInquiry.car_type}</td>
                                    <td>{carInquiry.no_of_days} </td>
                                    <td>
                                        <Badge type={carInquiry.airport_transfer}>
                                            {carInquiry.airport_transfer ? 'True' : 'False'}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge type={carInquiry.within_city}>
                                            {carInquiry.within_city ? 'True' : 'False'}
                                        </Badge>
                                    </td>

                                    <td>{carInquiry.created_at}</td>
                                </tr>
							</tbody>
						</table>
					</Card.Content>
                </Card>

            </div>

				
		);
	}
}
export default CarInquiryDetails;
