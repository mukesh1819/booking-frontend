import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import {Badge} from '../shared';
import {Inquiry} from '../inquiries';

class InquiryDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	rejectUserPackage(id) {
		rejectInquiry(id)
			.then((response) => {
				swal({
					title: 'User Package Rejection Response!',
					text: `${response.data.message}`,
					icon: 'success',
					button: 'Continue!'
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const {inquiry} = this.props.location.state;
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						<Inquiry inquiry={inquiry} aPackage={inquiry.package} />
						<div className=''>
							{inquiry.status === 'pending' && (
								<div className='text-right'>
									<Link
										to={{
											pathname: '/admin/edit_inquiry',
											state: {
												inquiry: inquiry
											}
										}}
										className='btn btn-secondary m-2'
									>
										Edit
									</Link>

									<span
										className='btn btn-danger m-2'
										onClick={() => this.rejectUserPackage(inquiry.id)}
									>
										Reject
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default InquiryDetails;
