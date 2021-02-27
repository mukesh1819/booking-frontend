import React, { Component } from "react";
import { sortBy } from "lodash";
import { Button } from "react-bootstrap";
import { Modal as ModalExample, EmptyContent } from "../shared";
import { connect } from "react-redux";
import history from "../../history";
import { Checkbox, Segment, Header, Icon } from "semantic-ui-react";
import { getCars } from "../../api/carApi";
import { BASE_URL } from "../../constants";
import CarInquiryForm from "./CarInquiryForm";
import SearchDetails from "./SearchDetails";
import { Car } from ".";
import CarDetails from "./CarDetails";
import { selectCar } from "../../redux/actions";

const SORTS = {
    NONE: (list) => list,
    PRICE: (list) => sortBy(list, "total_fare"),
    TIME: (list) => sortBy(list, "DepartureTime"),
    DURATION: (list) => sortBy(list, "duration"),
    // DEPARTURE: (list) => sortBy(list, 'departure').reverse(),
};

const Sort = ({ sortKey, onSort, isActive, children }) => (
    <Button
        variant="secondary"
        className={`rounded-0 ${isActive ? "active" : ""}`}
        onClick={() => onSort(sortKey)}
    >
        {children}
    </Button>
);

class CarList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCar: null,
            sortKey: "PRICE",
            isSortReverse: false,
            loading: true,
            cars: [],
            vehicle_prices: [],
        };

        // this.onFlightSelect = this.onFlightSelect.bind(this);
        this.onCarSelect = this.onCarSelect.bind(this);
        this.onSort = this.onSort.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    onSort(sortKey) {
        const isSortReverse =
            this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({
            sortKey,
            isSortReverse,
        });
    }

    onCarSelect(car) {
        this.setState((state, props) => {
            return {
                selectedCar: state.selectedCar == null ? car : null,
            };
        });
        this.props.selectCar(car);
        history.push(
            `/car_booking_form/${car.idx}/${this.props.match.params.car_inquiry_idx}`
        );
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });
    }

    setSearch(status) {
        this.setState({
            searching: status,
        });
    }

    setLoading(status) {
        this.setState({
            loading: status,
        });
    }

    componentDidUpdate(prevProps) {
        var params = {};
        params["car_inquiry_id"] = this.props.match.params.car_inquiry_idx;
        if (this.state.loading) {
            getCars(params)
                .then((response) => {
                    console.log(response.data.cars);
                    this.setState({
                        loading: false,
                        cars: response.data.cars,
                        vehicle_prices: response.data.vehicle_prices,
                    });
                })
                .catch((error) => {
                    console.log("Cars not found Error", error);
                    this.setState({
                        loading: false,
                    });
                });
        }
    }

    setSearch(status) {
        this.setState({
            searching: status,
        });
    }

    setLoading(status) {
        this.setState({
            loading: status,
        });
    }

    render() {
        const {
            sortKey,
            isSortReverse,
            searching,
            loading,
            cars,
            vehicle_prices,
            selectedCar,
        } = this.state;
        const { carInquiryDetails } = this.props;

        return (
            <div className="container p-0">
                <div className="row mb-4">
                    <div className="col-12 p-0">
                        {searching ? (
                            <div className="search-details">
                                <span
                                    className="collapse-btn p-3"
                                    onClick={() => this.setSearch(false)}
                                >
                                    <i className="fas fa-times color-accent" />
                                </span>
                                <CarInquiryForm
                                    onSearch={() => {
                                        this.setLoading(true);
                                        this.setSearch(false);
                                    }}
                                    {...this.props}
                                />
                            </div>
                        ) : (
                            <SearchDetails
                                onModify={() => this.setSearch(true)}
                            />
                        )}
                    </div>
                </div>
                {vehicle_prices.length > 0 && (
                    <div className="card mb-4">
                        <table className="ui fluid basic table">
                            <thead>
                                <th>Description</th>
                                <th>Price</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {vehicle_prices.map((price) => (
                                    <tr>
                                        <td>{price.description}</td>
                                        <td>{price.price}</td>
                                        <td></td>
                                    </tr>
                                ))}
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {cars.map((car) => (
                    <div
                        className=""
                        onClick={() => this.onCarSelect(car)}
                        className=""
                    >
                        <Car car={car} />
                    </div>
                ))}
            </div>
        );
    }
}
const mapStateToProps = ({ rentalStore }) => {
    return {
        carInquiryDetails: rentalStore.carInquiryDetails,
    };
};

const mapDispatchToProps = { selectCar };

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
