import React, {Component} from 'react';
import {getCategories} from '../../api/categoryApi';
import Package from '../packages/Package';

class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	componentDidMount() {
        this.fetchDetails();
    }

    fetchDetails(){
        getCategories()
        .then((response) => {
            console.log(response);
            this.setState({
                categories: response.data
            });
        })

    }

	render() {
		return (
			<ul>
                {this.state.categories.map((category) => {
                    return(
                        <React.Fragment>
                            <li>{category.name}</li>
                                
                                    {category.packages.filter((p) => {return(p !== null)}).map((cp) => {
                                        return(
                                            <Package aPackage= {cp}/>
                                        );
                                    })}
                                
                        </React.Fragment>
                        
                    );
                })}
            </ul>
		);
	}
}

export default Categories;
