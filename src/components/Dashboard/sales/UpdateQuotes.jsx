import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";

function UpdateQuotes() {
  const location = useLocation();
  const receivedData = location.state;
  const [quotedata, setQuoteData] = useState({});
  const previouslySelectedQuotationDate = new Date(receivedData?.quotedate);
  const previouslySelectedExpiryDate = new Date(receivedData?.expirydate);
  const [quote, setQuote] = useState(receivedData?.quote);
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState([]);
  const [startDate, setStartDate] = useState(previouslySelectedQuotationDate);
  const [expirydate, setExpiryDate] = useState(previouslySelectedExpiryDate);

  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(receivedData?.sgsttax);
  const [shippingChares, setShippingCharges] = useState(receivedData?.shippingcharges);
  const [customerId, setCustomerId] = useState("");
  const [reference, setReference] = useState(receivedData?.reference);
  const [cgsttax, setCgstTax] = useState(receivedData?.cgsttax);
  const [igsttax, setIgstTax] = useState(receivedData?.igsttax);
  const [termsandcondition, setTermsandCondition] = useState(receivedData?.termsandconditions);

  const navigate = useNavigate();

  const isDateDisabled = (date) => {
    return startDate < new Date(); // Disable if date is before today
  };
  const [products, setProducts] = useState({});
  // const [itemData, setItemData] = useState([]);
  const [formData, setFormData] = useState({});
  const [customername, setcustomername] = useState(
    receivedData?.customername?.customerfirstname
  );

  useEffect(() => {
    getAllProduct();
    getQuotationById();
    getAllCustomer();
  }, []);

  const [itemData, setItemData] = useState([
    {
      quantity: 0,
      rate: 0,
      discount: 0,
      discountunit: "%",
      amount: 0,
      itemdetails: null,
    },
  ]);

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

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/salesitem/getproduct"
      );
      if (res.status === 201) {
        setProduct(res.data);
        console.log('product',res.data)
      } else {
        alert("internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuotationById = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/quotation/getquotationbyid/${receivedData?._id}`
      );
      if (res.status === 201) {
        setQuoteData(res.data);
        console.log('data',res.data)
        setItemData(res.data?.itemdetailsArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (inputDateStr) => {
    // Step 1: Parse the date string into a Date object
    const inputDate = new Date(inputDateStr);

    // Step 2: Format the date into dd/mm/yyyy format
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = inputDate.getFullYear();

    // Return the formatted date string
    return `${day}/${month}/${year}`;
  };

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

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
        Number(((subtotal * gsttax) / 100).toFixed(2))+
        Number(((subtotal * cgsttax) / 100).toFixed(2))+
        Number(((subtotal * igsttax) / 100).toFixed(2))
    );
  }, [subtotal, shippingChares, gsttax,cgsttax,igsttax]);

  const handleChangeProduct = (data, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val = {
            itemid: JSON.parse(data)._id,
            amount: 0,
            quantity: 1,
            rate:0,
            discount: 0,
            discountunit: "%",
            itemdetails: JSON.parse(data).itemname,
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

  const formData1 = new FormData();
  const updateQuotation = async (id) => {
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
    formData1.set("quote", quote);
    formData1.set("reference", reference);
    formData1.set("quotedate", startDate);
    formData1.set("expirydate", expirydate);
    formData1.set("itemdetailsArray", JSON.stringify(dataArr));
    formData1.set("subtotal", subtotal);
    formData1.set("gsttax", gsttax);
    formData1.set("cgsttax", cgsttax);
    formData1.set("igsttax", igsttax);
    formData1.set("shippingcharges", shippingChares);
    formData1.set("total", total);
    formData1.set("termsandconditions", termsandcondition);

    try {
      const config = {
        url: `/quotationupdate/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/quotation",
        headers: { "content-type": "application/json" },
        data: formData1,
      };

      const res = await axios(config);
      if (res.status === 201) {
        setTimeout(() => {
          navigate("/dashboard/sales/quotes");
        }, 3000);
        alert("Quotation Updated Successfully");
      }
      if (res.status === 400) {
        alert("Quotation not found");
      }
      if (res.status === 500) {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getAllCustomer = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/customers/getcustomer"
      );
      if (res.status === 200) {
        setCustomers(res.data);
      } else {
        toast("something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
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
              setcustomername(customerId?.customerfirstname);
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
                        {option?.customerfirstname.substr(0, 1).toUpperCase()}
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
              <TextField {...params} label={customername} />
            )}
          />
        </div>
      </div>

      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Quote*
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            placeholder={receivedData?.quote}
            className="form-control textInput"
            required
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
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
            placeholder={receivedData?.reference}
          />
        </div>
      </div>

      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Quote Date*
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

      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border-bottom pb-2">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Expiry Date*
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={expirydate}
            onChange={(date) => setExpiryDate(date)}
            minDate={new Date()}
            filterDate={() => isDateDisabled(new Date())}
            className="textInput customDateInput"
            style={{ outline: "none" }}
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
                    getOptionLabel={(option) => option?.itemname}
                    options={product}
                    sx={{ width: 300 }}
                    // name={`itemdetails${index + 1}`}
                    // value={objjj}
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
                            {option?.itemname}
                          </Typography>
                          <Typography variant="body2" color="textPrimary">
                            &nbsp;{option?.hsncode}
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
        <div className="col-md-6 mt-2">
        <b>Terms & Conditions</b>
              <Form.Control
                as="textarea"
                placeholder="terms & conditions"
                style={{ height: "150px" }}
                value={termsandcondition}
                onChange={(e) => setTermsandCondition(e.target.value)}
              />
        </div>
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
                  placeholder={quotedata?.shippingcharges}
                  value={shippingChares}
                  onChange={(e) => {
                    setShippingCharges(e.target.value);
                    // setTotal(total + shippingChares);
                  }}
                />
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
              <p>₹ {shippingChares}</p>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-md-4 col-4 text-start">
              <small>SGST</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="Number"
                  class="form-control"
                  placeholder={quotedata?.gsttax}
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
              <p>₹ { Number(((subtotal * gsttax) / 100).toFixed(2))}</p>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-4 col-4 text-start">
              <small>CGST</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="Number"
                  class="form-control"
                  placeholder={quotedata?.cgsttax}
                  value={cgsttax}
                  onChange={(e) => {
                    setCgstTax(e.target.value);
                    // setTotal((gsttax / 100) * total + total);
                  }}
                />
                {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
            <p> ₹ { Number(((subtotal * cgsttax) / 100).toFixed(2))}</p>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-4 col-4 text-start">
              <small>IGST</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="Number"
                  class="form-control"
                  placeholder={quotedata?.igsttax}
                  value={igsttax}
                  onChange={(e) => {
                    setIgstTax(e.target.value);
                    // setTotal((gsttax / 100) * total + total);
                  }}
                />
                {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
            <p> ₹ { Number(((subtotal * igsttax) / 100).toFixed(2))}</p>
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
              onClick={() => updateQuotation(receivedData?._id)}
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

export default UpdateQuotes;
