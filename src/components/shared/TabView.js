import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './tab.scss';

export default class TabView extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	activateTab = (comp) => {
		this.setState({});
	};

	render() {
		const {tabs = [], children} = this.props;
		return (
			<div className=''>
				<nav>
					<div className='nav nav-tabs nav-fill' id='nav-tab' role='tablist'>
						<a
							className='nav-item nav-link active'
							id='nav-profile-tab'
							data-toggle='tab'
							href='#nav-flights'
							role='tab'
							aria-controls='nav-home'
							aria-selected='true'
						>
							<i className='icon-paper-plane' />&nbsp;
							{'Flights'}
						</a>
						<a
							className='nav-item nav-link'
							id='nav-profile-tab'
							data-toggle='tab'
							href='#nav-packages'
							role='tab'
							aria-controls='nav-home'
							aria-selected='true'
						>
							<i className='icon-briefcase' />&nbsp;
							{'Packages'}
						</a>
					</div>
				</nav>
				<div className='tab-content px-sm-0' id='nav-tabContent'>
					{children}
				</div>
			</div>
		);
	}
}
