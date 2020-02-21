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
		const {tabs = ['Flights'], children} = this.props;
		console.log('tab', tabs);
		return (
			<div className='d-md-none'>
				<nav className='nav nav-tabs'>
					<div class='nav nav-tabs nav-fill' id='nav-tab' role='tablist'>
						<a
							class='nav-item nav-link active'
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
							class='nav-item nav-link'
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
				<div class='tab-content px-sm-0' id='nav-tabContent'>
					{children}
				</div>
			</div>
		);
	}
}
