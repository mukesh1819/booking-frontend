import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {imageUrl} from '../../helpers';

const Package = (props) => {
	const {aPackage} = props;

	return (
		<div className='card-widget'>
			<a href={imageUrl(aPackage.images[0])} className='image-popup'>
				<figure>
					<div className='overlay d-flex align-items-center justify-content-center'>
						<div className='text-center'>
							<Link to={`/package/${aPackage.id}`} className='btn btn-secondary btn-large'>
								Book
							</Link>
							<Link to={`/package/${aPackage.id}`} className='btn btn-secondary btn-large bg-none'>
								Details
							</Link>
						</div>
					</div>
					<img src={imageUrl(aPackage.images[0])} alt='Image' className='img-responsive' />
				</figure>
			</a>
			<div className='details'>
				<Link to={`/package/${aPackage.id}`}>
					<h3>{aPackage.name}</h3>
				</Link>
				<div className='d-flex justify-content-between py-2'>
					<span className='text-small text-muted'>
						<i class='fas fa-map-marker-alt' />&nbsp;
						{aPackage.location}
					</span>
					<span>
						<span className='text-strong'>Rs. {aPackage.price}</span>
						<span className='text-small text-muted'> / person</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Package;
