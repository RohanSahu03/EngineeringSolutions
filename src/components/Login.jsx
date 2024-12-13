import React, { useRef, useState } from "react";
import "../css/login.css";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const formdata = new FormData();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const validateEmail = (email) => {
    const emailregex = /\S+@\S+\.\S+/;
    if (emailregex.test(email)) {
      return true;
    } else {
      toast.warning("enter valid email");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.warning("Please enter your email");
      return;
    }
    if (!formData.password) {
      toast.warning("Please enter your password");
      return;
    }

    if (validateEmail(formData.email) && validatePassword(formData.password)) {
      try {
        formdata.set("email", formData.email);
        formdata.set("password", formData.password);
        const config = {
          url: "/login",
          method: "post",
          baseURL: "https://engineeringsolutions.net.in/api/user",
          headers: { "content-type": "application/json" },
          data: formdata,
        };
        const response = await axios(config);

        if (response.status === 200) {
          toast.success("logged in...");
          sessionStorage.setItem("user", JSON.stringify(response.data.data));
          setTimeout(() => {
            navigate("/dashboard/home");
          }, 3000);
        } else {
          toast.warning("invalid credentials");
        }
      } catch (error) {
        toast.error("invalid credentials");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="container-fluid  myContainer2">
        <div
          className="row  d-flex justify-content-center align-items-center "
          style={{ isolation: "isolate" }}
        >
          <div className="col-md-5 border rounded-0 mt-5 p-5 myCol1">
            <div className="row ">
              <h3>Login</h3>
            </div>

            <form>
              <div class="row d-flex justify-content-center">
                <input
                  type="email"
                  name="email"
                  id=""
                  className="myInput1"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <br />
              </div>
              <div class="row d-flex justify-content-center mt-4">
                <input
                  type="password"
                  name="password"
                  id=""
                  className="myInput1"
                  placeholder="Enter Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div class="row d-flex justify-content-center mt-3">
                <Link to="/forgot-password"> Forgot Password ?</Link>
              </div>
              <div class="row d-flex justify-content-center">
                <button
                  type="button"
                  className="button1"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
