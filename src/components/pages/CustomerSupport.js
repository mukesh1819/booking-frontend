import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/actions';
import {companyDetails} from '../../helpers';
import {MailBox} from '../shared';
import {Tab, Accordion, Icon, Search} from 'semantic-ui-react';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import swal from 'sweetalert';
import {getFaqs} from '../../api/supportApi';
import {sendEmail} from '../../api/userApi';
import _ from 'lodash';

class CustomerSupport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			faqs: [],
			activeIndex: 0,
			selectedCategory: null,
			isLoading: false,
			results: [],
			value: '',
			searchedFaq: null
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchFaqs();
	}

	fetchFaqs(params) {
		getFaqs(params)
			.then((response) => {
				this.setState({
					faqs: response.data
				});
			})
			.catch((error) => {
				console.log(' Faq fetch error', error);
			});
	}

	emailUser(variables) {
		sendEmail(variables)
			.then((response) => {
				// console.log(response);
				swal({
					title: 'Email Sent!',
					text: response.message,
					icon: 'success',
					button: 'Continue!'
				});
			})
			.catch((error) => {
				console.log('support email error', error);
			});
	}

	handleClick = (e, titleProps) => {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({activeIndex: newIndex});
	};

	handleResultSelect = (e, {result}) => this.setState({value: result.title, searchedFaq: result});

	handleSearchChange = (e, {value}) => {
		this.setState({isLoading: true, value});

		setTimeout(() => {
			if (this.state.value.length < 1)
				return this.setState({
					isLoading: false,
					results: [],
					value: '',
					searchedFaq: null
				});

			var results = _.filter(this.state.faqs, function(e) {
				return e.question.toLowerCase().includes(value.toLowerCase());
			}).map((v) => ({
				title: v.question,
				description: v.answer
			}));
			this.setState({
				isLoading: false,
				results: results
			});
			// getFaqs(`q[question_cont]=${value}`).then((response) => {
			// 	var results = response.data.map((v) => ({
			// 		title: v.question,
			// 		description: v.answer
			// 	}));
			// 	this.setState({
			// 		isLoading: false,
			// 		results: results
			// 	});
			// });
		}, 0);
	};

	render() {
		const {faqs, activeIndex, selectedCategory} = this.state;
		const {isLoading, value, results, searchedFaq} = this.state;
		const {currentUser} = this.props;
		const panes = [
			{
				menuItem: 'Email Us',
				render: () => (
					<Tab.Pane attached={false}>
						<div className='row'>
							<div className='col-md-6 offset-md-3'>
								<MailBox
									values={{
										description: '',
										subject: '',
										email: currentUser.email
									}}
									sendEmail={(values) => this.emailUser(values)}
								/>
							</div>
						</div>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Text',
				render: () => (
					<Tab.Pane attached={false}>
						<div className='text-center'>
							<div>{companyDetails.email}</div>
							<a href={`tel:${companyDetails.contact}`} className='btn btn-secondary btn-large m-2'>
								{companyDetails.contact}
							</a>
						</div>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Chat',
				render: () => (
					<Tab.Pane attached={false}>
						<div className='row'>
							<div className='col-md-6 offset-md-3'>
								<iframe src={companyDetails.directChat} style={{width: '100%', height: '440px'}}>
									<a href={companyDetails.directChat} />
								</iframe>
							</div>
						</div>
					</Tab.Pane>
				)
			}
		];
		return (
			<div className=''>
				<section className='bg-primary text-center'>
					<div className='container'>
						<h1 className='text-white text-larger p-4'> Welcome to our support center</h1>
						<Search
							fluid
							loading={isLoading}
							onResultSelect={this.handleResultSelect}
							onSearchChange={this.handleSearchChange}
							results={results}
							value={value}
							className='w-100 search-faq'
							placeholder='Please type your question here'
							{...this.props}
						/>
					</div>
				</section>
				<div className='container py-4'>
					{searchedFaq !== null && (
						<div className='card'>
							<div className='card-body'>
								<h3>{searchedFaq.title}</h3>
								<p>{searchedFaq.description}</p>
							</div>
						</div>
					)}
					<div className='card mt-4'>
						<div className='card-body'>
							<div className='d-flex'>
								<div
									className='widget p-2'
									onClick={() => {
										this.setState({
											selectedCategory: 'flight'
										});
										this.fetchFaqs(`q[category_eq]=flight`);
									}}
								>
									<div className='text-center cursor-pointer'>
										<i
											className={`${selectedCategory == 'flight'
												? 'active'
												: ''} fas fa-2x fa-plane departure mb-2`}
										/>
										<h3 className='count'>Flights</h3>
									</div>
								</div>
								<div
									className='widget p-2'
									onClick={() => {
										this.setState({
											selectedCategory: 'package'
										});
										this.fetchFaqs(`q[category_eq]=package`);
									}}
								>
									<div className='text-center cursor-pointer'>
										<i
											className={`${selectedCategory == 'package'
												? 'active'
												: ''} fas fa-2x fa-briefcase mb-2`}
										/>
										<h3 className='count'>Packages</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='card mt-4'>
						<div className='card-body'>
							<h3 className='title'> Frequently Asked Questions.</h3>
							<Accordion styled fluid className='border-none'>
								{faqs.map((faq, index) => {
									return (
										<React.Fragment>
											<Accordion.Title
												active={activeIndex === index}
												index={index}
												onClick={this.handleClick}
											>
												<Icon name='dropdown' />
												{faq.question}
											</Accordion.Title>
											<Accordion.Content active={activeIndex === index}>
												<p>{faq.answer}</p>
											</Accordion.Content>
										</React.Fragment>
									);
								})}
							</Accordion>
						</div>
					</div>
				</div>
				<section className='bg-white'>
					<div className='container'>
						<h3 className='title'>You can also</h3>
						<Tab menu={{secondary: true}} panes={panes} />
					</div>
				</section>
			</div>
		);
	}
}
const mapStateToProps = ({userStore}) => {
	return {
		currentUser: userStore.currentUser
	};
};

const mapDispatchToProps = {
	loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSupport);
