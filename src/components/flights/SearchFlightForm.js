import React, {Component} from 'react';
import {getCities, getFlight} from '../../api/flightApi';
import axios from 'axios';
import FlightList from './FlightList';
import * as yup from 'yup';
import {passCsrfToken, subDays, addDays} from '../../utils/helpers';
import {connect} from 'react-redux';
import {setFlights, setSearchDetails} from '../../redux/actions/flightActions';
import {Container, Button, Segment} from 'semantic-ui-react';

import {getCountries} from '../../api/flightApi';
import {setTTLtime} from '../../redux/actions/flightActions';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';

class SearchFlightForm extends Component {
	constructor(props) {
		super(props);
		var date = new Date();
		date.setDate(date.getDate() + 2);
		this.state = {
			cities: [],
			hideReturnField: true,
			isSubmitted: false,
			availableFlights: [],
			searching: false,
			tripType: 'O',
			countries: []
		};
		this.strSectorFrom = React.createRef();
		this.strSectorTo = React.createRef();
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.setState({
			searchDetails: this.props.searchDetails
		});
		this.fetchCities();
		this.fetchCountries();
	}

	fetchCities = () => {
		getCities()
			.then((response) => {
				this.setState({
					cities: response.data.Sector
				});
				console.log(response.data.Sector);
			})
			.catch((error) => {
				console.log(error);
				this.setState({
					error
				});
			});
	};

	fetchCountries() {
		getCountries()
			.then((response) => {
				console.log(response);
				this.setState({
					countries: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	changeTripType = (trip) => {
		this.setState({
			tripType: trip,
			hideReturnField: trip == 'O' ? true : false
		});
	};

	toggleTripType = () => {
		var value = this.state.tripType == 'R' ? 'O' : 'R';
		this.setState(function(prevState) {
			return {tripType: prevState.tripType == 'R' ? 'O' : 'R', hideReturnField: !prevState.hideReturnField};
		});
		return value;
	};

	toggleSectors = () => {
		this.strSectorFrom.current;
		console.log('Changed SearchDetails', this.state.searchDetails);
		this.props.setSearchDetails(
			Object.assign({}, this.state.searchDetails, {
				strSectorFrom: this.state.searchDetails.strSectorTo,
				strSectorTo: this.state.searchDetails.strSectorFrom
			})
		);
	};

	render() {
		const ListWithLoading = withLoading(FlightList);
		const {hideReturnField} = this.state;
		const {searchDetails} = this.props;
		console.log('Search Details', searchDetails);

		const SearchFlightSchema = yup.object().shape({
			strFlightDate: yup.date().required('Required').default(function() {
				return new Date();
			}),
			strReturnDate: yup.date().required('Required').default(function() {
				return yup.ref('strFlightDate');
			}),
			strSectorFrom: yup.string().required('Required'),
			strSectorTo: yup.string().required('Required'),
			strNationality: yup.string().required('Required'),
			intAdult: yup.number().min(1, 'Cannot be less than 1').required('Required'),
			intChild: yup.number().min(0, 'Cannot be less than 0').required('Required')
		});

		const List = () => (
			<ul>
				<li>Item 1</li>
				<li>Item 2</li>
			</ul>
		);

		// Render it as a DOM node...
		const wrapper = document.createElement('div');
		ReactDOM.render(<List />, wrapper);
		const listEl = wrapper.firstChild;

		return (
			<React.Fragment>
				<header id='header' className='cover' role='banner'>
					<Container>
						<div className='text-white mb-2'>
							Find and book domestic flights within Nepal at best price.
						</div>
						<SearchBar />
					</Container>
				</header>
				{/* {this.state.isSubmitted && (
					<ListWithLoading flights={this.state.availableFlights} searching={this.state.searching} />
				)} */}
			</React.Fragment>
		);
	}
}

const Loading = () => (
	<div className='container text-center'>
		{/* <img src={require('/assets/images/loading.gif')} /> */}
		Loading...
	</div>
);

const withLoading = (Component) => ({searching, ...rest}) => (searching ? <Loading /> : <Component {...rest} />);
const mapStateToProps = ({flightStore}) => {
	return {
		flights: flightStore.flights,
		searchDetails: flightStore.searchDetails,
		ttlTime: flightStore.ttlTime
	};
};

const mapDispatchToProps = {
	setFlights,
	setSearchDetails,
	setTTLtime
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFlightForm);
