import React from 'react';
import image from '../../images/404.jpg';
import {Segment, Header, Button, Icon, Grid, Divider, Search, Image, List} from 'semantic-ui-react';

const blogs = [
	{
		id: 1,
		title: 'Daniel Louise',
		description: `
		Last seen watching
		<a>
			<b>Arrested Development</b>
		</a>
		just now.`,
		image: image
	},
	{
		id: 2,
		title: 'Elliot Fu',
		description: `
		Last seen watching
		<a>
			<b>The Godfather Part 2</b>
		</a>
		yesterday.`,
		image: image
	},
	{
		id: 3,
		title: 'Stevie Feliciano',
		description: `							
		Last seen watching
		<a>
			<b>Bob's Burgers</b>
		</a>
		10 hours ago.`,
		image: image
	}
];

const Blogs = (props) => (
	<div className='container px-md-4 py-md-4 page'>
		<Segment raised className='p-4'>
			<h3 className='title'>Blogs</h3>
			<hr />
			<List relaxed divided>
				{blogs.map((blog) => (
					<List.Item>
						<Image avatar src={blog.image} />
						<List.Content>
							<List.Header as='a'>{blog.title}</List.Header>
							<List.Description>
								<div
									dangerouslySetInnerHTML={{
										__html: blog.description
									}}
								/>
							</List.Description>
						</List.Content>
					</List.Item>
				))}
			</List>
			<h3 className='title'> More Blogs </h3>
			<Segment placeholder>
				<Grid columns={2} stackable textAlign='center'>
					<Divider vertical>Or</Divider>

					<Grid.Row verticalAlign='middle'>
						<Grid.Column>
							<Header icon>
								<Icon name='search' />
								Popular blogs
							</Header>

							<Search placeholder='Search other blogs...' />
						</Grid.Column>

						<Grid.Column>
							<Header icon>
								<Icon name='world' />
								New Blog
							</Header>
							<Button primary>Add</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Segment>
	</div>
);

export default Blogs;
