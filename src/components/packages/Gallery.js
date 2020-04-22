import React, {Component, useState} from 'react';
import {imageUrl} from '../../helpers';

export default ({images}) => {
	const [activeImage, setActiveImage] = useState(images[0]);
	return (
		<div className='img-gallery'>
			<div className='image-selector d-flex flex-shrink-1 align-items-start'>
				{images.map((v, index) => (
					<div onClick={() => setActiveImage(v)} className='image-container'>
						<img
							src={`${process.env.REACT_APP_BASE_URL}/${v}`}
							alt='Image'
							className={`${v == activeImage ? 'active' : ''} img-fit`}
						/>
					</div>
				))}
			</div>
			<div className='d-flex py-2'>
				<a href={activeImage} className='image-popup flex-grow-1'>
					<img
						src={`${process.env.REACT_APP_BASE_URL}/${activeImage}`}
						alt='Image'
						className='img-responsive'
						style={{height: 'auto'}}
					/>
				</a>
			</div>
		</div>
	);
};
