import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import {useState, useEffect, useRef} from 'react';

function useOutsideAlerter(ref, dropped) {
	function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
			$(ref.current).addClass('d-none');
		}
	}

	useEffect(() => {
		if (dropped) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	});
}

export default ({children, className, icon, title, position = 'left', ...rest}) => {
	const [dropped, setDrop] = useState(false);
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, dropped);

	return (
		<div style={{position: 'relative', width: '100%'}}>
			{/* <Dropdown alignRight>
				<Dropdown.Toggle id='dropdown-basic' className={`dropdown form-control ${className}`} />
				<Dropdown.Menu className='p-1 dropdown-menu-right'>{children}</Dropdown.Menu>
			</Dropdown> */}
			<div className={`dropdown custom-dropdown ${className}`} onClick={() => setDrop(!dropped)}>
				<i className={`${icon} m-0`} /> {title} <i className='icon-chevron-down' />
				<div ref={wrapperRef} className={`menu right-0 ${dropped ? 'open' : 'd-none'}`}>
					{children}
				</div>
			</div>
		</div>
	);
};
