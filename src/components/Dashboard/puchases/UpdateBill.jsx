import React, { useState, useEffect, useMemo } from "react";
import { PiNewspaperClippingFill } from "react-icons/pi";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";

function UpdateBill() {
  const location = useLocation();
  const receivedData = location.state;

  const [vendorlist, setVendorList] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [startDate, setStartDate] = useState(receivedData?.billdate);
  const [duedate, setDueDate] = useState(receivedData?.duedate);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [ordernumber, setOrderNumber] = useState(receivedData?.ordernumber);
  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [total, setTotal] = useState(0.0);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [customername, setcustomername] = useState("");
  const [customers, setCustomers] = useState([]);
  const [billnumber, setBillNumber] = useState(receivedData?.billnumber);
  const [subject, setSubject] = useState(receivedData?.subject);
  const [paymentterm, setPaymentTerm] = useState(receivedData?.paymentterm);
  const [formData, setFormData] = useState({});
  const [adjustments, setAdjustments] = useState(receivedData?.adjustments);
  const [discount, setDiscount] = useState(receivedData?.discount);

  const addRow = () => {
    setItemData([
      ...itemData,
      {
        itemdetails: "Select Product",
        quantity: 0,
        rate: 0,
        discount: 0,
        dscountunit: "%",
        amount: 0,
      },
    ]);
  };

  const getData = async () => {
    try {
      let res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendorList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteRow = (index) => {
    setItemData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleChangeProduct = (data, index) => {

    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val = {
            itemid: JSON.parse(data)._id,
            amount: JSON.parse(data).sellingprice,
            quantity: 1,
            rate: JSON.parse(data).sellingprice,
            discount: 0,
            discountunit: "%",
            itemdetails: JSON.parse(data).firstname,
          };
        }
        return val;
      }),
    ]);
  };

  const handleChangeQuantity = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          const valAmt = Number(e.target.value) * Number(val.rate);

          val.quantity = Number(e.target.value);
          val.amount = valAmt;
        }
        return val;
      }),
    ]);
  };

  const handleChangeRate = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          const valAmt = Number(e.target.value) * Number(val.quantity);
          val.rate = Number(e.target.value);
          val.amount = valAmt;
        }
        return val;
      }),
    ]);
  };

  useEffect(() => {
    setItemData(receivedData?.itemdetailsArray);
  }, [receivedData]);
  // useMemo(() => {
  //   setSubtotal(
  //     itemData.reduce((accumulator, item) => {
  //       return accumulator + item.amount;
  //     }, 0)
  //   );
  // }, [itemData]);

  // useMemo(() => {
  //   setTotal(
  //     Number(subtotal) +
  //       Number(shippingChares) +
  //       Number(((subtotal * gsttax) / 100).toFixed(2))
  //   );
  // }, [subtotal, shippingChares, gsttax]);

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/products/getproduct"
      );
      if (res.status === 201) {
        setProduct(res.data);
      } else {
        alert("internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div>
      <div className="row border-bottom py-2 text-start d-flex ">
        <h3>
          <PiNewspaperClippingFill />
          &nbsp;&nbsp;Update Bill
        </h3>
      </div>
      <div
        className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center"
        style={{ width: "100%" }}
      >
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
            >
              <option value={JSON.stringify(receivedData?.vendorname)}>
                {receivedData?.vendorname?.vendorfirstname}
              </option>
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
            Bill#*
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            required
            value={billnumber}
            onChange={(e) => setBillNumber(e.target.value)}
          />
        </div>
      </div>

      {/* ------sales ordder---------- */}
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
            value={ordernumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>
      </div>

      {/* ------sales order date---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Bill Date*
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="textInput customDateInput"
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
            selected={duedate}
            onChange={(date) => setDueDate(date)}
            minDate={startDate}
            className="textInput customDateInput"
            style={{ outline: "none" }}
            required
          />
        </div>
      </div>

      {/* -------------payment term--------------------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Payment Terms
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            placeholder="choose a proper challan type"
            value={paymentterm}
            onChange={(e) => setPaymentTerm(e.target.value)}
          >
            <option value="" disabled>
              Select term
            </option>
            <option value="Net-15">Net-15</option>
            <option value="Net-30">Net-30</option>
            <option value="Net-45">Net-45</option>
            <option value="Net-60">Net-60</option>
            <option value="Due end of the month">Due end of the month</option>
          </select>
        </div>
      </div>

      {/* ------sales ordder---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Subject
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            placeholder="enter a subject within 250 character"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>

      <div className="row mt-3 text-start">
        <h5 className="py-2 bg-secondary text-light">Item Table</h5>
      </div>

      <div className="row mt-1 overflow-auto">
        <table class="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Item details</th>
              <th scope="col">Quantity</th>
              <th scope="col">Rate</th>
              {/* <th scope="col">Discount</th> */}
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* --------------first row--------------- */}
            {itemData.map((data, index) => (
              <tr key={index}>
                <td>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(option) => option?.firstname}
                    options={product}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (
                      <MenuItem
                        {...props}
                        onClick={(event) => {
                          handleChangeProduct(JSON.stringify(option), index);
                        }}
                      >
                        <Box
                          component="li"
                          style={{ display: "flex", flexDirection: "column" }}
                          className="text-start mb-2 px-1"
                        >
                          <Typography variant="body1">
                            {option?.firstname}
                          </Typography>
                          <Typography variant="body2" color="textPrimary">
                            ₹&nbsp;{option?.sellingprice}
                          </Typography>
                        </Box>
                      </MenuItem>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label={data?.itemdetails} />
                    )}
                  />
                </td>

                <td>
                  <input
                    type="Number"
                    className="form-control textInput"
                    style={{ width: "150px", height: "57px" }}
                    min="0"
                    // name={`quantity${index + 1}`}
                    value={data?.quantity}
                    onChange={(e) => handleChangeQuantity(e, index)}
                    placeholder={data?.quantity}
                  />
                </td>

                <td>
                  <input
                    type="Number"
                    min="0"
                    className="form-control textInput"
                    style={{ width: "180px", height: "60px" }}
                    value={data?.rate}
                    placeholder={data?.rate}
                    onChange={(e) => handleChangeRate(e, index)}
                  />
                </td>

                <td>
                  <input
                    type="Number"
                    disabled
                    className="form-control textInput"
                    style={{ width: "180px", height: "57px" }}
                    placeholder={data?.amount}
                    value={formData[`amount${index + 1}`]}
                  />
                </td>

                <td>
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => deleteRow(index)}
                    />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col-md-3">
          <Button variant="contained" onClick={addRow}>
            Add Row
          </Button>
        </div>
      </div>

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
                  type="Number"
                  class="form-control"
                  placeholder={receivedData?.adjustments}
                  value={adjustments}
                  onChange={(e) => {
                    setAdjustments(e.target.value);
                    // setTotal(total + shippingChares);
                  }}
                />
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
              <p>{adjustments}</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 col-4 text-start">
              <small>GST</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="Number"
                  class="form-control"
                  placeholder={receivedData?.discount}
                  value={discount}
                  onChange={(e) => {
                    setDiscount(e.target.value);
                    // setTotal((gsttax / 100) * total + total);
                  }}
                />
                {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
              <p>{discount}</p>
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
              // onClick={()=>updatePurchaseOrder(receivedData?._id)}
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
  );
}

export default UpdateBill;
