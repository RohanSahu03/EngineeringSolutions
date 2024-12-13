import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";

function UpdateInvoice() {
  const location = useLocation();
  const receivedData = location.state;
  const [customers, setCustomers] = useState([]);
  const [invoicedate, setInvoiceDate] = useState(new Date());
  const [duedate, setDueDate] = useState(new Date());
  const [quantity, setQuantity] = useState();
  const [discount, setDiscount] = useState();
  const [amount, setAmount] = useState(0);
  const [paymentterm, setPaymentTerm] = useState("");
  const [itemData, setItemData] = useState([]);

  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [ordernumber, setOrderNumber] = useState("");
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [customerId, setCustomerId] = useState("");
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");

  const [formData, setFormData] = useState({});

  const handleChange = (e, index, data, newValue) => {
    // const name = e?.target?.name || `itemdetails${index + 1}`;
    // const value = e.target.value || newValue;
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.quantity = Number(e.target.value);
        }
        return val;
      }),
    ]);
  };

  const handleChangeProduct = (data, index) => {
    console.log("fdasflafd: ", data);
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
          let total;
          if (val.discountunit === "%") {
            total = valAmt - ((valAmt * Number(val.discount)) / 100).toFixed(2);
          } else if (val.discountunit === "₹") {
            total = valAmt - Number(val.discount);
          }
          val.quantity = Number(e.target.value);
          val.amount = total;
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
          let total;
          if (val.discountunit === "%") {
            total = valAmt - ((valAmt * Number(val.discount)) / 100).toFixed(2);
          } else if (val.discountunit === "₹") {
            total = valAmt - Number(val.discount);
          }
          val.rate = Number(e.target.value);
          val.amount = total;
        }
        return val;
      }),
    ]);
  };

  const handleChangeDiscount = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          const valAmt = Number(val.rate) * Number(val.quantity);
          let total;
          if (val.discountunit === "%") {
            total =
              valAmt - ((valAmt * Number(e.target.value)) / 100).toFixed(2);
          } else if (val.discountunit === "₹") {
            total = valAmt - Number(e.target.value);
          }
          val.discount = Number(e.target.value);
          val.amount = total;
        }
        return val;
      }),
    ]);
  };

  const handleChangeDiscountUnit = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          const valAmt = Number(val.rate) * Number(val.quantity);
          let total;
          if (e.target.value === "%") {
            total = valAmt - ((valAmt * Number(val.discount)) / 100).toFixed(2);
          } else if (e.target.value === "₹") {
            total = valAmt - Number(val.discount);
          }
          val.discountunit = e.target.value;
          val.amount = total;
        }
        return val;
      }),
    ]);
  };

  //calulate due date based on payment term
  const calculateDueDate = (invoiceDate, term) => {
    if (!invoiceDate) return null;

    const date = new Date(invoiceDate);
    let daysToAdd = 0;

    switch (term) {
      case "Net-15":
        daysToAdd = 15;
        break;
      case "Net-30":
        daysToAdd = 30;
        break;
      case "Net-45":
        daysToAdd = 45;
        break;
      case "Net-60":
        daysToAdd = 60;
        break;
      case "Due end of the month":
        // Set to the last day of the month
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date;
      case "Due end of the next month":
        // Set to the last day of the next month
        date.setMonth(date.getMonth() + 2);
        date.setDate(0);
        return date;
      case "Due on Receipt":
        return invoiceDate; // Due date is the same as invoice date
      case "Custome":
        return invoiceDate;
      default:
        return null;
    }

    date.setDate(date.getDate() + daysToAdd);
    return date;
  };

  useEffect(() => {
    if (invoicedate && paymentterm) {
      const newDueDate = calculateDueDate(invoicedate, paymentterm);
      setDueDate(newDueDate);
    }
  }, [invoicedate, paymentterm]);

  const deleteRow = (index) => {
    setItemData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const isDateDisabled = (date) => {
    return invoicedate < new Date(); // Disable if date is before today
  };

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
  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/products/getproduct"
      );
      if (res.status === 201) {
        setProduct(res.data);
      } else {
        toast("internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomer();
    getAllProduct();
  }, []);

  useEffect(() => {
    setItemData([...receivedData?.itemdetailsArray]);
  }, [receivedData?.itemdetailsArray]);

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

  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item) => item.itemid !== id)]);
  };

  useMemo(() => {
    setSubtotal(
      itemData.reduce((accumulator, item) => {
        return accumulator + item.amount;
      }, 0)
    );
  }, [itemData]);

  useMemo(() => {
    setTotal(
      Number(subtotal) +
        Number(shippingChares) +
        Number(((subtotal * gsttax) / 100).toFixed(2))
    );
  }, [subtotal, shippingChares, gsttax]);

  const formData1 = new FormData();
  const updateInvoice = async (id) => {
    console.log("data", itemData);

    const dataArr = itemData.map((valdata) => {
      return {
        itemdetails: valdata.itemdetails,
        itemid: valdata.itemid,
        quantity: valdata.quantity,
        rate: valdata.rate,
        discount: valdata.discount,
        discountunit: valdata.discountunit,
        amount: valdata.amount,
      };
    });

    formData1.set("customername", customerId);
    formData1.set("invoice", invoicenumber);
    formData1.set("ordernumber", ordernumber);
    formData1.set("invoicedate", invoicedate);
    formData1.set("duedate", duedate);
    formData1.set("terms", paymentterm);
    formData1.set("itemdetailsArray", JSON.stringify(dataArr));
    formData1.set("subtotal", subtotal);
    formData1.set("gsttax", gsttax);
    formData1.set("total", total);

    try {
      const config = {
        url: `/invoiceupdate/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/invoices",
        headers: { "content-type": "application/json" },
        data: formData1,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Invoice Updated Successfully");
      }
      if (res.status === 404) {
        toast.warning("Invoice not found");
      }
      if (res.status === 500) {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Customer Name
          </label>
        </div>
        <div className="col-md-5 text-start">
        <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.customerfirstname}
                options={customers.filter(
                  (item) => item?.customerstatus === "Active"
                )}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  setCustomerId(value?._id);
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
                            {option?.customerfirstname
                              .substr(0, 1)
                              .toUpperCase()}
                          </Avatar>
                        </div>

                        <div>
                          <Typography variant="body1">
                            {option?.customerfirstname}
                          </Typography>

                          <Typography variant="body2" color="textPrimary">
                            <TfiEmail /> &nbsp;{option?.customeremail}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </MenuItem>
                )}
                renderInput={(params) => (
                  <TextField {...params} label={receivedData?.customername.customerfirstname} />
                )}
              />
          {/* <select
            className="textInput"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeHolder={receivedData?.customername.customerfirstname}
          >
            <option value="">
              {receivedData?.customername.customerfirstname}
            </option>
            {customers.map((item) => {
              return <option value={item._id}>{item.customerfirstname}</option>;
            })}
          </select> */}
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
            placeHolder={receivedData?.invoice}
            value={invoicenumber}
            onChange={(e) => setInvoiceNumber}
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
            placeHolder={receivedData?.ordernumber}
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
            className="textInput customDateInput"
            style={{ outline: "none" }}
            placeHolder={receivedData?.invoicedate}
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
            placeHolder={receivedData?.terms}
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
            className="textInput customDateInput"
            style={{ outline: "none" }}
            placeHolder={receivedData?.duedate}
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
              <th scope="col">Item details</th>
              <th scope="col">Quantity</th>
              <th scope="col">Rate</th>
              <th scope="col">Discount</th>
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
                    value={data.quantity}
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
                  <div className="row">
                    <div className="col">
                      <div className="input-group flex-nowrap">
                        <input
                          type="Number"
                          min="0"
                          className="form-control textInput"
                          style={{ width: "130px", height: "57px" }}
                          value={data?.discount}
                          placeholder={data?.discount}
                          onChange={(e) => handleChangeDiscount(e, index, data)}
                        />
                        <span
                          className="input-group-text inputgrouptext"
                          id="addon-wrapping"
                        >
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder={data?.discountunit}
                            style={{ height: "57px" }}
                            // name={`discountunit${index + 1}`}
                            // value={formData[`discountunit${index + 1}`]}
                            onChange={(e) => handleChangeDiscountUnit(e, index)}
                          >
                            <MenuItem value="%">%</MenuItem>
                            <MenuItem value="₹">₹</MenuItem>
                          </Select>
                        </span>
                      </div>
                    </div>
                  </div>
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
                  type="text"
                  class="form-control"
                  placeHolder={receivedData?.itemdetailsArray?.shippingcharges}
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
                  placeHolder={receivedData?.itemdetailsArray?.gsttax}
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
              onClick={() => updateInvoice(receivedData?._id)}
            >
              Update
            </button>
          </div>
          <div className="col-md-6 col-3">
            <button
              type="button"
              class="btn btn-outline-info float-start"
              onClick={() => navigate("/dashboard/sales/invoice")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInvoice;
