import React from 'react';
import {Icon, Image, Segment, Step} from 'semantic-ui-react';

const Stepper = (props) => {
	const {step, children} = props;
	const steps = [
		{level: 1, title: 'Partner Details', description: 'Enter your details', icon: 'user'},
		{level: 2, title: 'Company Details', description: 'Enter your company information', icon: 'company'}
	];
	return (
		<div>
			<Step.Group attached='top'>
				{steps.map(({icon, title, description, level}) => (
					<Step completed={level < step ? true : false} active={level == step ? true : false}>
						<Icon name={icon} />
						<Step.Content>
							<Step.Title>{title}</Step.Title>
							<Step.Description>{description}</Step.Description>
						</Step.Content>
					</Step>
				))}
			</Step.Group>

			<Segment attached>{children}</Segment>
		</div>
	);
};

export default Stepper;
