import React from 'react';

const ContentWrapper = (props) => {
	var ContentComponent = props.component;
	return (
		<div className=''>{ContentComponent ? <ContentComponent key={props.url} {...props} /> : props.children}</div>
	);
};

export {ContentWrapper};
