import React from 'react';
import NavBar from './components/NavBar';
export default class App extends React.Component {
	constructor() {
		super();
		var token = localStorage.token;
		this.state = {
			loggedIn: token !== null
		};
	}

	componentDidMount() {}

	render() {
		return <div />;
	}
}
