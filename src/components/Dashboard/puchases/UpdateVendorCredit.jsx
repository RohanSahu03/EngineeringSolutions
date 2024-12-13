import React, { useEffect, useMemo, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Typography, Box } from "@mui/material";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

function UpdateVendorCredit() {
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(receivedData?.creditnotedate);
  const [creditnumber, setCreditNumber] = useState(receivedData?.creditnumber);
  const [vendors, setVendors] = useState([]);

  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [vendorId, setVendorId] = useState(
    receivedData?.vendorname?.vendorfirstname
  );
  const [ordernumber, setOrderNumber] = useState(receivedData?.ordernumber);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemData, setItemData] = useState([...receivedData?.itemdetailsArray]);
  const rowref = useRef(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [indexvar, setIndexVar] = useState(null);
  const [itemObj, setItemObj] = useState({});

  const [newproduct, setNewProduct] = useState({});
  const [newquantity, setNewQuantity] = useState(0);
  const [newrate, setNewRate] = useState(0.0);
  const [newamount, setNewAmount] = useState(0.0);
  const [vendorcredit, setVendorCredit] = useState({});
  const [formData, setFormData] = useState({});

  const formData1 = new FormData();
const updateVendorCredit=async(id)=>{
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
  formData1.set("creditnumber", creditnumber);
  formData1.set("ordernumber", ordernumber);
  formData1.set("creditnotedate", startDate);
  formData1.set("itemdetailsArray", JSON.stringify(dataArr));
  formData1.set("subtotal", subtotal);
  formData1.set("gsttax", gsttax);
  formData1.set("shippingcharges", shippingChares);
  formData1.set("total", total);


  try{
    const config = {
      url: `/updatevendorcredit/${id}`,
      method: "put",
      baseURL: "https://engineeringsolutions.net.in/api/vendorcredit",
      headers: { "content-type": "application/json" },
      data: formData1,
    };
    const res = await axios(config);
    if (res.status === 201) {
      setTimeout(() => {
        navigate("/dashboard/purchase/vendorcredit");
      }, 3000);
      toast.success("Vendor Credit Updated Successfully");
    }
    if (res.status === 404) {
      toast.warning("Vendor Credit not found");
    }

  }
  catch(error){
    console.log(error);
    console.log("hiiii")
  }
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemObj((prevItemObj) => {
      const parsedValue =
        name === "rate" || name === "quantity" ? parseFloat(value) : value;
      const updatedObj = {
        ...prevItemObj,
        [name]: value,
      };

      if (name === "rate" || name === "quantity") {
        const rate = updatedObj.rate || 0;
        const quantity = updatedObj.quantity || 0;
        updatedObj.amount = rate * quantity;
      }
      return updatedObj;
    });
  };



  const handleEditRow = (idx, data) => {
    setIndexVar(idx);
    setItemObj(data);
    handleShow();
  };


  const addRow = () => {
    setItemData([
      ...itemData,
      {
        itemdetails: "Select Product",
        quantity: 0,
        rate: 0,
        discount: 0,
        amount: 0,
      },
    ]);
  };

  const getVendorCreditById = async (id) => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/vendorcredit/getvendorcreditbyid/${id}`
      );
      if (res.status === 201) {
        // console.log("data", res.data);
        setVendorCredit(res.data);

      }
      if (res.status === 500) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllVendor = async () => {
    try {
      let res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendors(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendorCreditById(receivedData?._id);
    getAllVendor();
    getAllProduct();
  }, []);

  // const calculateSubtotl=useMemo(()=>{
  // setSubtotal(itemData.reduce((acc,cur)=>acc+cur.amount,0))
  // },[])

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/products/getproduct"
      );
      if (res.status === 201) {
        setProducts(res.data);
      } else {
        toast("internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const venderproductitemsedit = async () => {
    try {
      const config = {
        url: "/updateProduct",
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/vendorcredit",
        headers: { "content-type": "application/json" },
        data: {
          vendorcreditId: receivedData?._id,
          productid: itemObj?._id,
          itemObj: itemObj,
        },
      };

      const res = await axios(config);
      if (res.status === 200) {
        toast.success("data updated..");
        getVendorCreditById(receivedData?._id);
        handleClose();
      }

      if (res.status === 500) {
        alert("error");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const calculateAmount = useMemo(() => {
    setNewAmount(Number(newquantity) * Number(newrate));
  }, [newquantity, newrate]);

  const addNewItem = async () => {
    let newObj = {
      itemid: newproduct?.itemid,
      itemdetails: newproduct?.firstname,
      quantity: newquantity,
      rate: newrate,
      amount: newamount,
      discount: 0,
    };

    try {
      const config = {
        url: "/addnewitem",
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/vendorcredit",
        headers: { "content-type": "application/json" },
        data: {
          vendorcreditId: receivedData?._id,
          // productid: itemObj?._id,
          itemObj: newObj,
        },
      };

      const res = await axios(config);
      if (res.status === 200) {
        toast.success("data updated..");
        getVendorCreditById(receivedData?._id);
        setNewProduct({});
        setNewQuantity(0);
        setNewRate(0);
        setNewAmount(0);
      }

      if (res.status === 500) {
        alert("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useMemo(() => {
    setSubtotal(
      vendorcredit?.itemdetailsArray
        ?.map((item) => item)
        .reduce((acc, cur) => {
          return acc + cur.amount;
        }, 0)
    );
  }, [vendorcredit]);

  const deleteRow = (index) => {
    setItemData((prevData) => prevData.filter((_, i) => i !== index));
  };


  useMemo(() => {
    setTotal(
      Number(subtotal) +
        Number(shippingChares) +
        Number(((subtotal * gsttax) / 100).toFixed(2))
    );
  }, [shippingChares, gsttax, subtotal]);

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Item",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteItem(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteItem = async (id) => {
    try {
      const config = {
        url: "/deleteitem",
        method: "delete",
        baseURL: "https://engineeringsolutions.net.in/api/vendorcredit",
        headers: { "content-type": "application/json" },
        data: {
          vendorcreditId: receivedData?._id,
          productid: id,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        toast.success("Item Deleted Successfully");
        getVendorCreditById(receivedData?._Id);
      }
    } catch (error) {
      alert("error");
    }
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


  return (
    <div>
      <ToastContainer />
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center ">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Vendor Name
          </label>
        </div>
        <div className="col-md-5  text-start">
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(option) => option?.vendorfirstname}
            options={vendors}
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
          {/* <input
            type="text"
            className="textInput"
            value={vendorId?.vendorfirstname}
            placeHolder={receivedData?.vendorname?.vendorfirstname}
            style={{
              width: "150px",
              backgroundColor: "aliceblue",
              paddingLeft: "10px",
              borderRadius: "4px",
              outline: "none",
              border: "none",
              marginRight: "15px",
            }}
            disabled
          /> */}
          {/* <select
            className="textInput"
            value={vendorId}
            onChange={(e) => {
              setVendorId(e.target.value);
            }}
            style={{ width: "200px" }}
          >
            <option value="">Select Vendor</option>
            {vendors.map((item) => {
              return <option value={item._id}>{item.vendorfirstname}</option>;
            })}
          </select> */}
        </div>
      </div>
      {/* ------quote---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Credit Note#*
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            required
            value={creditnumber}
            onChange={(e) => setCreditNumber(e.target.value)}
          />
        </div>
      </div>
      {/* ------refrence---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Order number
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
            Vendor Credit Date*
          </label>
        </div>
        <div className="col-md-5  text-start">
          {/* <input type='text' className='textInput' style={{width:'120px'}}/> */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="textInput"
            style={{ outline: "none", width: "160px" }}
            required
          />
        </div>
      </div>
      {/* --------------item table------------- */}
      <div className="row mt-1 overflow-auto">
        <table class="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">item details</th>
              <th scope="col">quantity</th>
              <th scope="col">Rate</th>
              <th scope="col">amount</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {/* --------------first row--------------- */}
            {itemData.map((data, index) => {
              return (
                <tr key={index}>
                  <td>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(option) => option?.firstname}
                    options={products}
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
              );
            })}
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
      {/* --------------new row--------------- */}
      <div
        className="row mt-1 overflow-auto"
        ref={rowref}
        style={{ display: "none" }}
      >
        <table class="table table-striped">
          <tbody>
            <tr>
              <td>
                <select
                  name=""
                  id=""
                  className="textInput outline-0"
                  value={newproduct}
                  onChange={(e) => {
                    setNewProduct(JSON.parse(e.target.value));
                    setNewQuantity(1);
                  }}
                  style={{ width: "180px" }}
                >
                  <option value="">{newproduct.firstname}</option>
                  {products.map((item) => {
                    return (
                      <option value={JSON.stringify(item)} key={item._id}>
                        {item.firstname}
                      </option>
                    );
                  })}
                </select>
              </td>

              <td>
                <input
                  type="text"
                  id="inputText"
                  name="quantity"
                  className="form-control textInput"
                  style={{ width: "100px" }}
                  value={newquantity}
                  placeholder="quantity"
                  onChange={(e) => {
                    setNewQuantity(e.target.value);
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  id="inputText"
                  name="rate"
                  className="form-control textInput"
                  style={{ width: "180px" }}
                  value={newrate}
                  placeholder="rate"
                  onChange={(e) => setNewRate(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="inputText"
                  name="amount"
                  className="form-control textInput"
                  style={{ width: "180px" }}
                  value={newamount}
                  placeholder="amount"
                  disabled
                />
              </td>
              <td>
                <FaPlusCircle onClick={addNewItem} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <label>Item Detail</label>
            </div>
            <div className="col-md-8">
              <input
                type="text"
                value={itemObj?.itemdetails || ""}
                style={{ width: "250px", height: "35px", paddingLeft: "10px" }}
                disabled
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-4">
              <label>Quantity</label>
            </div>
            <div className="col-md-8">
              <input
                type="number"
                id="inputText"
                name="quantity"
                className="form-control textInput"
                style={{ width: "250px" }}
                value={itemObj?.quantity || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-4">
              <label>Rate</label>
            </div>
            <div className="col-md-8">
              <input
                type="number"
                id="inputText"
                className="form-control textInput"
                style={{ width: "250px" }}
                // onChange={(e)=>handleChange(index,e)}
                value={itemObj?.rate || ""}
                onChange={handleChange}
                name="rate"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-4">
              <label>Amount</label>
            </div>
            <div className="col-md-8">
              <input
                type="number"
                id="inputText"
                className="form-control textInput"
                style={{ width: "250px" }}
                value={itemObj?.amount || ""}
                // placeHolder={itemObj.amount}
                disabled
                name="amount"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={venderproductitemsedit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
          <div className="col-md-6 col-3 text-end" onClick={()=>updateVendorCredit(receivedData?._id)}>
            <button className="btn btn-primary">Update</button>
          </div>
          <div className="col-md-6 col-3">
            <button
              type="button"
              class="btn btn-outline-info float-start"
              onClick={() => navigate("/dashboard/purchase/vendorcredit")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateVendorCredit;
