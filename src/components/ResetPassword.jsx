import React, { useState } from "react";
import NavBar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

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

  const updatePassword = async () => {
    if (!password || !confirmPassword) {
      toast.warning("please enter password");
      return;
    }

    try {
      if (
        validatePassword(password) &&
        matchPassword(password, confirmPassword)
      ) {
        const config = {
          url: `/resetpassword/${id}`,
          method: "put",
          baseURL: "https://engineeringsolutions.net.in/api/user",
          headers: { "content-type": "application/json" },
          data: { password },
        };

        const res = await axios(config);
        if (res.status === 200) {
          toast.success("Password changed successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if (res.status === 400) {
          toast.error("Password not changed");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="container-fluid myContainer3 ">
        <div className="row justify-content-center p-5 myRow2">
          <div className="passwordCard d-flex flex-column justify-content-center align-items-center ">
            <h3>Reset Password</h3>

            <section className="text mt-3" style={{ width: "70%" }}>
              <label htmlFor="">Password :</label>
              <br />
              <input
                type="password"
                name=""
                id=""
                className="myInput1"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={password}
                valueAgain={confirmPassword}
                onChange={(isValid) => {}}
              />
              <label htmlFor="">Confirm Password :</label>
              <br />
              <input
                type="text"
                name=""
                id=""
                className="myInput1"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </section>
            <button
              type="button "
              class="btn btn-primary mt-5 rounded-0 border-light"
              onClick={updatePassword}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
