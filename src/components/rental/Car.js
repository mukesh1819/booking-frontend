import React from 'react';
import {Segment, Header, Icon, Grid, Card, Divider, Search, Button} from 'semantic-ui-react';
import {isRefundable, numberWithCommas} from '../../helpers';
import {BASE_URL} from '../../constants';

export default function Car(props) {
	const {car} = props;

	return (
		<div class='mb-4'>
			<Card fluid>
				<Card.Content>
					<Grid columns={3} stackable>
						<Grid.Row>
							<Grid.Column>
								{car.image.length == 0 && (
									<Segment placeholder>
										<Header icon>
											<Icon className='image outline' />{' '}
										</Header>
									</Segment>
								)}
								{car.image.length > 0 && (
									<figure>
										<img src={BASE_URL + car.image[0].url} className='img-responsive' />
									</figure>
								)}
							</Grid.Column>

							<Grid.Column>
								<h3 className='ui header'>{car.car_type}</h3>
								<span className='text-small text-muted'>
									{/* <i className='fas fa-map-marker-alt' />&nbsp; */}
									{'With Carrier'}
								</span>
								<span className='text-small text-muted'>
									{/* <i className='fas fa-clock' />&nbsp; */}
									{car.duration}
								</span>
							</Grid.Column>

							<Grid.Column verticalAlign='middle' textAlign='center'>
								<div>
									<h2 className='ui header'>
										Rs. {numberWithCommas(car.price)}{' '}
										<span className='text-small text-muted'>/day</span>
									</h2>
									<button className='ui primary button'>Select</button>
								</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Card.Content>
			</Card>
		</div>
	);
}
