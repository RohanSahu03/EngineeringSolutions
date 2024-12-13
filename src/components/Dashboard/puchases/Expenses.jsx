import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiPlus } from "react-icons/ti";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdDeleteForever } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { FaEdit, FaEye } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

function Expenses() {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [expenseaccount, setExpenseAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [paidthrough, setPaidThrough] = useState("");
  const [vendor, setVendor] = useState("");
  const [invoice, setInvoice] = useState("");
  const [notes, setNotes] = useState("");
  const [customer, setCustomer] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [expenseaccount1, setExpenseAccount1] = useState("");
  const [amount1, setAmount1] = useState("");
  const [paidthrough1, setPaidThrough1] = useState("");
  const [vendor1, setVendor1] = useState("");
  const [invoice1, setInvoice1] = useState("");
  const [notes1, setNotes1] = useState("");
  const [customer1, setCustomer1] = useState("");
  const [receipt1, setReceipt1] = useState(null);

  const [selectedItem, setSelectedItem] = useState({});
  const [selectedObj, setSelectedObj] = useState({});
  const [expenselist, setExpenseList] = useState([]);

  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);

  const [show4, setShow4] = useState(false);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const navigate = useNavigate();

  const showModel = (data) => {
    setSelectedObj(data);
    handleShow4();
  };

  const fileInputRef = useRef(null);
  const [updateimg, setUpdateImg] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));
      setUpdateImg(true);
    }
  };
  const handlePicChange = () => {
    fileInputRef.current.click();
  };

  const [filteredArray, setFillteredArray] = useState([]);
  const [search, setSearch] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setReceipt(file);
  };

  const openOffcanvas = () => {
    setShow3(true);
    console.log(selectedItem);
  };

  let formdata = new FormData();
  const saveExpenses = async () => {
    if (!startDate) {
      toast.warning("Please select a date");
      return;
    }
    if (!expenseaccount) {
      toast.warning("Please select a account type");
      return;
    }
    if (!amount) {
      toast.warning("Please enter amount");
      return;
    }
    if (!paidthrough) {
      toast.warning("Please enter paid through");
      return;
    }
    if (!vendor) {
      toast.warning("Please select vendor name");
      return;
    }
    if (!customer) {
      toast.warning("Please select customer name");
      return;
    }
    if (!invoice) {
      toast.warning("Please enter invoice number");
      return;
    }
    if (!notes) {
      toast.warning("Please enter notes");
      return;
    }
    if (!receipt) {
      toast.warning("Please select receipt");
      return;
    }

    formdata.set("date", startDate);
    formdata.set("expenseaccount", expenseaccount);
    formdata.set("amount", amount);
    formdata.set("paidthrough", paidthrough);
    formdata.set("vendor", vendor);
    formdata.set("invoice", invoice);
    formdata.set("notes", notes);
    formdata.set("customername", customer);
    formdata.set("uploadreceipt", receipt);

    try {
      const config = {
        url: "/createexpenses",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/expenses",
        headers: { "content-type": "multipart/form-data" },
        data: formdata,
      };

      const res = await axios(config);

      if (res.status === 201) {
        toast.success("Expense record saved...");
        handleClose();
        getExpenseData();
      }
      if (res.status === 400) {
        toast.success("Something went wrong..");
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

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Expense Record",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteExpense(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const getAllVendors = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendors(res.data);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
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

  const getExpenseData = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/expenses/getexpenses"
      );
      if (res.status === 200) {
        setExpenseList(res.data.Expenses);
        setFillteredArray(res.data.Expenses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/expenses/deleteexpenses/${id}`
      );
      if (res.status === 201) {
        getExpenseData();
        toast.success("Successfully deleted..");
      }
      if (res.status === 404) {
        toast.warning("Expense list not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenseData();
  }, []);

  const formdata1 = new FormData();

  const upadteExpense = async (id) => {
    try {
      formdata1.set("date", startDate1);
      formdata1.set("expenseaccount", expenseaccount1);
      formdata1.set("amount", amount1);
      formdata1.set("paidthrough", paidthrough1);
      formdata1.set("vendor", vendor1);
      formdata1.set("invoice", invoice1);
      formdata1.set("notes", notes1);
      formdata1.set("customername", customer1);
      formdata1.set("uploadreceipt", receipt1);

      const config = {
        url: `/updateexpenses/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/expenses",
        headers: { "content-type": "multipart/form-data" },
        data: formdata1,
      };
      const res = await axios(config);

      if (res.status === 201) {
        getExpenseData();
        handleClose3();
        toast.success("successfully upadted");
      }
      if (res.status === 404) {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortByVendorName = () => {
    setFillteredArray([
      ...expenselist.sort((a, b) =>
        a.vendor?.vendorfirstname.localeCompare(b.vendor?.vendorfirstname)
      ),
    ]);
  };

  const sortByCustomerName = () => {
    setFillteredArray([
      ...expenselist.sort((a, b) =>
        a.customername?.customerfirstname.localeCompare(
          b.customername?.customerfirstname
        )
      ),
    ]);
  };

  const sortByDate = () => {
    setFillteredArray([
      ...expenselist.sort((a, b) => new Date(a.date) - new Date(b.date)),
    ]);
  };

  //searchbox

  function handleFilter() {
    if (search != "") {
      const filterTable = expenselist.filter((o) =>
        Object.keys(o).some((k) => {
          // If the key is 'customername', check 'customerfirstname'
          if (k === "customername" && o[k]?.customerfirstname) {
            return o[k].customerfirstname
              .toLowerCase()
              .includes(search.toLowerCase());
          }
          if (k === "vendor" && o[k]?.vendorfirstname) {
            return o[k].vendorfirstname
              .toLowerCase()
              .includes(search.toLowerCase());
          }

          // For other keys, convert value to string and perform the check
          return String(o[k]).toLowerCase().includes(search.toLowerCase());
        })
      );
      setFillteredArray([...filterTable]);
    } else {
      setFillteredArray([...expenselist]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  return (
    <div>
      <ToastContainer />

      {/* //Model */}

      <Modal show={show4} onHide={handleClose4} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "400px" }}>
          <div className="row">
            <div className="col-md-4 offset-4">
              <Button
                variant="outlined"
                onClick={() =>
                  navigate("/dashboard/sales/createinvoice", {
                    state: selectedObj,
                  })
                }
              >
                Covert to Invoice
              </Button>
            </div>
          </div>
          <small>Expense Amount</small>
          <br />
          <big>
            <span style={{ color: "orangered" }}>₹ {selectedObj?.amount}</span>
          </big>
          <br />
          <br />
          <small>
            <span style={{ padding: "5px", backgroundColor: "aliceblue" }}>
              {selectedObj?.expenseaccount}
            </span>
          </small>
          <br />
          <br />
          <small>Paid Through</small>
          <br />
          <small>{selectedObj?.paidthrough}</small>
          <br />
          <br />
          <small>Customer</small>
          <br />
          <small>
            {selectedObj?.customername?.customerfirstname}{" "}
            {selectedObj?.customername?.customerlastname}
          </small>
          <br />
          <br />
          <small>Paid To</small>
          <br />
          <small>
            {selectedObj?.vendor?.vendorfirstname}{" "}
            {selectedObj?.vendor?.vendorlastname}
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose4}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose4}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row border py-3 d-flex ">
        <div className="col-md-4 col-6 d-flex justify-content-center">
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
                getAllCustomer();
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
                <Dropdown.Item onClick={sortByCustomerName}>
                  Customer Name
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByDate}>Date</Dropdown.Item>
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
                  Expense Account
                </th>
                <th scope="col" className="text-center">
                  Reference
                </th>
                <th scope="col" className="text-center">
                  Vendor Name
                </th>
                <th scope="col" className="text-center">
                  Paid Through
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
                  ?.slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">{formatDate(item.date)}</td>
                        <td className="text-center">{item.expenseaccount}</td>
                        <td className="text-center">{item?.invoice}</td>
                        <td className="text-center">
                          {item.vendor.vendorfirstname}
                        </td>
                        <td className="text-center">{item.paidthrough}</td>
                        <td className="text-center">
                          {item.customername.customerfirstname}
                        </td>
                        <td className="text-center">
                          {item.amount.toFixed(2)}
                        </td>
                        <td className="text-center">
                          <FaEye onClick={() => showModel(item)} />
                          <FaEdit
                            onClick={() => {
                              openOffcanvas();
                              setSelectedItem(item);
                            }}
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
                    <h6>There are no expense list.</h6>
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
        style={{ width: "1000px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>New Expenses</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Date*
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="textInput"
                style={{ outline: "none" }}
                required
              />
            </div>
          </div>

          {/* ------sales ordder---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Expense Account*
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="form-select textInput"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                placeholder="choose a proper challan type"
                required
                placeHolder="select account"
                value={expenseaccount}
                onChange={(e) => setExpenseAccount(e.target.value)}
              >
                <option value="Labor">Labor</option>
                <option value="Job Costing">Job Costing</option>
                <option value="Contact Assets">Contact Assets</option>
              </select>
            </div>
          </div>

          {/* ------refrence---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Amount*
              </label>
            </div>
            <div className="col-md-5">
              <div class="input-group flex-nowrap textInput">
                <span class="input-group-text" id="addon-wrapping">
                  INR
                </span>
                <input
                  type="number"
                  class="form-control "
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* -------------payment term--------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Paid Through*
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="form-select textInput"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                value={paidthrough}
                onChange={(e) => setPaidThrough(e.target.value)}
              >
                <option value="Petty Cash">Petty Cash</option>
                <option value="Advance Tax">Advance Tax</option>
                <option value="Job work">Job work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Vendor
              </label>
            </div>
            <div className="col-md-5 ">
              <div className="row">
                <div className="col-md-8 ">
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.vendorfirstname}
                options={vendors}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  setVendor(value?._id);
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
                            {option?.vendorfirstname
                              .substr(0, 1)
                              .toUpperCase()}
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
                  <TextField {...params} label="Select Vendor" />
                )}
              />
                  {/* <select
                    className="textInput"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map((item) => {
                      return (
                        <option value={item._id}>{item.vendorfirstname}</option>
                      );
                    })}
                  </select> */}
                </div>
              </div>
            </div>
          </div>

          {/* -------------payment term--------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Invoice#
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                required
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
              />
            </div>
          </div>

          {/* ---------------------------------- */}
          <div className="row mt-3">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Notes
              </label>
            </div>
            <div className="col-md-5">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Max 500 characters"
                  id="floatingTextarea2"
                  style={{ height: "60px", width: "300px" }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          {/* -------------------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Customer Name
              </label>
            </div>
            <div className="col-md-5 ">
              <div className="row">
                <div className="col-md-8 ">
                  <div class="input-group mb-3 textInput">
                  <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.customerfirstname}
                options={customers.filter(
                  (item) => item?.customerstatus === "Active"
                )}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  setCustomer(value?._id);
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
                      value={customer}
                      onChange={(e) => setCustomer(e.target.value)}
                    >
                      <option value="">Select Customer</option>
                      {customers.map((item) => {
                        return (
                          <option value={item._id}>
                            {item.customerfirstname}
                          </option>
                        );
                      })}
                    </select> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Upload Receipt
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="file"
                class="form-control textInput"
                id="inputGroupFile02"
                onChange={handleFile}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6 col-6">
              <button
                type="submit"
                class="btn btn-primary float-end"
                onClick={saveExpenses}
              >
                Save
              </button>
            </div>
            <div className="col-md-6 col-6">
              <button type="button" class="btn btn-outline-info float-start">
                Cancel
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={show3}
        onHide={handleClose3}
        placement="end"
        style={{ width: "1000px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>update expenses</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Date*
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={startDate1}
                onChange={(date) => setStartDate1(date)}
                className="textInput"
                style={{ outline: "none" }}
                placeHolder={selectedItem?.date}
              />
            </div>
          </div>

          {/* ------sales ordder---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Expense Account*
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="form-select textInput"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                placeHolder={selectedItem?.expenseaccount}
                value={expenseaccount1}
                onChange={(e) => setExpenseAccount1(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Labor">Labor</option>
                <option value="Job Costing">Job Costing</option>
                <option value="Contact Assets">Contact Assets</option>
              </select>
            </div>
          </div>

          {/* ------refrence---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Ammount*
              </label>
            </div>
            <div className="col-md-5">
              <div class="input-group flex-nowrap textInput">
                <span class="input-group-text" id="addon-wrapping">
                  INR
                </span>
                <input
                  type="number"
                  class="form-control "
                  required
                  value={amount1}
                  onChange={(e) => setAmount1(e.target.value)}
                  placeHolder={selectedItem?.amount}
                />
              </div>
            </div>
          </div>

          {/* -------------payment term--------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Paid Through*
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="form-select textInput"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                value={paidthrough1}
                onChange={(e) => setPaidThrough1(e.target.value)}
                placeHolder={selectedItem?.paidthrough}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Petty Cash">Petty Cash</option>
                <option value="Advance Tax">Advance Tax</option>
                <option value="Job work">Job work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Vendor
              </label>
            </div>
            <div className="col-md-5 ">
              <div className="row">
                <div className="col-md-8 ">
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.vendorfirstname}
                options={vendors}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  setVendor1(value?._id);
                }}
                onClick={getAllVendors}
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
                            {option?.vendorfirstname
                              .substr(0, 1)
                              .toUpperCase()}
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
                  <TextField {...params} label={selectedItem?.vendor?.vendorfirstname} />
                )}
              />
                  {/* <select
                    className="textInput"
                    value={vendor1}
                    onChange={(e) => setVendor1(e.target.value)}
                    onClick={getAllVendors}
                  >
                    <option value="">Select Vendor</option>
                    {vendors?.map((item) => {
                      return (
                        <option value={item._id}>{item.vendorfirstname}</option>
                      );
                    })}
                  </select> */}
                </div>
              </div>
            </div>
          </div>

          {/* -------------payment term--------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Invoice#
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                required
                value={invoice1}
                onChange={(e) => setInvoice1(e.target.value)}
                placeHolder={selectedItem?.invoice}
              />
            </div>
          </div>

          {/* ---------------------------------- */}
          <div className="row mt-3">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Notes
              </label>
            </div>
            <div className="col-md-5">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeHolder={selectedItem?.notes}
                  id="floatingTextarea2"
                  style={{ height: "60px", width: "300px" }}
                  value={notes1}
                  onChange={(e) => setNotes1(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          {/* -------------------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Customer Name
              </label>
            </div>
            <div className="col-md-5 ">
              <div className="row">
                <div className="col-md-8 ">
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.customerfirstname}
                options={customers.filter(
                  (item) => item?.customerstatus === "Active"
                )}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  setCustomer1(value?._id);
                }}
                onClick={getAllCustomer}
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
                  <TextField {...params} label={selectedItem?.customername?.customerfirstname} />
                )}
              />
                  {/* <select
                    className="textInput"
                    value={customer1}
                    onChange={(e) => setCustomer1(e.target.value)}
                    onClick={getAllCustomer}
                  >
                    <option value="">Select Customer</option>
                    {customers?.map((item) => {
                      return (
                        <option value={item._id}>
                          {item.customerfirstname}
                        </option>
                      );
                    })}
                  </select> */}
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Upload Receipt
              </label>
            </div>
            <div className="col-md-5">
              {updateimg ? (
                <img
                  src={imgUrl}
                  alt="from0 DB"
                  style={{ width: "250px", height: "120px" }}
                />
              ) : (
                <img
                  src={`https://engineeringsolutions.net.in/Expenses/${selectedItem?.uploadreceipt}`}
                  alt="from DB"
                  style={{ width: "250px", height: "120px" }}
                />
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <FaEdit onClick={handlePicChange} />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6 col-6">
              <button
                type="submit"
                class="btn btn-primary float-end"
                onClick={() => upadteExpense(selectedItem?._id)}
              >
                Update
              </button>
            </div>
            <div className="col-md-6 col-6">
              <button type="button" class="btn btn-outline-info float-start">
                Cancel
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Expenses;
