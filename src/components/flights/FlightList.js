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

require('./flights.scss');

const SORTS = {
	NONE: (list) => list,
	PRICE: (list) => sortBy(list, 'total_fare'),
	TIME: (list) => sortBy(list, 'DepartureTime'),
	DURATION: (list) => sortBy(list, 'duration')
	// DEPARTURE: (list) => sortBy(list, 'departure').reverse(),
};

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

		if (reverseSortedList.length == 0) {
			return (
				<div className='container p-0'>
					<EmptyContent>
						No Flights found.<br />
						<Link to='/' className='btn btn-primary'>
							Try Again
						</Link>
					</EmptyContent>
				</div>
			);
		}

		return (
			<div className='container p-0'>
				<SearchDetails />

				<div class='bg-secondary text-center sorter d-md-none'>
					<Sort sortKey={'PRICE'} onSort={this.onSort} isActive={sortKey == 'PRICE'}>
						Cheapest
					</Sort>
					<Sort sortKey={'DURATION'} onSort={this.onSort} isActive={sortKey == 'DURATION'}>
						Quickest
					</Sort>
					<Sort sortKey={'TIME'} onSort={this.onSort} isActive={sortKey == 'TIME'}>
						Earliest
					</Sort>
				</div>
				<div className='page'>
					<div className='d-flex flex-wrap'>
						<div class='d-none d-md-block'>
							<span onClick={() => this.onSort('PRICE')}>Cheapest</span>
							<span onClick={() => this.onSort('DURATION')}>Quickest</span>
							<span onClick={() => this.onSort('TIME')}>Earliest</span>
						</div>
						<div className='flex-grow-1'>
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
