import React from 'react';
import loading from '../../images/flight-loading.gif';

const Loading = () => (
	<div className='container text-center'>
		<img src={loading} width='100' height='100' />
	</div>
);

// const withLoading = (Component) => ({searching, ...rest}) => (searching ? <Loading /> : <Component {...rest} />);

export default Loading;
