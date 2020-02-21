import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Tooltip from '../shared/Tooltip';
import UsersList from './UsersList';

const Dashboard = (props) => {
	return (
		<div className='container'>
			<div className='card'>
				<div className='card-body'> Dashboard </div> <UsersList />
			</div>{' '}
		</div>
	);
};
export default Dashboard;
