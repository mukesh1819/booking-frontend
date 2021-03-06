import React from 'react';
import {Dropdown} from 'react-bootstrap';
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
		<div style={{position: 'relative'}}>
			{/* <Dropdown alignRight>
				<Dropdown.Toggle id='dropdown-basic' className={`dropdown form-control ${className}`} />
				<Dropdown.Menu className='p-1 dropdown-menu-right'>{children}</Dropdown.Menu>
			</Dropdown> */}
			<div className={`custom-dropdown ${className}`} onClick={() => setDrop(!dropped)}>
				<i className={`${icon} m-0`} /> {title} <i className='icon-chevron-down' />
			</div>
			<div ref={wrapperRef} className={`custom-dropdown-menu right-0 ${dropped ? 'open' : 'd-none'}`}>
				{children}
			</div>
		</div>
	);
};
