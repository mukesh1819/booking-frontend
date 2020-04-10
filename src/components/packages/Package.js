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
								Submit Query
							</Link>
							<Link to={`/package/${aPackage.id}`} className='btn btn-large bg-none text-white'>
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
				<div className='d-flex justify-content-between align-items-center py-2'>
					<span className='text-small text-muted'>
						<i className='fas fa-map-marker-alt' />&nbsp;
						{aPackage.location}
					</span>
					<span className='text-small text-muted'>
						<i className='fas fa-clock' />&nbsp;
						{`6 days`}
					</span>
				</div>
				{aPackage.offer_price && (
					<div>
						<span className='text-muted'>
							Rs. <del>{aPackage.price}</del>
						</span>

						<span className='text-success'> {aPackage.price - aPackage.offer_price} off</span>
					</div>
				)}
				<div>
					<span className='text-bold text-large'>Rs. 25000</span>
					<span className='text-small text-muted'>/ person</span>
				</div>
			</div>
		</div>
	);
};

export default Package;
