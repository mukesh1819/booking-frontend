import React, {Component} from 'react';
import Package from './Package';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import OwlCarousel from 'react-owl-carousel2';
import '../../styles/owl.carousel.min.css';
import '../../styles/owl.theme.default.min.css';

class PackageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			context: props.context
		};
	}

	componentDidMount() {
		const options = {
			margin: 20,
			loop: true,
			touchDrag: true,
			rewind: true,
			animateIn: true,
			responsive: {
				0: {
					items: 1,
					nav: true
				},
				600: {
					items: 3,
					nav: false
				},
				1000: {
					items: 3,
					nav: true,
					loop: false
				}
			}
		};
		$(document).ready(function() {
			$('.owl-carousel').owlCarousel(options);
		});
	}

	render() {
		return (
			<div className='container p-4'>
				{/* <div className='row'>
					<div className='col-2'>
						<div className='side-nav' />
					</div>
					<div className='col-10' />
				</div> */}
				<div className='d-flex flex-wrap justify-content-around'>
					<Package />
					<Package />
					<Package />
					<Package />
				</div>

				<div className='owl-carousel owl-theme'>
					<Package />
					<Package />
					<Package />
					<Package />
					<Package />
					<Package />
				</div>
			</div>
		);
	}
}
export default PackageList;
