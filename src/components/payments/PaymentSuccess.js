import React, {Component} from 'react';
import {newPayment} from '../../api/paymentApi';
import swal from 'sweetalert';
import successImage from '../../images/success.png';
import {downloadTicket} from '../../api/flightApi';

class PaymentSuccess extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	componentDidUpdate() {}

	render() {
		const {idx} = this.props.match.params;
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body text-center'>
						<h3 className='title'>Payment Successfull</h3>
						<div className='text-center'>
							<img src={successImage} style={{width: '100px', height: '100px'}} />
						</div>

						<div>
							<span onClick={() => downloadTicket(idx)} className='btn btn-secondary btn-large'>
								Download ticket
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PaymentSuccess;
