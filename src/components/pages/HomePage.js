import React, {Component} from 'react';
import {Container, Button, Segment} from 'semantic-ui-react';
import SearchBar from '../flights/SearchBar';
import {yetiImage, buddhaImage, shreeImage} from '../../images';
import {TabView, Slidebar, Banner} from '../shared';
import {PackageList} from '../packages';
import {Categories} from '../categories';

class HomePage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const {t, i18n} = this.props;
		return (
			<React.Fragment>
				<nav>
					<div className='container'>
						<div className='nav nav-tabs nav-fill' id='nav-tab' role='tablist'>
							<a
								className='nav-item nav-link active'
								id='nav-home-tab'
								data-toggle='tab'
								href='#nav-flights'
								role='tab'
								aria-controls='nav-flights'
								aria-selected='true'
							>
								<i className='fas fa-plane departure' />&nbsp; {t('Flights')}
							</a>
							<a
								className='nav-item nav-link'
								id='nav-profile-tab'
								data-toggle='tab'
								href='#nav-packages'
								role='tab'
								aria-controls='nav-packages'
								aria-selected='false'
							>
								<i className='fas fa-briefcase' />&nbsp; {t('Packages')}
							</a>
						</div>
					</div>
				</nav>
				<div className='tab-content px-sm-0' id='nav-tabContent'>
					<div
						className='tab-pane fade show active'
						id='nav-flights'
						role='tabpanel'
						aria-labelledby='nav-flights-tab'
					>
						<header id='header' className='cover' role='banner'>
							<div className='container'>
								<h1 className='text-white text-larger'>
									{t('FindAndBookFlights')} <br /> {t('WithinNepal')}
								</h1>
								<div className='airline-logos d-none'>
									<img src={yetiImage} alt='Image' className='img-responsive' />
									<img src={buddhaImage} alt='Image' className='img-responsive' />
									<img src={shreeImage} alt='Image' className='img-responsive' />
								</div>
								<SearchBar {...this.props} />
							</div>
						</header>
					</div>
					<div className='tab-pane fade' id='nav-packages' role='tabpanel' aria-labelledby='nav-packages-tab'>
						{/* <div className='container'>
							<Categories />
						</div> */}
					</div>
				</div>
				{/* <Tabs id='home-tab' activeKey={key} className='dnav-fill' onSelect={(k) => this.setKey(k)}>
					<Tab eventKey='flights' title='Flights'>
						<HomePage />
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

export default HomePage;
