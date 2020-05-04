import React, {Component} from 'react';
import history from '../../history';
import {Link} from 'react-router-dom';

const SideBar = (props) => {
	const {items, onItemSelect} = props;
	return (
		<div className='side-nav top-nav'>
			{items.map(({label, name, details, icon, value, link, active, Component, ...rest}) => (
				<div className='item d-flex align-items-center' key={name} onClick={() => onItemSelect(name)}>
					<i className={`${icon} p-2 text-primary`} />
					<span>
						<span className={active ? 'text-primary' : 'color-accent'}>{label}</span>
						<span className='small text-muted' style={{display: 'table'}}>
							{details}
						</span>
					</span>
					<span className='text-bold ml-auto'>{value}</span>
				</div>
			))}
		</div>
	);
};

export default SideBar;

// import React, {useState} from 'react';
// import {Header, Image, Menu, Ref, Segment, Sidebar} from 'semantic-ui-react';

// const SideBar = (props) => {
// 	const {items, onItemSelect, children} = props;
// 	const segmentRef = React.useRef();
// 	const [visible, setVisible] = useState(true);
// 	return (
// 		<div className='side-nav top-nav'>
// 			<Sidebar.Pushable as={Segment.Group} raised>
// 				<Sidebar
// 					as={Menu}
// 					animation='overlay'
// 					icon='labeled'
// 					onHide={() => setVisible(false)}
// 					vertical
// 					target={segmentRef}
// 					visible={visible}
// 					width='thin'
// 				>
// 					<Menu.Item as='a'>Home</Menu.Item>
// 					{items.map(({label, name, details, icon, value, link, active, Component, ...rest}) => (
// 						<div className='item d-flex align-items-center' key={name} onClick={() => onItemSelect(name)}>
// 							<i className={`${icon} p-2 text-primary`} />
// 							<span>
// 								<span className={active ? 'text-primary' : 'color-accent'}>{label}</span>
// 								<span className='small text-muted' style={{display: 'table'}}>
// 									{details}
// 								</span>
// 							</span>
// 							<span className='text-bold ml-auto'>{value}</span>
// 						</div>
// 					))}
// 				</Sidebar>

// 				<Ref innerRef={segmentRef}>
// 					<Segment secondary>{children}</Segment>
// 				</Ref>
// 			</Sidebar.Pushable>
// 		</div>
// 	);
// };

// export default SideBar;
