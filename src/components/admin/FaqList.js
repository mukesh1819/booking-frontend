import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getFaqs, deleteFaq} from '../../api/supportApi';
import swal from 'sweetalert';
import history from '../../history';
import {Accordion, Icon, Menu, Segment, Input, Card, Dropdown, Pagination} from 'semantic-ui-react';
import queryString from 'query-string';
import {CustomMenu} from './Menu';

class FaqList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			faqs: [],
			activeIndex: -1,
			activeMenuItem: 'All',
			pagination: {}
		};
	}

	changeCurrentPage = (e, {activePage}) => {
		var searchQuery = `?page=${activePage}`;
		this.setState({currentPage: activePage});
		this.fetchFaqLists({page: activePage});
		history.push({
			pathname: window.location.pathname,
			search: searchQuery
		});
	};

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchFaqLists(queryString.parse(this.props.location.search));
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
					faqs: response.data.faqs,
					pagination: response.data.meta.pagination
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

	onFilter = (values) => {
		this.setState({
			faqs: values
		});
	};

	render() {
		const {faqs, activeIndex, activeMenuItem, pagination} = this.state;
		const filterFields = [
			// {
			// 	name: 'category_eq',
			// 	label: 'Category',
			// 	type: 'select',
			// 	options: ['flight', 'package']
			// },
			{
				name: 'created_at_gteq',
				label: 'From Date',
				type: 'date'
			},
			{
				name: 'created_at_lteq',
				label: 'To Date',
				type: 'date'
			}
		];
		return (
			<div className='ui container'>
				<div className='d-flex justify-content-between'>
					<h3 className='title'>Faq List</h3>
					<Link to='/admin/faq/faq_form' className='btn bg-none color-accent'>
						Add Faq
					</Link>
				</div>
				<CustomMenu
					submitUrl='faqs'
					filterFields={filterFields}
					onFilter={(values) => this.onFilter(values)}
					items={[
						{
							label: 'Category',
							type: 'dropdown',
							name: 'category_cont',
							objects: [
								{
									label: 'Flights',
									value: 'flight'
								},
								{
									label: 'Packages',
									value: 'package'
								}
							]
						}
					]}
				/>

				<Segment>
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
												<span
													className='btn bg-none text-danger'
													onClick={() => this.destroyFaq(faq.idx)}
												>
													Delete
												</span>
											</Link>
										</div>
									</Accordion.Title>
									<Accordion.Content active={activeIndex === index}>
										<p>{faq.answer}</p>
										<p>Created At - {faq.created_at}</p>
									</Accordion.Content>
								</React.Fragment>
							);
						})}
					</Accordion>
				</Segment>

				<div className='text-center p-2'>
					<Pagination
						activePage={pagination.current_page}
						sizePerPage={pagination.per_page}
						onPageChange={this.changeCurrentPage}
						totalPages={pagination.total_pages}
					/>
				</div>
			</div>
		);
	}
}
export default FaqList;
