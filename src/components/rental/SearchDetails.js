import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import CarInquiryForm from './CarInquiryForm';
import {ifNotZero} from '../../helpers';

const SearchDetails = ({details, onModify}) => {
	return (
		<div className='card'>
			<div className='d-flex justify-content-around align-items-center p-3'>
				<div>
					<div className=''>
						<span className='text-bold px-2'>{`${details.source}`}</span>
						<i className={details.strTripType === 'O' ? 'fas fa-arrow-right' : 'fas fa-exchange-alt'} />
						<span className='text-bold px-2'> {`${details.destination}`}</span>
					</div>
					<div>
						<span className='text-small text-muted px-2'>
							<i class='fas fa-plane departure text-primary' />&nbsp;
							{`${moment(details.start_date).format('Do MMMM, YYYY')}`}
						</span>
						{details.strTripType === 'R' && (
							<span className='text-small text-muted px-2'>
								<i className='fas fa-plane arrival text-primary' />&nbsp;
								{`${moment(details.no_of_days).format('Do MMMM, YYYY')}`}
							</span>
						)}
						<span className='text-small text-muted px-2'>
							<i className='fas fa-male text-primary' />&nbsp;
							{details.no_of_pax} Passengers
						</span>
						<span className='btn text-primary bg-none' onClick={onModify}>
							<i className='icon-edit' onClick={onModify} />&nbsp;Modify
						</span>
					</div>
				</div>
				<div />
			</div>
		</div>
	);
};

const mapStateToProps = ({rentalStore}) => ({
	details: rentalStore.carInquiryDetails
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetails);
