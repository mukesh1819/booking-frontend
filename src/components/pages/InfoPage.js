import React from 'react';
import image from '../../images/404.jpg';
import {Segment, Header, Button, Icon} from 'semantic-ui-react';

const PageNotFound = () => (
	<div className='container px-md-4 py-md-4 page'>
		<Segment raised className='p-4'>
			<h3 className='title'>About Us</h3>
			<hr />
			<p className=''>
				{process.env.REACT_APP_COMPANY_NAME} built the {process.env.REACT_APP_TITLE} app as a Free app. This
				SERVICE is provided by {process.env.REACT_APP_TITLE} at no cost and is intended for use as is. This page
				is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal
				Information if anyone decided to use our Service. If you choose to use our Service, then you agree to
				the collection and use of information in relation to this policy. The Personal Information that we
				collect is used for providing and improving the Service. We will not use or share your information with
				anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same
				meanings as in our Terms and Conditions, which is accessible at {process.env.REACT_APP_TITLE} unless
				otherwise defined in this Privacy Policy.
			</p>
			<h3 className='title'> Information </h3>
			<Segment placeholder>
				<Header icon>
					<Icon name='search' />
					Information Not Available.
				</Header>
				<Segment.Inline>
					<Button primary>Contact Us</Button>
					<Button>Review</Button>
				</Segment.Inline>
			</Segment>
		</Segment>
	</div>
);

export default PageNotFound;
