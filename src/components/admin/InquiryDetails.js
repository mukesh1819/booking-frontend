import React, {Component} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import {Badge} from '../shared';
import {Inquiry} from '../inquiries';
import history from '../../history';
import {deleteInquiry} from '../../api/inquiryApi';

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

	destroyInquiry(id) {
		// deleteInquiry(id)
		// 	.then((response) => {
		// 		swal({
		// 			title: 'Inquiry deleted!',
		// 			text: `this inquiry is deleted`,
		// 			icon: 'success',
		// 			button: 'Continue!'
		// 		});
		// 		history.push('/admin/inquiries');
		// 	})
		// 	.catch((error) => {
		// 		swal({
		// 			title: 'Inquiry Delete error',
		// 			text: 'Something went wrong. please try again or contact us',
		// 			icon: 'error',
		// 			button: 'Continue!'
		// 		});
		// 	});

		swal({
			title: 'Are you sure?',
			text: 'Once delete, your inquiry will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteInquiry(id).then((response) => {
					swal('this inquiry is deleted', {
						icon: 'success'
					});
					history.push('/admin/inquiries');
				});
			} else {
				swal('Your inquiry is not deleted yet');
			}
		});

	}

	render() {
		const {inquiry} = this.props.location.state;
		return (
			<div className='container'>
				<div className='card'>
					<div className='card-body'>
						<Inquiry inquiry={inquiry} aPackage={inquiry.package} />
						<div className='text-right'>
							<span>
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
							</span>
							<span className='btn btn-danger m-2' onClick={() => this.destroyInquiry(inquiry.idx)}>
								Delete
							</span>

							{inquiry.status === 'pending' && (
								<span
									className='btn btn-danger m-2'
									onClick={() => this.rejectUserPackage(inquiry.idx)}
								>
									Reject
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default InquiryDetails;
