import React, { useState, useEffect, useMemo } from "react";
import { PiNewspaperClippingFill } from "react-icons/pi";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiPlus } from "react-icons/ti";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Table from "react-bootstrap/Table";
import { FaPlusCircle } from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

function Bill() {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    const newRow = { id: rows.length + 1, data: "New Row" };
    setRows([...rows, newRow]);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [vendorlist, setVendorList] = useState([]);
  const [paymentlist, setPaymentList] = useState([]);
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [duedate, setDueDate] = useState(new Date());
const [costprice,setCostPrice]=useState(0)
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [ordernumber, setOrderNumber] = useState("");
  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [discount, setdiscount] = useState(0.0);
  const [adjustments, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [customername, setcustomername] = useState("");
  const [customers, setCustomers] = useState([]);
  const [billnumber, setBillNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");
  const [bills, setBills] = useState([]);
  const [filteredArray, setFillteredArray] = useState([]);

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

  const isDateDisabled = (date) => {
    return startDate < new Date(); // Disable if date is before today
  };

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteBillById(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
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

  const getAllPaymentDetails = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/paymentmode/getpaymentmode"
      );
      if (res.status === 200) {
        setPaymentList(res.data);
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBill();
    getAllPaymentDetails();
    getAllProduct();
    getAllCustomer();
  }, []);

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

  const getAllVendors = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendorList(res.data);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItemData = () => [
    customername
      ? (setItemData([
          ...itemData,
          {
            itemid: products?._id,
            itemdetails: products?.firstname,
            quantity: quantity,
            rate:costprice,
            customername: customername,
            discountunit: DiscountUnit,
            amount: quantity * costprice,
          },
        ]),
        setTotal(subtotal))
      : toast.warning("Please Select Customer name"),
  ];

  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item) => item.itemid !== id)]);
  };

  useMemo(() => {
    setSubtotal(
      itemData
        .reduce((accumulator, item) => {
          return accumulator + item.amount;
        }, 0)
        .toFixed(2)
    );
  }, [itemData]);

  useMemo(() => {
    setTotal(
      Number(subtotal) +
        Number(adjustments) -
        Number(((subtotal * discount) / 100).toFixed(2))
    );
  }, [subtotal, adjustments, discount]);

  const formdata = new FormData();

  const saveBill = async () => {
    try {
      if (!vendorId) {
        toast.warning("Please select Vendor name");
        return;
      }
      if (!billnumber) {
        toast.warning("Please enter bill number");
        return;
      }
      if (!ordernumber) {
        toast.warning("Please enter Order Number");
        return;
      }
      if (!duedate) {
        toast.warning("Please select due date");
        return;
      }
      if (!paymentterm) {
        toast.warning("Please select Payment term");
        return;
      }
      if (itemData.length === 0) {
        toast.warning("Please add items to the bill");
        return;
      }
      if(!subject){
        toast.warning("Please enter Subject");
        return;
      }

      formdata.set("vendorname", vendorId);
      formdata.set("billnumber", billnumber);
      formdata.set("ordernumber", ordernumber);
      formdata.set("billdate", startDate);
      formdata.set("duedate", duedate);
      formdata.set("paymentterm", paymentterm);
      formdata.set("subject", subject);
      formdata.set("itemdetailsArray", JSON.stringify(itemData));
      formdata.set("subtotal", subtotal);
      formdata.set("discount", discount);
      formdata.set("adjustments", adjustments);
      formdata.set("total", total);

      let config = {
        url: `addBill`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/bill",
        headers: { "content-type": "application/json" },
        data:formdata,
      };

      const res = await axios(config);
      if (res.status === 400) {
        toast.warning("Please add items to the bill");
        return;
      }

      if (res.status === 201) {
        handleClose();
        toast.success("Bill created successfully");
        getAllBill();
        itemData?.map((item) => {
          addStock(item?.itemid, item?.quantity);
        });
        setAmount(0);
        setTotal(0);
        setdiscount(0);
        setSubtotal(0);
        setVendorId({});
        setProducts({});
        setOrderNumber("");
        setBillNumber("");
        setPaymentTerm("");
        setSubject("");
        setQuantity(0);
        setcustomername("");
        setItemData([]);
      }
      if (res.status === 500) {
        toast.error("Failed to Create Bill");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addStock = async (id, data) => {
    try {
      let config = {
        url: `addstock/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/products",
        headers: { "content-type": "application/json" },
        data: { stockonhand: data },
      };
      const res = await axios(config);
      if (res.status === 200) {
        console.log("data updated..");
      }

      if (res.status === 404) {
        console.log("data not found..");
      }
      if (res.status === 500) {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBill = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/bill/getBill"
      );
      if (res.status === 201) {
        setBills(res.data);
        setFillteredArray(res.data);
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBillById = async (id) => {
    try {
      const config = {
        url: `/deleteBillById/${id}`,
        method: "delete",
        baseURL: "https://engineeringsolutions.net.in/api/bill",
        headers: { "content-type": "application/json" },
      };
      const res = await axios(config);

      if (res.status === 404) {
        toast.warning("Bill not Found");
      }
      if (res.status === 200) {
        toast.success(res.data.message);
        getAllBill();
      }
      if (res.status === 500) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePercent = useMemo(() => {
    return Number((discount / 100) * subtotal).toFixed(2);
  }, [discount, subtotal]);

  //searchbox
  const [search, setSearch] = useState("");
  function handleFilter() {
    if (search != "") {
      const filterTable = bills.filter((o) =>
        Object.keys(o).some((k) => {
          // If the key is 'customername', check 'customerfirstname'
          if (k === "vendorname" && o[k]?.vendorfirstname) {
            return o[k].vendorfirstname
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
      setFillteredArray([...bills]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  const sortByDate = () => {
    setFillteredArray([
      ...bills.sort((a, b) => new Date(a.billdate) - new Date(b.billdate)),
    ]);
  };
  const sortByVendorName = () => {
    setFillteredArray([
      ...bills.sort((a, b) =>
        a.vendorname.vendorfirstname.localeCompare(b.vendorname.vendorfirstname)
      ),
    ]);
  };

  const sortByDueAmount = () => {
    setFillteredArray([...bills.sort((a, b) => a.balancedue - b.balancedue)]);
  };

  const sortByAmount = () => {
    setFillteredArray([...bills.sort((a, b) => a.total - b.total)]);
  };

  const [flag, setFlag] = useState(false);

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
              onClick={() => {
                handleShow();
                getAllVendors();
              }}
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
                <Dropdown.Item onClick={sortByVendorName}>
                  Vendor Name
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByAmount}>Amount</Dropdown.Item>
                <Dropdown.Item onClick={sortByDate}>Date</Dropdown.Item>
                <Dropdown.Item onClick={sortByDueAmount}>
                  Due Amount
                </Dropdown.Item>
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
                <th scope="col" className="text-center">
                  SL.No.
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Bill#
                </th>
                <th scope="col" className="text-center">
                  Reference Number
                </th>
                <th scope="col" className="text-center">
                  Vendor Name
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Due Date
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
                <th scope="col" className="text-center">
                  Balance Due
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            {filteredArray.length !== 0 ? (
              <tbody>
                {filteredArray
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">
                          {formatDate(item.billdate)}
                        </td>
                        <td className="text-center">{item.billnumber}</td>
                        <td className="text-center">{item.ordernumber}</td>
                        <td className="text-center">
                          {item.vendorname?.vendorfirstname}
                        </td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">
                          {formatDate(item.duedate)}
                        </td>
                        <td className="text-center">{item.total}</td>
                        <td className="text-center">{item.balancedue}</td>
                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/purchase/billsummary", {
                                state: item,
                              })
                            }
                          />
                          <FaEdit
                            onClick={() =>
                              navigate("/dashboard/purchase/updatebill", {
                                state: item,
                              })
                            }
                            style={{ marginLeft: "10px" }}
                          />

                          <MdDeleteForever
                            onClick={() => confirmalert(item._id)}
                            style={{ marginLeft: "10px" }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <div className="container ">
                <div className="row mt-4   ">
                  <div className="col-md-12 ">
                    <h3>You haven’t made any payments yet.</h3>
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
          <h4>New Bill</h4>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
                label="Select Vendor"
              />
            )}
          />
                {/* <select
                  className="textInput"
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                >
                  <option value="">Select Vendor</option>
                  {vendorlist?.map((item) => {
                    return (
                      <option value={item._id}>{item.vendorfirstname}</option>
                    );
                  })}
                </select> */}
              </div>
            </div>
          </div>

          {/* ------sales ordder---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Bill Number
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
                minDate={new Date()}
                filterDate={() => isDateDisabled(new Date())}
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
                <option value="Due end of the month">
                  Due end of the month
                </option>
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
                  <th scope="col">Customer</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* --------------first row--------------- */}
                <tr>
                  <td>
                    <select
                      name=""
                      id=""
                      className="textInput outline-0"
                      value={products}
                      onChange={(e) => setProducts(JSON.parse(e.target.value))}
                      style={{ width: "200px" }}
                      onClick={() => setQuantity(1)}
                    >
                      <option value={products?.firstname || ""}>
                        {products?.firstname || "Select Item"}
                      </option>
                      {product?.map((item) => {
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
                      className="form-control textInput"
                      style={{ width: "100px" }}
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
                      style={{ width: "150px" }}
                      value={costprice}
              onChange={(e)=>{
                setCostPrice(e.target.value);
              }}
                    />
                  </td>

                  <td>
                    <select
                      className="textInput"
                      value={customername}
                      onChange={(e) => setcustomername(e.target.value)}
                      style={{ width: "150px" }}
                    >
                      <option value="">Select Customer</option>
                      {customers.map((item) => {
                        return (
                          <option value={item.customerfirstname}>
                            {item.customerfirstname}
                          </option>
                        );
                      })}
                    </select>
                  </td>

                  <td>
                    <input
                      type="text"
                      id="inputText"
                      disabled
                      className="form-control textInput"
                      style={{ width: "180px" }}
                      value={
                        !products || Object.keys(products)?.length === 0
                          ? 0
                          : DiscountUnit === "%"
                          ? quantity * costprice -
                            Number(
                              (
                                quantity *
                                costprice *
                                (discount / 100)
                              ).toFixed(2)
                            )
                          : quantity * costprice - discount
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
                    <th>Customer</th>
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
                        <td>{item?.customername}</td>
                        <td>{item.amount}</td>
                        <td>
                          <MdDeleteForever
                            onClick={() => deleteItemData(item?.itemid)}
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
                  <small>Discount &nbsp;%</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="in %"
                      value={discount}
                      onChange={(e) => {
                        setdiscount(e.target.value);
                        // setTotal((discount / 100) * total + total);
                      }}
                    />
                    {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(discount)}>%</button> */}
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  {discount > 0 ? (
                    <p style={{ color: "red" }}>-{calculatePercent}</p>
                  ) : (
                    <>0.00</>
                  )}
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>Adjustment</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="in rupees"
                      value={adjustments}
                      onChange={(e) => {
                        setShippingCharges(e.target.value);
                        // setTotal(total + adjustments);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>{adjustments}</p>
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
                  onClick={saveBill}
                >
                  Save
                </button>
              </div>
              <div className="col-md-6 col-3">
                <button
                  type="button"
                  class="btn btn-outline-info float-start"
                  onClick={() => handleClose()}
                >
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

export default Bill;
