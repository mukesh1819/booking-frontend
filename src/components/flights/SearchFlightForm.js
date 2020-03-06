import React, {Component} from 'react';
import {Container, Button, Segment} from 'semantic-ui-react';
import SearchBar from './SearchBar';

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
						<SearchBar />
					</Container>
				</header>
			</React.Fragment>
		);
	}
}

export default SearchFlightForm;
