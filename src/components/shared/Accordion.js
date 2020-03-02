import React, {Component} from 'react';
import {Accordion, useAccordionToggle} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function CustomToggle({children, eventKey}) {
	const decoratedOnClick = useAccordionToggle(eventKey, () => console.log('totally custom!'));

	return (
		<div className='d-flex text-primary text-bold align-items-center' onClick={decoratedOnClick}>
			{children}
			<i className='icon-arrow-bold-down ml-auto' />
		</div>
	);
}

export default ({title, children}) => {
	return (
		<Accordion defaultActiveKey='0'>
			<Card>
				<Card.Header>
					<CustomToggle eventKey='0'>{title}</CustomToggle>
				</Card.Header>
				<Accordion.Collapse eventKey='0'>
					<Card.Body>{children}</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};
