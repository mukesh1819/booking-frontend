import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import routing from './routes';
import {NavBar, Footer} from './components/shared';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';
import {getUserDetails} from './api/userApi';
import {loginUser} from './redux/actions';
import {setCountries} from './redux/actions';
import {getCountries} from './api/flightApi';
import {ScrollToTop} from './components/shared';
import {swal} from 'sweetalert';

function App(props) {
	useEffect(
		() => {
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

			// if (props.error !== '') {
			// 	swal({
			// 		title: props.error
			// 	});
			// }
		},
		[props.countries, props.currentUser.email]
	);

	return (
		<Router history={history}>
			<ScrollToTop />
			<div id='content'>
				<NavBar />
				{routing}
			</div>
			<Footer />
		</Router>
	);
}

const mapStateToProps = ({userStore, extras}) => {
	return {
		currentUser: userStore.currentUser,
		countries: extras.countries,
		error: extras.error
	};
};

const mapDispatchToProps = {
	loginUser,
	setCountries
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
