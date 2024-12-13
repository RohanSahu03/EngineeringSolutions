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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";

function UpdateDeliveryChallan() {
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [deliverychallandate, setDeliveryChallanDate] = useState(
    receivedData?.deliveryChallandate
  );
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState([]);
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(
    receivedData?.shippingcharges
  );
  const [total, setTotal] = useState(0.0);
  const [subtotal, setSubtotal] = useState(0.0);
  const [customerId, setCustomerId] = useState("");
  const [reference, setReference] = useState(receivedData?.reference);
  const [deliverychallan, setDeliveryChallan] = useState(
    receivedData?.deliverychallan
  );
  const [challantype, setChallanType] = useState(receivedData?.challantype);
  const [itemData, setItemData] = useState([]);

  const getAllCustomer = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/customers/getcustomer"
      );
      if (res.status === 200) {
        setCustomers(res.data);
        console.log(res.data);
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
        alert("internal server error");
      }
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    setItemData([...receivedData?.itemdetailsArray]);
  }, [receivedData?.itemdetailsArray]);

  useEffect(() => {
    getAllCustomer();
    getAllProduct();
  }, [receivedData]);

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

  const deleteRow = (index) => {
    setItemData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const formData1 = new FormData();

  const updateDeliveryChallan = async (id) => {
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
    formData1.set("deliverychallan", deliverychallan);
    formData1.set("reference", reference);
    formData1.set("challantype", challantype);
    formData1.set("deliveryChallandate", deliverychallandate);
    formData1.set("itemdetailsArray", JSON.stringify(dataArr));
    formData1.set("subtotal", subtotal);
    formData1.set("gsttax", gsttax);
    formData1.set("total", total);
    formData1.set("shippingcharges", shippingChares);

    try {
      const config = {
        url: `/updatedeliverychallan/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/deliverychallans",
        headers: { "content-type": "application/json" },
        data: formData1,
      };
      const res = await axios(config);
      if (res.status === 201) {
        setTimeout(() => {
          navigate("/dashboard/sales/deliverychallan");
        }, 3000);
        toast.success("Delivery Challan Updated Successfully");
      }
      if (res.status === 404) {
        toast.warning("Delivery Challan not found");
      }
      if (res.status === 500) {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* ------quote---------- */}
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
                  <TextField {...params} label={receivedData?.customername?.customerfirstname} />
                )}
              />
          {/* <select
            className="textInput"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value={receivedData?.customername?._id}>
              {receivedData?.customername?.customerfirstname}
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
            Delivery Challan# *
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            required
            value={deliverychallan}
            onChange={(e) => setDeliveryChallan(e.target.value)}
          />
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

      {/* ------quote date---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Sales Order Date*
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={deliverychallandate}
            onChange={(date) => setDeliveryChallanDate(date)}
            className="textInput customDateInput"
            style={{ outline: "none" }}
            required
          />
        </div>
      </div>

      {/* ------refrence---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Challan Type
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            value={challantype}
            onChange={(e) => setChallanType(e.target.value)}
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
                    value={data.quantity}
                    onChange={(e) => handleChangeQuantity(e, index)}
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
              onClick={() => updateDeliveryChallan(receivedData?._id)}
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

export default UpdateDeliveryChallan;
