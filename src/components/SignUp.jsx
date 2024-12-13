import React, { useState } from "react";
import NavBar from "./Navbar";
import "../css/signup.css";
// import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  // const [countryid, setCountryid] = useState(0);
  // const [stateid, setstateid] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const validatePhone = (phone) => {
    const phoneregex = /^[6789]\d{9}$/;
    if (phoneregex.test(phone)) {
      return true;
    } else {
      toast.warning("enter valid mobile number");
    }
  };

  const validateEmail = (email) => {
    const emailregex = /\S+@\S+\.\S+/;
    if (emailregex.test(email)) {
      return true;
    } else {
      toast.warning("enter valid email");
    }
  };

  const validatePassword = (password) => {
    const passwordregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;
    if (passwordregex.test(password)) {
      return true;
    } else {
      toast.warning("enter valid password");
    }
  };

  const matchPassword = (password1, password2) => {
    if (password1 === password2) {
      return true;
    } else {
      toast.warning("passwords do not match");
    }
  };

  let formdata = new FormData();

  const createUser = async () => {
    console.log(companyname, email, mobile);
    if (!companyname) {
      toast.warning("Please enter company name");
      return;
    }
    if (!email) {
      toast.warning("Please enter email");
      return;
    }

    if (!mobile) {
      toast.warning("Please enter mobile number");
      return;
    }
    if (!password || !confirmPassword) {
      toast.warning("Please enter password");
      return;
    }

    // if (!countryid || !stateid) {
    //   toast.warning("Please select country and state");
    //   return;
    // }

    try {
      if (
        validateEmail(email) &&
        validatePassword(password) &&
        validatePhone(mobile) &&
        matchPassword(password, confirmPassword)
      ) {
        formdata.set("companyname", companyname);
        formdata.set("email", email);
        formdata.set("mobileno", mobile);
        formdata.set("password", password);

        // formdata.set("confirmpassword", confirmPassword);
        // formdata.set("country", countryid?.name);
        // formdata.set("state", stateid?.name);
        console.log(formdata);
        const config = {
          url: "/register",
          method: "post",
          baseURL: "https://engineeringsolutions.net.in/api/user",
          headers: { "content-type": "application/json" },
          data: formdata,
        };
        const res = await axios(config);
        console.log(res);
        if (res.status === 201) {
          toast.success("Registration successful..");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="container-fluid mainContainer">
        <div class="card mt-3 rounded-0" style={{ width: "40rem" }}>
          <span className="mt-3">
            <h3>Register</h3>
          </span>
          <form onSubmit={createUser}>
            <div class="card-body d-flex flex-column align-items-center">
              <input
                type="text"
                name=""
                className="myInput"
                placeholder="Company Name"
                value={companyname}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="email"
                name=""
                className="myInput"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                maxLength={10}
                name=""
                className="myInput"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <input
                type="password"
                name=""
                className="myInput"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                name=""
                className="myInput"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* <div className="row" style={{ width: "85%", marginTop: "10px" }}>
                <CountrySelect
                  onChange={(e) => {
                    setCountryid(e.id);
                  }}
                  placeHolder="Select Country"
                  style={{ color: "gray", fontWeight: "600" }}
                />
              </div>
              <div className="row" style={{ width: "85%", marginTop: "10px" }}>
                <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                    setstateid(e.id);
                  }}
                  placeHolder="Select State"
                  style={{ color: "gray", fontWeight: "600" }}
                />
              </div> */}
              <br />

              <div>
                <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                />
                I agree to the <a href="">Terms of Service</a> and{" "}
                <a href="">Privacy Policy</a>.
              </div>
              <br />
              <small>
                Please read and accept the Terms of Service and Privacy Policy
              </small>
              <button
                type="button"
                className="registerBtn"
                onClick={createUser}
              >
                CREATE ACCOUNT
              </button>

              <br />
              <b>
                you already have an account ? <Link to="/login">Login</Link>
              </b>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
