import React, {Component} from 'react';
import {passCsrfToken} from '../../helpers';
import axios from 'axios';
import {getAdminBookings} from '../../api/flightApi';
import BookingDetails from './BookingDetails';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Pagination, Menu, Segment, Input} from 'semantic-ui-react';
import moment from 'moment';
import {ifNotZero} from '../../helpers';
import {Badge} from '../shared';
import {Accordion} from 'semantic-ui-react';

class FlightBookings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookings: [],
			currentPage: 1,
			activeItem: 'All',
			activeIndex: -1
		};
	}

	handleItemClick = (e, {name}) => {
		this.fetchBookings(`q[status_eq]=${name.toLowerCase()}`);
		this.setState({activeItem: name});
	};

	handleClick = (e, titleProps) => {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({activeIndex: newIndex});
	};

	changeCurrentPage = (e, {activePage}) => {
		this.setState({currentPage: activePage});
		this.fetchBookings(`page=${activePage}`);
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchBookings();
	}

	fetchBookings(params) {
		getAdminBookings(params)
			.then((response) => {
				// console.log(response);
				this.setState({
					bookings: response.data
				});
			})
			.catch((error) => {
				// console.log(error);
				swal({
					title: 'Booking fetch error',
					text: 'Could not fetch booking. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	}

	render() {
		const {bookings} = this.state;
		const {activeItem, activeIndex} = this.state;
		return (
			<div className='container'>
				<div className='row my-3'>
					<div className='col-12'>
						<Menu pointing>
							<Menu.Item name='All' active={activeItem === 'All'} onClick={this.handleItemClick} />
							<Menu.Item
								name='Pending'
								active={activeItem === 'Pending'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								name='Verified'
								active={activeItem === 'Verified'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								name='Processing'
								active={activeItem === 'Processing'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								name='Cancelled'
								active={activeItem === 'Cancelled'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								name='Completed'
								active={activeItem === 'Completed'}
								onClick={this.handleItemClick}
							/>
							<Menu.Item
								name='Declined'
								active={activeItem === 'Declined'}
								onClick={this.handleItemClick}
							/>
							<Menu.Menu position='right'>
								<Menu.Item>
									{/* <Input icon='search' placeholder='Search...' /> */}
									<Link to='/admin/cancel_requests' className='text-danger'>
										Cancel Requests
									</Link>
								</Menu.Item>
							</Menu.Menu>
						</Menu>

						<Segment>
							<Accordion styled fluid>
								{bookings.map((booking, index) => {
									return (
										<BookingDetails
											booking={booking}
											activeIndex={activeIndex}
											index={index}
											handleClick={this.handleClick}
										/>
									);
								})}
							</Accordion>
						</Segment>
						<div className='text-center p-2'>
							<Pagination
								activePage={this.state.currentPage}
								sizePerPage={5}
								onPageChange={this.changeCurrentPage}
								totalPages={this.state.bookings.length}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default FlightBookings;
