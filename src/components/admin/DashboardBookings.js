import React, {Component} from 'react';
import {passCsrfToken} from '../../utils/helpers';
import axios from 'axios';
import {getAdminBookings} from '../../api/flightApi'
import BookingDetails from './BookingDetails';

class DashboardBookings extends Component {

    constructor(props){
        super(props);
        this.state ={
            bookings: []
        }
    }

    componentDidMount(){
        passCsrfToken(document, axios);
        this.fetchBookings();
        
    }

    fetchBookings(params){
        getAdminBookings(params)
        .then((response) => {
            console.log(response);
            this.setState({
                bookings: response.data
            });
        })
        .catch((error) => {
            console.log(error);
            
        })
    }

    render(){
        return(
            <React.Fragment>
                <button onClick={() => this.fetchBookings(`q[status_eq]=pending`)} >
                pending
			    </button>

                <button onClick={() => this.fetchBookings(`q[status_eq]=verified`)} >
                verified
			    </button>

                <button onClick={() => this.fetchBookings(`q[status_eq]=completed`)} >
                completed
			    </button>

                <button onClick={() => this.fetchBookings(`q[status_eq]=processing`)} >
                processing
			    </button>

                <button onClick={() => this.fetchBookings(`q[status_eq]=cancelled`)} >
                cancelled
			    </button>
                <BookingDetails bookings= {this.state.bookings}/>
            </React.Fragment>
            
        );
    }
}
export default DashboardBookings;