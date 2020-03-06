import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import routing from './routes';
import NavBar from './components/NavBar';
import Footer from './components/shared/Footer';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';
import {getUserDetails} from './api/userApi';
import {loginUser} from './redux/actions/sessions';

function App(props) {
	useEffect(() => {
		console.log('Load App Component');
		if (localStorage.token !== undefined && props.currentUser.email == undefined) {
			getUserDetails()
				.then((response) => {
					props.loginUser(response.data.user);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	});

	return (
		<Router history={history}>
			<NavBar />
			{routing}
			<Footer />
		</Router>
	);
}

const mapStateToProps = ({userStore}) => {
	return {
		currentUser: userStore.currentUser
	};
};

const mapDispatchToProps = {
	loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
