import React, { useState, useRef, useEffect } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  GetCountries,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Dropdown from "react-bootstrap/Dropdown";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

function UpdateVendor() {
  const { id } = useParams();
  const [vendordata, setVendordata] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get(
          "https://engineeringsolutions.net.in/api/vendors/getallvendor"
        );
        if (res.status === 200) {
          setFirstName1(res.data.vendorfirstname);
          setLastname1(res.data.vendorlastname);
          setCompanyName1(res.data.vendorcompanyname);
          setVendorDisplayName1(res.data.vendordisplayname);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [cityid, setcityid] = useState("");

  const [countryid1, setCountryid1] = useState(0);
  const [stateid1, setstateid1] = useState(0);
  const [cityid1, setcityid1] = useState("");

  const [msmeFile, setMsmeFile] = useState(null);
  const [cancelChequeFile, setcancelChequeFile] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [type, setType] = useState("");

  const handleMsmeFileChange = (e) => {
    setMsmeFile(e.target.files[0]);
  };

  const handlecancelchequeFileChange = (e) => {
    setcancelChequeFile(e.target.files[0]);
  };

  const handleDocumentChange = (e) => {
    setDocuments(e.target.files[0]);
  };

  const handleRadioChange = (event) => {
    setType(event.target.value);
  };

  //----------------------------------------------------
  const [firstname1, setFirstName1] = useState("");
  const [lastname1, setLastname1] = useState("");
  const [companyname1, setCompanyName1] = useState("");
  const [vendordisplayname1, setVendorDisplayName1] = useState("");
  const [vendorEmail1, setVendorEmail1] = useState("");
  const [customerphone1, setCustomerPhone1] = useState("");
  const [remarks1, setRemarks1] = useState("");

  // const [msmeFile1, setMsmeFile1] = useState(null);
  // const [cancelChequeFile1, setcancelChequeFile1] = useState(null);
  // const [documents1, setDocuments1] = useState(null);
  const [pan1, setPan1] = useState("");
  const [gstnumber1, setGstNumber1] = useState("");
  const [openingbalance1, setOpeningBalance1] = useState("");
  // const [gst1, setGst1] = useState("");
  const [paymentterm1, setPaymentTerm1] = useState("");

  //bankdetails
  const [type1, setType1] = useState("");
  const [bankname1, setBankName1] = useState("");
  const [branchname1, setBranchName1] = useState("");
  const [ifsccode1, setIfscCode1] = useState("");
  const [accountnumber1, setAccountNumber1] = useState("");

  //billing address
  const [country3, setCountry3] = useState("");
  const [state3, setState3] = useState("");
  const [address3, setAddress3] = useState("");
  const [city3, setCity3] = useState("");
  const [pincode3, setPincode3] = useState("");
  const [phone3, setPhone3] = useState("");
  const [faxnumber3, setFaxnumber3] = useState("");

  //shipping address
  const [country4, setCountry4] = useState("");
  const [state4, setState4] = useState("");
  const [city4, setCity4] = useState("");
  const [address4, setAddress4] = useState("");
  const [pincode4, setPincode4] = useState("");
  const [phone4, setPhone4] = useState("");
  const [faxnumber4, setFaxnumber4] = useState("");

  //contactperson details
  const [cFname1, setCFname1] = useState("");
  const [cLname1, setCLname1] = useState("");
  const [cemail1, setCemail1] = useState("");
  const [cphone1, setCphone1] = useState("");
  const [designation1, setDesignation1] = useState("");
  const [deparment1, setDepartment1] = useState("");

  //-----------form error--------------------
  const [formErrors, setFormErrors] = useState({
    companyname: "",
    vendordisplayname: "",
    vendoremail: "",
    customerphone: "",
    pan: "",
    gstnumber: "",
    openingbalance: "",
    // gst: "",
    paymentterm: "",
    accounttype: "",
    bankname: "",
    branchname: "",
    ifsccode: "",
    accountnumber: "",
    billingaddresscountry: "",
    billingaddressaddress: "",
    billingaddresscity: "",
    billingaddressstate: "",
    billingaddresspincode: "",
    billingaddressphone1: "",
    billingaddressfaxnumber: "",
    shippingaddresscountry: "",
    shippingaddressaddress: "",
    shippingaddresscity: "",
    shippingaddressstate: "",
    shippingaddresspincode: "",
    shippingaddressphone: "",
    shippingaddressfaxnumber: "",
    contactfirstname: "",
    contactlastname: "",
    emailaddress: "",
    workphone: "",
    designation: "",
    department: "",
  });

  let formdata = new FormData();
  //to update vendor data
  const updateVendor = async (id) => {
    formdata.set("vendorfirstname", firstname1);
    formdata.set("vendorlastname", lastname1);
    formdata.set("companyname", companyname1);
    formdata.set("vendordisplayname", vendordisplayname1);
    formdata.set("vendoremail", vendorEmail1);
    formdata.set("customerphone", customerphone1);
    formdata.set("pan", pan1);
    formdata.set("gstnumber", gstnumber1);
    formdata.set("msmecertificate", msmeFile);
    formdata.set("cancelcheque", cancelChequeFile);
    formdata.set("openingbalance", openingbalance1);
    // formdata.set("gst", gst1);
    formdata.set("paymentterm", paymentterm1);
    formdata.set("documents", documents);
    formdata.set("accounttype", type1);
    formdata.set("bankname", bankname1);
    formdata.set("branchname", branchname1);
    formdata.set("ifsccode", ifsccode1);
    formdata.set("accountnumber", accountnumber1);
    formdata.set("billingaddresscountry", countryid);
    formdata.set("billingaddressaddress", address3);
    formdata.set("billingaddresscity", cityid?.name);
    // formdata.set("billingaddresscity", stateid);
    formdata.set("billingaddresspincode", pincode3);
    formdata.set("billingaddressphone", phone3);
    formdata.set("billingaddressfaxnumber", faxnumber3);
    formdata.set("shippingaddresscountry", countryid1);
    formdata.set("shippingaddressaddress", address4);
    formdata.set("shippingaddresscity", cityid1?.name);
    formdata.set("shippingaddressstate", stateid1);
    formdata.set("shippingaddresspincode", pincode4);
    formdata.set("shippingaddressphone", phone4);
    formdata.set("shippingaddressfaxnumber", faxnumber4);
    formdata.set("contactfirstname", cFname1);
    formdata.set("contactlastname", cLname1);
    formdata.set("emailaddress", cemail1);
    formdata.set("workphone", cphone1);
    formdata.set("designation", designation1);
    formdata.set("department", deparment1);
    formdata.set("remarks", remarks1);
    try {
      const res = await axios.put(
        `https://engineeringsolutions.net.in/api/vendors/updatevendor/${id}`,
        {
          formdata,
        }
      );
      if (res.status === 404) {
        toast("Vendor not found..");
      }
      if (res.status === 200) {
        toast("Vendor updated successfuly..");
        // getData()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        class="row g-3 needs-validation"
        style={{ width: "100%" }}
        //   onSubmit={() => updateVendor(item._id)}
        enctype="multipart/form-data"
      >
        {/* --customer name---- */}
        <div className="row mt-md-2 mt-1 g-md-3 g-1 p-md-5 px-5 align-items-center">
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
                  value={firstname1}
                  onChange={(e) => setFirstName1(e.target.value)}
                  name="firstname"
                  placeholder="First Name"
                />
                <small className="text-danger text-start">
                  {" "}
                  {formErrors.vendorfirstname && (
                    <span className="error">{formErrors.vendorfirstname}</span>
                  )}
                </small>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  value={lastname1}
                  onChange={(e) => setLastname1(e.target.value)}
                  placeholder="Last Name"
                  name="lastname"
                />
                <small className="text-danger text-start">
                  {" "}
                  {formErrors.vendorlastname && (
                    <span className="error">{formErrors.vendorlastname}</span>
                  )}
                </small>
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
              value={companyname1}
              onChange={(e) => setCompanyName1(e.target.value)}
              name="companyname"
            />
            <small className="text-danger text-start">
              {" "}
              {formErrors.companyname && (
                <span className="error">{formErrors.companyname}</span>
              )}
            </small>
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
              value={vendordisplayname1}
              onChange={(e) => setVendorDisplayName1(e.target.value)}
              name="vendordisplayname"
            />
            <small className="text-danger text-start">
              {" "}
              {formErrors.vendordisplayname && (
                <span className="error">{formErrors.vendordisplayname}</span>
              )}
            </small>
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
                value={vendorEmail1}
                onChange={(e) => setVendorEmail1(e.target.value)}
                aria-label="Username"
                aria-describedby="addon-wrapping"
                name="vendoremail"
              />
            </div>
            <small className="text-danger text-start">
              {" "}
              {formErrors.vendoremail && (
                <span className="error">{formErrors.vendoremail}</span>
              )}
            </small>
          </div>
        </div>

        {/* ------vendor phone number---------- */}
        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
              Customer Phone
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
                value={customerphone1}
                onChange={(e) => setCustomerPhone1(e.target.value)}
                name="customerphone"
              />
            </div>
            <small className="text-danger text-start">
              {" "}
              {formErrors.customerphone && (
                <span className="error">{formErrors.customerphone}</span>
              )}
            </small>
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
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    PAN
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="tel"
                    class="form-control  textInput"
                    value={pan1}
                    onChange={(e) => setPan1(e.target.value)}
                  />
                  <small className="text-danger text-start">
                    {" "}
                    {formErrors.pan && (
                      <span className="error">{formErrors.pan}</span>
                    )}
                  </small>
                </div>
              </div>

              {/* ---------------------------------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                    value={gstnumber1}
                    onChange={(e) => setGstNumber1(e.target.value)}
                    name="gstnumber"
                  />
                  <small className="text-danger text-start">
                    {" "}
                    {formErrors.gstnumber && (
                      <span className="error">{formErrors.gstnumber}</span>
                    )}
                  </small>
                </div>
              </div>

              {/* ---------------------------------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    MSME registration document
                  </label>
                </div>
                <div className="col-md-5">
                  <div class="input-group mb-3 textInput">
                    <input
                      type="file"
                      class="form-control"
                      id="inputGroupFile02"
                      onChange={handleMsmeFileChange}
                    />
                  </div>
                </div>
              </div>

              {/* ---------------------------------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Cancel Cheque
                  </label>
                </div>
                <div className="col-md-5">
                  <div class="input-group mb-3 textInput">
                    <input
                      type="file"
                      class="form-control"
                      id="inputGroupFile02"
                      onChange={handlecancelchequeFileChange}
                    />
                  </div>
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
                      value={openingbalance1}
                      onChange={(e) => setOpeningBalance1(e.target.value)}
                      name="openingbalance"
                    />
                  </div>
                  <small className="text-danger text-start">
                    {" "}
                    {formErrors.openingbalance && (
                      <span className="error">{formErrors.openingbalance}</span>
                    )}
                  </small>
                </div>
              </div>

              {/* ---------------------------------- */}
              {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    GST
                  </label>
                </div>
                <div className="col-md-5">
                  <select
                    className="form-select textInput"
                    id="inputGroupSelect03"
                    aria-label="Example select with button addon"
                    value={gst1}
                    onChange={(e) => setGst1(e.target.value)}
                    name="gst"
                  >
                    <option value="5%">5%</option>
                    <option value="10%">10%</option>
                    <option value="15%">15%</option>
                    <option value="20%">20%</option>
                    <option value="25%">25%</option>
                  </select>
                  <small className="text-danger text-start">
                    {" "}
                    {formErrors.gst && (
                      <span className="error">{formErrors.gst}</span>
                    )}
                  </small>
                </div>
              </div> */}

              {/* ---------------------------------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Payment Term
                  </label>
                </div>
                <div className="col-md-5">
                  <select
                    className="form-select textInput"
                    value={paymentterm1}
                    onChange={(e) => setPaymentTerm1(e.target.value)}
                    id="inputGroupSelect03"
                    aria-label="Example select with button addon"
                    name="paymentterm"
                  >
                    <option value="Net-15">Net 15</option>
                    <option value="Net-30">Net 30</option>
                    <option value="Net-45">Net 45</option>
                    <option value="Net-60">Net 60</option>
                    <option value="Due end of the month" active>
                      Due end of the month
                    </option>
                    <option value="Due end of the next month" active>
                      Due end of the next month
                    </option>
                    <option value="Due on Receipt" active>
                      Due on Receipt
                    </option>
                  </select>
                </div>
              </div>

              {/* ---------------------------------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Documents
                  </label>
                </div>
                <div className="col-md-5">
                  <div class="input-group mb-3 textInput">
                    <input
                      type="file"
                      class="form-control"
                      id="inputGroupFile02"
                      onChange={handleDocumentChange}
                    />
                  </div>
                </div>
              </div>
            </Tab>

            {/* -------------bank details tab starting---------- */}
            <Tab eventKey="bankdetails" title="Bank details">
              {/* ---------------------------------- */}

              <div className="row g-3 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Type
                  </label>
                </div>
                <div className="col-md-3">
                  <div className="row">
                    <div className="col-md-5 col-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          type="radio"
                          value="saving"
                          checked={type === "saving"}
                          onChange={handleRadioChange}
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Saving
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5 col-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          value="current"
                          checked={type === "current"}
                          onChange={handleRadioChange}
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Current
                        </label>
                      </div>
                    </div>
                  </div>
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
                    onChange={(e) => setBankName1(e.target.value)}
                    value={bankname1}
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
                    onChange={(e) => setBranchName1(e.target.value)}
                    value={branchname1}
                    name="branchname"
                  />
                  <small className="text-danger text-start">
                    {" "}
                    {formErrors.branchname && (
                      <span className="error">{formErrors.branchname}</span>
                    )}
                  </small>
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
                    onChange={(e) => setIfscCode1(e.target.value)}
                    value={ifsccode1}
                    name="ifsccode"
                  />
                  <small className="text-danger text-start">
                    {" "}
                    {formErrors.ifsccode && (
                      <span className="error">{formErrors.ifsccode}</span>
                    )}
                  </small>
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
                    onChange={(e) => setAccountNumber1(e.target.value)}
                    value={accountnumber1}
                    name="accountnumber"
                  />
                  <small className="text-danger text-start">
                    {" "}
                    {formErrors.accountnumber && (
                      <span className="error">{formErrors.accountnumber}</span>
                    )}
                  </small>
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
                      <CountrySelect
                        className="textInput"
                        onChange={(e) => {
                          setCountryid(e.id);
                        }}
                        placeHolder="Select Country"
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.billingaddresscountry && (
                          <span className="error">
                            {formErrors.billingaddresscountry}
                          </span>
                        )}
                      </small>
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
                      <StateSelect
                        countryid={countryid}
                        className="textInput"
                        onChange={(e) => {
                          setstateid(e.id);
                        }}
                        placeHolder="Select State"
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.billingaddressstate && (
                          <span className="error">
                            {formErrors.billingaddressstate}
                          </span>
                        )}
                      </small>
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
                      <CitySelect
                        countryid={countryid}
                        className="textInput"
                        stateid={stateid}
                        onChange={(e) => {
                          setcityid(e);
                        }}
                        placeHolder="Select City"
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.billingaddresscity && (
                          <span className="error">
                            {formErrors.billingaddresscity}
                          </span>
                        )}
                      </small>
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
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Street 1"
                          id="floatingTextarea2"
                          style={{ height: "70px" }}
                          value={address3}
                          onChange={(e) => setAddress3(e.target.value)}
                          name="address"
                        ></textarea>
                      </div>
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.billingaddressaddress && (
                          <span className="error">
                            {formErrors.billingaddressaddress}
                          </span>
                        )}
                      </small>
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
                        value={pincode3}
                        onChange={(e) => setPincode3(e.target.value)}
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.billingaddresspincode && (
                          <span className="error">
                            {formErrors.billingaddresspincode}
                          </span>
                        )}
                      </small>
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
                        value={phone3}
                        onChange={(e) => setPhone3(e.target.value)}
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.billingaddressphone1 && (
                          <span className="error">
                            {formErrors.billingaddressphone1}
                          </span>
                        )}
                      </small>
                    </div>
                  </div>

                  {/* ---------------------------------- */}
                  <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                    <div className="col-md-4 text-start">
                      <label for="inputText" className="col-form-label label">
                        Fax Number
                      </label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        name="faxnumber"
                        value={faxnumber3}
                        onChange={(e) => setFaxnumber3(e.target.value)}
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.billingaddressfaxnumber && (
                          <span className="error">
                            {formErrors.billingaddressfaxnumber}
                          </span>
                        )}
                      </small>
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
                      <CountrySelect
                        onChange={(e) => {
                          setCountryid1(e.id);
                        }}
                        placeHolder="Select Country"
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.shippingaddresscountry && (
                          <span className="error">
                            {formErrors.shippingaddresscountry}
                          </span>
                        )}
                      </small>
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
                      <StateSelect
                        countryid={countryid1}
                        onChange={(e) => {
                          setstateid1(e.id);
                        }}
                        placeHolder="Select State"
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.shippingaddressstate && (
                          <span className="error">
                            {formErrors.shippingaddressstate}
                          </span>
                        )}
                      </small>
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
                      <CitySelect
                        countryid={countryid1}
                        className="textInput"
                        stateid={stateid1}
                        onChange={(e) => {
                          setcityid1(e);
                        }}
                        placeHolder="Select City"
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.shippingaddresscity && (
                          <span className="error">
                            {formErrors.shippingaddresscity}
                          </span>
                        )}
                      </small>
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
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Street 1"
                          id="floatingTextarea2"
                          style={{ height: "70px" }}
                          value={address4}
                          onChange={(e) => setAddress4(e.target.value)}
                          name="address"
                        ></textarea>
                      </div>
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.shippingaddressaddress && (
                          <span className="error">
                            {formErrors.shippingaddressaddress}
                          </span>
                        )}
                      </small>
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
                        value={pincode4}
                        onChange={(e) => setPincode4(e.target.value)}
                        name="pincode"
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.shippingaddresspincode && (
                          <span className="error">
                            {formErrors.shippingaddresspincode}
                          </span>
                        )}
                      </small>
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
                        value={phone4}
                        onChange={(e) => setPhone4(e.target.value)}
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.shippingaddressphone && (
                          <span className="error">
                            {formErrors.shippingaddressphone}
                          </span>
                        )}
                      </small>
                    </div>
                  </div>

                  {/* ---------------------------------- */}
                  <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                    <div className="col-md-4 text-start">
                      <label for="inputText" className="col-form-label label">
                        Fax Number
                      </label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        value={faxnumber4}
                        onChange={(e) => setFaxnumber4(e.target.value)}
                        name="faxnumber"
                      />
                      <small className="text-danger text-start">
                        {" "}
                        {formErrors.shippingaddressfaxnumber && (
                          <span className="error">
                            {formErrors.shippingaddressfaxnumber}
                          </span>
                        )}
                      </small>
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
                            onChange={(e) => setCFname1(e.target.value)}
                            value={cFname1}
                          />
                          <small className="text-danger text-start">
                            {" "}
                            {formErrors.contactfirstname && (
                              <span className="error">
                                {formErrors.contactfirstname}
                              </span>
                            )}
                          </small>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="inputText"
                            className="form-control"
                            onChange={(e) => setCLname1(e.target.value)}
                            value={cLname1}
                            style={{ width: "180px" }}
                          />
                          <small className="text-danger text-start">
                            {" "}
                            {formErrors.contactlastname && (
                              <span className="error">
                                {formErrors.contactlastname}
                              </span>
                            )}
                          </small>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="inputText"
                            className="form-control"
                            onChange={(e) => setCemail1(e.target.value)}
                            value={cemail1}
                            style={{ width: "180px" }}
                          />
                          <small className="text-danger text-start">
                            {" "}
                            {formErrors.emailaddress && (
                              <span className="error">
                                {formErrors.emailaddress}
                              </span>
                            )}
                          </small>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="inputText"
                            className="form-control"
                            onChange={(e) => setCphone1(e.target.value)}
                            value={cphone1}
                            style={{ width: "180px" }}
                          />
                          <small className="text-danger text-start">
                            {" "}
                            {formErrors.workphone && (
                              <span className="error">
                                {formErrors.workphone}
                              </span>
                            )}
                          </small>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="inputText"
                            className="form-control"
                            onChange={(e) => setDesignation1(e.target.value)}
                            value={designation1}
                            style={{ width: "180px" }}
                          />
                          <small className="text-danger text-start">
                            {" "}
                            {formErrors.designation && (
                              <span className="error">
                                {formErrors.designation}
                              </span>
                            )}
                          </small>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="inputText"
                            className="form-control"
                            onChange={(e) => setDepartment1(e.target.value)}
                            value={deparment1}
                            style={{ width: "180px" }}
                          />
                          <small className="text-danger text-start">
                            {" "}
                            {formErrors.department && (
                              <span className="error">
                                {formErrors.department}
                              </span>
                            )}
                          </small>
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
                      name="remarks"
                      value={remarks1}
                      onChange={(e) => setRemarks1(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
          <div className="row fixed-bottom">
            <div className="col-md-6 col-6">
              <button type="submit" class="btn btn-primary float-end">
                Update
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
  );
}

export default UpdateVendor;
