import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import HotelImage from '../../images/flight.jpg';

const Package = (props) => (
	<div className=''>
		<a href={HotelImage} className='card-item image-popup'>
			<figure>
				<div className='overlay'>
					<i className='ti-plus' />
				</div>
				<img src={HotelImage} alt='Image' className='img-responsive' />
			</figure>
			<div className='details-text'>
				<h2>Kathmandu, Nepal</h2>
				<p>Far far away, behind the word mountains, far from the countries</p>
				<p>
					<span className='btn btn-primary'>Schedule a Trip</span>
				</p>
			</div>
		</a>
	</div>
);
export default Package;
