import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import routing from './routes';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';
import {getUserDetails} from './api/userApi';
import {loginUser} from './redux/actions';
import {setCountries} from './redux/actions';
import {getCountries} from './api/flightApi';
import {ScrollToTop} from './components/shared';
import swal from 'sweetalert';

function App(props) {
	useEffect(
		() => {
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
						var countries = response.data.map(function(country) {
							return {
								key: country.id,
								value: country.country_char,
								flag: country.country_char.toLowerCase(),
								text: country.name,
								currency: country.currency_char,
								code: country.country_code
							};
						});
						props.setCountries(countries);
					})
					.catch((error) => {
						console.log("Countries list", error);
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
			{routing}
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
