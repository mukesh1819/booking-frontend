import React, {Component} from 'react';
import {sortBy} from 'lodash';
import {Button} from 'react-bootstrap';
import {Modal as ModalExample, EmptyContent} from '../shared';
import {connect} from 'react-redux';
import history from '../../history';
import {Checkbox, Segment, Header, Icon} from 'semantic-ui-react';
import {getCars} from '../../api/carApi';
import {BASE_URL} from '../../constants';
import CarInquiryForm from './CarInquiryForm';
import SearchDetails from './SearchDetails';
import {Car} from '.';
import CarDetails from './CarDetails';

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

class CarList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCar: null,
			sortKey: 'PRICE',
			isSortReverse: false,
			loading: true,
			cars: []
		};

		// this.onFlightSelect = this.onFlightSelect.bind(this);
		this.onViewDetails = this.onViewDetails.bind(this);
		this.onSort = this.onSort.bind(this);
		this.setSearch = this.setSearch.bind(this);
		this.setLoading = this.setLoading.bind(this);
		this.onBook = this.onBook.bind(this);
	}

	onSort(sortKey) {
		const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
		this.setState({
			sortKey,
			isSortReverse
		});
	}

	onViewDetails(car) {
		this.setState((state, props) => {
			return {
				selectedCar: state.selectedCar == null ? car : null
			};
		});
	}

	onBook(params) {
		history.push(`/car_booking_form/${this.state.selectedCar.idx}/${this.props.match.params.car_inquiry_idx}`);
	}

	componentDidMount() {
		this.setState({
			loading: true
		});
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

	componentDidUpdate(prevProps) {
		var params = {};
		params['car_inquiry_id'] = this.props.match.params.car_inquiry_idx;
		if (this.state.loading) {
			getCars(params)
				.then((response) => {
					console.log(response.data.cars);
					this.setState({
						loading: false,
						cars: response.data
					});
				})
				.catch((error) => {
					console.log('Cars not found Error', error);
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
		const {sortKey, isSortReverse, searching, loading, cars, selectedCar} = this.state;
		const {carInquiryDetails} = this.props;

		return (
			<div className='container p-0'>
				<div className='row mb-4'>
					<div className='col-12 p-0'>
						{searching ? (
							<div className='search-details'>
								<span className='collapse-btn p-3' onClick={() => this.setSearch(false)}>
									<i className='fas fa-times color-accent' />
								</span>
								<CarInquiryForm
									onSearch={() => {
										this.setLoading(true);
										this.setSearch(false);
									}}
									{...this.props}
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
							</div>
						</div>
					</div>

					<div className='col-12 col-md-10'>
						{cars.map((car) => (
							<div className='' onClick={() => this.onViewDetails(car)} className=''>
								<Car car={car} />
							</div>
						))}
					</div>
				</div>
				<ModalExample
					title='Car Details'
					buttonLabel='Continue'
					show={selectedCar !== null}
					toggle={this.onViewDetails}
					onSuccess={this.onBook}
				>
					{selectedCar && <CarDetails car={selectedCar} inquiry={carInquiryDetails} />}
				</ModalExample>
			</div>
		);
	}
}
const mapStateToProps = ({rentalStore}) => {
	return {
		carInquiryDetails: rentalStore.carInquiryDetails
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
