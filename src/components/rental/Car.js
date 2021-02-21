import React from "react";
import {
    Segment,
    Header,
    Icon,
    Grid,
    Card,
    Divider,
    Search,
    Button,
} from "semantic-ui-react";
import { isRefundable, numberWithCommas } from "../../helpers";
import { BASE_URL } from "../../constants";
import { Badge } from "../shared";
import { connect } from "react-redux";
import history from "../../history";

const Car = function (props) {
    const { car, currentUser } = props;

    return (
        <div className="mb-4">
            <Card fluid>
                <Card.Content>
                    <Grid columns={3} stackable>
                        <Grid.Row>
                            <Grid.Column>
                                {car.image.length == 0 && (
                                    <Segment placeholder>
                                        <Header icon>
                                            <Icon className="image outline" />{" "}
                                        </Header>
                                    </Segment>
                                )}
                                {car.image.length > 0 && (
                                    <figure>
                                        <img
                                            src={BASE_URL + car.image[0].url}
                                            className="img-responsive"
                                        />
                                    </figure>
                                )}
                            </Grid.Column>

                            <Grid.Column>
                                <h3 className="ui header">{car.car_type}</h3>
                                <span className="text-small text-muted">
                                    {/* <i className='fas fa-map-marker-alt' />&nbsp; */}
                                    {"With Carrier"}
                                </span>
                                <div className="text-small text-muted">
                                    {/* <i className='fas fa-clock' />&nbsp; */}
                                    <div>{car.duration}</div>
                                    <div>No. of Seats: {car.no_of_seats}</div>
                                    <div>
                                        Status:{" "}
                                        <Badge type={car.status}>
                                            {car.status}
                                        </Badge>
                                    </div>
                                </div>
                            </Grid.Column>

                            <Grid.Column
                                verticalAlign="middle"
                                textAlign="center"
                            >
                                <div>
                                    <h2 className="ui header">
                                        Rs. {numberWithCommas(car.price)}{" "}
                                        <span className="text-small text-muted">
                                            /day
                                        </span>
                                    </h2>
                                    <button className="ui primary button">
                                        Select
                                    </button>
                                    {/* {currentUser.role === 'Admin' &&
									car.partner != undefined && (
										<button
											onClick={() => {
												history.push(`/admin/partner/${car.partner.idx}`);
											}}
											className='ui primary button'
										>
											Partner Details
										</button>
									)} */}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        </div>
    );
};

const mapStateToProps = ({ userStore }) => {
    return {
        currentUser: userStore.currentUser,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Car);
