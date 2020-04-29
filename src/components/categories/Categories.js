import React, {Component} from 'react';
import {getCategories} from '../../api/categoryApi';
import {Package} from '../packages';
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

	componentDidUpdate(prevProps) {
		if (this.state.categories.length > 0) {
			const options = {
				margin: 10,
				touchDrag: true,
				rewind: true,
				animateIn: true,
				responsive: {
					0: {
						items: 2,
						nav: false,
						autoWidth: true
					},
					600: {
						items: 3,
						nav: false
					},
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
			$(window).on('load', function() {
				$('.owl-carousel').owlCarousel(options);
				$('.owl-carousel').trigger('play.owl.autoplay');
				$('.owl-carousel').trigger('refresh.owl.carousel');
			});
		}
	}

	fetchDetails() {
		getCategories()
			.then((response) => {
				console.log('CATEGORIES', response);
				this.setState({
					categories: response.data
				});
			})
			.catch((error) => {
				console.log(' Category fetch error', error);
			});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.categories.map((category) => {
					return (
						<div className='mb-4'>
							<div className='d-flex justify-content-between align-items-center px-3'>
								<h2 className='category-title'> {category.name} </h2>
								<Link to='/packages' className='btn bg-none text-primary'>
									View All <i className='fas fa-angle-right' />
								</Link>
							</div>
							{category.packages.length > 0 && (
								<div className='owl-carousel owl-theme'>
									{category.packages.map((aPackage) => {
										return <Package aPackage={aPackage} />;
									})}
								</div>
							)}
						</div>
					);
				})}
			</React.Fragment>
		);
	}
}

export default Categories;
