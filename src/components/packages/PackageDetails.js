import React, {Component} from 'react';
import {showPackage} from '../../api/packageApi';
import Package from './Package';
import {Link} from 'react-router-dom';
import {Modal as ModalExample} from '../shared';
import InquiryForm from './InquiryForm';
import {imageUrl} from '../../helpers';
import {Tab} from 'semantic-ui-react';
import {HotelImage, nepalVillage, peace} from '../../images';
import Gallery from './Gallery';
import {Redirect} from 'react-router-dom';

class PackageDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			aPackage: {
				name: '',
				price: 0.0,
				location: '',
				images: [],
				description: ''
			},
			showInquiryForm: false
		};
		this.fetchDetails = this.fetchDetails.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	componentDidMount() {
		this.fetchDetails();
	}

	onSelect() {
		this.setState((prevState, props) => {
			return {showInquiryForm: !prevState.showInquiryForm};
		});
	}

	fetchDetails() {
		const options = {
			margin: 10,
			loop: true,
			touchDrag: true,
			rewind: true,
			animateIn: true,
			nav: false,
			responsive: {
				1000: {
					items: 4,
					nav: true,
					navText: [
						"<i class='fas fa-chevron-circle-left text-primary'></i>",
						"<i class='fas fa-chevron-circle-right text-primary'></i>"
					],
					loop: true
				}
			}
		};
		showPackage(this.props.match.params.id)
			.then((response) => {
				console.log('PAckage DEtails', response);
				this.setState({
					aPackage: response.data
				});
				$('.owl-carousel').owlCarousel(options);
			})
			.catch((response) => {
				console.log('PACKAGE DETAILS ERROR', response);
			});
	}

	render() {
		const {aPackage} = this.state;
		const dummyImages = [HotelImage, nepalVillage, peace];
		const panes = [
			{
				menuItem: 'About',
				render: () => (
					<Tab.Pane attached={false}>
						<div className=''>
							<h3> Description</h3>
							<div
								dangerouslySetInnerHTML={{
									__html: aPackage.description
								}}
							/>
						</div>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Gallery',
				render: () => (
					<Tab.Pane attached={false}>
						<Gallery images={dummyImages} />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Contact',
				render: () => <Tab.Pane attached={false}>Contact Details</Tab.Pane>
			}
		];
		return (
			<div className='package-details'>
				<div className='container'>
					<div className='header'>
						<div className='img-container'>
							<a href={imageUrl(aPackage.images[0])} className='image-popup'>
								<img src={imageUrl(aPackage.images[0])} alt='Image' className='img-responsive' />
							</a>
						</div>
						<div className='card bg-none title'>
							<div className='card-body'>
								<div className='d-flex align-items-center justify-content-between'>
									<div className=''>
										<h2 className='text-white font-secondary'>{aPackage.name}</h2>
										<span className='text-white text-small'>
											<i className='fas fa-map-marker-alt' />&nbsp;
											{aPackage.location}
										</span>
									</div>
								</div>
							</div>
							<div className='card'>
								<div className='card-body d-flex align-items-center justify-content-between'>
									<div className='pr-2'>
										{
											<div className='text-small'>
												<span className='text-muted'>
													Rs. <del>{aPackage.price}</del>
												</span>

												<span className='text-success'>
													&nbsp;{aPackage.price - aPackage.offer_price} off
												</span>
											</div>
										}
										<span>
											<span class='text-medium text-strong'>Rs. {aPackage.price}</span>
											<span className='text-muted text-small text-right'>/person</span>
										</span>
									</div>
									<div className='d-inline-block'>
										<div className='p-2' onClick={this.onSelect} className='btn btn-secondary'>
											Submit Query
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-12 p-0'>
							<div className='card mb-2'>
								<div className='card-body'>
									<Tab menu={{secondary: true}} panes={panes} />
								</div>
							</div>
							<div className='card my-3'>
								<div className='card-body'>
									<div className='row'>
										{aPackage.inclusions && (
											<div className='col-12 col-md-6'>
												<h3 className='title'>Inclusions</h3>
												{aPackage.inclusions}
											</div>
										)}
										{aPackage.exclusions && (
											<div className='col-12 col-md-6'>
												<h3 className='title'>Exclusions</h3>
												{aPackage.exclusions}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 p-0'>
							<div className='header'>
								<h3 className='py-3'>Similar Packages</h3>
							</div>
							<div className='owl-carousel owl-theme'>
								<Package aPackage={aPackage} />
								<Package aPackage={aPackage} />
								<Package aPackage={aPackage} />
								<Package aPackage={aPackage} />
								<Package aPackage={aPackage} />
							</div>
						</div>
					</div>
				</div>
				{/* <ModalExample
					title={`Kindly submit the query form below to book your trip and we will contact you
										with the confirmed itinerary.`}
					show={this.state.showInquiryForm}
					toggle={this.onSelect}
					onSuccess={this.onBook}
				/> */}
				{this.state.showInquiryForm && <Redirect to={{pathname: '/inqiury', state: {aPackage: aPackage}}} />}
			</div>
		);
	}
}
export default PackageDetails;
