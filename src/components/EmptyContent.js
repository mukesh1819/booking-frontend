import React, {Component} from 'react';

class EmptyContent extends Component {
	render() {
		const {children} = this.props;
		return <div className='jumbotron text-center'>{children}</div>;
	}
}

export default EmptyContent;
