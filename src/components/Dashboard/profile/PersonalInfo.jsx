import React, { useState, useRef, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

function PersonalInfo() {
  const userData = JSON.parse(sessionStorage.getItem("user"));

  const [input1, setInput1] = useState(true);
  const [input2, setInput2] = useState(true);
  const [input3, setInput3] = useState(true);
  const [input4, setInput4] = useState(true);
  const [input5, setInput5] = useState(true);
  const [input6, setInput6] = useState(true);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [profilepic, setProfilePic] = useState(null);

  const setPicture = async (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    console.log("file", file);
    const formData = new FormData();
    formData.append("profilepic", file);
    try {
      const config = {
        url: `/updatesubadmin/${userData?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/user",
        headers: { "content-type": "multipart/form-data" },
        data: formData,
      };
      const res = await axios(config);
      if (res.status === 201) {
        alert("Profile Picture Updated Successfully");
      } else if (res.status === 400) {
        alert("User Not Found..");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container ">
        <div className="row text-start mt-3 ">
          <h3>Profile</h3>
        </div>
        <div
          className="row justify-content-center "
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            background: "aliceblue",
          }}
        >
          <div className="col-md-12 p-md-5 p-2">
            <div className="row">
              <div className="col-md-2 col-3">
                <div className="profilePic">
                  <img
                    src={`https://engineeringsolutions.net.in/Profilepic/${userData?.profilepic}`}
                    alt="from DB"
                  />
                  <button className="editBtn" onClick={handleClick}>
                    <img src="../images/edit.png" alt="" srcset="" /> edit
                  </button>
                </div>
              </div>
              <div className="col-md-5 col-9 text-start">
                <h4>{userData?.companyname}</h4>
                <p>{userData?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row justify-content-center mt-3  p-md-3 p-2"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            background: "aliceblue",
          }}
        >
          <div className="col-md-12 text-start ">
            <h4>My Email Address</h4>
          </div>
          <div className="col-md-12 text-start ">
            <p>
              You can use the following email addresses to sign in to your
              account and also to reset your password if you ever forget it.
            </p>
          </div>
          <div className="row mt-3">
            <div className="col-md-6 col-6 text-start ">
              <div className="row">
                <div className="col-md-2">
                  <img
                    src="../images/email.png"
                    alt=""
                    srcset=""
                    className="emailPic"
                  />
                </div>
                <div className="col-md-8">
                  <h6>{userData?.email}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-6 text-end">
              {/* <MdDeleteForever style={{fontSize:'25px'}}/> */}
            </div>
          </div>
        </div>

        <div
          className="row justify-content-center mt-3 p-md-3 p-2 mb-4"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            background: "aliceblue",
          }}
        >
          <div className="col-md-12 text-start ">
            <h4>My Mobile Number</h4>
          </div>
          <div className="col-md-12 text-start ">
            <p>
              View and manage all of the mobile numbers associated with your
              account.
            </p>
          </div>
          <div className="row mt-3">
            <div className="col-md-6 col-6 text-start ">
              <div className="row">
                <div className="col-md-2">
                  <img
                    src="../images/call.png"
                    alt=""
                    srcset=""
                    className="emailPic"
                  />
                </div>
                <div className="col-md-8">
                  <h6>+91-{userData?.mobileno}</h6>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-6 text-end">
              {/* <MdDeleteForever style={{fontSize:'25px'}}/> */}
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setPicture(e)}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;
