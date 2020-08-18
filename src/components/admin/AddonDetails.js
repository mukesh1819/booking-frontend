import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import history from '../../history';
import swal from 'sweetalert';
import moment from 'moment';
import {Card} from 'semantic-ui-react';


class AddonDetails extends Component{

    constructor(props){
        super(props);
        this.state={
        };
    }

    componentDidMount(){
    }

    // fetchAddons(params) {
	// 	getAddons(params)
	// 		.then((response) => {
	// 			this.setState({
	// 				addons: response.data.addons,
	// 				pagination: response.data.meta.pagination
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log('Addon fetch error', error);
	// 		});
	// }

    // destroyAddon(id) {
	// 	swal({
	// 		title: 'Are you sure?',
	// 		text: 'Once delete, your addon will be deleted',
	// 		icon: 'warning',
	// 		buttons: true,
	// 		dangerMode: true
	// 	}).then((willDelete) => {
	// 		if (willDelete) {
	// 			deleteAddon(id).then((response) => {
	// 				swal('this addon is deleted', {
	// 					icon: 'success'
	// 				});
	// 				history.go();
	// 			});
	// 		} else {
	// 			swal('Your addon is not deleted yet');
	// 		}
	// 	});
    // }
    
    // onFilter = (values) => {
	// 	this.setState({
	// 		addons: values.addons
	// 	});
	// };

    render(){
        const {addon} = this.props.location.state != null ? this.props.location.state : {addon: {}};
        return(
            <div className='ui container'>
				<Card fluid>
					<Card.Content>
						<div className='d-flex justify-content-between'>
							<h3 className='title'>Addon</h3>
							
						</div>

						<table className='table table-striped table-hover table-sm' ref='main'>
							<thead>
								<tr>
									<th>Name</th>
                                    <th>Price</th>
									<th>Description</th>
									<th>Created At</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td>{addon.name}</td>
									<td>{addon.price} </td>
									<td>{addon.description} </td>
									<td>{moment(addon.created_at).format('D MMMM, YYYY')}</td>
								</tr>
							</tbody>
						</table>
					</Card.Content>
				</Card>

			</div>
        );
    }

}
export default AddonDetails;