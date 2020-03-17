import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import routing from './routes';
import NavBar from './components/NavBar';
import Footer from './components/shared/Footer';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';
import {getUserDetails} from './api/userApi';
import {loginUser} from './redux/actions/sessions';
import {setCountries} from './redux/actions/extraActions';
import {getCountries} from './api/flightApi';

function App(props) {
	useEffect(() => {
		console.log('Load App Component');
		console.log('ENV VARIABLE', process.env);
		if (localStorage.token !== undefined && props.currentUser.email == undefined) {
			getUserDetails()
				.then((response) => {
					props.loginUser(response.data.user);
				})
				.catch((error) => {
					console.log(error);
				});
		}

		if (props.countries.length == 0) {
			getCountries()
				.then((response) => {
					console.log('Contries', response);
					props.setCountries(response.data);
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

const mapStateToProps = ({userStore, extras}) => {
	return {
		currentUser: userStore.currentUser,
		countries: extras.countries
	};
};

const mapDispatchToProps = {
	loginUser,
	setCountries
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
