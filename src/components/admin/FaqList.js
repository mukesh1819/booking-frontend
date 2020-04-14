import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {passCsrfToken, toTableData} from '../../helpers';
import {getFaqs} from '../../api/supportApi';
import swal from 'sweetalert';

class FaqList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			faqs: []
		};
	}

	componentDidMount() {
		passCsrfToken(document, axios);
		this.fetchFaqLists();
	}

	fetchFaqLists = () => {
		getFaqs()
			.then((response) => {
				// console.log('List of Packages', response.data);
				this.setState({
					faqs: response.data
				});
			})
			.catch((errors) => {
				// console.log('Fetch Package Error', errors);
				swal({
					title: 'faq fetch error',
					text: 'could not able to fetch Faq. please try again or contact us',
					icon: 'error',
					button: 'Continue!'
				});
			});
	};
    
	render() {
        const {faqs} = this.state;
		return (
			<div className='container'>
				<div className=''>
					<div className='col-12 d-flex justify-content-between'>
						<h3>Faq List</h3>
						<Link to='/admin/faq/faq_form' className='btn bg-none text-secondary'>
							Add Faq
						</Link>
					</div>

					<table className='table table-striped table-hover table-sm' ref='main'>
						<thead>
							<tr>
								<th>ID</th>
								<th>IDX</th>
								<th>Question</th>
								<th>Answer</th>
								<th>Category</th>
								<th>Actions</th>

							</tr>
						</thead>

						<tbody>
							{faqs.map((faq) => {
                                return (
                                    <tr>
                                        <td>{faq.id}</td>
                                        <td>{faq.idx}</td>
                                        <td>{faq.question} </td>
                                        <td>{faq.answer} </td>
                                        <td>{faq.category}</td>
                                        <td>
                                            <Link
                                                to={{
                                                    pathname: `/admin/faq/edit/${faq.idx}`,
                                                    state: {
                                                        faq: faq
                                                    }
                                                }}
                                            >
                                                <i className='fas fa-contact' />
                                                <span className='px-1'>edit</span>
                                            </Link>
                                        </td>
                                    </tr>
                                );
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
export default FaqList;

