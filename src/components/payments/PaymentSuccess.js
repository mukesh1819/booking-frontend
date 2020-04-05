import React, {Component} from 'react';
import {newPayment} from '../../api/paymentApi';
import swal from 'sweetalert';
import successImage from '../../images/success.png';

class PaymentSuccess extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	componentDidUpdate() {}

	render() {
		const {idx} = this.props.match.params.idx;
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body text-center'>
						<h3 className='title'>Payment Successfull</h3>
						<span>
							<img src={successImage} />
						</span>

						<div className='btn btn-secondary'>Download Ticket</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PaymentSuccess;
