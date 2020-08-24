import React, {useState, useEffect, Fragment} from 'react';
import {InquiryForm} from '.';
import {showPackage} from '../../api/packageApi';

export default function CreateInquiry(props) {
	const [inquiry, setInquiry] = useState({});
	const [aPackage, setPackage] = useState({});

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
