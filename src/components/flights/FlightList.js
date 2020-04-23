import React, {Component} from 'react';
import Flight from './Flight';
import FlightCombination from './FlightCombination';
import {sortBy} from 'lodash';
import {Button} from 'react-bootstrap';
import {Modal as ModalExample, EmptyContent} from '../shared';
import FlightDetails from './FlightDetails';
import FlightCombinedDetails from './FlightCombinedDetails';
import TableView from '../TableView';
import {connect} from 'react-redux';
import {getFlights} from '../../api/flightApi';
import {setFlights, setSearchDetails, setTTLtime} from '../../redux/actions';
import store from '../../redux/store';
import {selectInboundFlight, selectOutboundFlight, deselectFlight} from '../../redux/actions';
import {Link, Redirect} from 'react-router-dom';
import SearchDetails from './SearchDetails';
import history from '../../history';
import {Dropdown as DropdownItem, Placeholder} from '../shared';
import {Form} from 'react-bootstrap';
import {Checkbox} from 'semantic-ui-react';
import SearchBar from './SearchBar';

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
			isSortReverse: false,
			loading: true
		};

		// this.onFlightSelect = this.onFlightSelect.bind(this);
		this.onFlightDeselect = this.onFlightDeselect.bind(this);
		this.onViewDetails = this.onViewDetails.bind(this);
		this.onSort = this.onSort.bind(this);
		this.setSearch = this.setSearch.bind(this);
		this.setLoading = this.setLoading.bind(this);
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
		history.push('/passengers');
	}

	componentDidMount() {
		// if (document.readyState == 'complete') {
		// 	Tawk_API.hideWidget();
		// }
		this.setState({
			loading: true
		});
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.searchDetails.strSectorFrom) {
			this.setState({
				loading: false
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (this.state.loading) {
			getFlights(this.props.searchDetails)
				.then((response) => {
					this.props.setFlights(response.data.data);
					this.props.setTTLtime(0);
					this.setState({
						loading: false
					});
				})
				.catch((error) => {
					console.log('Flight not found Error', error);
					this.setState({
						loading: false
					});
					
				});
		}
	}

	setSearch(status) {
		this.setState({
			searching: status
		});
	}

	setLoading(status) {
		this.setState({
			loading: status
		});
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

		const {sortKey, isSortReverse, searching, loading} = this.state;

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

		if (reverseSortedList.length == 0 && !loading) {
			return <Redirect to='/' />;
		}

		const content =
			loading || reverseSortedList.length == 0 ? (
				<div>
					<Placeholder />
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
						{searching ? (
							<div className='search-details'>
								<span className='collapse-btn p-3' onClick={() => this.setSearch(false)}>
									<i className='fas fa-times text-secondary' />
								</span>
								<SearchBar
									onSearch={() => {
										this.setLoading(true);
										this.setSearch(false);
									}}
								/>
							</div>
						) : (
							<SearchDetails onModify={() => this.setSearch(true)} />
						)}
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
							<div className='card-body'>
								<div className='sorters'>
									<h4 className='title'> Sort </h4>
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
								<h4 className='title'> Airline </h4>
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
					<div className='col-sm-12 col-md-10 flight-list p-0'> {content} </div>
				</div>
				<ModalExample
					title='Flight Details'
					buttonLabel='Continue'
					show={this.state.selectedFlight !== null}
					toggle={this.onViewDetails}
					onSuccess={this.onBook}
				>
					<div className='p-3'>
						{this.state.selectedFlight && <DetailComponent flight={this.state.selectedFlight} />}
					</div>
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
	deselectFlight,
	setFlights,
	setTTLtime
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);
