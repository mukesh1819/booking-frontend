import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import HotelImage from '../../images/flight.jpg';

const Package = (props) => (
	<div className='card-item '>
		<a href={HotelImage} className='image-popup'>
			<figure>
				<div className='overlay d-flex align-items-center justify-content-center'>
					<Link to='/package/1' className='btn btn-primary'>
						Book
					</Link>
					<br />
					<Link to='/package/1' className='btn btn-outline-primary'>
						Details
					</Link>
				</div>
				<img src={HotelImage} alt='Image' className='img-responsive' />
			</figure>
		</a>
		<div className='details-text'>
			<h2>Kathmandu, Nepal</h2>
			<div className='d-flex justify-content-between'>
				<span className='text-small'>
					<strong>Rs: 14000</strong> onwards/pax
				</span>
				<span className='text-muted'>
					<i className='fas fa-clock' />
					2 hours
				</span>
			</div>
			<p>Far far away, behind the word mountains, far from the countries</p>
		</div>
	</div>
);
export default Package;
