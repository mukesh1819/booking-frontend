import React, {Component} from 'react';
import Flight from './Flight';
import FlightCombination from './FlightCombination';
import {sortBy} from 'lodash';
import {Button} from 'react-bootstrap';
import ModalExample from '../shared/Modal';
import FlightDetails from './FlightDetails';
import FlightCombinedDetails from './FlightCombinedDetails';
import TableView from '../TableView';
import {connect} from 'react-redux';
import {getFlights} from '../../redux/selectors';
import store from '../../redux/store';
import {selectInboundFlight, selectOutboundFlight, deselectFlight} from '../../redux/actions/flightActions';
import {Link, Redirect} from 'react-router-dom';
import SearchFlightForm from './SearchFlightForm';
import SearchDetails from './SearchDetails';
import EmptyContent from '../EmptyContent';
import history from '../../history';
import DropdownItem from '../shared/Dropdown';
import {Form} from 'react-bootstrap';

require('./flights.scss');

const SORTS = {
	NONE: (list) => list,
	PRICE: (list) => sortBy(list, 'total_fare'),
	TIME: (list) => sortBy(list, 'DepartureTime'),
	DURATION: (list) => sortBy(list, 'duration')
	// DEPARTURE: (list) => sortBy(list, 'departure').reverse(),
};

const sorters = [
	{
		key: 'PRICE',
		label: 'Cheapest'
	},
	{
		key: 'TIME',
		label: 'Quickest'
	},
	{
		key: 'DURATION',
		label: 'Earliest'
	}
];

const Sort = ({sortKey, onSort, isActive, children}) => (
	<Button variant='secondary' className={isActive ? 'active' : ''} onClick={() => onSort(sortKey)}>
		{children}
	</Button>
);

class FlightList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedFlight: null,
			sortKey: 'PRICE',
			isSortReverse: false
		};

		// this.onFlightSelect = this.onFlightSelect.bind(this);
		this.onFlightDeselect = this.onFlightDeselect.bind(this);
		this.onViewDetails = this.onViewDetails.bind(this);
		this.onSort = this.onSort.bind(this);
	}

	onSort(sortKey) {
		const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
		this.setState({
			sortKey,
			isSortReverse
		});
	}

	onFlightDeselect(type) {
		this.props.deselectFlight(type);
	}

	onViewDetails(type, flight) {
		switch (type) {
			case 'OUTBOUND':
				this.props.selectOutboundFlight(flight);
				break;
			case 'INBOUND':
				this.props.selectInboundFlight(flight);
				break;
			case 'COMBINATION':
				this.props.selectInboundFlight(flight.inbound);
				this.props.selectOutboundFlight(flight.outbound);
				break;
			default:
		}
		this.setState((state, props) => {
			return {
				selectedFlight: state.selectedFlight == null ? flight : null
			};
		});
	}

	onBook() {
		history.push('/book_flight');
	}

	render() {
		const {
			outboundFlights,
			inboundFlights,
			combinations,
			selectedInboundFlight,
			selectedOutboundFlight
		} = this.props;

		const {sortKey, isSortReverse} = this.state;

		var results = outboundFlights;
		var type = 'OUTBOUND';
		var component = Flight;
		var DetailComponent = FlightDetails;

		if (combinations.length > 0) {
			results = combinations;
			type = 'COMBINATION';
			component = FlightCombination;
			DetailComponent = FlightCombinedDetails;
		}
		const sortedList = SORTS[sortKey](results);
		const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

		if (reverseSortedList.length == 0){
			return <Redirect to = "/"></Redirect>;
		} 

		// if (reverseSortedList.length == 0) {
		// 	return (
		// 		<div className='container p-0'>
		// 			<EmptyContent>
		// 				No Flights found.<br />
		// 				<Link to='/' className='btn btn-primary'>
		// 					Try Again
		// 				</Link>
		// 			</EmptyContent>
		// 		</div>
		// 	);
		// }

		return (
			<div className='container p-0'>
				<SearchDetails />

				<div class='bg-secondary text-center sorter d-md-none'>
					{sorters.map(({key, label}) => {
						return (
							<Sort sortKey={key} onSort={this.onSort} isActive={sortKey == key}>
								{label}
							</Sort>
						);
					})}
				</div>
				<div className='row m-0'>
					<div className='col-sm-0 col-md-2 bg-white p-0 d-none d-md-block'>
						<div className='card filter-flights'>
							<div className='card-header'>Filter</div>
							<div className='card-body'>
								<span className='text-bold'>Sort By</span>
								<DropdownItem title={sortKey} className='text-field'>
									{sorters.map(({key, label}) => {
										return (
											<div
												className={`p-2 menu-item ${sortKey == key ? 'active' : ''}`}
												onClick={() => this.onSort(key)}
											>
												{label}
											</div>
										);
									})}
								</DropdownItem>

								<hr />

								<span className='text-bold'>Airline</span>
								<Form>
									<div key={`checkbox`} className='mb-3'>
										<Form.Check inline label='1' type='checkbox' id={`checkbox-1`} />
										<Form.Check inline label='2' type='checkbox' id={`checkbox-2`} />
									</div>
								</Form>
							</div>
						</div>
					</div>
					<div className='col-sm-12 col-md-10 p-0'>
						<TableView
							values={reverseSortedList}
							ChildComponent={component}
							type={type}
							onFlightSelect={this.onFlightSelect}
							onViewDetails={this.onViewDetails}
						/>
					</div>
				</div>

				<ModalExample
					title='Flight Details'
					buttonLabel='Book'
					show={this.state.selectedFlight !== null}
					toggle={this.onViewDetails}
					onSuccess={this.onBook}
				>
					{this.state.selectedFlight && <DetailComponent flight={this.state.selectedFlight} />}
				</ModalExample>
			</div>
		);
	}
}

const mapStateToProps = ({flightStore}) => {
	return {
		outboundFlights: flightStore.flights.outbounds,
		inboundFlights: flightStore.flights.inbounds,
		combinations: flightStore.flights.combinations,
		selectedInboundFlight: flightStore.selectedInboundFlight,
		selectedOutboundFlight: flightStore.selectedOutboundFlight
	};
};

const mapDispatchToProps = {
	selectInboundFlight,
	selectOutboundFlight,
	deselectFlight
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);
