import React from 'react';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';
import history from '../../history';

const PageNotFound = () => (
	<div className='ui container'>
		<Segment placeholder>
			<Header icon>
				<Icon name='search' />
				Page Not Found.
			</Header>
			<Segment.Inline>
				<Button>Try Again</Button>
				<Button primary onClick={() => history.push('/')}>
					Go to Home
				</Button>
			</Segment.Inline>
		</Segment>
	</div>
);

export default PageNotFound;
