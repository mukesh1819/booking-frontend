import React, {Component, useState} from 'react';
import {imageUrl} from '../../helpers';

export default ({images}) => {
	const [activeImage, setActiveImage] = useState(images[0]);
	return (
		<div className='img-gallery'>
			<div className='d-flex py-2'>
				<a href={activeImage} className='image-popup flex-grow-1'>
					<img src={activeImage} alt='Image' className='img-responsive' style={{height: 'auto'}} />
				</a>
				<div className='image-selector d-flex flex-column flex-shrink-1 align-items-start'>
					{images.map((v, index) => (
						<div onClick={() => setActiveImage(v)}>
							<img src={v} alt='Image' className={`${v == activeImage ? 'active' : ''} img-fit`} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
