import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import HotelImage from '../../images/flight.jpg';

const Package = (props) => (
	<div className='card-item '>
		<a href={HotelImage} className='image-popup'>
			<figure>
				<div className='overlay'>
					<i className='ti-plus' />
				</div>
				<img src={HotelImage} alt='Image' className='img-responsive' />
			</figure>
		</a>
		<div className='details-text'>
			<h2>Kathmandu, Nepal</h2>
			<p>Far far away, behind the word mountains, far from the countries</p>
			<p>
				<Link to='/packages/1' className='btn btn-primary'>
					Schedule a Trip
				</Link>
			</p>
		</div>
	</div>
);
export default Package;
