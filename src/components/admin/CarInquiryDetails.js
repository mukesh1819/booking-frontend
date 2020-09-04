import React, {Component} from 'react';
import {showCarInquiry} from '../../api/carInquiryApi';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {Link} from 'react-router-dom';
import history from '../../history';
import swal from 'sweetalert';
import {Card} from 'semantic-ui-react';
import {Badge} from '../shared';
import moment from 'moment';

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
					carInquiry: response.data
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
			<div className='ui container'>
				<Card fluid>
					<Card.Content>
						<div className='list-view'>
							<div className='actions float-right'>
								<Link
									to={{
										pathname: `/admin/car_inquiry_form/${carInquiry.idx}/edit`,
										state: {
											carInquiry: carInquiry
										}
									}}
								>
									<i className='fas fa-contact' />
									<span className='btn btn-outline-primary'>edit</span>
								</Link>
							</div>

							<h3 className='title'>Inquiry Details</h3>
							<div className='list'>
								<span className='label'>Number of pax</span>
								<span className='value'>{carInquiry.no_of_pax}</span>
							</div>
							<div className='list'>
								<span className='label'>Source</span>
								<span className='value'>{carInquiry.source}</span>
							</div>
							<div className='list'>
								<span className='label'>Destination</span>
								<span className='value'>{carInquiry.destination}</span>
							</div>
							<div className='list'>
								<span className='label'>Start Date</span>
								<span className='value'>{moment(carInquiry.start_date).format('D MMMM, YYYY')}</span>
							</div>
							<div className='list'>
								<span className='label'>No of Days</span>
								<span className='value'>{carInquiry.no_of_days}</span>
							</div>
							<div className='list'>
								<span className='label'>Trip Type</span>
								{carInquiry.within_city && <span className='value'>Within City</span>}
								{carInquiry.airport_transfer && <span className='value'>Aiport Transfer</span>}
							</div>
						</div>
					</Card.Content>
				</Card>
			</div>
		);
	}
}
export default CarInquiryDetails;
