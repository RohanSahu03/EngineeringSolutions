import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";


function UpdatePayment() {
    const location = useLocation();
    const receivedData = location.state;
const navigate = useNavigate()

const [paymentreceived, setPaymentReceived] = useState([]);
const [amountreceived, setAmountReceived] = useState(receivedData?.amountreceived);
const [bankcharges, setBankCharges] = useState(receivedData?.bankcharges);
const [paymentdate, setPaymentDate] = useState(receivedData?.paymentdate);
const [payment, setPayment] = useState(receivedData?.paymentnumber);
const [depositto, setDepositTo] = useState(receivedData?.depositto);
const [paymentmode, setPaymentMode] = useState("");
const [reference, setReference] = useState(receivedData?.reference);
const [taxdeducted, setTaxDeducted] = useState(receivedData?.taxdeducted);


const updatePayment=async()=>{
    try{
        
    }
    catch(error){
        console.log(error)
    }
}

  return (
    <div>
           {/* ------quote---------- */}
           <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Customer Name
              </label>
            </div>
            <div className="col-md-5 text-start">
        
              <select
                className="textInput date-picker-input"
                disabled
              >
                <option value="">{receivedData?.customername?.customerfirstname}</option>
               
              </select>
            </div>
          </div>

          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Amount Received *
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="number"
                id="inputText"
                className="form-control textInput"
                required
                value={amountreceived}
                onChange={(e) => setAmountReceived(e.target.value)}
              />
            </div>
          </div>

          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Bank Charges (if any)
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="number"
                id="inputText"
                className="form-control textInput"
                required
                value={bankcharges}
                onChange={(e) => setBankCharges(e.target.value)}
              />
            </div>
          </div>

          {/* ------quote date---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Payment Date*
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={paymentdate}
                onChange={(date) => setPaymentDate(date)}
                className="textInput date-picker-input"
                style={{ outline: "none"}}
                required

              />
            </div>
          </div>

          {/* ------refrence---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Payment#
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Payment Mode
              </label>
            </div>
            <div className="col-md-5 text-start">
              <select
                className="textInput date-picker-input"
                value={paymentmode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
            
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="Credit Card">Credit Card</option>
                <option value="UPI">UPI</option>
                <option value="Bank Remittance">Bank Remittance</option>
              </select>
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Deposite To*
              </label>
            </div>
            <div className="col-md-5 text-start">
              <select
                className="textInput date-picker-input"
                value={depositto}
                onChange={(e) => setDepositTo(e.target.value)}
              >
        
                <option value="Petty Cash">Petty Cash</option>
                <option value="Cash">Undeposited Funds</option>
                <option value="Employee Reimbursement">
                  Employee Reimbursement
                </option>
                <option value="Opening Balance Adjustment">
                  Opening Balance Adjustment
                </option>
                <option value="TDS Paybles">TDS Paybles</option>
              </select>
            </div>
          </div>

          {/* ------refrence---------- */}
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
              />
            </div>
          </div>

          <div className="row  mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Tax Deducted?
              </label>
            </div>
            <div className="col-md-5">
              <div className="row">
                <div className="col-md-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      name="itemtype"
                      id="flexRadioDefault1"
                      type="radio"
                      value="No"
                      checked={taxdeducted === "No"}
                      onChange={(e) => e.target.value}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      No
                    </label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="itemtype"
                      id="flexRadioDefault1"
                      value="Yes"
                      checked={taxdeducted === "Yes"}
                      onChange={(e) => setTaxDeducted(e.target.value)}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Yes
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --------------item table------------- */}
          {/* <div className="row mt-3 text-start">
            <h5 className="py-2 bg-secondary text-light">Unpaid Invoices</h5>
          </div> */}

          {/* <div className="row mt-1 overflow-auto">
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Invoice Number</th>
                  <th scope="col">Invoice Amount</th>
                  <th scope="col">Amount Due</th>
                  <th scope="col"> Payment</th>
                </tr>
              </thead>
              <tbody>
                {unpaidinvoice.length !==0 ? (
                  <>
                    {unpaidinvoice.map((item) => {
                      return (
                        <tr>
                          <td>{formatDate(item?.invoicedate)}</td>
                          <td>{item?.invoice}</td>
                          <td>₹{ (item?.total).toFixed(2)}</td>
                          <td>₹{ (item?.dueamount).toFixed(2)}</td>
                          <td><input type="text" name="" id="" /></td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <h5>
                      There are no unpaid invoices associated with this
                      customer.
                    </h5>
                  </tr>
                ) }

           
              </tbody>
            </table>
          </div> */}

          {/* ---------button----------    */}
          <div className="row justify-content-center">
              {/* <div
                className="col-md-6 p-md-5 p-2 mt-2"
                style={{ background: "aliceblue" }}
              > */}
              {/* <div className="row">
                <div className="col-md-4 col-4 text-start">
                  <h6>subtotal</h6>
                </div>
                <div className="col-md-4 col-4 "></div>
                <div className="col-md-4 col-4 text-end">{subtotal}</div>
              </div>
              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>Shipping Charges</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="in rupees"
                      value={shippingChares}
                      onChange={(e) => {
                        setShippingCharges(e.target.value);
                        // setTotal(total + shippingChares);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>{shippingChares}</p>
                </div>
              </div> */}

              {/* <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>GST</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="in %"
                      value={gsttax}
                      onChange={(e) => {
                        setGstTax(e.target.value);
                        // setTotal((gsttax / 100) * total + total);
                      }}
                    />

                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>{gsttax}</p>
                </div>
              </div> */}
{/* 
              <div className="row mt-2 border-top">
                <div className="col-md-6 col-6">
                  <h4>Total (₹)</h4>
                </div>
                <div className="col-md-6 col-6">
                  <h4>{total}</h4>
                </div>
              </div> */}
            {/* </div> */}
            <div className="row g-3 ">
              <div className="col-md-6 col-3 ">
                <button
                  // type="submit"
                  class="btn btn-primary float-end"
                //   onClick={saveReceivedPayment}
                onClick={()=>updatePayment(receivedData?._id)}
                >
                Update
                </button>
              </div>
              <div className="col-md-6 col-3">
                <button type="button" class="btn btn-outline-info float-start">
                  Cancel
                </button>
              </div>
            </div>
          </div>
    </div>
  )
}

export default UpdatePayment