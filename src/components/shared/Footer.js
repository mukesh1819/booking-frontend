import React from 'react';
import {NavLink} from 'react-router-dom';
import './footer.scss';

const Footer = () => (
	<footer id='footer' role='contentinfo'>
		<div className='container-fluid'>
			<div className='d-flex justify-content-between align-items-center'>
				<div className=''>
					<div className='footer-widget footer-links'>
						<ul className='footer-links'>
							<li className='d-md-inline px-2'>
								<a href='#'> About Us</a>
							</li>
							<li className='d-md-inline px-2'>
								<a href='#'>Privacy Policy</a>
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
								<a href='#'>Contact Us</a>
							</li>
						</ul>
					</div>
				</div>
				<div className=''>
					<span className=''>
						<ul className='footer-social-icons'>
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
								<a href='#'>
									<i className='icon-dribbble' />
								</a>
							</li>
						</ul>
					</span>
				</div>

				{/* <div className='col-md-4 col-md-push-1'>
					<div className='footer-widget'>
						<h3>Destination</h3>
						<ul className='footer-links'>
							<li>
								<a href='#'>Pokhara</a>
							</li>
							<li>
								<a href='#'>Lumbini</a>
							</li>
							<li>
								<a href='#'>Mustang</a>
							</li>
							<li>
								<a href='#'>Jiri</a>
							</li>
							<li>
								<a href='#'>Rara</a>
							</li>
						</ul>
					</div>
				</div>

				<div className='col-md-2 col-md-push-1'>
					<div className='footer-widget'>
						<h3>Hotels</h3>
						<ul className='footer-links'>
							<li>
								<a href='#'>ABC Hotel</a>
							</li>
							<li>
								<a href='#'>Everest Hotel</a>
							</li>
							<li>
								<a href='#'>Hotel Annapurna</a>
							</li>
							<li>
								<a href='#'>Deluxe Hotel</a>
							</li>
							<li>
								<a href='#'>Summit Hotel</a>
							</li>
						</ul>
					</div>
				</div>

				<div className='col-md-3 col-md-push-1'>
					<div className='footer-widget'>
						<h3>Get In Touch</h3>
						<ul className='footer-quick-contact'>
							<li>
								<a href='#'>
									<i className='icon-phone' /> +977 9818311488
								</a>
							</li>
							<li>
								<a href='#'>
									<i className='icon-mail2' /> info@bookingnepal.com
								</a>
							</li>
							<li>
								<a href='#'>
									<i className='icon-chat' /> Live Chat
								</a>
							</li>
						</ul>
					</div>
				</div> */}
			</div>
			<hr className='m-0' />
			<div className='d-flex justify-content-between align-items-center p-1'>
				<small className='block text-muted'>&copy; All rights reserved </small>
			</div>
		</div>
	</footer>
);
export default Footer;
