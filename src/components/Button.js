import React, {Component} from 'react';

class Button extends Component {
	render() {
		const {onClick, className = '', children, ...rest} = this.props;

		return (
			<button onClick={onClick} className={className} type='button' {...rest}>
				{children}
			</button>
		);
	}
}

export default Button;
