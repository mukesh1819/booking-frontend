import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'stylesheets/index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './redux/store';
import routing from './routes';
import NavBar from './components/NavBar';
import Footer from './components/shared/Footer';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history';

function App() {
	return (
		<Provider store={store}>
			<Router history={history}>
				<NavBar />
				{routing}
				<Footer />
			</Router>
		</Provider>
	);
}
export default App;
