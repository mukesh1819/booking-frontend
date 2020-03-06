import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Tooltip from '../shared/Tooltip';
import {isRefundable} from '../../utils/helpers';
import {connect} from 'react-redux';
import history from '../../history';
import moment from 'moment';
import SearchBar from './SearchBar';

const SearchDetails = ({details}) => {
	const [searching, setSearch] = useState(false);

	if (searching) {
		return <SearchBar />;
	}

	return (
		<div className='flight-card'>
			<div className='d-flex justify-content-around align-items-center'>
				<div>
					<div className='text-bold'>
						{`${details.strSectorFrom}`}
						<i className={details.strTripType === 'O' ? 'icon-arrow-right' : 'icon-arrow-right2'} />
						{`${details.strSectorTo}`}
					</div>
					<div className='text-small text-muted'>{`${moment(details.strFlightDate).format(
						'Do MMMM, YYYY'
					)}`}</div>
				</div>
				<div>
					<i className='icon-edit' onClick={() => setSearch(true)} />
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
