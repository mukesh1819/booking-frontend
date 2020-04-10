import React from 'react';

export default () => (
	<div className='navbar-header d-flex align-items-center'>
		<button
			className='navbar-toggler'
			type='button'
			data-toggle='collapse'
			data-target='#sidebar'
			aria-controls='sidebar'
			aria-expanded='false'
			aria-label='Toggle navigation'
			onClick={() => this.toggleSidebar()}
		>
			<i className={this.state.sideBarIsVisible ? 'icon-cross' : 'icon-menu'} />
		</button>
		<Link to='/' className='navbar-brand animated bounce delay-2s'>
			visitallnepal.com
		</Link>
	</div>
);
