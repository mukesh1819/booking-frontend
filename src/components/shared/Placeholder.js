import React from 'react';
import {Placeholder} from 'semantic-ui-react';

const PlaceholderDiv = () => (
	<div className='flight-card flight-placeholder'>
		<Placeholder>
			<Placeholder.Header image>
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder.Header>
			{/* <Placeholder.Paragraph>
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder.Paragraph> */}
		</Placeholder>
	</div>
);

export default PlaceholderDiv;
