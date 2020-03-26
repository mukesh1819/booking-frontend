import React, {Component} from 'react';
export default class Thumb extends React.Component {
	state = {
		loading: false,
		thumb: []
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.files.length == 0) {
			return;
		}

		this.setState({loading: true}, () => {
			let thumbs = [];

			nextProps.files.forEach((file) => {
				let reader = new FileReader();

				reader.onloadend = () => {
					thumbs << reader.result;
					this.setState({loading: false, thumb: thumbs});
				};
				reader.readAsDataURL(file);
			});
		});
	}

	render() {
		const {files} = this.props;
		const {loading, thumb} = this.state;
		let images = [];
		files.forEach((file) => {
			images.push(
				<img src={file.name} alt={file.name} className='img-thumbnail mt-2' height={200} width={200} />
			);
		});

		if (files.length == 0) {
			return null;
		}

		if (loading) {
			return <p>loading...</p>;
		}
		return <div>{images}</div>;
	}
}
