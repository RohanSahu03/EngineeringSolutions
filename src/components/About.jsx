import React, { useEffect } from "react";
import "../css/about.css";

import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";

import { Link } from "react-router-dom";

import { FaQuoteRight } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { FaFireExtinguisher } from "react-icons/fa";

function About() {
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: false,
    dots: true,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  useEffect(() => {
    AOS.init({ duration: "900" });
  }, []);

  return (
    <div>
      <div className="aboutbanner">
        <div className="innerDiv ">
          <h1>About Us</h1>
          <div className="breadcrumbdiv">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item ">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item ">
                  <Link to="/aboutus">About Us</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid p-md-5 p-2 d-flex align-items-center justify-content-center">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-6">
            <div className="imageSection">
              <h1 className="aboutHead">About Us</h1>
              <p className="para2">
                At <b>Engineering Solutions,</b> we specialize in delivering
                high-quality Ready Mix Concrete (RMC) solutions tailored to meet
                the specific needs of your construction projects. Whether you're
                working on residential, commercial, industrial, or
                infrastructure projects, our commitment is to provide you with
                reliable concrete that ensures durability, strength, and
                efficiency.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <h3 className="aboutHead text-start">Our Company Mission</h3>
            <p className="para" data-aos="zoom-in" data-aos-duration="2000">
              At Engineering Solutions, our mission is to deliver superior
              quality Ready Mix Concrete solutions that enhance the durability,
              efficiency, and sustainability of construction projects. We strive
              to exceed customer expectations by providing customized concrete
              mixes, exceptional service, and innovative solutions that
              contribute to the success of our clients' endeavors
            </p>

            <h3 className="aboutHead text-start">Our Company Goal</h3>
            <p className="para" data-aos="zoom-in" data-aos-duration="2000">
              Our vision is to be recognized as a leader in the Ready Mix
              Concrete industry, known for our commitment to excellence,
              reliability, and environmental stewardship. We aim to continuously
              innovate and expand our capabilities to meet the evolving needs of
              the construction sector, while maintaining a steadfast dedication
              to sustainable practices and customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-md-3">
        <div className="row " style={{ backgroundColor: "#f5f5f5" }}>
          <div className="col-md-6 my-4 d-flex justify-content-center ">
            <div
              class="card border-0"
              style={{
                width: "32rem",
                padding: "10px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <h3 className="quality">Quality Policy</h3>
              <div className="hrline"></div>
              <div className="row mt-4 myRow5">
                <div className="col-md-2 " data-aos="zoom-in">
                  <FaShieldAlt className="shield" />
                </div>
                <div className="col-md-10 text-start">
                  <span className="h3">
                    {" "}
                    we are committed to delivering superior quality ready mix
                    concrete .
                  </span>
                  <ul>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      className="para"
                    >
                      <SiTicktick className="tick" />
                      We adhere strictly to industry standards and regulations
                      in every aspect of our operations, ensuring the highest
                      level of quality and safety in our products.
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      className="para"
                    >
                      <SiTicktick className="tick" /> We continuously improve
                      our processes, technologies, and services to enhance
                      efficiency, reliability, and customer satisfaction
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      className="para"
                    >
                      <SiTicktick className="tick" />
                      We implement rigorous quality control measures at every
                      stage of production, from raw materials sourcing to final
                      delivery, to ensure the consistency and reliability of our
                      concrete mixes.
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      className="para"
                    >
                      <SiTicktick className="tick" /> We prioritize
                      understanding and meeting our customers' needs and
                      specifications, providing customized solutions and
                      responsive service to achieve their project objectives.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            <div
              class="card border-0 my-md-4 my-0"
              style={{
                width: "32rem",
                padding: "10px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <h3 className="quality">Safety Policy</h3>
              <div className="hrline"></div>
              <div className="row mt-4 myRow5">
                <div className="col-md-2 " data-aos="zoom-in">
                  <FaFireExtinguisher className="shield" />
                </div>
                <div className="col-md-10 ">
                  <span className="h3">
                    {" "}
                    We are committed to maintaining a safe and healthy workplace
                    and ensuring that safety is ingrained in everything we do.
                  </span>
                  <ul>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      className="para"
                    >
                      <SiTicktick className="tick" />
                      We comply with all applicable health, safety, and
                      environmental regulations, striving to exceed minimum
                      legal requirements to protect our workforce and
                      stakeholders.
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      className="para"
                    >
                      <SiTicktick className="tick" />
                      We foster a safety-first culture where every employee is
                      responsible for their safety and the safety of those
                      around them. We promote awareness, accountability, and
                      continuous improvement in safety practices.
                    </li>
                    <li
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      className="para"
                    >
                      <SiTicktick className="tick" />
                      We provide ongoing safety training and development
                      programs for our employees to equip them with the
                      knowledge and skills necessary to work safely and prevent
                      accidents.
                    </li>
                  </ul>
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

      <br />
      <div className="container-fluid  d-flex flex-column align-items-center p-md-5">
        <div
          className="row gx-5 d-flex justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <div className="col-md-5 d-flex justify-content-start ">
            <div
              className="testimonialCard"
              data-aos="zoom-in"
              data-aos-duration="2000"
            >
              <h3 className="aboutHead2">Words from Our Clients</h3>
              <p className="para">
                Listen to what our customers have to say about their experiences
                with Engineering Solutions.
              </p>
              <div className="para">
                Read testimonials from clients who have chosen Engineering
                Solution for their projects
              </div>
            </div>
          </div>

          <div className="col-md-5 d-flex align-items-center">
            <OwlCarousel loop margin={5} nav {...options}>
              <div class="item ">
                <div class="card testimonial">
                  <div className="photoSection">
                    <img
                      src="../images/testimonial1.jpg"
                      alt=""
                      srcset=""
                      className="testimonialImg"
                      data-aos="fade-down"
                    />
                  </div>
                  <div className="review">
                    <p className="para">
                      <FaQuoteLeft />
                      Engineering Solutions is professional, knowledgeable, and
                      dedicated to ensuring our project's success. Their custom
                      mix design was perfect for our needs, and they delivered
                      on time without any hassle.
                      <FaQuoteRight />
                    </p>
                  </div>
                  <div className="name">
                    <h5>Ahoy Das</h5>
                    <h6>Marketing Manager</h6>
                  </div>
                </div>
              </div>

              <div class="item">
                <div class="card testimonial ">
                  <div className="photoSection">
                    <img
                      src="../images/testimonial2.jpg"
                      alt=""
                      srcset=""
                      data-aos="fade-down"
                    />
                  </div>
                  <div className="review">
                    <p className="para">
                      <FaQuoteLeft />
                      Engineering Solutions is using the The quality of the
                      concrete was outstanding, and it made our construction
                      process smooth and efficient. Their team's expertise and
                      attention to detail truly exceeded our expectations.
                      <FaQuoteRight />
                    </p>
                  </div>
                  <div className="name">
                    <h5>Emily Johnson</h5>
                    <h6>Head of Birla</h6>
                  </div>
                </div>
              </div>

              <div class="item">
                <div class="card testimonial ">
                  <div className="photoSection">
                    <img
                      src="../images/testimonial3.jpg"
                      alt=""
                      srcset=""
                      data-aos="fade-down"
                    />
                  </div>
                  <div className="review">
                    <p className="para">
                      <FaQuoteLeft />
                      Engineering Solutions is professional, knowledgeable, and
                      dedicated to ensuring our project's success.Their team's
                      expertise and attention to detail truly exceeded our
                      expectations.
                      <FaQuoteRight />
                    </p>
                  </div>
                  <div className="name">
                    <h5>Rosy KP</h5>
                    <h6>Project Manager</h6>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
