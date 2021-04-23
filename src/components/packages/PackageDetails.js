import React, { Component } from "react";
import { showPackage } from "../../api/packageApi";
import Package from "./Package";
import { Link } from "react-router-dom";
import { Modal as ModalExample } from "../shared";
import InquiryForm from "./InquiryForm";
import { imageUrl, calculatePackagePrice } from "../../helpers";
import { Tab } from "semantic-ui-react";
import { HotelImage, peace } from "../../images";
import Gallery from "./Gallery";
import { Redirect } from "react-router-dom";
import history from "../../history";

class PackageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aPackage: {
        name: "",
        price: 0.0,
        location: "",
        images: [],
        description: "",
        similar_package: [],
      },
      showInquiryForm: false,
    };
    this.fetchDetails = this.fetchDetails.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this.fetchDetails();
  }

  onSelect() {
    history.push(`/inquiry_form/${this.props.match.params.id}`);
    // this.setState((prevState, props) => {
    // 	return {showInquiryForm: !prevState.showInquiryForm};
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.aPackage.idx !== this.props.match.params.id) {
      this.fetchDetails();
    }
  }

  fetchDetails() {
    const options = {
      margin: 10,
      loop: true,
      touchDrag: true,
      rewind: true,
      animateIn: true,
      nav: false,
      responsive: {
        0: {
          items: 2,
          nav: false,
          autoWidth: true,
        },
        600: {
          items: 3,
          nav: false,
        },
        1000: {
          items: 4,
          nav: true,
          navText: [
            "<i class='fas fa-chevron-circle-left text-primary'></i>",
            "<i class='fas fa-chevron-circle-right text-primary'></i>",
          ],
          loop: true,
        },
      },
    };
    showPackage(this.props.match.params.id)
      .then((response) => {
        console.log("Package Details", response);
        this.setState({
          aPackage: response.data,
        });
        $(".owl-carousel").owlCarousel(options);
      })
      .catch((error) => {
        console.log("PACKAGE DETAILS ERROR", error);
      });
  }

  componentWillUnmount() {}

  render() {
    const { aPackage } = this.state;
    var [price, discount] = calculatePackagePrice(aPackage);
    const dummyImages = aPackage.images;
    const panes = [
      {
        menuItem: "About",
        render: () => (
          <Tab.Pane attached={false}>
            <div className="mt-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: aPackage.description,
                }}
              />

              {aPackage.activities && aPackage.activities.length > 0 && (
                <div className="row mt-3">
                  <h3 className="title">Activities</h3>
                  <div className="col-12">
                    <div className="field-box">
                      <table className="table table-responsive table-striped">
                        <tr>
                          <th>Description</th>
                          <th>Duration</th>
                          <th>Price</th>
                        </tr>
                        {aPackage.activities.map((activity) => {
                          return (
                            <tr>
                              <td>{activity.description}</td>
                              <td>{activity.duration}</td>
                              <td>{activity.price}</td>
                            </tr>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
              )}

              <div className="row mt-3">
                {aPackage.inclusions && (
                  <div className="col-12 col-md-6">
                    <h3 className="title">Inclusions</h3>
                    {aPackage.inclusions.split("\n").map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                )}
                {aPackage.exclusions && (
                  <div className="col-12 col-md-6">
                    <h3 className="title">Exclusions</h3>
                    {aPackage.exclusions.split("\n").map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Gallery",
        render: () => (
          <Tab.Pane attached={false}>
            <Gallery images={dummyImages} />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <div className="package-details">
        <div className="container">
          <div className="header">
            <div className="img-container">
              {aPackage.images.length > 0 && (
                <a
                  href={imageUrl(aPackage.images[0].url)}
                  className="image-popup"
                >
                  <img
                    src={imageUrl(aPackage.images[0].url)}
                    alt="Image"
                    className="img-responsive"
                  />
                </a>
              )}
            </div>
            <div className="card bg-none title">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="">
                    <h2 className="text-white font-secondary">
                      {aPackage.name}
                    </h2>
                    <span className="text-white text-small">
                      <i className="fas fa-map-marker-alt" />
                      &nbsp;
                      {aPackage.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="pr-2">
                    {discount > 0 && (
                      <div className="text-small">
                        <span className="text-muted">
                          Rs. <del>{aPackage.price}</del>
                        </span>
                        <span className="text-success">
                          &nbsp;{discount} off
                        </span>
                      </div>
                    )}
                    <span>
                      <span className="text-medium text-strong">
                        Rs. {price}
                      </span>
                      <span className="text-muted text-small text-right">
                        /person
                      </span>
                    </span>
                  </div>
                  <div className="d-inline-block">
                    <div
                      className="p-2"
                      onClick={this.onSelect}
                      className="btn btn-secondary"
                    >
                      Make A Inquiry
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <div className="row">
                <div className="col-12 p-0">
                  <Tab menu={{ secondary: true }} panes={panes} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 p-0">
              <div className="header">
                <h3 className="py-3">Similar Packages</h3>
              </div>
              <div className="owl-carousel owl-theme">
                {aPackage.similar_package.length > 0 &&
                  aPackage.similar_package.map((similar) => (
                    <div>
                      <Package aPackage={similar} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/* <ModalExample
					title={`Kindly submit the query form below to book your trip and we will contact you
										with the confirmed itinerary.`}
					show={this.state.showInquiryForm}
					toggle={this.onSelect}
					onSuccess={this.onBook}
				/> */}
        {this.state.showInquiryForm && (
          <Redirect
            to={{ pathname: "/inquiry", state: { aPackage: aPackage } }}
          />
        )}
      </div>
    );
  }
}
export default PackageDetails;
