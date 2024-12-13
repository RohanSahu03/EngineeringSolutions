import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import "../css/contact.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function Contact() {
  // const [name,setName]=useState('')
  // const [email,setEmail]=useState('')
  // const [subject,setSubject]=useState('')
  // const [message,setMessage]=useState('')

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process form submission
      console.log("Form is valid:", formData);
      // Reset form after submission if needed
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      alert("form is invalid");
    }
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    //validate subject
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      valid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = "Message is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  useEffect(() => {
    AOS.init({ duration: "900" });
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="contactbanner">
        <div className="innerDiv">
          <h1>Contact Us</h1>
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

      <div className="container-fluid py-5 d-flex align-items-center justify-content-center">
        <div className="row " style={{ width: "100%" }}>
          <div className="col-md-6">
            <div className="row">
              <h5 className="contactHead">GET IN TOUCH</h5>
            </div>
            <div className="row text-start  ">
              <h1 className="contactHead2">
                Don't Hesitate to Ask a <br /> Question
              </h1>
            </div>
            <div className="para ">
              Thank you for your interest in Engineering Solutions. We're here
              to help and look forward to hearing from you. Please feel free to
              reach out to us using any of the methods below:
            </div>

            <br />
            <div
              className="row d-flex align-items-center justify-content-center"
              style={{ width: "100%" }}
            >
              <div className="col-md-5  col-6">
                <div className="contactCard">
                  <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-2 col-12">
                      <img src="../images/phone-40.png" alt="" srcset="" />
                    </div>
                    <div className="col-md-10 col-12 text-sm-center">
                      <h1 className="forHeading5">Phone Number</h1>
                      <div className="para4 text-start">+91-9900070087</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-6">
                <div className="contactCard">
                  <div className="row">
                    <div className="col-md-2 col-12">
                      <img src="../images/email-40.png" alt="" srcset="" />
                    </div>
                    <div className="col-md-10 col-12 ">
                      <h1 className="forHeading5">Email Address</h1>
                      <div className="para4 text-start">
                        engineeringsolutions2011@rediffmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-6">
                <div className="contactCard">
                  <div className="row">
                    <div className="col-md-2 col-12">
                      <img src="../images/location-40.png" alt="" srcset="" />
                    </div>
                    <div className="col-md-10 col-12">
                      <h1 className="forHeading5">Main Office</h1>
                      <div className="para4 text-start">
                        Engineering Solutionss
                        <br />
                        1st Main, No.28, 1st Floor, Apporva Nagar,Near Silver
                        Town Cross, Gokul Road Hubbali, Karnataka, 580030
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6 col-6">
    <div className="contactCard">
              <div className="row">
                <div className="col-md-2 col-12">
        <img src="../images/building-40.png" alt="" srcset="" />
                </div>
                <div className="col-md-10 col-12">
                <h1 className="forHeading5">2nd Office</h1>
                <div className="para4">
            Bengaluru
                </div>
                </div>
              </div>
            </div>
    </div> */}
            </div>
          </div>

          <div className="col-md-6 ">
            <form onSubmit={handleSubmit}>
              <div
                className="row py-3  border d-flex justify-content-center gx-5 rounded-2"
                style={{ backgroundColor: "aliceblue" }}
              >
                <h1 className="formHead">Fill The Form Below</h1>
                <div className="para text-center mb-4">
                  Fill the form below and we will get back to you as soon as
                  possible.
                </div>

                <div className="col-md-5 ">
                  <input
                    type="text"
                    name="name"
                    id=""
                    className="inputBox"
                    placeholder="Your Name Here"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {formErrors.name && (
                    <span className="error">{formErrors.name}</span>
                  )}
                </div>
                <div className="col-md-5 ">
                  <input
                    type="email"
                    name="email"
                    id=""
                    className="inputBox"
                    placeholder="Your Email Here"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && (
                    <span className="error">{formErrors.email}</span>
                  )}
                </div>
                <div className="col-md-10">
                  <input
                    type="text"
                    placeholder="Your Subject"
                    className="inputBox"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {formErrors.subject && (
                    <span className="error">{formErrors.subject}</span>
                  )}
                </div>
                <div className="col-md-10">
                  <textarea
                    name="message"
                    placeholder="Your Message Here"
                    id=""
                    className="textArea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {formErrors.message && (
                    <span className="error">{formErrors.message}</span>
                  )}
                </div>
                <div className="col-md-10 mb-4">
                  <button type="submit" class="btn btn-dark w-100 rounded-0">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid mb-3">
        <div className="row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.4573339498934!2d75.09625732094028!3d15.351698651981671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d6db8f5e265b%3A0xefa2122f51bf4de4!2sEngineering%20Solutions%20-%20RMC%2FConcrete!5e0!3m2!1sen!2sin!4v1728363345021!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: "0px" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
