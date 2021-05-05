import React from 'react';
import {BASE_URL} from '../../constants';


export default function CarDetails(props) {
	const {car, inquiry} = props;
	return (
		<div>
			<div>{car.image.length && <img src={BASE_URL + car.image[0].url} />}</div>
			<div>Estimated Price - {car.price * inquiry.no_of_days} / day</div>
		</div>
	);
}
