import React, {Component} from 'react';
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL} from '../../constants';
import {connect} from 'react-redux';
import '../../styles/index.scss';

class SocialLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className='row'>
				<div className='btn-group col-6'>
					<a className='btn btn-danger disabled'>
						<i className='icon-google' />
					</a>
					<a className='btn btn-danger' href={GOOGLE_AUTH_URL}>
						Google
					</a>
				</div>
				<div className='btn-group col-6'>
					<a className='btn bg-fb disabled'>
						<i className='icon-facebook' />
					</a>
					<a className='btn bg-fb text-white' href={FACEBOOK_AUTH_URL}>
						Facebook
					</a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({currentUser}) => {
	return {
		currentUser
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SocialLinks);
