import React, { useEffect, useRef } from "react";
import "../css/home.css";
import NavBar from "./Navbar";
import TextTransition, { presets } from "react-text-transition";
import { FaShieldAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { FaFireExtinguisher } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Accordion from "react-bootstrap/Accordion";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Container from "react-bootstrap/esm/Container";

function Home() {
  const [index, setIndex] = React.useState(0);
  const myRef1 = useRef(null);
  const navigate = useNavigate();

  const goToService = () => {
    navigate("/service");
  };

  const goToContact = () => {
    navigate("/contactus");
  };

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  useEffect(() => {
    AOS.init();
    window.scroll(0, 0);
  }, []);

  const scrollPage = () => {
    myRef1.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="banner">
        <div className="innerDiv">
          <h4 data-aos="fade-down" data-aos-duration="3000">
            Building dreams, one mix at a time.
          </h4>
          <h1 className="h1" data-aos="zoom-in" data-aos-duration="3000">
            Best Concrete Services For All Construction
          </h1>
          <br />
          <div className="row ">
            <div className="col-md-12 ">
              <div className="btns">
                <div>
                  <button
                    className="serviceBtn"
                    onClick={goToService}
                    data-aos="zoom-out"
                  >
                    OUR SERVICES
                  </button>
                </div>
                <div>
                  <button
                    className="contactBtn"
                    onClick={goToContact}
                    data-aos="zoom-out"
                  >
                    CONTACT US
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="associateDiv">
            <div className="left border-md-end ">
              <div className="upper">
                <img src="../images/certificate.png" alt="" srcset="" />
              </div>
              <div className="lower">
                AFFORDABLE PRICE, CERTIFIED FORWARDERS
              </div>
            </div>
            <div className="right ">
              <div className="upper">
                <img src="../images/handshake.png" alt="" srcset="" />
              </div>
              <div className="lower">SAFE & TRUSTED COMPANY</div>
            </div>
          </div>
        </div>
      </div>
      <div className="quickContact">
        <div className="contactDetail">
          <div className="icon">
            <img src="../images/telephone.png" alt="" srcset="" />
          </div>
          <div className="right ">
            <h5>QUICK CONTACT</h5>
            <p>Email:engineeringsolutions2011@rediffmail.com </p>
            <p>Phone:+91-9900070087</p>
          </div>
        </div>
        <div className="locations">
          <div className="icon">
            <img src="../images/location3.png" alt="" srcset="" />
          </div>
          <div className="right">
            <h5>OUR LOCATION</h5>

            <p>
              {" "}
              1st Main, No.28, 1st Floor, Apporva Nagar,Near Silver Town Cross,
              Gokul Road Hubbali, Karnataka, 580030
            </p>
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

      {/* <div className="container mt-md-5">
  <div className="row ">
    <div className="col-md-7 text-start upperText">
    <h3>
           We Are Concrete The Best Solution
          </h3>
          <p data-aos="zoom-in" data-aos-duration="2000">
            Welcome to <b>Engineering Solutions,</b> where reliability meets excellence
            in ready mix concrete services. We have Many years of industry
            expertise, we specialize in delivering high-quality concrete
            tailored to meet the unique needs of every project.{" "}
          </p>
    </div>
  </div>
  <div className="row my-4">
  <div className="col-md-4 offset-md-4 " >
  <img src="../images/img1.jpg" alt="" srcset="" className="aboutImg" data-aos="zoom-in" data-aos-duration="2000"/>
  </div>
  </div>
  <div className="row ">
  <div className="col-md-7 text-start upperText offset-md-5">
  <h3>
           
            Quality & Liability
          </h3>
          <p data-aos="zoom-in" data-aos-duration="2000">
            To be the leading provider of innovative and sustainable ready mix
            concrete solutions, setting the industry benchmark for quality,
            reliability, and customer satisfaction. Our mission is to deliver
            superior ready mix concrete products and services that meet and
            exceed our customers' expectations. 
          </p>
      
  </div>
  </div>
</div> */}

      <div className="container mt-md-3">
        <div className="firstPart">
          <div className="left">
            <img
              src="../images/img1.jpg"
              alt=""
              srcset=""
              className="aboutImg"
            />
            <div
              className="cardd"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1000"
            >
              <h5>WE ARE THE BEST CONSTRUCTION COMPANY</h5>
            </div>
          </div>
          <div className="right" ref={myRef1}>
            <div className="row">
              <h5 className="forHeading5">THINKING BUILDING OR RENOVATION ?</h5>
              <h1 className="forHeading1">We Are Concrete The Best Solution</h1>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row  text-start">
                  <h6 className="h6">
                    <img
                      src="../images/tick17.png"
                      alt=""
                      srcset=""
                      style={{ marginRight: "5px" }}
                    />
                    QUALITY
                  </h6>
                  <p className="para">
                    To be the leading provider of innovative and sustainable
                    ready mix concrete solutions, setting the industry benchmark
                    for quality, reliability and customer satisfaction.
                  </p>
                </div>
                <div className="row  text-start">
                  <h6 className="h6">
                    <img
                      src="../images/tick17.png"
                      alt=""
                      srcset=""
                      style={{ marginRight: "5px" }}
                    />
                    RELIABILITY
                  </h6>
                  <p className="para">
                    We understand the importance of punctuality in construction.
                    With our modern fleet of trucks and advanced logistics
                    systems, we guarantee on-time delivery of your concrete,
                    minimizing downtime and keeping your project on schedule.
                  </p>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="para">
                  Welcome to <b>Engineering Solutions,</b> where reliability
                  meets excellence in ready mix concrete services. We have Many
                  years of industry expertise, we specialize in delivering
                  high-quality concrete tailored to meet the unique needs of
                  every project.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-md-3">
        <div className="row mt-3">
          <h5 className="serviceHead">OUR SERVICES</h5>
        </div>
        <div className="row text-center d-flex justify-content-center ">
          <h1 className="serviceHead2">Your Satisfaction is Our Concern</h1>
        </div>

        <div className="row mt-md-5 mt-sm-2">
          <div className="col-md-6">
            <div className="row ">
              <div className="col-md-10 ">
                <div className="row ">
                  <div className="col-md-10 col-12 servicePart text-md-end text-center">
                    <h5>Quality Assurance</h5>
                    <p>
                      Quality is at the core of everything we do. Our
                      state-of-the-art facilities and stringent quality control
                      measures ensure that every batch of concrete meets
                      industry standards and exceeds your expectations.
                    </p>
                  </div>
                  <div className="col-md-2 col-12 ">
                    <img
                      src="../images/qualityassurance.png"
                      alt=""
                      srcset=""
                      data-aos="fade-up-right"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-8 ">
                <div className="row">
                  <div className="col-md-10 col-12 servicePart text-md-end text-center">
                    <h5>Customized Ready Mix Concrete</h5>
                    <p>
                      Our ready mix concrete services are designed to streamline
                      your construction process. With a focus on quality and
                      consistency, we deliver customized mixes that optimize
                      durability and performance for any application.
                    </p>
                  </div>
                  <div className="col-md-2 col-12">
                    <img
                      src="../images/concrete50.png"
                      alt=""
                      srcset=""
                      data-aos="fade-up-right"
                    />
                  </div>
                </div>
              </div>

              {/* ---------------------- */}

              <div
                className="row   serviceRoww g-0 hideIt"
                style={{ width: "100%" }}
              >
                <div className="col-md-6 g-0">
                  <div className="row serviceRow1" style={{ width: "100%" }}>
                    <h1>
                      <CountUp start={0} end={207} duration={2} redraw={true} />
                    </h1>
                    <p>HAPPY CLIENT</p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="row serviceRow1" style={{ width: "100%" }}>
                    <h1>
                      <CountUp start={0} end={214} duration={2} redraw={true} />
                    </h1>
                    <p>COMPLETED PROJECT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-2 d-flex justify-content-center align-items-center myCol2"
            style={{ position: "absolute", right: "41%" }}
          >
            <div className="empImg">
              <img
                src="../images/employee.png"
                alt=""
                srcset=""
                className="employee"
              />
            </div>
          </div>

          <div className="col-md-6 col-12 ps-0 ">
            <div className="row d-fle justify-content-end">
              <div className="col-md-10">
                <div className="row rowone">
                  <div className="col-md-2 col-12 text-md-start text-center">
                    <img
                      src="../images/ontime.png"
                      alt=""
                      srcset=""
                      data-aos="fade-up-left"
                    />
                  </div>
                  <div className="col-md-10 col-12 servicePart text-md-start text-center">
                    <h5>On-Time Delivery</h5>
                    <p>
                      Count on us for reliable and punctual delivery of ready
                      mix concrete. We understand the importance of project
                      timelines and ensure that your concrete arrives when and
                      where you need it, minimizing downtime and maximizing
                      efficiency.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row d-flex justify-content-end">
                  <div className="col-md-2 col-12 text-md-start text-center">
                    <img
                      src="../images/sustainbility.png"
                      alt=""
                      srcset=""
                      data-aos="fade-up-left"
                    />
                  </div>
                  <div className="col-md-10 servicePart text-md-start text-center">
                    <h5>Commitment to Sustainability</h5>
                    <p>
                      We are committed to sustainable practices in concrete
                      production. Our eco-friendly mixes reduce environmental
                      impact without compromising performance, ensuring a
                      greener future for construction projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------- */}
              <div className="row  serviceRow g-0" style={{ width: "100%" }}>
                <div className="col-md-6 g-0">
                  <div className="row serviceRow1" style={{ width: "100%" }}>
                    <h1>
                      <CountUp start={0} end={98} duration={2} redraw={true} />
                    </h1>
                    <p>PROFESSIONAL TEAM</p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="row serviceRow1" style={{ width: "100%" }}>
                    <h1>
                      <CountUp start={0} end={124} duration={2} redraw={true} />
                    </h1>
                    <p>AWARD WINNING</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-5">
        <div className="row ">
          <div className="col-md-5">
            <h1 className="forHeading1">Why Engineering Solutions ?</h1>
            <p className="para">
              At <b>Engineering Solutions</b>, we prioritize quality in every
              batch of ready-mix concrete we produce. Our state-of-the-art
              facilities and stringent quality control processes ensure that our
              concrete meets the highest industry standards. Whether you're
              working on a residential, commercial, or infrastructure project,
              you can rely on us for durable and consistent quality concrete.
            </p>
          </div>
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-6   ">
                <div className="col-12 p-3 border-bottom">
                  <img src="../images/durable2.png" alt="" srcset="" />
                  <div
                    className="para"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    When it comes to durability, Engineering Solutions sets the
                    standard in the ready-mix concrete industry.
                  </div>
                </div>
                <div className="col-12 p-3 ">
                  <img src="../images/ontimedelivery.png" alt="" srcset="" />
                  <div
                    className="para"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    Stress your reliability in terms of on-time delivery and
                    consistent product availability. This is crucial for
                    construction projects where delays can be costly.
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="col-12 p-3 border-bottom">
                  <img src="../images/ecofiendly.png" alt="" srcset="" />
                  <div
                    className="para"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    we pride ourselves on delivering eco-friendly ready-mix
                    concrete solutions that contribute positively to the
                    environment.
                  </div>
                </div>
                <div className="col-12 p-3">
                  <img src="../images/cost50.png" alt="" srcset="" />
                  <div
                    className="para"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    We offer competitive rates for our ready-mix concrete
                    products, ensuring you get the best value for your
                    investment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
