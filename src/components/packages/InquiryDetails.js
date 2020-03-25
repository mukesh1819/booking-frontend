import React,{Component} from 'react';
import axios from 'axios';
import {passCsrfToken} from '../../helpers/helpers';
import {Link} from 'react-router-dom';
import PaymentForm from '../payments/PaymentForm';
import swal from 'sweetalert';
import {showPackageBooking} from '../../api/inquiryApi';

class InquiryDetails extends Component{
    constructor(props){
        super(props);
        this.state ={
            packageBookingInfo: {},
            showPaymentPage: false
        }

    }

    componentDidMount(){
        passCsrfToken(document, axios);
        this.fetchDetails();

    }
    fetchDetails(){
        showPackageBooking(this.props.match.params.idx)
        .then((response) => {
            this.setState({
                packageBookingInfo: response.data
            });
            swal({
                title: 'Your Inquiries Details!!!',
                text: response.data.message,
                icon: 'success',
                button: 'Continue!'
            });
        })
        .catch((error) => {
            swal({
                title: 'Your Inquiries Details!!!',
                text: error.message,
                icon: 'error',
                button: 'Continue!'
            });
        })
        
    }

    paymentPage(){
        this.setState({
            showPaymentPage: true
        })
    }

    render(){
        const {idx} = this.props.match.params;
        const {packageBookingInfo} = this.state;

        if (this.state.showPaymentPage) {
			return <PaymentForm idx={packageBookingInfo.idx} value="packagebooking"/>;
        }
        
        return(
            <React.Fragment>
                {Object.keys(packageBookingInfo).length != 0 && (
                    <div className='container'>
                    <div className='mt-3'>
                        <h5>Your Package Information and Inquiry Details </h5>
    
                        <table className='table table-striped table-hover table-sm mb-3' ref='main'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Description</th>
                                    <th>Package Amount Per Person</th>
                                </tr>
                            </thead>
    
                            <tbody>
                                <tr>
                                    <td>{packageBookingInfo.package.name}</td>
                                    <td>{packageBookingInfo.package.location} </td>
                                    <td>{packageBookingInfo.package.description} </td>
                                    <td>{packageBookingInfo.package.price}</td>
                                </tr>
                            </tbody>
                        </table>
    
                        <table className='table table-striped table-hover table-sm mt-1' ref='main'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Nationality</th>
                                    <th>phone Number</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>No of passenger</th>
                                    <th>Comments</th>
                                    <th>Total Amount</th>
    
                                </tr>
                            </thead>
    
                            <tbody>
                                <tr>
                                    <td>{packageBookingInfo.inquiry.name}</td>
                                    <td>{packageBookingInfo.inquiry.email_address} </td>
                                    <td>{packageBookingInfo.inquiry.nationality} </td>
                                    <td>{packageBookingInfo.inquiry.phone}</td>
                                    <td>{packageBookingInfo.inquiry.preferred_date}</td>
                                    <td>{packageBookingInfo.inquiry.preferred_time} </td>
                                    <td>{packageBookingInfo.inquiry.no_of_pax}</td>
                                    <td>{packageBookingInfo.inquiry.comments}</td>
                                    <td>{packageBookingInfo.amount} for {packageBookingInfo.inquiry.no_of_pax} person</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <span className='btn btn-primary m-3' onClick = { () => this.paymentPage()}>Continue to Payment</span>
                    </div>
                </div>
                )}
            </React.Fragment>
        );
    }
}
export default InquiryDetails;
