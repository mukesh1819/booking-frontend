import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getFaqs, deleteFaq} from '../../api/supportApi';
import swal from 'sweetalert';
import history from '../../history';
import {Accordion, Icon, Menu, Segment, Input} from 'semantic-ui-react';

class FaqList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			faqs: [],
			activeIndex: -1,
			activeMenuItem: 'All'
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchFaqLists();
	}

	handleItemClick = (e, {name}) => {
		var searchQuery = name == 'All' ? '' : `q[category_eq]=${name.toLowerCase()}`;
		this.fetchFaqLists(searchQuery);
		this.setState({activeMenuItem: name});
	};

	handleClick = (e, titleProps) => {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({activeIndex: newIndex});
	};

	fetchFaqLists = (params) => {
		getFaqs(params)
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					faqs: response.data
				});
			})
			.catch((error) => {
				console.log('Fetch Package Error', error);
			});
	};

	destroyFaq(id) {
		// deleteFaq(id)
		// 	.then((response) => {
		// 		swal({
		// 			title: 'Faq deleted!',
		// 			text: `this Faq is deleted`,
		// 			icon: 'success',
		// 			button: 'Continue!'
		// 		});
		// 		history.go();
		// 	})
		// 	.catch((error) => {
		// 		swal({
		// 			title: 'Faq Delete error',
		// 			text: 'Something went wrong. please try again or contact us',
		// 			icon: 'error',
		// 			button: 'Continue!'
		// 		});
		// 	});

		swal({
			title: 'Are you sure?',
			text: 'Once delete, your faq will be deleted',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteFaq(id).then((response) => {
					swal('this faq is deleted', {
						icon: 'success'
					});
					history.go();
				});
			} else {
				swal('Your faq is not deleted yet');
			}
		});
	}

	render() {
		const {faqs, activeIndex, activeMenuItem} = this.state;
		return (
			<div className='container p-4'>
				<div className=''>
					<div className='d-flex justify-content-between'>
						<h3 className='title'>Faq List</h3>
						<Link to='/admin/faq/faq_form' className='btn bg-none color-accent'>
							Add Faq
						</Link>
					</div>
					<Menu pointing>
						<Menu.Item name='All' active={activeMenuItem === 'All'} onClick={this.handleItemClick} />
						<Menu.Item name='Flight' active={activeMenuItem === 'Flight'} onClick={this.handleItemClick} />
						<Menu.Item
							name='Package'
							active={activeMenuItem === 'Package'}
							onClick={this.handleItemClick}
						/>
						<Menu.Menu position='right'>
							<Menu.Item>
								<Input icon='search' placeholder='Search...' />
							</Menu.Item>
						</Menu.Menu>
					</Menu>
					<Accordion styled fluid>
						{faqs.map((faq, index) => {
							return (
								<React.Fragment>
									<Accordion.Title
										active={activeIndex === index}
										index={index}
										onClick={this.handleClick}
									>
										<div className='d-flex justify-content-between'>
											{faq.question}
											<Link
												to={{
													pathname: `/admin/faq/edit/${faq.idx}`,
													state: {
														faq: faq
													}
												}}
											>
												<i className='fas fa-contact' />
												<span className='btn bg-none text-primary'>edit</span>
											</Link>
										</div>
									</Accordion.Title>
									<Accordion.Content active={activeIndex === index}>
										<p>{faq.answer}</p>
									</Accordion.Content>
									<div>
										<span
											className='btn bg-none text-danger'
											onClick={() => this.destroyFaq(faq.idx)}
										>
											Delete
										</span>
									</div>
								</React.Fragment>
							);
						})}
					</Accordion>
				</div>
			</div>
		);
	}
}
export default FaqList;
