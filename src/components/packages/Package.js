import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import HotelImage from '../../images/flight.jpg';
import {imageUrl} from '../../utils/helpers';

const Package = (props) => {
	const {aPackage} = props;

	return (
		<div className='card-item '>
			<a href={imageUrl(aPackage.images[0])} className='image-popup'>
				<figure>
					<div className='overlay d-flex align-items-center justify-content-center'>
						<Link to={`/package/${aPackage.id}`} className='btn btn-primary'>
							Book
						</Link>
						<br />
						<Link to={`/package/${aPackage.id}`} className='btn btn-outline-primary'>
							Details
						</Link>
					</div>
					<img src={imageUrl(aPackage.images[0])} alt='Image' className='img-responsive' />
				</figure>
			</a>
			<div className='details-text'>
				<Link to={`/package/${aPackage.id}`}>
					<h2>{aPackage.name}</h2>
				</Link>
				<div className='d-flex justify-content-between py-2'>
					<span className='text-small'>
						<strong>{aPackage.price}</strong> onwards/pax
					</span>
					<span className='text-muted'>
						<i className='fas fa-clock' />
						{aPackage.name}
					</span>
				</div>
				<p>{aPackage.description}</p>
			</div>
		</div>
	);
};

export default Package;
