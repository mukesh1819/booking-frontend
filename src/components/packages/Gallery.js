import React, {Component, useState} from 'react';
import {imageUrl} from '../../helpers';

export default ({images}) => {
	const [activeImage, setActiveImage] = useState(images[0]);
	return (
		<div className='img-gallery'>
			<div className='d-flex image-selector'>
				{images.map((v) => (
					<div style={{width: '25px', height: '25px'}} onClick={() => setActiveImage(v)}>
						<img src={v} alt='Image' className='img-fit' />
					</div>
				))}
			</div>
			<div>
				<a href={activeImage} className='image-popup'>
					<img src={activeImage} alt='Image' className='img-responsive' style={{height: 'auto'}} />
				</a>
			</div>
		</div>
	);
};
