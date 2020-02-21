import React, { Component } from 'react';
import Package from './Package';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import 'owl.carousel';

var $ = require('jquery')

class PackageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: props.context
        };
    }

    // componentDidMount() {
    // 	$(document).ready(function() {
    // 		$('.owl-carousel').owlCarousel({
    // 			margin: 20,
    // 			loop: true,
    // 			touchDrag: true,
    // 			rewind: true,
    // 			animateIn: true,
    // 			responsive: {
    // 				0: {
    // 					items: 1,
    // 					nav: true
    // 				},
    // 				600: {
    // 					items: 3,
    // 					nav: false
    // 				}, // 				1000: {
    // 					items: 3,
    // 					nav: true,
    // 					loop: false
    // 				}
    // 			}
    // 		});
    // 	});
    // }

    render() {
        return (
            <div className='container p-4'>
				<div className='owl-carousel owl-theme'>
					<Package />
					<Package />
					<Package />
					<Package />
					<Package />
					<Package />
					<Package />
					<div>asdf;jkasd;fk</div>
				</div>
			</div>
        );
    }
}
export default PackageList;