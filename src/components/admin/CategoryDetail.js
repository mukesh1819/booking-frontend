import React, {Component} from 'react';
import {Package} from '../packages';
import {Card} from 'semantic-ui-react';

const CategoryDetail = (props) => {
	const {category} = props.location.state;
	return (
		<div className='container'>
			<h3 className='title'>{category.name}</h3>
			{category.packages.length > 0 && (
				<Card.Group itemsPerRow={4}>
					{category.packages.length > 0 &&
						category.packages.map((aPackage) => {
							return (
								<Card raised>
									<Package aPackage={aPackage} />
								</Card>
							);
						})}
				</Card.Group>
			)}
		</div>
	);
};

export default CategoryDetail;
