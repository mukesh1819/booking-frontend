import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Tooltip from '../shared/Tooltip';
import {isRefundable} from '../../utils/helpers';
import {connect} from 'react-redux';
import history from '../../history';

const SearchDetails = ({details}) => {
	return (
		<div className='flight-card'>
			<div className='d-flex justify-content-around align-items-center'>
				<div>
					<div className='text-bold'>
						{`${details.strSectorFrom}`}
						<i className={details.strTripType === 'O' ? 'icon-arrow-right' : 'icon-arrow-right2'} />
						{`${details.strSectorTo}`}
					</div>
					<div className='text-small text-muted'>{`${details.strFlightDate}`}</div>
				</div>
				<div>
					<i className='icon-edit' onClick={() => history.push('/')} />
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({flightStore}) => ({
	details: flightStore.searchDetails
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetails);
