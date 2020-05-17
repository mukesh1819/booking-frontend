import React, {Component} from 'react';
import InfoCard from './InfoCard';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';

class HotelList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			context: props.context
		};
	}

	componentDidMount() {
		$(document).ready(function() {
			$('.owl-carousel').owlCarousel({
				items: 3,
				margin: 20,
				loop: true,
				touchDrag: true,
				nav: true,
				rewind: true,
				animateIn: true
			});
		});
	}

	render() {
		return (
			<div className='ui container'>
				<div className='owl-carousel owl-theme'>
					<InfoCard />
					<InfoCard />
					<InfoCard />
					<InfoCard />
					<InfoCard />
					<InfoCard />
					<InfoCard />
				</div>
			</div>
		);
	}
}
export default HotelList;
