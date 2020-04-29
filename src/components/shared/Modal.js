import React, {useState} from 'react';
import {Button, Header, Icon, Image, Modal} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

const ModalExample = (props) => {
	const {title, buttonLabel, className, show, children, toggle, onSuccess} = props;

	// const toggle = () => {
	// 	setModal(!modal);
	// };
	return (
		<Modal open={show} closeOnDimmerClick={toggle} onClose={toggle} closeOnEscape={toggle} closeIcon>
			{title && (
				<Modal.Header className=''>
					<h3 className='text-primary'>{title}</h3>
				</Modal.Header>
			)}
			<Modal.Content scrolling>{children}</Modal.Content>
			{buttonLabel !== undefined && (
				<Modal.Actions className='text-center'>
					<Button
						primary
						onClick={() => {
							onSuccess();
						}}
					>
						{buttonLabel} <Icon name='chevron right' />
					</Button>
				</Modal.Actions>
			)}
		</Modal>
	);
};

export default ModalExample;
