import React from 'react';
import {NavLink} from 'react-router-dom';

const Footer = () => (
	<footer id='footer' role='contentinfo'>
		<div className='container'>
			<div className='d-flex justify-content-between align-items-center'>
				<div className=''>
					<div className='footer-widget footer-links'>
						<ul className='footer-links'>
							<li className='d-md-inline px-2'>
								<a href='#'> About Us</a>
							</li>
							<li className='d-md-inline px-2'>
								<a href='https://visit-all-nepal.flycricket.io/privacy.html'>Privacy Policy</a>
							</li>
							<li className='d-md-inline px-2'>
								<a href='#'>Terms & Conditions</a>
							</li>
							<li className='d-md-inline px-2'>
								<a href='#'>Partner With Us</a>
							</li>
							<li className='d-md-inline px-2'>
								<a href='#'>Blogs</a>
							</li>
							<li className='d-md-inline px-2'>
								<a href='/support'>Customer Support</a>
							</li>
						</ul>
					</div>
				</div>
				<div className=''>
					<span className=''>
						<ul className='social-icons'>
							<li>
								<a href='#'>
									<i className='icon-twitter' />
								</a>
							</li>
							<li>
								<a href='#'>
									<i className='icon-facebook' />
								</a>
							</li>
							<li>
								<a href='#'>
									<i className='icon-linkedin' />
								</a>
							</li>
							<li>
								<a
									href='#'
									onClick={(event) => {
										event.preventDefault();
										Tawk_API.popup();
									}}
								>
									<i className='fas fa-envelope' />
								</a>
							</li>
						</ul>
					</span>
				</div>
			</div>
			<hr className='m-0' />
			<div className='d-flex justify-content-between align-items-center pt-1'>
				<small className='block text-muted'>&copy; All rights reserved </small>
			</div>
		</div>
	</footer>
);
export default Footer;
