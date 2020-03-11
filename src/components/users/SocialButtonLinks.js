import React, {Component} from 'react';
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL} from '../../constants';

const SocialButtonLinks = () => {
	return (
		<div>
			<div>Link your account with:</div>
			<div className='d-inline'>
				<div className='btn-group m-2'>
					<a className='btn btn-danger disabled'>
						<i className='icon-google text-white' />
					</a>
					<a className='btn btn-danger text-white ' href={GOOGLE_AUTH_URL}>
						Google
					</a>
				</div>
				<div className='btn-group m-2'>
					<a className='btn bg-fb disabled'>
						<i className='icon-facebook text-white' />
					</a>
					<a className='btn bg-fb text-white ' href={FACEBOOK_AUTH_URL}>
						Facebook
					</a>
				</div>
			</div>
		</div>
	);
};

export default SocialButtonLinks;
