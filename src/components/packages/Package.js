import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {imageUrl, calculatePackagePrice} from '../../helpers';

const Package = (props) => {
	const {aPackage} = props;
	var [price, discount] = calculatePackagePrice(aPackage);
	return (
		<div className='card-widget'>
			<figure>
				<div className='overlay d-flex align-items-center justify-content-center'>
					<div className='text-center'>
						<Link to={`/package/${aPackage.id}`} className='btn btn-large btn-primary text-white'>
							Details
						</Link>
					</div>
				</div>
				<img src={imageUrl(aPackage.images[0])} alt='Image' className='img-responsive' />
			</figure>
			<div className='details'>
				<Link to={`/package/${aPackage.idx}`}>
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
				{discount > 0 && (
					<div>
						<span className='text-muted'>
							Rs. <del>{aPackage.price}</del>
						</span>

						<span className='text-success'> {discount} off</span>
					</div>
				)}
				<div>
					<span className='text-bold text-large'>{price}</span>
					<span className='text-small text-muted'>/ person</span>
				</div>
			</div>
		</div>
	);
};

export default Package;
