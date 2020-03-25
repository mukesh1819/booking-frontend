import React, {Component} from 'react';
import {getCategories} from '../../api/categoryApi';
import Package from '../packages/Package';
import {Link} from 'react-router-dom';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';

class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	componentDidMount() {
		this.fetchDetails();
		$(document).ready(function() {});
	}

	fetchDetails() {
		const options = {
			margin: 10,
			loop: true,
			touchDrag: true,
			rewind: true,
			animateIn: true,
			responsive: {
				0: {
					items: 1,
					nav: false
				},
				600: {
					items: 3,
					nav: false
				},
				1000: {
					items: 4,
					nav: false,
					loop: false
				}
			}
		};
		getCategories().then((response) => {
			console.log('CATEGORIES', response);
			this.setState({
				categories: response.data
			});
			$('.owl-carousel').owlCarousel(options);
		});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.categories.map((category) => {
					return (
						<div>
							<div className='d-flex justify-content-between align-items-center'>
								<h2 className='title'>{category.name}</h2>
								<Link to='/packages' className='btn btn-secondary bg-none text-primary'>
									View All <i class='fas fa-angle-right' />
								</Link>
							</div>
							<div className='owl-carousel owl-theme'>
								{category.packages.length > 0 &&
									category.packages.map((aPackage) => {
										return <Package aPackage={aPackage} />;
									})}
							</div>
						</div>
					);
				})};
			</React.Fragment>
		);
	}
}

export default Categories;