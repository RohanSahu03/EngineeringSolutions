import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function ViewVendor() {
  const location = useLocation();
  const receivedData = location.state;

  const navigate = useNavigate();
  return (
    <div>
      <div>
        <form class="row g-3 needs-validation" style={{ width: "100%" }}>
          {/* --customer name---- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Primary Contact*
              </label>
            </div>
            <div className="col-md-10">
              <div className="row gy-1">
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={receivedData?.vendorfirstname}
                    name="firstname"
                    disabled
                  />
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={receivedData?.vendorlastname}
                    disabled
                    name="lastname"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ------company name---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Company Name*
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={receivedData?.companyname}
                disabled
              />
            </div>
          </div>

          {/* ------vendor display name---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Vendor Display Name
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={receivedData?.vendordisplayname}
                disabled
              />
            </div>
          </div>

          {/* ------vendor email ---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Vendor Email
              </label>
            </div>
            <div className="col-md-5">
              <div class="input-group flex-nowrap textInput">
                <span class="input-group-text" id="addon-wrapping">
                  <img src="../images/email-icon.png" alt="" srcset="" />
                </span>
                <input
                  type="email"
                  class="form-control "
                  value={receivedData?.vendoremail}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* ------vendor phone number---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Vendor Phone
              </label>
            </div>
            <div className="col-md-5">
              <div class="input-group flex-nowrap textInput">
                <span class="input-group-text" id="addon-wrapping">
                  <img src="../images/phone-icon.png" alt="" srcset="" />
                </span>
                <input
                  type="tel"
                  class="form-control "
                  maxLength={10}
                  value={receivedData?.vendorphone}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* ----------------Tabs starting---------- */}
          <div className="row my-5">
            <Tabs
              defaultActiveKey="other"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {/* -------------other details tab starting---------- */}
              <Tab eventKey="other" title="Other details">
                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      PAN
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="tel"
                      class="form-control  textInput"
                      value={receivedData?.pan}
                      disabled
                    />
                  </div>
                  <div className="col-md-5 text-start">
                    <img
                      src={`https://engineeringsolutions.net.in/Vendor/${receivedData?.pancard}`}
                      alt="pancard"
                      style={{ width: "250px", height: "120px" }}
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      GST Number
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      value={receivedData?.gstnumber}
                      disabled
                    />
                  </div>
                  <div className="col-md-5 text-start">
                    <img
                      src={`https://engineeringsolutions.net.in/Vendor/${receivedData?.gstdocument}`}
                      alt="gst"
                      style={{ width: "250px", height: "120px" }}
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      MSME registration document
                    </label>
                  </div>
                  <div className="col-md-5 text-start">
                    <img
                      src={`https://engineeringsolutions.net.in/Vendor/${receivedData?.msmecertificate}`}
                      alt="msmecertificate"
                      style={{ width: "250px", height: "120px" }}
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      Cancel Cheque
                    </label>
                  </div>
                  <div className="col-md-5 text-start">
                    <img
                      src={`https://engineeringsolutions.net.in/Vendor/${receivedData?.cancelcheque}`}
                      alt="from DB"
                      style={{ width: "250px", height: "120px" }}
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      Opening Balance
                    </label>
                  </div>
                  <div className="col-md-5">
                    <div class="input-group flex-nowrap textInput">
                      <span class="input-group-text" id="addon-wrapping">
                        INR
                      </span>
                      <input
                        type="text"
                        class="form-control "
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        value={receivedData?.openingbalance}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      GST
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      value={receivedData?.gst}
                      disabled
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      Payment Term
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      value={receivedData?.paymentterm}
                      disabled
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      Documents
                    </label>
                  </div>
                  <div className="col-md-5 text-start">
                    <img
                      src={`https://engineeringsolutions.net.in/Vendor/${receivedData?.documents}`}
                      alt="from DB"
                      style={{ width: "200px", height: "120px" }}
                    />
                  </div>
                </div>
              </Tab>

              {/* -------------bank details tab starting---------- */}
              <Tab eventKey="bankdetails" title="Bank details">
                {/* ---------------------------------- */}

                <div className="row g-3 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      Account Type
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      value={receivedData?.accounttype}
                      disabled
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}

                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      Bank Name
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      value={receivedData?.bankname}
                      disabled
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      Branch Name
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      value={receivedData?.branchname}
                      disabled
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      IFSC Code
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      value={receivedData?.ifsccode}
                      disabled
                    />
                  </div>
                </div>

                {/* ---------------------------------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                      Account Number
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      value={receivedData?.accountnumber}
                      disabled
                    />
                  </div>
                </div>
              </Tab>

              {/* -------------Address tab starting---------- */}
              <Tab eventKey="address" title="Address">
                <div className="row gy-3">
                  <div className="col-md-6 ">
                    <div className="row text-start mb-md-3 mb-0">
                      <h6>Billing Address</h6>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          Country/Region
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          value={receivedData?.billingaddresscountry}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          State
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          value={receivedData?.billingaddressstate}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          City
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          value={receivedData?.billingaddresscity}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          Address
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          value={receivedData?.billingaddressaddress}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          PinCode
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          name="pincode"
                          value={receivedData?.billingaddresspincode}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          Phone
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          name="phone"
                          value={receivedData?.billingaddressphone}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="row text-start mb-3">
                      <h6>Shipping Address</h6>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          Country/Region
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          name="phone"
                          value={receivedData?.shippingaddresscountry}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          State
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          name="phone"
                          value={receivedData?.shippingaddressstate}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          City
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          name="phone"
                          value={receivedData?.shippingaddresscity}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-3">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          Address
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          name="phone"
                          value={receivedData?.shippingaddressaddress}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          PinCode
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          value={receivedData?.shippingaddresspincode}
                          disabled
                          name="pincode"
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-4 text-start">
                        <label for="inputText" className="col-form-label label">
                          Phone
                        </label>
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          value={receivedData?.shippingaddressphone}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              {/* ------------contact person tab starting---------- */}

              <Tab eventKey="contactperson" title="Contact Person">
                <div className="row overflow-auto">
                  <div className="col-md-12">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Email Address</th>
                          <th scope="col">Work Phone</th>
                          <th scope="col">Designation</th>
                          <th scope="col">Department</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              id="inputText"
                              className="form-control"
                              style={{ width: "180px" }}
                              disabled
                              value={receivedData?.contactfirstname}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              id="inputText"
                              className="form-control"
                              disabled
                              value={receivedData?.contactlastname}
                              style={{ width: "180px" }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              id="inputText"
                              className="form-control"
                              value={receivedData?.emailaddress}
                              style={{ width: "180px" }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              id="inputText"
                              className="form-control"
                              disabled
                              value={receivedData?.workphone}
                              style={{ width: "180px" }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              id="inputText"
                              className="form-control"
                              disabled
                              value={receivedData?.designation}
                              style={{ width: "180px" }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              id="inputText"
                              className="form-control"
                              disabled
                              value={receivedData?.department}
                              style={{ width: "180px" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="remarks" title="Remarks">
                <div className="row">
                  Remarks (for internal use)
                  <br />
                  <div className="col-md-7">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Street 1"
                        id="floatingTextarea2"
                        style={{ height: "70px" }}
                        disabled
                        value={receivedData?.remarks}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
            <div className="row fixed-bottom">
              <div className="col-md-6 col-6">
                <button type="submit" class="btn btn-primary float-end">
                  Save
                </button>
              </div>
              <div className="col-md-6 col-6">
                <button type="button" class="btn btn-outline-info float-start">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewVendor;
