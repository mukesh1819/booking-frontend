import React, {Component} from 'react';
import CKEditor from 'ckeditor4-react';

class BecomePartnerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<div className='container p-4'>
				<div className='card'>
					<div className='card-body'>Become a Partner</div>
					<CKEditor data='<p>Hello from CKEditor 4!</p>' />
				</div>
			</div>
		);
	}
}
export default BecomePartnerForm;
