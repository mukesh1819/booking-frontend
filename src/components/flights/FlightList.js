import React, {Component} from 'react';
import Flight from './Flight';
import FlightCombination from './FlightCombination';
import {sortBy} from 'lodash';
import {Button} from 'react-bootstrap';
import {Modal as ModalExample} from '../shared';
import FlightDetails from './FlightDetails';
import FlightCombinedDetails from './FlightCombinedDetails';
import TableView from '../TableView';
import {connect} from 'react-redux';
import {getFlights} from '../../redux/selectors';
import store from '../../redux/store';
import {selectInboundFlight, selectOutboundFlight, deselectFlight} from '../../redux/actions/flightActions';
import {Link, Redirect} from 'react-router-dom';
import SearchDetails from './SearchDetails';
import EmptyContent from '../EmptyContent';
import history from '../../history';
import {Dropdown as DropdownItem, Placeholder} from '../shared';
import {Form} from 'react-bootstrap';
import {Checkbox} from 'semantic-ui-react';

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
	<Button variant='secondary' className={`rounded-0 ${isActive ? 'active' : ''}`} onClick={() => onSort(sortKey)}>
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

	componentDidMount() {
		if (document.readyState !== 'complete') return;
		Tawk_API.hideWidget();
	}

	render() {
		const {
			outboundFlights,
			inboundFlights,
			combinations,
			searchDetails,
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

		const airlines = reverseSortedList.map((flight) => flight.Airline);

		const content =
			reverseSortedList.length == 0 ? (
				<div>
					<Placeholder />
					<Placeholder />
					<Placeholder />
					<Placeholder />
				</div>
			) : (
				<TableView
					values={reverseSortedList}
					ChildComponent={component}
					type={type}
					onFlightSelect={this.onFlightSelect}
					onViewDetails={this.onViewDetails}
				/>
			);

		return (
			<div className='container p-0'>
				<div className='row mb-4'>
					<div className='col-12 p-0'>
						<SearchDetails collapsed={true} />

						<div className='bg-secondary text-center sorter d-md-none'>
							{sorters.map(({key, label}) => {
								return (
									<Sort sortKey={key} onSort={this.onSort} isActive={sortKey == key}>
										{label}
									</Sort>
								);
							})}
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-0 col-md-2 d-none d-md-block pl-0'>
						<div className='card filter-flights'>
							<div className='card-header' />
							<div className='card-body'>
								<div className='sorters'>
									<h4 className='title'>Sort</h4>
									{/* <DropdownItem title={sortKey} className='text-field'>
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
								</DropdownItem> */}
									{sorters.map(({key, label}) => {
										return (
											<Checkbox
												label={label}
												onChange={() => this.onSort(key)}
												className='d-block'
												checked={sortKey == key}
											/>
										);
									})}
								</div>

								<hr />

								<h4 className='title'>Airline</h4>
								<div key={`checkbox`} className='mb-3'>
									{[...new Set(airlines)].map((airline) => (
										<Checkbox
											label={airline}
											onChange={console.log('Airline selected', airline)}
											className='d-block'
										/>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className='col-sm-12 col-md-10 flight-list p-0'>{content}</div>
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
		searchDetails: flightStore.searchDetails,
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
