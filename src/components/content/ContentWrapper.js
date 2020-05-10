import React from 'react';
import {withTranslation} from 'react-i18next';

const ContentWrapper = (props) => {
	var ContentComponent = props.component;
	return (
		<div className='content-wrapper'>
			{ContentComponent ? <ContentComponent key={props.url} {...props} /> : props.children}
		</div>
	);
};

export default withTranslation()(ContentWrapper);
