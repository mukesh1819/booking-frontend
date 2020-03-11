import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {setCurrency, setLanguage} from '../../redux/actions/bookingActions';
import {getCountries} from '../../api/flightApi';
import {Flag, Segment} from 'semantic-ui-react';

const Currencies = (props) => {
	const {currency, setCurrency, language, setLanguage, requestData} = props;
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		getCountries()
			.then((response) => {
				setCountries(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	var contents = null;
	console.log('CURRENCY', currency);

	switch (requestData) {
		case 'currencies':
			contents = countries.map((country) => {
				if (country.currency_char !== null) {
					return (
						<li
							className={`d-flex align-items-center p-1 menu-item ${country.currency_char == currency
								? 'active'
								: ''}`}
							onClick={() => {
								setCurrency(country.currency_char);
							}}
						>
							<Flag name={country.country_char.toLowerCase()} />
							<span>{country.currency_char}</span>

							{country.currency_char == currency && <i className='icon-check ml-2' />}
						</li>
					);
				}
			});
			break;
		case 'codes':
			contents = countries.map((country) => {
				if (country.country_code !== null) {
					return (
						<li className='p-1 menu-item d-flex align-items-center'>
							<i className='icon-flag' />
							<span>{country.country_code}</span>
						</li>
					);
				}
			});
			break;
		case 'languages':
			var languages = [{code: 'ENG', label: 'English'}, {code: 'ESP', label: 'Spanish'}];
			contents = languages.map(({code, label}) => {
				return (
					<li
						className='d-flex align-items-center p-1 menu-item'
						onClick={() => {
							setLanguage(code);
						}}
					>
						<i className='icon-flag' />
						<span>{label}</span>
						{code == language && <i className='icon-check ml-2' />}
					</li>
				);
			});
			break;
		default:
			contents = countries.map((country) => {
				if (country.name !== null) {
					return (
						<li className='p-1'>
							<i className='icon-flag' />
							<span>{country.name}</span>
						</li>
					);
				}
			});
	}

	return <ul>{contents}</ul>;
};

const mapStateToProps = ({bookingStore}) => {
	return {
		currency: bookingStore.currency,
		language: bookingStore.language
	};
};

const mapDispatchToProps = {
	setCurrency,
	setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
