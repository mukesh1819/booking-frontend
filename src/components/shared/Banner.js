import React from 'react';
import {Container, Button, Segment} from 'semantic-ui-react';

export default ({children}) => {
	return (
		<header id='header' className='cover' role='banner'>
			{children}
		</header>
	);
};
