import React, { useEffect } from "react";
import "../css/service.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function Service() {
  useEffect(() => {
    AOS.init({ duration: "900" });
  }, []);
  return (
    <div>
      <div className="aboutbanner">
        <div className="innerDiv">
          <h1>Services</h1>
          <div className="breadcrumbdiv">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item ">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item ">
                  <Link to="/aboutus">Service</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid my-3">
        <div className="row">
          <h5 className="serviceHead">OUR SERVICES</h5>
        </div>
        <div className="row text-center d-flex justify-content-center ">
          <h1 className="serviceHead2">We Gave The Best For You</h1>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="serviceCard">
              <div className="row">
                <div className="col-md-2">
                  <img src="../images/customize-50.png" alt="" srcset="" />
                </div>
                <div className="col-md-10">
                  <h1 className="forHeading5">Customized Mix Designs</h1>
                  <div className="para">
                    Tailored solutions to meet your project's specific
                    requirements, ensuring optimal performance and durability.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="serviceCard">
              <div className="row">
                <div className="col-md-2">
                  <img src="../images/ontime.png" alt="" srcset="" />
                </div>
                <div className="col-md-10">
                  <h1 className="forHeading5">Timely Delivery</h1>
                  <div className="para">
                    Efficient logistics and scheduling to ensure prompt delivery
                    of concrete to your job site, minimizing downtime and
                    maximizing productivity.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="serviceCard">
              <div className="row">
                <div className="col-md-2">
                  <img src="../images/quality-50.png" alt="" srcset="" />
                </div>
                <div className="col-md-10">
                  <h1 className="forHeading5">Quality Assurance</h1>
                  <div className="para">
                    Rigorous quality control processes and adherence to industry
                    standards to deliver consistently high-quality concrete
                    products.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="serviceCard">
              <div className="row">
                <div className="col-md-2">
                  <img src="../images/safety-50.png" alt="" srcset="" />
                </div>
                <div className="col-md-10">
                  <h1 className="forHeading5">Safety Commitment</h1>
                  <div className="para">
                    Prioritization of safety in every aspect of our operations,
                    with adherence to strict safety protocols to protect our
                    employees, clients, and the community.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="serviceCard">
              <div className="row">
                <div className="col-md-2">
                  <img src="../images/smiley-50.png" alt="" srcset="" />
                </div>
                <div className="col-md-10">
                  <h1 className="forHeading5">Customer Satisfaction</h1>
                  <div className="para">
                    Dedication to exceeding customer expectations through
                    superior service, reliability, and proactive communication
                    throughout the project lifecycle.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="serviceCard">
              <div className="row">
                <div className="col-md-2">
                  <img src="../images/sustainbility.png" alt="" srcset="" />
                </div>
                <div className="col-md-10">
                  <h1 className="forHeading5">Sustainable Practices</h1>
                  <div className="para">
                    Commitment to environmentally responsible practices,
                    including resource efficiency and eco-friendly production
                    techniques.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="whatsapp-button">
        {/* <i class="fab fa-whatsapp"></i> */}
        <a href="https://wa.me/9900070087" target="_blank">
          <img
            src="../images/whatsapp-40.png"
            alt=""
            srcset=""
            className="wpImg"
          />
        </a>
      </div>

      <div className="container-fluid">
        <div className="row py-3">
          <div className="col-md-6 order-sm-first d-flex justify-content-evenly flex-column">
            <div className="row text-start mt-3">
              <h5 className="serviceHead3">HOW WE WORK</h5>
            </div>
            <div className="row text-start d-flex justify-content-center ">
              <h1 className="serviceHead4">We Work With 3 Simple Steps</h1>
            </div>
            <div className="row">
              <div className="para">
                At Engineering Solutions, we believe in making your Ready Mix
                Concrete experience straightforward and seamless. Here's how we
                work:
              </div>
              <br />
              <br />
              <div className="para"></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row mt-3">
              <div className="col-md-2">
                <img src="../images/consult.png" alt="" srcset="" />
              </div>
              <div className="col-md-10 text-start">
                <h5 className="h5">
                  <b>Consultation & Planning</b>
                </h5>
                <div className="para">
                  Begin by discussing your project requirements with our
                  knowledgeable team. We'll provide expert guidance on selecting
                  the right concrete mix design and delivery options tailored to
                  your specific needs.
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <img src="../images/ontime.png" alt="" srcset="" />
              </div>
              <div className="col-md-10 text-start">
                <h5 className="h5">
                  <b>Order Placement & Scheduling</b>
                </h5>
                <div className="para">
                  Once you've selected the appropriate concrete mix, placing an
                  order is quick and easy. Our friendly customer service team
                  will assist you throughout the process, ensuring clarity on
                  pricing, delivery timelines, and any additional services you
                  may require
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <img src="../images/delivery-50.png" alt="" srcset="" />
              </div>
              <div className="col-md-10 text-start">
                <h5 className="h5">
                  <b> Delivery & Support</b>
                </h5>
                <div className="para">
                  On the scheduled day, our modern fleet of delivery vehicles
                  will arrive at your job site with the precise amount of Ready
                  Mix Concrete you need. Our experienced drivers and operators
                  ensure safe and efficient delivery, adhering to strict quality
                  control measures to maintain the integrity of our products.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
