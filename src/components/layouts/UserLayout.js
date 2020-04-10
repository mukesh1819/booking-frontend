import React from 'react';
import {NavBar} from '../shared';

export default ({children}) => {
	return (
		<div id='content'>
			<NavBar />
			{children}
		</div>
	);
};
