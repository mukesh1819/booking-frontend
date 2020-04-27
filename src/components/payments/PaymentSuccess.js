import React, {Component} from 'react';
import {newPayment} from '../../api/paymentApi';
import swal from 'sweetalert';
import successImage from '../../images/success.png';
import {fetchTicket} from '../../api/flightApi';
import {Button} from 'semantic-ui-react';
import {downloadTicket} from '../../helpers/general';

class PaymentSuccess extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};
	}

	componentDidMount() {}

	componentDidUpdate() {}

	download(idx) {
		this.setState({
			loading: true
		});
		fetchTicket(idx).then((response) => {
			downloadTicket(response.data);
			this.setState({
				loading: false
			});
		});
	}

	render() {
		const {idx} = this.props.match.params;
		const {loading} = this.state;
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body text-center'>
						<h3 className='title'>Payment Successfull</h3>
						<div className='text-center'>
							<img src={successImage} style={{width: '100px', height: '100px'}} />
						</div>

						<div>
							<Button
								primary
								loading={loading}
								className='btn btn-primary btn-large '
								onClick={() => this.download(idx)}
							>
								Download ticket
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PaymentSuccess;
