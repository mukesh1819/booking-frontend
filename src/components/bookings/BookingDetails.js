import React, { Component } from 'react';
const BookingDetails = ({ booking }) => {
return (
<React.Fragment>
    <div className="container-fluid">
        <h3 className="text-center text-success">Tickets Details</h3>
        <div className="col-md-6 ml-auto mr-auto" id="search-form">
            <div className="row">
                <div className="col-6">
                    <h5 className="d-inline booking-text">Outbound PNR No -<span>123456789</span></h5>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <h5 className="d-inline booking-text">Refundable -
                        <span>
                            if(true)
                            "Yes"
                            else
                            "No"
                        </span>
                    </h5>
                </div>
            </div>
            <table className="table table-bg table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Passenger Name</th>
                        <th>Nationality</th>
                        <th>Passenger Type</th>
                        <th>Ticket No</th>
                        <th>Baggage</th>
                        <th>Cancel ticket</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> Mr Mukesh Modi </td>
                        <td> Nepali </td>
                        <td> Adult </td>
                        <td>t-123</td>
                        <td>20 kg</td>
                        {/* if passenger.verified */}
                        if true {
                        <td><a className="btn btn-danger d-flex align-items-end" href="/cancel_request/5">Cancel tickets</a></td>
                        }
                        else {
                        <td> Processing </td>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="col-md-6 ml-auto mr-auto" id="search-form1">
            <h1 className="text-center booking-text">Booking Details</h1>
            <table className="table table-bg table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Sector</th>
                        <th>Flight No</th>
                        <th>Flight Time</th>
                        <th>Class</th>
                        <th>Flight Charge</th>
                        <th>Cancel all tickets </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ktm - pkr</td>
                        <td>flight-150</td>
                        <td>5:20 14-02-2020</td>
                        <td>524</td>
                        <td>Rs 3000</td>
                        {/* if passenger.verified */}
                        if true{
                        <td><a className="btn btn-danger d-flex align-items-end" href="/cancel_request/[5,10]">Cancel All tickets</a></td>
                        }
                        else{
                        <td>Processing</td>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="col-md-6 ml-auto mr-auto" id="search-form1">
            <h1 className="text-center booking-text">Transaction Details</h1>
            <table className="table table-bg table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Transaction Date</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Transaction ID</td>
                        <td>Transaction Date</td>
                        <td>Transaction Amount</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h4 className="col-6 ml-auto mr-auto booking-text">Reporting Time - <span>5:20 14-02-2020</span></h4>
        {/* if inbounds not nil */}
        if true {
        <div>
            <div className="col-md-6 ml-auto mr-auto" id="search-form">
                <h3 className="text-success text-center">Return Ticket Information</h3>
                <div className="row">
                    <div className="col-6">
                        <h5 className="d-inline booking-text">Inbound PNR No -<span>123456789</span></h5>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <h5 className="d-inline booking-text">Refundable -
                            <span>
                                if true {
                                "Yes"
                                }
                                else {
                                "No"
                                }
                            </span>
                        </h5>
                    </div>
                </div>
                <table className="table table-bg table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Passenger Name</th>
                            <th>Nationality</th>
                            <th>Passenger Type</th>
                            <th>Ticket No</th>
                            <th>Baggage</th>
                            <th>Cancel ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Mr Mukesh Modi </td>
                            <td> Nepali </td>
                            <td> Adult </td>
                            <td>t-123</td>
                            <td>20 kg</td>
                            {/* if passenger.verified */}
                            if true {
                            <td><a className="btn btn-danger d-flex align-items-end" href="/cancel_request/5">Cancel tickets</a></td>
                            }
                            else {
                            <td> Processing </td>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-md-6 ml-auto mr-auto" id="search-form1">
                <h1 className="text-center booking-text">Booking Details</h1>
                <table className="table table-bg table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Sector</th>
                            <th>Flight No</th>
                            <th>Flight Time</th>
                            <th>Class</th>
                            <th>Flight Charge</th>
                            <th>Cancel all tickets </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ktm - pkr</td>
                            <td>flight-150</td>
                            <td>5:20 14-02-2020</td>
                            <td>524</td>
                            <td>Rs 3000</td>
                            {/* if passenger.verified */}
                            if true{
                            <td><a className="btn btn-danger d-flex align-items-end" href="/cancel_request/[5,10]">Cancel All tickets</a></td>
                            }
                            else{
                            <td>Processing</td>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-md-6 ml-auto mr-auto" id="search-form1">
                <h1 className="text-center booking-text">Transaction Details</h1>
                <table className="table table-bg table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Transaction Date</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Transaction ID</td>
                            <td>Transaction Date</td>
                            <td>Transaction Amount</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h4 className="col-6 ml-auto mr-auto booking-text">Reporting Time - <span>5:20 14-02-2020</span></h4>
        </div>
        }
        <div className="offset-2 col-4 p-3">
            <a className="btn btn-success view-font ml-5" href="/view_ticket/ruid">view ticket</a>
        </div>
    </div>
</React.Fragment>
);
};
export default BookingDetails;