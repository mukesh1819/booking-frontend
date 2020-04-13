import React, {Component} from 'react';
import {companyDetails} from '../../helpers';
import {MailBox} from '../shared';
import {Tab} from 'semantic-ui-react';
import swal from 'sweetalert';
import {getFaqs} from '../../api/supportApi';

class CustomerSupport extends Component  {
	constructor(props){
		super(props);
		this.state={
			faqs: []
		}
	}

	fetchFaqs(params){
		getFaqs(params)
		.then((response) => {
			this.setState({
				faqs: response.data
			});
		})
		.catch((error) => {
			swal({
				title: 'Faq fetch error',
				text: 'Could not fetch questions. please try again or contact us',
				icon: 'error',
				button: 'Continue!'
			});
		})
	}
	

	render(){
		const panes = [
			{
				menuItem: 'Email Us',
				render: () => (
					<Tab.Pane attached={false}>
						<MailBox
							values={{
								description: '',
								subject: '',
								email: 'anup.singh2071@gmail.com'
							}}
						/>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Text',
				render: () => (
					<Tab.Pane attached={false}>
						<div className='text-center'>
							<div>{companyDetails.email}</div>
							<a href={`tel:${companyDetails.contact}`} className='btn btn-secondary btn-large m-2'>
								+977 {companyDetails.contact}
							</a>
						</div>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Chat',
				render: () => (
					<Tab.Pane attached={false}>
						<iframe src={companyDetails.directChat} style={{width: '100%', height: '440px'}}>
							<a href={companyDetails.directChat} />
						</iframe>
					</Tab.Pane>
				)
			}
		];
		return (
			<div className=''>
				<section className='bg-primary text-center'>
					<div className='container'>
						<h1 className='text-white text-larger p-4'> Welcome to our support center</h1>

						<input placeholder='Please type your question here' className='w-100' onChange={(e) => this.fetchFaqs(`q[question_cont]=${e.target.value}`)}/>
					</div>
				</section>
				<div className='container py-4'>
					<div className='card'>
						<div className='card-body'>
							<div className='d-flex'>
								<div className='widget p-2'>
									<div className='text-center'>
										<i className='fas fa-2x fa-plane departure mb-2' />
										<h3 className='count' onClick={() => this.fetchFaqs(`q[category_eq]=flight`)}>Flights</h3>
									</div>
								</div>
								<div className='widget p-2'>
									<div className='text-center'>
										<i className='fas fa-briefcase fa-2x mb-2' />
										<h3 className='count' onClick={() => this.fetchFaqs(`q[category_eq]=package`)}>Packages</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='card'>
						<div className='card-body'>
							<h3 className='title'> Frequently Asked Questions.</h3>
						</div>
					</div>
				</div>
				<section className='bg-white'>
					<div className='container'>
						<h3 className='title'>You can also</h3>
						{/* <div className='d-flex'>
							<div className='widget p-2'>
								<div className='text-center'>
									<i className='far fa-2x fa-envelope mb-2' />
									<h3 className='count'>Email Us</h3>
								</div>
							</div>
							<div className='widget p-2'>
								<div className='text-center'>
									<i className='fas fa-2x fa-sms mb-2' />
									<h3 className='count'>Text</h3>
								</div>
							</div>
							<div className='widget p-2'>
								<div className='text-center'>
									<i className='fas fa-2x fa-comments mb-2' />
									<h3 className='count'>Chat</h3>
								</div>
							</div>
						</div> */}
						<Tab menu={{secondary: true}} panes={panes} />
					</div>
				</section>
			</div>
		);
	}
};

export default CustomerSupport;
