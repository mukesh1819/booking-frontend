import React from 'react';

const Loading = () => (
	<div className='container text-center'>
		{/* <img src={require('/assets/images/loading.gif')} /> */}
		Loading...
	</div>
);

const withLoading = (Component) => ({searching, ...rest}) => (searching ? <Loading /> : <Component {...rest} />);

export default withLoading;
