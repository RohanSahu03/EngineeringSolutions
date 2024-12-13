import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

function UpdatePaymentMade() {
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate();

  const [vendorId, setVendorId] = useState(receivedData?.vendorname?._id);
  const [paymentmade, setPaymentmade] = useState(receivedData?.paymentmade);
  const [paymentmode, setPaymentMode] = useState(receivedData?.paymentmode);
  const [paidthrough, setPaidthrough] = useState(receivedData?.paidthrough);
  const [startDate, setStartDate] = useState(new Date());
  const [reference, setReference] = useState(receivedData?.reference);
  const [vendorlist, setVendorList] = useState([]);

  useEffect(() => {
    getAllVendors();
  }, []);

  const getAllVendors = async () => {

    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendorList(res.data);

      }
      if (res.status === 500) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formdata = new FormData();
  const updatePayment = async () => {
    try {
      formdata.set("vendorname", vendorId);
      formdata.set("paymentdate", startDate);
      formdata.set("paymentmade", paymentmade);
      formdata.set("paymentmode", paymentmode);
      formdata.set("paidthrough", paidthrough);
      formdata.set("reference", reference);

      const config = {
        url: `/updatepaymentmode/${receivedData?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/paymentmode",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("payment details updated successfully.");
     setTimeout(() => {
      navigate("/purchase/paymentsmade");
     }, 2000);
      }
      if (res.status === 404) {
        toast.warning("payment details not found.");
      }
      if (res.status === 500) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <h3>Update Pyments</h3>
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Vendor Name*
          </label>
        </div>
        <div className="col-md-5 ">
          <div class="input-group mb-3 textInput">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              getOptionLabel={(option) => option?.vendorfirstname}
              options={vendorlist}
              sx={{ width: 300 }}
              onChange={(e, value) => {
                setVendorId(value?._id);
              }}
              renderOption={(props, option) => (
                <MenuItem>
                  <Box
                    component="li"
                    {...props}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                    className="text-start mb-2 px-1 "
                  >
                    <div className="d-flex">
                      <div className="mx-2">
                        <Avatar>
                          {option?.vendorfirstname.substr(0, 1).toUpperCase()}
                        </Avatar>
                      </div>

                      <div>
                        <Typography variant="body1">
                          {option?.vendorfirstname}
                        </Typography>

                        <Typography variant="body2" color="textPrimary">
                          <TfiEmail /> &nbsp;{option?.vendoremail}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                </MenuItem>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={receivedData?.vendorname?.vendorfirstname}
                />
              )}
            />
            {/* <select
              className="textInput"
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              onClick={getAllVendors}
            >
              <option value="">Select Vendor</option>
              {vendorlist?.map((item) => {
                return <option value={item._id}>{item.vendorfirstname}</option>;
              })}
            </select> */}
          </div>
        </div>
      </div>

      {/* ------sales ordder---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Payment Made*
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            value={paymentmade}
            onChange={(e) => setPaymentmade(e.target.value)}
            placeHolder={receivedData && receivedData?.paymentmade}
          />
        </div>
      </div>

      {/* ------sales order date---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Payment Date*
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="textInput"
            style={{ outline: "none" }}
            placeHolder={receivedData?.paymentdate}
          />
        </div>
      </div>

      {/* -------------payment term--------------------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Payment Mode
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            value={paymentmode}
            onChange={(e) => setPaymentMode(e.target.value)}
          >
            {" "}
            <option value="" disabled>
              Select{" "}
            </option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cheque">Cheque</option>
            <option value="Credit Card">Credit Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
      </div>

      {/* -------------payment term--------------------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Paid Through
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            value={paidthrough}
            onChange={(e) => setPaidthrough(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Petty Cash">Petty Cash</option>
            <option value="Undeposite Fund">Undeposite Fund</option>
          </select>
        </div>
      </div>

      {/* ------sales ordder---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Reference#
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeHolder={receivedData?.reference}
          />
        </div>
      </div>

      <div className="row py-2">
        <div className="col-md-6 col-6">
          <button
            type="submit"
            class="btn btn-primary float-end"
            onClick={updatePayment}
          >
            Update
          </button>
        </div>
        <div className="col-md-6 col-6">
          <button
            type="button"
            class="btn btn-outline-info float-start"
            onClick={() => navigate("/purchase/paymentsmade")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePaymentMade;
