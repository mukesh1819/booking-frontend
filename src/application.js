/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.

// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'stylesheets/index.css';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from "react-router-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import th from 'react-intl/lib/locale-data/th'
import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";

import localeData from "./../build/locales/data.json";

addLocaleData([...en, ...es]);

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages =
  localeData[languageWithoutRegionCode] ||
  localeData[language] ||
  localeData.en;

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<IntlProvider locale={language} messages={messages}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
  		</IntlProvider>,
		document.getElementById('root')
	);
});
