import React, { useState } from "react";
import "../css/forgotpassword.css";
import NavBar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const formdata = new FormData();

  const validateEmail = (email) => {
    const emailregex = /\S+@\S+\.\S+/;
    if (emailregex.test(email)) {
      return true;
    } else {
      toast.warning("enter valid email");
    }
  };
  const sendMail = async () => {
    if (!email) {
      toast.warning("email id is required..");
      return;
    }
    try {
      formdata.set("email", email);
      if (validateEmail(email)) {
        const config = {
          url: "/forgotpassword",
          method: "post",
          baseURL: "https://engineeringsolutions.net.in/api/user",
          headers: { "content-type": "application/json" },
          data: formdata,
        };
        const res = await axios(config);
        if (res.statuscode === 500) {
          toast.warning(res.data.error);
        } else if (res.status === 200) {
          toast.success("Reset link sent, please check your email");
        } else if (res.statuscode === 303) {
          toast.error(res.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="container-fluid myContainer3 ">
        <div className="row justify-content-center p-5 myRow2">
          <div className="emailCard d-flex flex-column justify-content-center align-items-center ">
            <h3>Forgot Password</h3>

            <section className="text mt-3" style={{ width: "70%" }}>
              <p>
                If you've forgotten your password, enter your email address
                below.
              </p>
              <label htmlFor="">Email Id :</label>
              <br />
              <input
                type="email"
                name=""
                id=""
                className="myInput1"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>
            <button
              type="button "
              class="btn btn-primary mt-5 rounded-0 border-light"
              onClick={sendMail}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
