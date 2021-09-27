import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Container, Button, Segment, Accordion } from "semantic-ui-react";
import SearchBar from "../flights/SearchBar";
import CarInquiryForm from "../rental/CarInquiryForm";
import { yetiImage, buddhaImage, shreeImage } from "../../images";
import { TabView, Slidebar, Banner } from "../shared";
import { PackageList } from "../packages";
import { Categories } from "../categories";
import "./homepage.css";
import logo from '../../images/logo-blue.png'
import {abouts} from './abouts';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }

  handleClick = (e, titleProps) => {
		const {index} = titleProps;
		const {activeIndex} = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({activeIndex: newIndex});
	};

  componentDidUpdate(prevProps) {
    const options = {
      margin: 10,
      touchDrag: true,
      rewind: true,
      animateIn: true,
      responsive: {
        0: {
          items: 1,
          nav: false,
          autoWidth: true,
        },
        600: {
          items: 1,
          nav: false,
        },
        1000: {
          items: 3,
          nav: true,
          navText: [
            "<i class='fas fa-chevron-circle-left text-primary'></i>",
            "<i class='fas fa-chevron-circle-right text-primary'></i>",
          ],
          loop: false,
        },
      },
    };

    $(".owl-carousel").owlCarousel(options);
  }

  render() {
    const { t, i18n } = this.props;
    const { activeIndex } = this.state;
    return (
      <React.Fragment>
        <nav>
          <div className="container">
            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
              {/* <a
                                className="nav-item nav-link active"
                                id="nav-flights-tab"
                                data-toggle="tab"
                                href="#nav-flights"
                                role="tab"
                                aria-controls="nav-flights"
                                aria-selected="true"
                            >
                                <i className="fas fa-plane departure" />
                                &nbsp; {t("Flights")}
                            </a> */}
              <a
                className="nav-item nav-link active"
                id="nav-rentals-tab"
                data-toggle="tab"
                href="#nav-rentals"
                role="tab"
                aria-controls="nav-rentals"
                aria-selected="true"
              >
                <i className="fas fa-car" />
                &nbsp; {t("Rentals")}
              </a>
              <a
                className="nav-item nav-link"
                id="nav-packages-tab"
                data-toggle="tab"
                href="#nav-packages"
                role="tab"
                aria-controls="nav-packages"
                aria-selected="false"
              >
                <i className="fas fa-briefcase" />
                &nbsp; {t("Packages")}
              </a>
            </div>
          </div>
        </nav>
        <div className="tab-content px-sm-0" id="nav-tabContent">
          <div
            className="tab-pane fade"
            id="nav-flights"
            role="tabpanel"
            aria-labelledby="nav-flights-tab"
          >
            <header id="header" className="cover" role="banner">
              <div className="container">
                <h1 className="text-white text-larger">
                  {t("FindAndBookFlights")} <br /> {t("WithinNepal")}
                </h1>
                <div className="airline-logos d-none">
                  <img src={yetiImage} alt="Image" className="img-responsive" />
                  <img
                    src={buddhaImage}
                    alt="Image"
                    className="img-responsive"
                  />
                  <img
                    src={shreeImage}
                    alt="Image"
                    className="img-responsive"
                  />
                </div>
                <SearchBar {...this.props} />
              </div>
            </header>
            <section className="categories">
              <div className="container">
                {/* <div className='title'>
							<h2 className='text-center'> Things to do </h2>
						</div> */}
                <Categories {...this.props} />
              </div>
            </section>
          </div>
          <div
            className="tab-pane fade"
            id="nav-packages"
            role="tabpanel"i18n
            aria-labelledby="nav-packages-tab"
          >
            <section className="categories">
              <div className="container">
                {/* <div className='title'>
							<h2 className='text-center'> Things to do </h2>
						</div> */}
                <Categories {...this.props} />
              </div>
            </section>
          </div>
          <div
            className="tab-pane fade show active"
            id="nav-rentals"
            role="tabpanel"
            aria-labelledby="nav-rentals-tab"
          >
            <header id="header" className="cover" role="banner">
              <div className="container">
                <div class="row headingtext-contact-container">
                  <div class="col-6 col-xs-6 col-sm-8 col-md-9 col-lg-8 heading-text">
                    <h1 className="text-white text-larger">
                      Planning a trip.. <br />
                      {t("WithinNepal")}
                    </h1>
                  </div>
                  <div class="col-6 col-xs-6 col-sm-4 col-md-3 col-lg-4 contact-container">
                    <div className="contactus_card">
                      <div className="card-body">
                        <h5 className="card-title text-white text-larger">
                          Contact us
                        </h5>
                        <ul className="list-group list-group-flush fa-ul contact-card-ul">
                          <li className="contact-card">
                            <li className="list-group-item">
                              <i
                                className="fa fa-phone fa-2"
                              ></i>
                              <span>+977-9818192604</span>
                            </li>
                            <li className="list-group-item">
                              <i
                                className="fab fa-viber fa-2"
                                style={{ color: "purple" }}
                              ></i>
                              <span>+977-9818192604</span>
                            </li>
                            <li className="list-group-item">
                              <i
                                className="fab fa-whatsapp fa-2"
                                style={{ color: "green" }}
                              ></i>
                              <span>+977-9818192604</span>
                            </li>
                            <li className="list-group-item">
                              <i
                                className="fa fa-envelope fa-2"
                              ></i>
                              <span>info@visitallnepal.com</span>
                            </li>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="card" style={{width: '18rem'}}>
                  <div className="card-body">
                    <h5 className="card-title">Contact Us</h5>
                      <ul className="list-group list-group-flush fa-ul contact-card-ui">
                        <li className = "contact-card">
                         <li className = "list-group-item"><i className="fab fa-whatsapp " style={{color:'green'}}>+977-9818192604</i></li> 
                         <li className = "list-group-item"><i className="fab fa-viber " style={{color:'purple'}}>+977-9818192604</i></li>  
                         <li className = "list-group-item"><i className="fa fa-envelope " style={{color:'red'}}>bookingnepalnp@gmail.com</i></li>  
                         <li className = "list-group-item"><i className="fa fa-phone  " style={{color:'black'}}>+977-9818192604</i></li>   
                        </li>
                      </ul>
                  </div>
                </div> */}
                <CarInquiryForm {...this.props} />
              </div>
            </header>

            <section className="white">
              <div className="ui container">

              <Accordion styled fluid>
                {abouts().map((about, index) => {
                  return (
                    <React.Fragment>
                      <Accordion.Title
                        active={activeIndex === index}
                        index={index}
                        onClick={this.handleClick}
                      >
                        <h3 className='text-bold mb-2 py-2'>
                          <i class="fas fa-car"></i> {about.question}
                        </h3>
                        {!(activeIndex == index) && <p className="m-0">{about.answer.slice(0, 200) + "... " }</p>}
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === index}>
                        <p>{about.answer}</p>
                      </Accordion.Content>
                    </React.Fragment>
                  );
                })}
              </Accordion>
              </div>

            </section>

            <section>
              <div className="container">
              <div className="testimonial owl-carousel owl-theme">
                <article>
                  <figure>
                    <img
                      alt="visitallnepal"
                      src={logo}
                    />
                  </figure>
                  <div>
                    <p>
                      Must say that we found the best app for planning our tour
                      to allow us to easily book the car for our planned
                      destinations. Also Couldn’t find a better price for
                      packages myself! Keep it up.
                    </p>
                    <h1>Samrat Pradhan</h1>
                  </div>
                </article>

                <article>
                  <figure>
                    <img
                      alt="visitallnepal"
                      src={logo}
                    />
                  </figure>
                  <div>
                    <p>
                      Feels like a good friend who knows me is making a holiday
                      packages for myself.
                    </p>
                    <h1>Sumit Shakya</h1>
                  </div>
                </article>
                <article>
                  <figure>
                    <img
                      alt="visitallnepal"
                      src={logo}
                    />
                  </figure>
                  <div>
                    <p>
                      One stop solution for all our booking car problems. No
                      need to find the phone numbers and keep calling. Solved my
                      long awaiting problem. Keep up the good work!!
                    </p>
                    <h1>Mahesh Gautam</h1>
                  </div>
                </article>
                <article>
                  <figure>
                    <img
                      alt="visitallnepal"
                      src={logo}
                    />
                  </figure>
                  <div>
                    <p>
                      fell in love with your kind and support, the enquiry here
                      helped us decide quickly & after research elsewhere, we
                      came back to book the holiday trip here. Highly recommend!
                    </p>
                    <h1>Aayush Raut</h1>
                  </div>
                </article>

                <article>
                  <figure>
                    <img
                      alt="visitallnepal"
                      src={logo}
                    />
                  </figure>
                  <div>
                    <p>
                      Must say that we found the best app for planning our tour
                      to allow us to easily book the car for our planned
                      destinations. Also Couldn’t find a better price for
                      packages myself! Keep it up.
                    </p>
                    <h1>Pradeep Kumar Mishra</h1>
                  </div>
                </article>

                
              </div>
              </div>

            </section>
          </div>
        </div>
        {/* <Tabs id='home-tab' activeKey={key} className='dnav-fill' onSelect={(k) => this.setKey(k)}>
					<Tab eventKey='flights' title='Flights'>
						<HomePage />
					</Tab>
					<Tab eventKey='packages' title='Packages'>
						<div className='container'>
							<h4> Popular Packages </h4>
							<PackageList />
						</div>
					</Tab>
				</Tabs> */}
      </React.Fragment>
    );
  }
}

export default HomePage;
