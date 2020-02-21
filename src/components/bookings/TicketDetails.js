import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

const TicketDetails = () => {
    return (
        <React.Fragment>
    <div className="container-fluid">
        <div className="col-md-6 ml-auto mr-auto" id="search-form pdf-mar">
            <div className="d-flex justify-content-between">
                <div className="">
                    <h3>Booking Nepal</h3>
                </div>
                <div className="">
                    <h4 className="text-success">E-Ticket</h4>
                </div>
                <div className=""><Image width="35px" height="37px" src="Airline_logo" />
                    <span className="booking-text ">
                        airline </span>
                </div>
            </div>
            <h5 className="text-center text-info booking-text">Tickets operated and managed by Booking Nepal Travels and Tours Pvt. Ltd</h5>
            <h5 className="text-uppercase text-center booking-text">This <strong>electronic ticket</strong> is not transferable and must be present at check-in </h5>
            <h5 className="text-uppercase text-center booking-text">at check-in please present id card and all necessary travel documents.</h5>
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
        <div className="col-md-6">
            <div className="offset-4 col-4 p-3">
                <a href="/7ecb74ba63e9a5942512/download_ticket.pdf" className="btn btn-success view-font ml-5">Print ticket</a>
            </div>
        </div>
    </div>
</React.Fragment>
    );
};
export default TicketDetails;