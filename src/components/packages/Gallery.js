import React, {Component, useState, useEffect} from 'react';
import {imageUrl} from '../../helpers';

export default ({images}) => {
	useEffect(
		() => {
			const options = {
				margin: 10,
				touchDrag: true,
				rewind: true,
				animateIn: true,
				autoplay: true,
				autoplayTimeout: 2000,
				autoplayHoverPause: true,
				responsive: {
					0: {
						items: 2,
						nav: false,
						autoWidth: true
					},
					600: {
						items: 3,
						nav: false
					},
					1000: {
						items: 1,
						nav: true,
						navText: [
							"<i class='fas fa-chevron-circle-left text-primary'></i>",
							"<i class='fas fa-chevron-circle-right text-primary'></i>"
						],
						loop: true
					}
				}
			};
			$('.owl-carousel').owlCarousel(options);
		},
		[images]
	);
	const [activeImage, setActiveImage] = useState(images[0]);
	return (
		<div className='img-gallery'>
			<div className='d-flex py-2 justify-content-center active-image-container'>
				{/* <a href={activeImage} className='image-popup flex-grow-1'>
					<img
						src={`${process.env.REACT_APP_BASE_URL}/${activeImage}`}
						alt='Image'
						className='img-responsive'
						style={{height: 'auto'}}
					/>
				</a> */}
				<div className='owl-carousel owl-theme'>
					{images.map((v, index) => (
						<img
							src={`${process.env.REACT_APP_BASE_URL}/${v}`}
							alt='Image'
							className='img-responsive'
							style={{height: 'auto'}}
						/>
					))}
				</div>
			</div>
			{/* <div className='image-selector d-flex flex-shrink-1 align-items-end justify-content-center'>
				{images.map((v, index) => (
					<div onClick={() => setActiveImage(v)} className='image-container'>
						<img
							src={`${process.env.REACT_APP_BASE_URL}/${v}`}
							alt='Image'
							className={`${v == activeImage ? 'active' : ''} img-fit`}
						/>
					</div>
				))}
			</div> */}
		</div>
	);
};
