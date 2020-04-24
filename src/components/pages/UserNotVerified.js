import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {companyDetails} from '../../helpers';
import {verifyEmail} from '../../api/userApi';
import history from '../../history';
import {loginUser} from '../../redux/actions';

const UserNotVerified = (props) => {
	return (
		<div className=''>
			<section className='bg-primary text-center'>
				<div className='container text-white '>
					<div className='text-small'>{props.currentUser.email}</div>
					<h1 className=' text-white text-larger p-4'> Your Email is not verified</h1>
					<div className='text-small'>Please check your mail to verify your account</div>
				</div>
			</section>
			<section className='bg-white text-center'>
				<span className='text-small'>Didn't get any mail?</span>
				<ul>
					<li>Check your spam/junk folder</li>
					<li>
						Click <a href=''> here</a> to resend email activation link
					</li>
				</ul>
				<div />
			</section>
			<section className='text-center'>
				<h3>Need help?</h3>
				<span className='btn btn-secondary'>Customer Support</span>
			</section>
		</div>
	);
};

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {
	loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNotVerified);
