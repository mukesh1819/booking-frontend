import React from 'react';

const ContentWrapper = (props) => {
	var ContentComponent = props.component;
	return (
		<div className='content-wrapper'>
			{ContentComponent ? <ContentComponent key={props.url} {...props} /> : props.children}
		</div>
	);
};

export {ContentWrapper};
