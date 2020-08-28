import React, {useState, useEffect, Fragment} from 'react';
import {InquiryForm} from '.';
import {showPackage} from '../../api/packageApi';

export default function CreateInquiry(props) {
	const [inquiry, setInquiry] = useState({
		preferred_date: new Date(),
		head_traveller_name: null,
		number_of_adult: 1,
		number_of_child: 0,
		activity: {},
		activity_id: null,
		addons: [],
		total_amount: 0
	});

	const [aPackage, setPackage] = useState({
		price: 0,
		addons: []
	});

	useEffect(() => {
		showPackage(props.match.params.package_idx)
			.then((resp) => {
				setPackage(resp.data);
			})
			.catch((error) => {
				console.log('fetch package error', error);
			});
	}, []);

	return (
		<Fragment>
			<InquiryForm inquiry={inquiry} aPackage={aPackage} />
		</Fragment>
	);
}
