import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Editable from '../shared/Editable';
import {updateUserDetails} from '../../api/userApi';
import axios from 'axios';
import {passCsrfToken} from '../../utils/helpers';
import {getCountries} from '../../api/flightApi';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import {updateUser} from '../../redux/actions/sessions';



class UserDetailCard extends Component{

	constructor(props){
		super(props);
		this.state={
			countries:[],
			updated: false
		}
	}

	componentDidMount(){
		passCsrfToken(document, axios);
		this.fetchCountries();

	}

	fetchCountries() {
		getCountries()
		.then((response) => {
			console.log(response);
			this.setState({
				countries: response.data
			});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	update(details) {
		this.setState({
			updated: false
		})
		updateUserDetails(details)
		.then((response) => {
			console.log('details',response.data);
			swal({
				title: 'User Updates!',
				text: 'user updated successfully',
				icon: 'success',
				button: 'Continue!'
			});
			this.props.updateUser(details);
			this.setState({
				updated: true
			})
		})
		.catch((error) => {
			console.log(error);
			swal({
				title: 'User Updates!',
				text: error.message,
				icon: 'error',
				button: 'Continue!'
			});
		});
	}

	render(){
		const {updated} = this.state;
		const {user} = this.props;
		console.log('country :', this.state.countries);
		return (
			<div className='user-profile row'>
				<div className='col-12 p-0'>
					<Editable edit ={updated} label='Name' value={user.name} onSubmit={(value) => this.update({id: user.id, name: value})}>
						</Editable>
					<Editable label='Email' value={user.email} onSubmit={(value) => this.update({id: user.id, email: value})}/>
					<Editable
						edit ={updated}
						label='Mobile No'
						value={user.phone_number}
						onSubmit={(value) => this.update({id: user.id, phone_number: value})}
					/>
					<Editable
					edit ={updated}
					label='Currency'
						value={user.currency}
						name="currency"
						type = "select"
						options =  {this.state.countries.filter((country)=> {return(country.currency_char !== null)} ).map((country) => {
										if (country.currency_char !== null) {
											return({
												key:country.id,
												flag:country.country_char.toLowerCase(),
												value:country.currency_char,
												text:country.currency_char
											});	
										}
										
									})}
						onSubmit={(value) => this.update({id: user.id, currency: value})}
					/>
					<Editable
					edit ={updated}
						label='Nationality'
						name='nationality'
						value={user.country}
						type = "select"
						options =  {this.state.countries.map((country) => {
										return({
											key:country.id,
											flag:country.country_char.toLowerCase(),
											value:country.name,
											text:country.name
										});	
									})}
						onSubmit={(value) => this.update({id: user.id, country: value})}
					/>
				</div>
			</div>
		);
	}
	
};
const mapStateToProps = ({userStore}) => ({
	user: userStore.currentUser
});

const mapDispatchToProps = {
	updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailCard);
