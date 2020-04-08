import React, {Component, useState} from 'react';
import {imageUrl} from '../../helpers';

export default ({images}) => {
	const [activeImage, setActiveImage] = useState(images[0]);
	return (
		<div className='img-gallery'>
			<div>
				<div className='image-selector'>
					{images.map((v, index) => (
						<div onClick={() => setActiveImage(v)}>
							<img src={v} alt='Image' className={`${v == activeImage ? 'active' : ''} img-fit`} />
						</div>
					))}
				</div>
				<a href={activeImage} className='image-popup'>
					<img src={activeImage} alt='Image' className='img-responsive' style={{height: 'auto'}} />
				</a>
			</div>
		</div>
	);
};
