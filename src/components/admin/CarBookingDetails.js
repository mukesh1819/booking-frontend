import React, { Component, Fragment } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import history from "../../history";
import {
    sendCarBookingConfirmation,
    getCarBookingConfirmation,
    declineCarBooking,
    deleteCarBooking,
    showUserCarBooking,
    markComplete,
    patchCarBooking,
} from "../../api/carBookingApi";
import { fetchTicket } from "../../api/flightApi";
import { downloadTicket, pick } from "../../helpers";
import { Badge } from "../shared";
import moment from "moment";
import RemarksForm from "../shared/RemarksForm";

class CarBookingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carBooking: { car_inquiry: {} },
            loading: false,
            options: {},
        };
    }

    componentDidMount() {
        this.fetchDetails();
    }

    fetchDetails() {
        showUserCarBooking(this.props.match.params.idx).then((response) => {
            this.setState({
                carBooking: response.data,
            });
        });
    }

    onConfirmCarBooking(id) {

    	sendCarBookingConfirmation(id)
    		.then((response) => {
    			swal({
    				title: 'Car Booking Confirmation!',
    				text: response.data.message,
    				icon: 'success',
    				button: 'Continue!'
    			});
    			history.push('/admin/car_bookings');
    		})
    		.catch((error) => {
    			console.log('Car booking confirmation error', error);
    		});
    }

    onDeclineCarBooking(id) {
        declineCarBooking(id)
            .then((response) => {
                swal({
                    title: "Car Booking Rejection!",
                    text: response.data.message,
                    icon: "success",
                    button: "Continue!",
                });
                history.push("/admin/car_bookings");
            })
            .catch((error) => {
                console.log("Car booking Rejection error", error);
            });
    }

    download = (idx) => {
        fetchTicket(idx).then((response) => {
            this.setState({
                loading: false,
            });
            downloadTicket(response.data);
        });
    };

    setOptions = (option) => {
        this.setState({
            options: { ...this.state.option, ...option },
        });
    };

    // onMarkComplete(id) {
    // 	markComplete(id)
    // 		.then((response) => {
    // 			swal({
    // 				title: 'Response',
    // 				text: response.data.message,
    // 				icon: response.status == 200 ? 'success' : 'error'
    // 			}).then((response) => {
    // 				history.push('/admin/car_bookings');
    // 			});
    // 		})
    // 		.catch((v) => {});
    // }

    updateBooking(values) {
        patchCarBooking(this.props.match.params.idx, values).then(
            (response) => {
                this.fetchDetails();
            }
        );
    }

    render() {
        const { carBooking, loading, options } = this.state;
        return (
            <div className="container">
                <div className="ui padded grid">
                    <div className="row">
                        <div className="right floated right aligned sixteen wide column">
                            {(carBooking.status == "pending" ||
                                carBooking.status == "declined") && (
                                // <span
                                // 	className='btn btn-success m-2'
                                // 	onClick={() => this.onConfirmCarBooking(carBooking.idx)}
                                // >
                                // 	confirm
                                // </span>
                                <span onClick={() => this.onConfirmCarBooking(carBooking.idx)} className="btn bg-none text-primary">
                                            Send Confirmation to User
                                </span>
                            )}

                            {(carBooking.status == "pending" ||
                                carBooking.status == "processing") && (
                                <span
                                    className="btn btn-outline-danger m-2"
                                    onClick={() =>
                                        this.onDeclineCarBooking(carBooking.idx)
                                    }
                                >
                                    decline
                                </span>
                            )}

                            {carBooking.status != "completed" && (
                                <Link
                                    className="m-2"
                                    to={{
                                        pathname: `/car_bookings/${carBooking.idx}/edit`,
                                        state: {
                                            carBooking: carBooking,
                                        },
                                    }}
                                >
                                    <i className="fas fa-contact" />
                                    <span className="btn btn-primary">
                                        edit
                                    </span>
                                </Link>
                            )}

                            {carBooking.status === "verified" && (
                                <span className="text-center py-4">
                                    <a
                                        href="#"
                                        primary
                                        loading={loading}
                                        className="ui primary button basic"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.download(carBooking.idx);
                                        }}
                                    >
                                        Download ticket
                                    </a>
                                </span>
                            )}

                            {carBooking.status !== "pending" &&
                                carBooking.status !== "completed" && (
                                    <span>
                                        <Link
                                            to={{
                                                pathname: `/admin/${carBooking.idx}/assign_partner_booking_form`,
                                                state: {
                                                    carBooking: carBooking,
                                                },
                                            }}
                                        >
                                            <i className="fas fa-contact" />
                                            <span className="ui button positive">
                                                Assign Partner
                                            </span>
                                        </Link>
                                    </span>
                                )}

                            {/* {carBooking.status == "verified" && (
                                <span>
                                    <Link
                                        to={{
                                            pathname: `/admin/${carBooking.idx}/partner_approval_form`,
                                            state: {
                                                carBooking: carBooking,
                                            },
                                        }}
                                    >
                                        <i className="fas fa-contact" />
                                        <span className="ui basic button positive">
                                            Approve Booking
                                        </span>
                                    </Link>
                                </span>
                            )} */}

                            {carBooking.status == "approved" && (
                                <span>
                                    <Link
                                        to={{
                                            pathname: `/admin/${carBooking.idx}/rental_remarks_form`,
                                            state: {
                                                carBooking: carBooking,
                                            },
                                        }}
                                    >
                                        <i className="fas fa-contact" />
                                        <span className="ui basic button positive">
                                            Mark As Complete
                                        </span>
                                    </Link>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="ui segment">
                    {/* <h3 className='ui header'> Details </h3> */}
                    <div className="ui internally celled stackable grid section-layout">
                        <div className="row">
                            <div className="eight wide column section">
                                <h3 className="ui header"> Inquiry Details </h3>
                                <div className="ui grid">
                                    {Object.entries(
                                        pick(carBooking.car_inquiry, [
                                            "source",
                                            "destination",
                                            "no_of_pax",
                                            "trip_type",
                                            "no_of_days",
                                        ])
                                    ).map(([key, value]) => (
                                        <div className="row">
                                            <div className="eight wide column">
                                                {key.titleize()}:
                                            </div>
                                            <div className="eight wide column">
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="eight wide column section">
                                <h3 className="ui header"> Booking Details </h3>
                                <div className="ui grid">
                                    {Object.entries(
                                        pick(carBooking, [
                                            "pickup_date",
                                            "drop_off_date",
                                        ])
                                    ).map(([key, value]) => (
                                        <div className="row">
                                            <div className="eight wide column">
                                                {key.titleize()}:
                                            </div>
                                            <div className="eight wide column">
                                                {moment(value).format(
                                                    "D MMMM, YYYY HH:mm:ss"
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {Object.entries(
                                        pick(carBooking, [
                                            "pickup_location",
                                            "drop_off_location",
                                        ])
                                    ).map(([key, value]) => (
                                        <div className="row">
                                            <div className="eight wide column">
                                                {key.titleize()}:
                                            </div>
                                            <div className="eight wide column">
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                    {carBooking.flight_no && (
                                        <Fragment>
                                            <div className="row">
                                                <div className="eight wide column">
                                                    Flight Number
                                                </div>
                                                <div className="eight wide column">
                                                    {" "}
                                                    {carBooking.flight_no}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="eight wide column">
                                                    Flight Time
                                                </div>
                                                <div className="eight wide column">
                                                    {moment(
                                                        carBooking.flight_time
                                                    ).format("D MMMM, YYYY")}
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                    <div className="row text-bold text-danger">
                                        <div className="eight wide column">
                                            Amount:
                                        </div>
                                        <div className="eight wide column">
                                            {" "}
                                            {carBooking.amount}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="eight wide column section">
                                <h3 className="ui header"> Contact Details </h3>
                                <div className="ui grid">
                                    {Object.entries(
                                        pick(carBooking, [
                                            "contact_name",
                                            "contact_email",
                                            "mobile_no",
                                        ])
                                    ).map(([key, value]) => (
                                        <div className="row">
                                            <div className="eight wide column">
                                                {key.titleize()}:
                                            </div>
                                            <div className="eight wide column">
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="eight wide column section">
                                <h3 className="ui header"> Other Details </h3>
                                <div className="ui grid">
                                    {Object.entries(
                                        pick(carBooking.car_inquiry, [
                                            "car_type",
                                        ])
                                    ).map(([key, value]) => (
                                        <div className="row">
                                            <div className="eight wide column">
                                                {key.titleize()}:
                                            </div>
                                            <div className="eight wide column">
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="row">
                                        <div className="eight wide column">
                                            Booking Status:
                                        </div>
                                        <div className="eight wide column">
                                            <Badge type={carBooking.status}>
                                                {carBooking.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="eight wide column">
                                            IDx:
                                        </div>
                                        <div className="eight wide column">
                                            {carBooking.idx}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="column">
                                        <RemarksForm
                                            title="User Remarks"
                                            remarks={carBooking.user_remarks}
                                            onSubmit={(value) =>
                                                this.updateBooking({
                                                    user_remarks: value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column">
                                        <RemarksForm
                                            title="Partner Remarks"
                                            remarks={carBooking.partner_remarks}
                                            onSubmit={(value) =>
                                                this.updateBooking({
                                                    partner_remarks: value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CarBookingDetails;
