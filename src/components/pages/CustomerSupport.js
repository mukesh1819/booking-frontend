import React from 'react';
import {companyDetails} from '../../helpers';
import {MailBox} from '../shared';
import {Tab} from 'semantic-ui-react';

const CustomerSupport = () => {
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

					<input placeholder='Please type your question here' className='w-100' />
				</div>
			</section>
			<div className='container py-4'>
				<div className='card'>
					<div className='card-body'>
						<div className='d-flex'>
							<div className='widget p-2'>
								<div className='text-center'>
									<i className='fas fa-2x fa-plane departure mb-2' />
									<h3 className='count'>Flights</h3>
								</div>
							</div>
							<div className='widget p-2'>
								<div className='text-center'>
									<i className='fas fa-briefcase fa-2x mb-2' />
									<h3 className='count'>Packages</h3>
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
};

export default CustomerSupport;
