import React, { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/dashboard/quotes.css";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TiPlus } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Button from "react-bootstrap/Button";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";

function DeliveryChallan() {
  const navigate = useNavigate();
  const [deliverychallandate, setDeliveryChallanDate] = useState(new Date());

  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [customerId, setCustomerId] = useState("");
  const [reference, setReference] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");
  const [challantype, setChallanType] = useState("");
  const [alldeliverychallan, setAllDeliveryChallan] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [deliverychallan, setDeliveryChallan] = useState("");
  const [invoiced, setInvoiced] = useState(false);
  const [paymentstatus, setPaymentStatus] = useState(false);
  const [filteredArray, setFillteredArray] = useState([]);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => {
    setShow(true);
    getAllCustomer();
    getAllProduct();
    const dcnumber = generateUniqueQTString();
    setDeliveryChallan(dcnumber);
  };
  const handleClose = () => setShow(false);
  const [productId, setProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [search, setSearch] = useState("");
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close dropdown after selecting an item
  };

  //to genrate unique number
  function generateUniqueNumber() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomString = generateUniqueAlphanumeric(8); // Generate random alphanumeric string
    return timestamp + randomString;
  }

  //to generate generateUniqueAlphanumeric
  function generateUniqueAlphanumeric(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }
    return result;
  }

  // Function to disable past dates
  const isDateDisabled = (date) => {
    return deliverychallandate < new Date(); // Disable if date is before today
  };

  function generateUniqueQTString() {
    const prefix = "DC-";
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
    getAllDeliveryChallan();
  }, []);

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

  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const addItemData = () => [
    setItemData([
      ...itemData,
      {
        itemid: products?._id,
        itemdetails: products?.firstname,
        quantity: quantity,
        rate: products?.sellingprice,
        discount: discount,
        amount:
          DiscountUnit === "%"
            ? quantity * products.sellingprice -
              Number(
                (quantity * products.sellingprice * (discount / 100)).toFixed(2)
              )
            : quantity * products.sellingprice - discount,
        discountunit: DiscountUnit,
      },
    ]),
    setTotal(subtotal),
  ];
  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item) => item.itemid !== id)]);
  };

  const formdata = new FormData();

  const saveDeliveryChallan = async () => {
    formdata.set("customername", customerId);
    formdata.set("deliverychallan", deliverychallan);
    formdata.set("reference", reference);
    formdata.set("deliveryChallandate", deliverychallandate);
    formdata.set("challantype", challantype);
    formdata.set("itemdetailsArray", JSON.stringify(itemData));
    formdata.set("subtotal", subtotal);
    formdata.set("gsttax", gsttax);
    formdata.set("shippingcharges", shippingChares);
    formdata.set("total", total);
    // formdata.set("invoiced", invoiced);
    // formdata.set("paymentstatus", paymentstatus);

    try {
      const config = {
        url: "/createdeliverychallan",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/deliverychallans",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Delivery Challan Saved...");
        handleClose();
        getAllDeliveryChallan();
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getAllDeliveryChallan = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/deliverychallans/getalldeliverychallan"
      );
      if (res.status === 200) {
        // console.log("data", res.data);
        setAllDeliveryChallan(res.data);
        setFillteredArray(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDeliveryChallan = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/deliverychallans/deletedeliverychallan/${id}`
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        getAllDeliveryChallan();
      }
      if (res.status === 404) {
        toast.warning(res.data.message);
      }
      if (res.status === 500) {
        res.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (inputDateStr) => {
    const inputDate = new Date(inputDateStr);

    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = inputDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const sortByName = () => {
    setFillteredArray([
      ...alldeliverychallan.sort((a, b) =>
        a.customername.customerfirstname.localeCompare(
          b.customername.customerfirstname
        )
      ),
    ]);
  };

  const sortByDate = () => {
    setFillteredArray([
      ...alldeliverychallan.sort(
        (a, b) =>
          new Date(a.deliveryChallandate) - new Date(b.deliveryChallandate)
      ),
    ]);
  };

  const sortByAmount = () => {
    setFillteredArray([
      ...alldeliverychallan.sort((a, b) => a.total - b.total),
    ]);
  };

  function handleFilter() {
    if (search != "") {
      const filterTable = alldeliverychallan.filter((o) =>
        Object.keys(o).some((k) => {
          // If the key is 'customername', check 'customerfirstname'
          if (k === "customername" && o[k]?.customerfirstname) {
            return o[k].customerfirstname
              .toLowerCase()
              .includes(search.toLowerCase());
          }
          // For other keys, convert value to string and perform the check
          return String(o[k]).toLowerCase().includes(search.toLowerCase());
        })
      );

      // Update the state with the filtered array
      setFillteredArray([...filterTable]);
    } else {
      // If search is empty, show all sales orders
      setFillteredArray([...alldeliverychallan]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Delivery Challan",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteDeliveryChallan(id);
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

      <div className="row border py-3 d-flex ">
        <div className="col-md-4 col-4 d-flex justify-content-center">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search"
              aria-label="customer"
              aria-describedby="basic-addon2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-4 offset-4 col-6 d-flex justify-content-end">
          {/* < BsThreeDotsVertical className='menuDot'/> */}
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary d-inline"
              onClick={handleShow}
              style={{ height: "38px" }}
            >
              <TiPlus /> New
            </button>
            <Dropdown className="mx-3">
              <Dropdown.Toggle
                variant="transparent outline btn-outline-primary"
                id="dropdown-basic"
              >
                Sort
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={sortByDate}>Date</Dropdown.Item>
                <Dropdown.Item onClick={sortByName}>
                  Customer Name
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByAmount}>Amount</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="row overflow-auto">
        <div className="col-md-12">
          <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th className="text-center">SL.No.</th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Delivery Challan#
                </th>
                <th scope="col" className="text-center">
                  Reference #
                </th>
                <th scope="col" className="text-center">
                  Customer Name
                </th>

                <th scope="col" className="text-center">
                  Amount
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            {filteredArray?.length !== 0 ? (
              <tbody>
                {filteredArray
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">
                          {formatDate(item.deliveryChallandate)}
                        </td>
                        <td className="text-center">{item.deliverychallan}</td>
                        <td className="text-center">{item.reference}</td>
                        <td className="text-center">
                          {item.customername.customerfirstname}
                        </td>
                        <td className="text-center">{item.total}</td>
                        <td className="text-center">
                          <MdDeleteForever
                            onClick={() => confirmalert(item._id)}
                          />{" "}
                          <FaEdit
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              navigate(
                                "/dashboard/sales/deliverychallan/editdeliverychallan",
                                {
                                  state: item,
                                }
                              )
                            }
                          />
                          <FaEye
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              navigate(
                                "/dashboard/sales/deliverychallan/summary",
                                {
                                  state: item,
                                }
                              )
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <div className="container ">
                <div className="row mt-4 ">
                  <div className="col-md-12 ">
                    <img
                      src="/images/emptybox.jpg"
                      alt=""
                      srcset=""
                      style={{
                        width: "200px",
                        height: "200px",
                        opacity: "0.4",
                      }}
                    />
                    <h6>There are no Delivery Challan.</h6>
                  </div>
                </div>
              </div>
            )}
          </table>
          <div style={{ display: "flex" }} className="reactPagination">
            <p style={{ width: "100%", marginTop: "20px" }}>
              Total Count: {filteredArray?.length}
            </p>
            <ReactPaginate
              previousLabel={"Back"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "1200px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Delivery Challan</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Customer Name
              </label>
            </div>
            <div className="col-md-5">
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
                  <TextField {...params} label="Select Customer" />
                )}
              />
              {/* <select
                className="textInput"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option value="">Select Customer</option>
                {customers.map((item) => {
                  return (
                    <option value={item._id}>{item.customerfirstname}</option>
                  );
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
                <tr>
                  <td>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      getOptionLabel={(option) => option?.firstname}
                      options={product}
                      sx={{ width: 300 }}
                      onChange={(e, value) => setProducts(value)}
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
                        <TextField {...params} label="Item Details" />
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
                        setAmount(quantity * products.sellingprice);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "180px", height: "60px" }}
                      value={products?.sellingprice}
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
                        !products || Object.keys(products)?.length === 0
                          ? 0
                          : DiscountUnit === "%"
                          ? quantity * products?.sellingprice -
                            Number(
                              (
                                quantity *
                                products?.sellingprice *
                                (discount / 100)
                              ).toFixed(2)
                            )
                          : quantity * products?.sellingprice - discount
                      }
                    />
                  </td>
                  <td>
                    <FaPlusCircle onClick={addItemData} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>quantity</th>
                    <th>Rate</th>
                    <th>discount</th>
                    <th>amount</th>
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
                            onClick={() => deleteItemData(item.itemid)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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
                  onClick={saveDeliveryChallan}
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
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default DeliveryChallan;
