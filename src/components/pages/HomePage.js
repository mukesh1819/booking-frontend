import React, {Component} from 'react';
import {Container, Button, Segment} from 'semantic-ui-react';
import SearchBar from '../flights/SearchBar';
import yetiImage from '../../images/yeti-banner.png';
import buddhaImage from '../../images/buddha-banner.png';
import shreeImage from '../../images/shree-banner.png';
import {TabView, Slidebar, Banner} from '../shared';
import {PackageList} from '../packages';
import {Categories} from '../categories';

class SearchFlightForm extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<React.Fragment>
				<nav>
					<div className='container'>
						<div class='nav nav-tabs nav-fill' id='nav-tab' role='tablist'>
							<a
								class='nav-item nav-link active'
								id='nav-home-tab'
								data-toggle='tab'
								href='#nav-flights'
								role='tab'
								aria-controls='nav-flights'
								aria-selected='true'
							>
								<i className='fas fa-plane departure' />&nbsp;Flights
							</a>
							<a
								class='nav-item nav-link'
								id='nav-profile-tab'
								data-toggle='tab'
								href='#nav-packages'
								role='tab'
								aria-controls='nav-packages'
								aria-selected='false'
							>
								<i class='fas fa-briefcase' />&nbsp;Packages
							</a>
						</div>
					</div>
				</nav>
				<div class='tab-content px-sm-0' id='nav-tabContent'>
					<div
						class='tab-pane fade show active'
						id='nav-flights'
						role='tabpanel'
						aria-labelledby='nav-flights-tab'
					>
						<header id='header' className='cover' role='banner'>
							<div className='container'>
								<h1 className='text-white text-large'>
									Find and book domestic flights <br />within Nepal at best price.
								</h1>
								<div className='airline-logos d-none'>
									<img src={yetiImage} alt='Image' className='img-responsive' />
									<img src={buddhaImage} alt='Image' className='img-responsive' />
									<img src={shreeImage} alt='Image' className='img-responsive' />
								</div>
								<SearchBar />
							</div>
						</header>
					</div>
					<div class='tab-pane fade' id='nav-packages' role='tabpanel' aria-labelledby='nav-packages-tab'>
						<div className='container'>
							<PackageList />
						</div>
					</div>
				</div>
				{/* <Tabs id='home-tab' activeKey={key} className='dnav-fill' onSelect={(k) => this.setKey(k)}>
					<Tab eventKey='flights' title='Flights'>
						<SearchFlightForm />
					</Tab>
					<Tab eventKey='packages' title='Packages'>
						<div className='container'>
							<h4> Popular Packages </h4>
							<PackageList />
						</div>
					</Tab>
				</Tabs> */}
				<section className='categories'>
					<div className='container'>
						{/* <div className='title'>
							<h2 className='text-center'> Things to do </h2>
						</div> */}
						<Categories />
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default SearchFlightForm;