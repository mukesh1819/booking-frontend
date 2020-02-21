import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'stylesheets/index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import routing from './routes';

function App() {
    return (
        <Provider store={store}>{routing}</Provider>
    );
}

export default App;