import React, {useEffect, useState, Component} from 'react';
import {setTTLtime} from '../../redux/actions';
import swal from 'sweetalert';
import {connect} from 'react-redux';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			minutes: props.ttlTime.minutes(),
			seconds: props.ttlTime.seconds()
		};
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			const {seconds, minutes} = this.state;
			if (seconds > 0) {
				this.setState(({seconds}) => ({
					seconds: seconds - 1
				}));
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(this.interval);
					swal({
						title: 'Time Ended!',
						text: 'Your flight Reservation time has ended. Please try Again',
						icon: 'warning',
						button: 'Try Again!'
					});
				} else {
					this.setState(({minutes}) => ({
						minutes: minutes - 1,
						seconds: 59
					}));
				}
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const {minutes, seconds} = this.state;
		return (
			<div>
				{minutes === 0 && seconds === 0 ? (
					<span>Time's up!</span>
				) : (
					<span>
						Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
					</span>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({flightStore}) => {
	// return {
	// 	ttlTime: flightStore.ttlTime
	// };

	return {};
};

const mapDispatchToProps = {
	// setTTLtime
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
