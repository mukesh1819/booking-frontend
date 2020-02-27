import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup} from 'reactstrap';
import {Redirect} from 'react-router-dom';

const ModalExample = (props) => {
	const {title, buttonLabel, className, show, children, toggle, onSuccess} = props;

	// const toggle = () => {
	// 	setModal(!modal);
	// };
	return (
		<div>
			<Modal size='lg' isOpen={show} toggle={toggle} className={className} backdrop={true}>
				<ModalHeader toggle={toggle}> {title} </ModalHeader>
				<ModalBody style={{display:'block'}}>{children}</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={() => {
							onSuccess();
						}}
					>
						{buttonLabel}
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default ModalExample;
