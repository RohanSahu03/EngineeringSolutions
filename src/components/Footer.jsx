import React from "react";
import "../css/footer.css";
import { AiTwotoneMail } from "react-icons/ai";
import { MdOutlineCall } from "react-icons/md";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <div>
      <footer className="footer p-md-5 p-2">
        <div className="container">
          <div className="footerMain ">
            <div className="left  px-2">
              <div className="aboutSection text-start">
                <h5 className="footerh3">
                  {" "}
                  <u>About Engineering Solutions</u>
                </h5>
                <div className="footerPara">
                  Our engineering prowess extends to designing customized
                  concrete mixes that align precisely with project requirements.
                  Whether it's high-strength foundations, intricate
                  architectural elements.
                </div>
              </div>
            </div>
            <div className="rightSection ">
              <div className="quickLinks">
                <h5 className="footerh3">
                  <u>Quick Links</u>
                </h5>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/aboutus">About</a>
                  </li>
                  <li>
                    <a href="/service">Our Services</a>
                  </li>

                  <li>
                    <a href="/contactus"> Contact Us</a>
                  </li>
                </ul>
              </div>
              <div className="contactDetails ">
                <h5 className="footerh3">
                  <u>Contact Details</u>
                </h5>
                <ul>
                  <li>
                    <div className="d-flex footerPara">
                      <img src="../images/call2.png" alt="" srcset="" />
                      &nbsp;+91-9900070087
                    </div>
                  </li>
                  <li>
                    <div className="d-flex footerPara">
                      <img src="../images/email2.png" alt="" srcset="" />
                      &nbsp;engineeringsolutions2011@rediffmail.com
                    </div>
                  </li>
                  <li>
                    <div className="d-flex footerPara">
                      <div>
                        <img src="../images/address.png" alt="" srcset="" />
                      </div>
                      &nbsp; 1st Main, No.28, 1st Floor, Apporva Nagar,Near
                      Silver Town Cross, Gokul Road Hubbali, Karnataka, 580030
                    </div>
                  </li>
                </ul>
              </div>
              <div className="socialMedia">
                <h5 className="footerh3">
                  <u>Follow Us</u>
                </h5>
                <div>
                  <FaFacebookF className="socialIcon" />
                  <FaXTwitter className="socialIcon" />
                  <FaSquareInstagram className="socialIcon"></FaSquareInstagram>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
