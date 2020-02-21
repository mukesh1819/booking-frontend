import React from 'react';
import {NavLink} from 'react-router-dom';
import './footer.scss';

const Footer = () => (
	<footer id='footer' role='contentinfo'>
		<div className='container'>
			<div className='row mx-0'>
				<div className='col-md-4'>
					<div className='footer-widget'>
						<h3>About Us</h3>
						{/* <p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eos molestias quod sint
							ipsum possimus temporibus officia iste perspiciatis consectetur in fugiat repudiandae cum.
							Totam cupiditate nostrum ut neque ab?
						</p> */}
					</div>
				</div>

				<div className='col-md-2 col-md-push-1'>
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
				</div>
			</div>

			<div className='row copyright'>
				<div className='col-md-12'>
					<p className='pull-left'>
						<small className='block'>&copy; Bookings Nepal </small>
					</p>
					<span className='text-center'>
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
			</div>
		</div>
	</footer>
);
export default Footer;
