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
		this.onBook = this.onBook.bind(this);
	}

	componentDidMount() {
		this.fetchDetails();
	}

	onSelect() {
		this.setState((prevState, props) => {
			return {showInquiryForm: !prevState.showInquiryForm};
		});
	}

	onBook() {
		console.log('TODO: On Package Book');
	}

	fetchDetails() {
		const options = {
			margin: 10,
			loop: true,
			touchDrag: true,
			rewind: true,
			animateIn: true,
			items: 1,
			nav: false,
			responsive: {
				1000: {
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
							<div className='text-primary'> Description</div>
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
						<div className='img-container  owl-carousel owl-theme'>
							<a href={imageUrl(aPackage.images[0])} className='image-popup'>
								<img src={imageUrl(aPackage.images[0])} alt='Image' className='img-responsive' />
							</a>

							{dummyImages.length > 0 &&
								dummyImages.map((v) => (
									<a href={v} className='image-popup'>
										<img src={v} alt='Image' className='img-responsive' />
									</a>
								))}
						</div>
						<div className='card bg-none title'>
							<div className='card-body'>
								<div className='d-flex align-items-center'>
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
								<div className='card-body d-flex align-items-center justify-content-end'>
									<span className='p-2'>
										<span class='text-medium text-strong'>Rs. {aPackage.price}</span>
										<span className='text-muted text-small text-right'>/person</span>
									</span>
									<span className='p-2' onClick={this.onSelect} className='btn btn-secondary'>
										Submit Query
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-9 p-0'>
							<div className='card m-2'>
								<div className='card-body'>
									<Tab menu={{secondary: true}} panes={panes} />
								</div>
							</div>
						</div>
						<div className='col-0 col-md-3'>
							<div className='header'>
								<h3 className='py-3'>Similar Packages</h3>
							</div>
							<Package aPackage={aPackage} />
						</div>
					</div>
				</div>
				<ModalExample
					title={`Kindly submit the query form below to book your trip and we will contact you
										with the confirmed itinerary.`}
					show={this.state.showInquiryForm}
					toggle={this.onSelect}
					onSuccess={this.onBook}
				>
					{this.state.showInquiryForm && <InquiryForm aPackage={aPackage} />}
				</ModalExample>
			</div>
		);
	}
}
export default PackageDetails;
