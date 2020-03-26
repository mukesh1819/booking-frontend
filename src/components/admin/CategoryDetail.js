import React, {Component} from 'react';
import {Package} from '../packages';

const CategoryDetail = (props) => {
	const {category} = props.location.state;
	return (
		<div className='container'>
			{category.packages.length > 0 && (
				<div>
					<h3 className='m-3'>{category.name} Category</h3>
					{category.packages.length > 0 &&
						category.packages.map((aPackage) => {
							return <Package aPackage={aPackage} />;
						})}
				</div>
			)}
		</div>
	);
};

export default CategoryDetail;
