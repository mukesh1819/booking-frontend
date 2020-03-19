import React, {Component} from 'react';
import Package from '../packages/Package';

const CategoryDetail = (props) => {
    debugger;
    const {category} = props.location.state
    return(
        <div className='container'>
            {category.packages.length > 0 && 
                <div>
                    <h3 className='m-3'>{category.name} Category</h3>
                    <Package aPackages={category.packages}/>
                </div>
            }
        </div>
    );
}

export default CategoryDetail;