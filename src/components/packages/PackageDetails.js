import React, {Component} from 'react';
import {showPackage} from '../../api/packageApi';
import Package from './Package';
import HotelImage from '../../images/flight.jpg';
import {Link} from 'react-router-dom';
import ModalExample from '../shared/Modal';
import InquiryForm from './InquiryForm';
import {imageUrl} from '../../utils/helpers';

class PackageDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			aPackage: {
				name: 'Chitlang Overnight Package (In Tent/Cottage) without Transportation(1N/2D)',
				price: 1500.0,
				location: 'Chitlang',
				images: [],
				description:
					'Chitlang is a typical Nepali village with a beautiful setup of houses and hills all around surrounded by beautiful green forest, which consists of more than 160 species of birds and animals. Chitlang offers an amazing experience with a combination of natural beauty and cultural heritage. Chitlang is an ancient Newari settlement in Makwanpur district which is a part of the Narayani zone. It lies in the high level of the northern part of Makwanpur district and southern main path of the 8289ft Chandragiri hill.Famous as the gateway of motor cars carried on the back of people, Chitlang offers visitors an opportunity of village homestay where you can interact and get an insight into the rural life in Nepal. The hills of Chitlang are famous for hiking/trekking around Kathmandu. The largest man-made lake in Nepal, Kulekhani (also known as Indrasarovar) is a short walk of 40 minutes from Chitlang. Also, other important places include the oldest Cheese factory of Nepal and several temples.With cool weather and the hills all around, Chitlang is a fertile valley with a small stream flowing through the open verdant rice fields and vegetable patches. With the use of water from this stream for irrigation, the valley supplies a larger amount of vegetables to Kathmandu in the form of cabbage, radishes and more.The climate is ideal to visit at any time during the year with warm days and cool nights. Chitlang Village is a rare destination for visitors, Culturally, Naturally, Traditionally and Geographically. Nepal has different indigenous ethnic groups, among them, Tamang, Magar, Chhetri Braman, Newar, and Gurung lives in this area. And, at the end of your stay, you will be overwhelmed by the farewell that your new family will give you. If you never come this way again the village and its people will remain in your heart forever.'
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
		showPackage(this.props.match.params.id)
			.then((response) => {
				console.log('PAckage DEtails', response);
				this.setState({
					aPackage: response.data
				});
			})
			.catch((response) => {
				console.log('PACKAGE DETAILS ERROR', response);
			});
	}

	render() {
		const {aPackage} = this.state;
		return (
			<div className='package-details'>
				<div className='header card m-2'>
					<img src={imageUrl(aPackage.images[0])} alt='Image' className='img-responsive' />

					<div className='card-body'>
						<div className='d-flex container'>
							<span className='text-primary'>{aPackage.name}</span>

							<div className='ml-auto p-2'>
								<strong>{aPackage.price}</strong>
								<span onClick={this.onSelect} className='btn btn-primary'>
									Book
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='col-md-9 p-0'>
							<div className='card m-2'>
								<div className='card-body'>
									<div className='text-primary'>Description</div>
									{aPackage.description}
								</div>
							</div>
						</div>
						<div className='col-0 col-md-3 p-0'>
							<div className='card m-2'>
								<div className='card-body'>
									<div className='card-header'>Similar Packages</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<ModalExample
					title={aPackage.name}
					show={this.state.showInquiryForm}
					toggle={this.onSelect}
					onSuccess={this.onBook}
				>
					{this.state.showInquiryForm && <InquiryForm package_id= {aPackage.id} />}
				</ModalExample>
			</div>
		);
	}
}
export default PackageDetails;
