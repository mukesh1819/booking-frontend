import React, {Component} from 'react';

const TransactionApiResponse = (props) => {
    const {response} = props;
    return(
        <div>
            {JSON.stringify(response)}
        </div>
    );
};
export default TransactionApiResponse;