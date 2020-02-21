import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

const isSearched = (searchTerm) => (item) => item.Airline.toLowerCase().includes(searchTerm.toLowerCase());

const Search = ({value, onChange, children}) => (
	<form>
		{children} <input type='text' value={value} onChange={onChange} />
	</form>
);

class TableView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			sortKey: 'NONE',
			isSortReverse: false
		};
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	onSearchChange(event) {
		this.setState({
			searchTerm: event.target.value
		});
	}

	onDismiss(id) {
		const isNotId = (item) => item.objectID !== id;
		const updatedList = this.state.list.filter(isNotId);
		this.setState({
			list: updatedList
		});
	}

	render() {
		const {values, ChildComponent, ...rest} = this.props;
		const {sortKey, isSortReverse, searchTerm} = this.state;
		// const filteredList = values.filter(isSearched(searchTerm));
		const filteredList = values;
		return (
			<React.Fragment>
				{/* <Search value={searchTerm} onChange={this.onSearchChange} /> */}
				<div className=''>{filteredList.map((value) => <ChildComponent {...rest} flight={value} />)}</div>
			</React.Fragment>
		);
	}
}

export default TableView;
