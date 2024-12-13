import React, { useEffect, useMemo, useState, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";

function CreateInvoice() {
  const location = useLocation();
  const receivedData = location.state;
  const [invoicedate, setInvoiceDate] = useState(new Date());
  const [duedate, setDueDate] = useState(new Date());
  const [rate, setRate] = useState(receivedData?.amount);
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [customerId, setCustomerId] = useState();
  const [reference, setReference] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");

  const [invoices, setInvoices] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [ordernumber, setOrderNumber] = useState("");

  const getAllCustomer = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/customers/getcustomer"
      );
      if (res.status === 200) {
        setCustomers(res.data);
        console.log(res);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCustomer();
  }, []);

  // const addItemData = () => [

  //     setItemData([
  //       ...itemData,
  //       {
  //         itemid: products?._id,
  //         itemdetails: products?.firstname,
  //         quantity: quantity,
  //         rate: products?.sellingprice,
  //         discount: discount,
  //         amount:
  //           DiscountUnit === "%"
  //             ? quantity * products.sellingprice -
  //               Number(
  //                 (quantity * products.sellingprice * (discount / 100)).toFixed(2)
  //               )
  //             : quantity * products.sellingprice - discount,
  //         discountunit: DiscountUnit,
  //       },
  //     ]),
  //     setTotal(subtotal),
  //   ];

  // Function to disable past dates
  const isDateDisabled = (date) => {
    return invoicedate < new Date(); // Disable if date is before today
  };

  useMemo(() => {
    setSubtotal(amount);
  }, [amount]);

  const formdata = new FormData();

  const saveInvoice = async () => {
    if (!customerId) {
      toast.warning("Please select customer name");
      return;
    }
    if (!invoicenumber) {
      toast.warning("Please enter invoice number");
      return;
    }
    if (!ordernumber) {
      toast.warning("Please enter order number");
      return;
    }
    if (!paymentterm) {
      toast.warning("Please select payment term");
      return;
    }
    if (itemData.length === 0) {
      toast.warning("Please select product");
      return;
    }

    formdata.set("customername", customerId);
    formdata.set("invoice", invoicenumber);
    formdata.set("ordernumber", ordernumber);
    formdata.set("invoicedate", invoicedate);
    formdata.set("duedate", duedate);
    formdata.set("terms", paymentterm);
    formdata.set("itemdetailsArray", JSON.stringify(itemData));
    formdata.set("subtotal", subtotal);
    formdata.set("gsttax", gsttax);
    formdata.set("shippingcharges", shippingChares);
    formdata.set("total", total);
    // formdata.set("invoiced", invoiced);
    // formdata.set("paymentstatus", paymentstatus);

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
        toast.success("Invoice Saved...");
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      {/* ------quote---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Customer Name
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="textInput"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Select Customer</option>
            {customers.map((item) => {
              return <option value={item._id}>{item.customerfirstname}</option>;
            })}
          </select>
        </div>
      </div>

      {/* ------quote---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Invoice# *
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            required
            value={invoicenumber}
          />
        </div>
      </div>

      {/* ------refrence---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Order Number#
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            value={ordernumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>
      </div>

      {/* ------quote date---------- */}
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
            style={{ outline: "none", paddingLeft: "10px" }}
            required
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* ---------------------------------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Term
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            value={paymentterm}
            onChange={(e) => setPaymentTerm(e.target.value)}
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            name="paymentterm"
          >
            <option value="" disabled>
              Select term
            </option>
            <option value="Net-15">Net 15</option>
            <option value="Net-30">Net 30</option>
            <option value="Net-45">Net 45</option>
            <option value="Net-60">Net 60</option>
            <option value="Due end of the month">Due end of the month</option>
            <option value="Due end of the next month">
              Due end of the next month
            </option>
            <option value="Due on Receipt">Due on Receipt</option>
            <option value="Custome">Custome</option>
          </select>
        </div>
      </div>

      {/* ------Expiry date---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border-bottom pb-2">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Due Date
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={duedate}
            onChange={(date) => setDueDate(date)}
            minDate={new Date()}
            filterDate={() => isDateDisabled(new Date())}
            className="textInput"
            style={{ outline: "none", paddingLeft: "10px" }}
            dateFormat="dd/MM/yyyy"
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
              <th scope="col">Item Details</th>
              <th scope="col">Quantity</th>
              <th scope="col">Rate</th>
              <th scope="col">Discount</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* --------------first row--------------- */}
            <tr>
              <td>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  getOptionLabel={(option) => option?.firstname}
                  options={product}
                  sx={{ width: 300 }}
                  onChange={(e, value) => setProducts(value)}
                  disabled
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
                        <div>
                          <Typography variant="body1">
                            {option?.firstname}
                          </Typography>

                          <Typography variant="body2" color="textPrimary">
                            ₹&nbsp;{option?.sellingprice}
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                            className="text-end"
                          >
                            Stock on Hand&nbsp;
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                            className="text-end"
                          >
                            {option?.stockonhand?.toFixed(2)}&nbsp;&nbsp;
                            {option?.unit}
                          </Typography>
                        </div>
                      </Box>
                    </MenuItem>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={receivedData?.expenseaccount}
                    />
                  )}
                />
              </td>

              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "150px", height: "57px" }}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setAmount(quantity * rate);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px", height: "60px" }}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  disabled
                />
              </td>

              <td>
                <div className="row">
                  <div className="col">
                    <div class="input-group flex-nowrap ">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "130px", height: "57px" }}
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                      />
                      <span
                        class="input-group-text inputgrouptext"
                        id="addon-wrapping"
                      >
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={DiscountUnit}
                          style={{ height: "57px" }}
                        >
                          <MenuItem
                            value="%"
                            onClick={() => setDiscountUnit("%")}
                          >
                            %
                          </MenuItem>
                          <MenuItem
                            value="₹"
                            onClick={() => setDiscountUnit("₹")}
                          >
                            ₹
                          </MenuItem>
                        </Select>
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              <td>
                <input
                  type="text"
                  id="inputText"
                  disabled
                  className="form-control textInput"
                  style={{ width: "180px", height: "57px" }}
                  value={
                    DiscountUnit === "%"
                      ? quantity * rate -
                        Number((quantity * rate * (discount / 100)).toFixed(2))
                      : quantity * rate - discount
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="row">
            <div className="col-md-12">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Discount</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {itemData.map((item) => {
                    return (
                      <tr key={item.itemid}>
                        <td>{item.itemdetails}</td>
                        <td>{item.quantity}</td>
                        <td>{item.rate}</td>
                        <td>{item.discount}</td>
                        <td>{item.amount}</td>
                        <td>
                          <MdDeleteForever
                            // onClick={() => deleteItemData(item.itemid)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div> */}

      {/* ---------button----------    */}
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
                  value={gsttax}
                  onChange={(e) => {
                    setGstTax(e.target.value);
                    // setTotal((gsttax / 100) * total + total);
                  }}
                />
                {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
              <p>{gsttax}</p>
            </div>
          </div>

          <div className="row mt-2 border-top">
            <div className="col-md-6 col-6">
              <h4>Total (₹)</h4>
            </div>
            <div className="col-md-6 col-6">
              <h4>{total}</h4>
            </div>
          </div>
        </div>
        <div className="row g-3 ">
          <div className="col-md-6 col-3 ">
            <button
              // type="submit"
              class="btn btn-primary float-end"
              onClick={saveInvoice}
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

export default CreateInvoice;
