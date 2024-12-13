import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  GetCountries,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Modal from "react-bootstrap/Modal";
import { IoMdRefresh } from "react-icons/io";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";

function UpdatePurchaseOrder() {
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate(null);
  const [startDate, setStartDate] = useState(receivedData?.date);
  const [deliverydate, setDeliveryDate] = useState(
    receivedData?.expecteddeliverydate
  );
console.log('rec',receivedData);

  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [product, setProduct] = useState([]);
  const [gsttax, setGstTax] = useState(receivedData?.gsttax);
  const [cgsttax, setCgstTax] = useState(receivedData?.cgsttax);
  const [igsttax, setIgstTax] = useState(receivedData?.igsttax);
  const [shippingChares, setShippingCharges] = useState(
    receivedData?.shippingcharges
  );
  const [total, setTotal] = useState(receivedData?.total);

  const [vendorr, setVendorr] = useState(
    receivedData?.vendorname?.vendorfirstname
  );
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const handleClose3 = () => {
    setShow3(false);
    setAddress("");
    setPincode("");
    setPhone1("");
  };
  const openShow3 = () => {
    setShow3(true);
  };
  const handleClose4 = () => {
    setAddress("");
    setPincode("");
    setPhone1("");
    setShow4(false);
  };
  const openShow4 = () => {
    setShow4(true);
  };

  //billing address
  const [countryid, setCountryid] = useState(0);
  const [countryname, setCountryname] = useState("");
  const [stateid, setstateid] = useState(0);
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [address, setAddress] = useState(receivedData?.shippingaddressaddress);
  const [pincode, setPincode] = useState("");
  const [phone1, setPhone1] = useState("");

  //shipping address
  const [countryid1, setCountryid1] = useState(0);
  const [countryname1, setCountryname1] = useState("");
  const [stateid1, setstateid1] = useState(0);
  const [statename1, setstatename1] = useState("");
  const [city1, setcity1] = useState("");

  const [paymentterm, setPaymentTerm] = useState(receivedData?.paymentterms);
  const [quantity, setQuantity] = useState(receivedData?.quantity);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(receivedData?.subtotal);
  const [purchaseorder, setPurchaseOrder] = useState(
    receivedData?.purchaseorder
  );
  const [invoiced, setInvoiced] = useState(false);
  const [paymentstatus, setPaymentStatus] = useState(false);
  const [deliveryaddress, setDeliveryAddress] = useState(
    receivedData?.deliveryaddress
  );
  const [reference, setReference] = useState(receivedData?.reference);
  const [selectedObj, setSelectedObj] = useState({});
  const [formData, setFormData] = useState({});

  const refreshBillingAddress = () => {
    vendordata.map((data) => {
      if (data._id === vendorId) {
        getVendorById(vendorId);
      }
    });
  };

  const isDateDisabled = (date) => {
    return startDate < new Date(); // Disable if date is before today
  };

  //   const showAddress = () => {
  //     rowRef.current.style.display = "flex";
  //   };

  const addRow = () => {
    setItemData([
      ...itemData,
      {
        itemdetails: "Select Product",
        quantity: 0,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  const deleteRow = (index) => {
    setItemData((prevData) => prevData.filter((_, i) => i !== index));
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

  useMemo(() => {
    setSubtotal(
      itemData.reduce((accumulator, item) => {
        return accumulator + item.amount;
      }, 0)
    );
  }, [itemData]);

  useMemo(() => {
    const gst = (subtotal * gsttax) / 100;
    const cgst = (subtotal * cgsttax) / 100;
    const igst = (subtotal * igsttax) / 100;
  
    const total = Number(subtotal) + Number(shippingChares) + gst + cgst + igst;
  
    setTotal(total.toFixed(2)); // Format the final total to two decimal places
  }, [subtotal, shippingChares, gsttax, cgsttax, igsttax]);
  

  const updateBillingAddress = async () => {
    try {
      const config = {
        url: `/updatevendor/${selectedObj?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/vendors",
        headers: { "content-type": "application/json" },
        data: {
          billingaddresscountry: countryname,
          billingaddressstate: state,
          billingaddresscity: city,
          billingaddressaddress: address,
          billingaddresspincode: pincode,
          billingaddressphone: phone1,
        },
      };
      const res = await axios(config);
      if (res.status === 404) {
        toast.warning("Vendor Not Found");
      }
      if (res.status === 200) {
        toast.success("Billing Address Updated Successfully");
        handleClose3();
      }
      if (res.status === 500) {
        toast.error("Failed to Update Billing Address");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateShippingAddress = async () => {
    try {
      const config = {
        url: `/updatevendor/${selectedObj?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/vendors",
        headers: { "content-type": "application/json" },
        data: {
          shippingaddresscountry: countryname1,
          shippingaddressstate: statename1,
          shippingaddresscity: city1,
          shippingaddressaddress: address,
          shippingaddresspincode: pincode,
          shippingaddressphone: phone1,
        },
      };
      const res = await axios(config);
      if (res.status === 404) {
        toast.warning("Vendor Not Found");
      }

      if (res.status === 200) {
        toast.success("Shipping Address Updated Successfully");
        handleClose4();
      }
      if (res.status === 500) {
        toast.error("Failed to Update Shipping Address");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [vendordata, setVendordata] = useState([]);

  useEffect(() => {
    getData();
    getAllProduct();
  }, []);

  const getData = async () => {
    try {
      let res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendordata(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setItemData(receivedData?.itemdetailsArray);
  }, [receivedData]);

  const getVendorById = async (id) => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/vendors/getvendorbyid/${id}`
      );
      if (res.status === 200) {
        setSelectedObj(res.data.vendor);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
      if (res.status === 404) {
        toast.error("Vendor not Found");
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

  const formData1 = new FormData();

  const updatePurchaseOrder = async (id) => {
    const dataArr = itemData.map((valdata) => {
      return {
        itemdetails: valdata.itemdetails,
        itemid: valdata.itemid,
        quantity: valdata.quantity,
        rate: valdata.rate,
        amount: valdata.amount,
      };
    });

    
    formData1.set("vendorname", vendorId);
    formData1.set("deliveryaddress", deliveryaddress);
    formData1.set("reference", reference);
    formData1.set("purchaseorder", purchaseorder);
    formData1.set("paymentterms", paymentterm);
    formData1.set("date", startDate);
    formData1.set("expecteddeliverydate", deliverydate);
    formData1.set("itemdetailsArray", JSON.stringify(dataArr));
    formData1.set("subtotal", subtotal);
    formData1.set("gsttax", gsttax);
    formData1.set("cgsttax", cgsttax);
    formData1.set("shippingcharges", shippingChares);
    formData1.set("total", total);
    formData1.set("shippingaddresscountry",countryname1)
    formData1.set("shippingaddressstate",statename1)
    formData1.set("shippingaddresscity",city1)
    formData1.set("shippingaddressaddress",address)
    formData1.set("shippingaddresspincode",pincode)
    formData1.set("shippingaddressphone",phone1)

    try {
      const config = {
        url: `/updatepurchaseorder/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/purchaseorder",
        headers: { "content-type": "application/json" },
        data: formData1,
      };
      const res = await axios(config);
      if (res.status === 201) {
        setTimeout(() => {
          navigate("/dashboard/purchase/purchaseorder");
        }, 3000);
        toast.success("Purchse Order Updated Successfully");
      }
      if (res.status === 400) {
        toast.warning("Purchse Order not found");
      }
      if (res.status === 500) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <ToastContainer/>
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start ">
          <label for="inputText" className="col-form-label label">
            Vendor Name*
          </label>
        </div>
        <div className="col-md-5 text-start">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(option) => option?.companyname}
            options={vendordata}
            sx={{ width: 300 }}
            onChange={(e, value) => {
              setVendorId(value?._id);
              setSelectedObj(value);
              setVendorr(value?.vendorfirstname);
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
                        {option?.companyname.substr(0, 1).toUpperCase()}
                      </Avatar>
                    </div>

                    <div>
                      <Typography variant="body1">
                        {option?.companyname}
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
                label={receivedData?.vendorname?.companyname}
              />
            )}
          />
          {/* <select
            className="textInput"
            value={vendorId}
            onChange={(e) => {
              setVendorId(JSON.parse(e.target.value)?._id);
              setSelectedObj({ ...JSON.parse(e.target.value) });
              setVendorr(JSON.parse(e.target.value)?.vendorfirstname);
            }}
          >
            <option value="">{vendorr}</option>
            {vendordata.map((item) => {
              return (
                <option value={JSON.stringify(item)}>
                  {item.vendorfirstname}
                </option>
              );
            })}
          </select> */}
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                BILLING ADDRESS &nbsp;&nbsp;&nbsp;
                <FaPen onClick={openShow3} />
                &nbsp;&nbsp;&nbsp;
                <IoMdRefresh
                  style={{ fontSize: "18px" }}
                  onClick={refreshBillingAddress}
                />
              </Typography>

              <Typography variant="body2">
                {receivedData?.billingaddressaddress}
                <br />
                {receivedData?.billingaddresscity}
                <br />
                {receivedData?.billingaddressstate}
                <br />
                {receivedData?.billingaddresscountry}
                <br />
                {receivedData?.billingaddresspincode}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-6">
          {/* <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                SHIPPING ADDRESS &nbsp;&nbsp;&nbsp;
                <FaPen onClick={openShow4} />
                &nbsp;&nbsp;&nbsp;
                <IoMdRefresh
                  style={{ fontSize: "18px" }}
                  onClick={refreshBillingAddress}
                />
              </Typography>
              <Typography variant="body2">
                {selectedObj?.shippingaddressaddress}
                <br />
                {selectedObj?.shippingaddresscity}
                <br />
                {selectedObj?.shippingaddressstate}
                <br />
                {selectedObj?.billingaddresscountry}
                <br />
                {selectedObj?.shippingaddresspincode}
              </Typography>
            </CardContent>
          </Card> */}
        </div>
      </div>
      {/* //dialog for billing address update */}
      {/* <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Update Billing Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  setCountryid1(e.id);
                  setCountryname1(e.name);
                }}
                placeHolder={receivedData?.billingaddresscountry}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-4 text-start">
              <label for="inputText" className="col-form-label label">
                State
              </label>
            </div>
            <div className="col-md-7">
              <StateSelect
                countryid={countryid1}
                className="textInput"
                onChange={(e) => {
                  setstateid1(e.id);
                  setstatename1(e.name);
                }}
                placeHolder={receivedData?.billingaddressstate}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-4 text-start">
              <label for="inputText" className="col-form-label label">
                City
              </label>
            </div>
            <div className="col-md-7">
              <CitySelect
                countryid={countryid1}
                stateid={stateid1}
                className="textInput"
                onChange={(e) => {
                  setcity1(e.name);
                }}
                placeHolder={receivedData?.billingaddresscity}
              />
            </div>
          </div>

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
                  id="floatingTextarea2"
                  style={{ height: "70px" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeHolder={receivedData?.billingaddressaddress}
                ></textarea>
              </div>
            </div>
          </div>

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
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder={receivedData?.billingaddresspincode}
              />
            </div>
          </div>

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
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                placeholder={selectedObj?.billingaddressphone}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
          <Button variant="primary" onClick={updateBillingAddress}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* //dialog for shipping address update */}

      <Modal show={show4} onHide={handleClose4}>
        <Modal.Header closeButton>
          <Modal.Title>Update Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                value={countryname1}
                onChange={(e) => {
                  e.preventDefault();
                  setCountryname1(e.target.value);
                }}
                placeholder={selectedObj?.shippingaddresscountry}
              />
            
            </div>
          </div>

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
                value={statename1}
                onChange={(e) => {
                  e.preventDefault();
                  setstatename1(e.target.value);
                }}
                placeholder={selectedObj?.shippingaddressstate}
              />
              
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-4 text-start">
              <label for="inputText" className="col-form-label label">
                City
              </label>
            </div>
            <div className="col-md-7">
              <CitySelect
                countryid={countryid}
                stateid={stateid}
                className="textInput"
                onChange={(e) => {
                  setcity(e.name);
                }}
                placeHolder={selectedObj?.shippingaddresscity}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1">
            <div className="col-md-4 text-start">
              <label for="inputText" className="col-form-label label">
                Address
              </label>
            </div>
            <div className="col-md-7">
              <div className="form-floating">
                <textarea
                  placeHolder={selectedObj?.shippingaddressaddress}
                  className="form-control"
                  id="floatingTextarea2"
                  style={{ height: "70px" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-4 text-start">
              <label for="inputText" className="col-form-label label">
                PinCode
              </label>
            </div>
            <div className="col-md-7">
              <input
                type="number"
                id="inputText"
                className="form-control textInput"
                name="pincode"
                value={pincode}
                onChange={(e) => {
                  e.preventDefault();
                  setPincode(e.target.value);
                }}
                placeholder={selectedObj?.shippingaddresspincode}
              />
            </div>
          </div>

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
                value={phone1}
                onChange={(e) => {
                  e.preventDefault();
                  setPhone1(e.target.value);
                }}
                placeholder={selectedObj?.shippingaddressphone}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Close
          </Button>
          <Button variant="primary" onClick={updateShippingAddress}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Country/Region
              </label>
            </div>
            <div className="col-md-4">
            <input
                type="text"
                id="inputText"
                className="form-control textInput"
                name="phone"
                value={countryname1}
                onChange={(e) => {
                  e.preventDefault();
                  setCountryname1(e.target.value);
                }}
                placeholder={receivedData?.shippingaddresscountry}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                State
              </label>
            </div>
            <div className="col-md-4">
            <input
                type="text"
                id="inputText"
                className="form-control textInput"
                name="phone"
                value={statename1}
                onChange={(e) => {
                  e.preventDefault();
                  setstatename1(e.target.value);
                }}
                placeholder={receivedData?.shippingaddressstate}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                City
              </label>
            </div>
            <div className="col-md-4">
            <input
                type="text"
                id="inputText"
                className="form-control textInput"
                name="phone"
                value={city1}
                onChange={(e) => {
          
                  setcity1(e.target.value);
                }}
                placeholder={receivedData?.shippingaddresscity}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Address
              </label>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <textarea
                  placeHolder={receivedData?.shippingaddressaddress}
                  className="form-control"
                  id="floatingTextarea2"
                  style={{ height: "70px" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                PinCode
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="number"
                id="inputText"
                className="form-control textInput"
                name="pincode"
                value={pincode}
                onChange={(e) => {
                  e.preventDefault();
                  setPincode(e.target.value);
                }}
                placeholder={receivedData?.shippingaddresspincode}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Phone
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                name="phone"
                value={phone1}
                onChange={(e) => {
                  e.preventDefault();
                  setPhone1(e.target.value);
                }}
                placeholder={receivedData?.shippingaddressphone}
              />
            </div>
            
          </div>


      <div className="row mt-3">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Delivery Address
          </label>
        </div>
        <div className="col-md-4">
          <div className="form-floating">
            <textarea
              className="form-control"
              value={deliveryaddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              name="salesdescription"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: "70px" }}
              placeHolder={receivedData?.deliveryaddress}
            ></textarea>
          </div>
        </div>
      </div>

      {/* ------quote---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Purchase Order# *
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            required
            value={purchaseorder}
            onClick={(e) => setPurchaseOrder(e.target.value)}
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
            Date
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

      {/* ------Expiry date---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border-bottom pb-2">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Expected Delivery Date
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={deliverydate}
            onChange={(date) => setDeliveryDate(date)}
            minDate={startDate}
            className="textInput customDateInput"
            style={{ outline: "none" }}
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
          <select
            className="form-select textInput"
            value={paymentterm}
            onChange={(e) => setPaymentTerm(e.target.value)}
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

                {/* <td>
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
                </td> */}

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
                  placeholder={receivedData?.shippingcharges}
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
              <small>SGST</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="Number"
                  class="form-control"
                  placeholder={receivedData?.gsttax}
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
          
          <div className="row mt-3">
            <div className="col-md-4 col-4 text-start">
              <small>CGST</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="Number"
                  class="form-control"
                  placeholder={receivedData?.cgsttax}
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
              <p>{gsttax}</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 col-4 text-start">
              <small>IGST</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="Number"
                  class="form-control"
                  placeholder={receivedData?.igsttax}
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
              <p>{igsttax}</p>
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
              onClick={() => updatePurchaseOrder(receivedData?._id)}
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

export default UpdatePurchaseOrder;
