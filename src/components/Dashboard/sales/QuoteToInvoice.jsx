import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert module
import "react-confirm-alert/src/react-confirm-alert.css";

function DcToInvoice() {
  const location = useLocation();
  const receivedData = location.state;
  const [invoicedate, setInvoiceDate] = useState(new Date());
  const [invoice, setInvoice] = useState("");
  const [duedate, setDueDate] = useState(new Date());
  const navigate = useNavigate();
  const [itemdetails, setItemDetails] = useState([]);

  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    customername: receivedData.customername?.customerfirstname,
    invoice: invoice,
    ordernumber: receivedData.salesorder,
    invoicedate: invoicedate,
    duedate: duedate,
    terms: receivedData.paymentterm,
    itemdetailsArray: JSON.stringify(itemdetails),
    subtotal: receivedData.subtotal,
    shippingcharges: receivedData.shippingcharges,
    gsttax: receivedData.gsttax,
    total: receivedData.total,
  });

  // Handler function to update state with user input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function generateUniqueINVString() {
    const prefix = "INV-";
    const maxLength = 6; // Adjust this to the desired length of the random part of the string
    let uniqueString = "";
    uniqueString = prefix + generateRandomString(maxLength);

    return uniqueString;
  }

  function generateRandomString(length) {
    const charset = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  useEffect(() => {
    setInvoice(generateUniqueINVString());
    setItemDetails(receivedData.itemdetailsArray);
    console.log("ioireoo", receivedData);
  }, []);

  const formDataObject = {};

  const saveInvoice = async () => {
    if (!invoice) {
      toast.warning("please enter invoice number");
      return;
    }
    if (!invoicedate || !duedate) {
      toast.warning("please enter invoice date and due date");
      return;
    }
    formdata.set("quotationid", receivedData._id);
    formdata.set("customername", receivedData.customername._id);
    formdata.set("invoice", invoice);
    formdata.set("ordernumber", receivedData.reference);
    formdata.set("invoicedate", invoicedate);
    formdata.set("duedate", duedate);
    formdata.set("terms", receivedData.terms);
    formdata.set("itemdetailsArray", JSON.stringify(itemdetails));
    formdata.set("subtotal", receivedData.subtotal);
    formdata.set("shippingcharges", receivedData.shippingcharges);
    formdata.set("gsttax", receivedData.gsttax);
    formdata.set("total", receivedData.total);

    formdata.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const config = {
        url: "/createinvoice",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/invoices",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("invoice saved..");
        navigate("/dashboard/sales/invoice");
      }
      if (res.status === 500) {
        toast.error(res.status.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmalert = () => {
    confirmAlert({
      title: "Confirm to Save Invoice",
      message:
        "The Quotation will be automatically confirmed once you convert it to an invoice",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            saveInvoice();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="row border-bottom py-2 text-start d-flex ">
        <h3>
          <IoDocumentTextOutline /> &nbsp;&nbsp; New Invoice
        </h3>
      </div>
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Customer Name*
          </label>
        </div>
        <div className="col-md-5 ">
          <div className="row">
            <div className="col-md-8 ">
              <div class="input-group mb-md-3 mb-0 textInput">
                <input
                  type="text"
                  class="form-control"
                  placeholder="select customer"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={receivedData.customername.customerfirstname}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------sales ordder---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Invoice#*
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            required
            value={invoice}
          />
        </div>
      </div>

      {/* ------refrence---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Order Number
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            value={receivedData.reference}
            disabled
          />
        </div>
      </div>

      {/* ------sales order date---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Invoice Date*
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={invoicedate}
            onChange={(date) => setInvoiceDate(date)}
            className="textInput"
            style={{ outline: "none" }}
            required
          />
        </div>
      </div>

      {/* ------sales order date---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Due Date
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={invoicedate}
            onChange={(date) => setDueDate(date)}
            className="textInput"
            style={{ outline: "none" }}
            required
          />
        </div>
      </div>

      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Terms
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            value={receivedData.customername.paymentterm}
            name="terms"
            disabled
          />
        </div>
      </div>

      {/* --------------item table------------- */}
      <div className="row mt-3 text-start">
        <h5 className="py-2 bg-secondary text-light">Item Table</h5>
      </div>

      <div className="row mt-1 overflow-auto">
        <table class="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">item details</th>
              <th scope="col">quantity</th>
              <th scope="col">Rate</th>
              <th scope="col">discount</th>
              <th scope="col"> unit</th>
              <th scope="col">amount</th>
            </tr>
          </thead>
          <tbody>
            {/* --------------first row--------------- */}
            {receivedData.itemdetailsArray.map((item) => {
              return (
                <tr>
                  <td>
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "180px" }}
                      value={item.itemdetails}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "80px" }}
                      value={item.quantity}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "180px" }}
                      value={item.rate}
                      disabled
                    />
                  </td>

                  <td>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          style={{ width: "150px" }}
                          disabled
                          value={item.discount}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="col">
                      {item.discountunit === "%" ? "%" : "₹"}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="inputText"
                      disabled
                      className="form-control textInput"
                      style={{ width: "180px" }}
                      value={item.amount}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row justify-content-center">
        <div
          className="col-md-6 p-md-5 p-2 mt-2"
          style={{ background: "aliceblue" }}
        >
          <div className="row">
            <div className="col-md-4 col-4 text-start">
              <h6>subtotal</h6>
            </div>
            <div className="col-md-4 col-4 "></div>
            <div className="col-md-4 col-4 text-end">
              {receivedData.subtotal}
            </div>
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
                  value={receivedData.shippingcharges}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
              <p>{receivedData.shippingcharges}</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 col-4 text-start">
              <small>GST</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="number"
                  class="form-control"
                  placeholder="in %"
                  value={receivedData.gsttax}
                  disabled
                />
                {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
              <p>{receivedData.gsttax}</p>
            </div>
          </div>

          <div className="row mt-2 border-top">
            <div className="col-md-6 col-6">
              <h4>Total (₹)</h4>
            </div>
            <div className="col-md-6 col-6">
              <h4>{receivedData.total}</h4>
            </div>
          </div>
        </div>
        <div className="row g-3 ">
          <div className="col-md-6 col-3 ">
            <button
              // type="submit"
              class="btn btn-primary float-end"
              onClick={confirmalert}
            >
              Save
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
  );
}

export default DcToInvoice;
