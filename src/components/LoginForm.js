import React from 'react';
import {Form, Button} from 'semantic-ui-react';

export default () => {
	return (
		<Form inverted>
			<Form.Group widths='equal'>
				<Form.Input fluid label='First name' placeholder='First name' />
				<Form.Input fluid label='Last name' placeholder='Last name' />
			</Form.Group>
			<Form.Checkbox label='I agree to the Terms and Conditions' />
			<Button type='submit'>Submit</Button>
		</Form>
	);
};
