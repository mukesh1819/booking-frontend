import React from 'react';

const CustomerSupport = () => (
	<div className='text-center'>
		<section className='bg-primary'>
			<h1 className='text-white'> We are here to help.</h1>
		</section>
		<section>
			<div className='container'>
				<h3 className='title'> Frequently Asked Questions.</h3>
				<div className='row'>
					<div className='widget col-sm-12 col-md-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>
									<h3 className='count'>Flights</h3>
								</div>
							</div>
						</div>
					</div>
					<div className='widget col-sm-12 col-md-4'>
						<div className='card'>
							<div className='card-body'>
								<div className='text-center'>
									<h3 className='count'>Packages</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section className='bg-gray'>
			<h3 className='title'>Contact Us</h3>
			<div>anup.singh2071@gmail.com</div>
			<div className='btn btn-secondary btn-large m-2'>+977 9818311488</div>
		</section>
	</div>
);

export default CustomerSupport;