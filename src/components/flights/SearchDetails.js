import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import SearchBar from './SearchBar';

const SearchDetails = ({details, collapsed}) => {
	const [searching, setSearch] = useState(!collapsed);

	if (searching) {
		return <SearchBar />;
	}

	return (
		<div className='card'>
			<div className='d-flex justify-content-around align-items-center p-3'>
				<div>
					<div className=''>
						<span className='text-bold px-2'>{`${details.strSectorFrom}`}</span>
						<i
							className={
								details.strTripType === 'O' ? 'fas fa-arrow-circle-right' : 'fas fa-exchange-alt'
							}
						/>
						<span className='text-bold px-2'> {`${details.strSectorTo}`}</span>
					</div>
					<div>
						<span className='text-small text-muted px-2'>
							<i class='fas fa-plane-departure' />&nbsp;
							{`${moment(details.strFlightDate).format('Do MMMM, YYYY')}`}
						</span>
						{details.strTripType === 'R' && (
							<span className='text-small text-muted px-2'>
								<i class='fas fa-plane-arrival' />&nbsp;
								{`${moment(details.strReturnDate).format('Do MMMM, YYYY')}`}
							</span>
						)}
						<span className='text-small text-muted px-2'>
							<i class='fas fa-male' />&nbsp;
							{details.intAdult} Adult,
							{details.intChild} Child
						</span>
					</div>
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
