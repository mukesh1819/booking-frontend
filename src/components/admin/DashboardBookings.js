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

    fetchBookings(){
        getAdminBookings(null)
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
            <BookingDetails bookings= {this.state.bookings}/>
        );
    }
}
export default DashboardBookings;