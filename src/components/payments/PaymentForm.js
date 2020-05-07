import React, {Component} from 'react';
import {newPayment} from '../../api/paymentApi';
import swal from 'sweetalert';
import {makePayment} from '../../api/paymentApi';
import history from '../../history';

class PaymentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: null,
			fields: {}
		};
	}

	componentDidMount() {
		newPayment(this.props.idx)
			.then((res) => {
				this.setState({
					action: res.data.action,
					fields: res.data.fields
				});
			})
			.catch((error) => {
				// console.log(error);
				console.log(' payment page error', error);
			});
	}

	componentDidUpdate() {
		// if (this.state.action !== null) {
		// 	document.getElementById('pay-form').submit();
		// }
		makePayment(this.props.transaction)
			.then((response) => {
				history.push(`/payment_success/${this.props.idx}`);
			})
			.catch((error) => console.log('Payment Error', error));
	}

	render() {
		const {action, fields} = this.state;
		return (
			<div>
				<div className='text-center p-5'>
					<img src='/assets/loading.gif' width='50' height='50' />
					<div>Redirecting to Payment Page......</div>
				</div>

				<form id='pay-form' method='POST' action={action}>
					{Object.keys(fields).map((key) => {
						console.log(key);
						return <input id={key} type='hidden' name={key} value={fields[key]} />;
					})}
				</form>
			</div>
		);
	}
}

export default PaymentForm;
