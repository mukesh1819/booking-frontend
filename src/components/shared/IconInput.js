import React from 'react';

export default ({icon = 'icon-paper-plane icon', iconPosition = 'left', children}) => {
	return (
		<React.Fragment>
			{children}
			{/* <div className='d-flex form-control align-items-center py-0'>
			{iconPosition == 'left' && <i aria-hidden='true' className={`text-primary ${icon}`} />}
			{iconPosition == 'right' && <i aria-hidden='true' className={icon} />}
		</div> */}
		</React.Fragment>
	);
};
