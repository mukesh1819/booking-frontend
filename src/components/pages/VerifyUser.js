import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {companyDetails} from '../../helpers';
import {verifyEmail} from '../../api/userApi';
import history from '../../history';
import swal from 'sweetalert';
import {loginUser} from '../../redux/actions';

const VerifyUser = (props) => {
	const {token} = props.match.params;
	const [isVerified, setVerification] = useState(false);

	useEffect(() => {
		if (!isVerified) {
			console.log('TOKEN', token);
			verifyEmail(token)
				.then((response) => {
					setVerification(true);
					props.loginUser(response.data.user);
					history.push('/');
					swal({
						title: 'Account activated successfully',
						text: 'Your email has been verified and your account is successfully activated',
						icon: 'success',
						button: 'Continue!'
					});
				})
				.catch((error) => {
					console.log(' Email verify error for account activation', error);
				});
		}
	});

	return <div className=''>{!isVerified && <div>loading</div>}</div>;
};

const mapStateToProps = ({userStore}) => ({
	currentUser: userStore.currentUser
});

const mapDispatchToProps = {
	loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser);