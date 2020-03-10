import React, {Component} from 'react';
import {Container, Button, Segment} from 'semantic-ui-react';
import SearchBar from './SearchBar';
import yetiImage from '../../images/yeti-banner.png';
import buddhaImage from '../../images/buddha-banner.png';
import shreeImage from '../../images/shree-banner.png';

class SearchFlightForm extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

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
						<div className='airline-logos d-none'>
							<img src={yetiImage} alt='Image' className='img-responsive' />
							<img src={buddhaImage} alt='Image' className='img-responsive' />
							<img src={shreeImage} alt='Image' className='img-responsive' />
						</div>

						<SearchBar />
					</Container>
				</header>
			</React.Fragment>
		);
	}
}

export default SearchFlightForm;
