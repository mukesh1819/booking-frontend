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
