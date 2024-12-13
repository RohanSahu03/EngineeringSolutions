import React, { useState, useRef, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import "../../../css/dashboard/items.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdDeleteForever } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaEye } from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

function PaymentsMade() {
  const [show, setShow] = useState(false);
  const [vendorlist, setVendorList] = useState([]);
  const [paymentlist, setPaymentList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [vendorId, setVendorId] = useState("");
  const [paymentnumber, setPaymentnumber] = useState("");
  const [paymentmade, setPaymentmade] = useState("");
  const [paymentmode, setPaymentMode] = useState("");
  const [paidthrough, setPaidthrough] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [reference, setReference] = useState("");
  const navigate = useNavigate();
  const [filteredArray, setFillteredArray] = useState([]);

  useEffect(() => {
    getAllPaymentDetails();
  }, []);

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

  const deleteBillPayment = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/paymentmode/deletepaymentmode/${id}`
      );
      if (res.status === 200) {
        toast.warning(res.data.message);
        getAllPaymentDetails();
      }
      if (res.status === 404) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteBillPayment(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const getAllPaymentDetails = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/paymentmode/getpaymentmode"
      );
      if (res.status === 200) {
        setPaymentList(res.data);
        setFillteredArray(res.data);
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formdata = new FormData();
  const saveBillPayment = async () => {
    try {
      if (!startDate) {
        toast.warning("please enter date");
        return;
      }
      if (!vendorId) {
        toast.warning("please select customer name");
        return;
      }
      if (!paymentnumber) {
        toast.warning("please select payment number");
        return;
      }

      if (!paymentmade) {
        toast.warning("please enter amount");
        return;
      }
      if (!paymentmode) {
        toast.warning("please enter payment mode");
        return;
      }
      if (!paidthrough) {
        toast.warning("please enter payment through");
        return;
      }
      if (!reference) {
        toast.warning("please enter reference number");
        return;
      }
      formdata.set("vendorname", vendorId);
      formdata.set("paymentdate", startDate);
      formdata.set("paymentnumber", paymentnumber);
      formdata.set("paymentmade", paymentmade);
      formdata.set("paymentmode", paymentmode);
      formdata.set("paidthrough", paidthrough);
      formdata.set("reference", reference);

      const config = {
        url: "/createpaymentmode",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/paymentmode",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);

      if (res.status === 201) {
        toast.success("payment detials added successfully");
        getAllPaymentDetails();
        handleClose();
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
  const [search, setSearch] = useState([]);

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  function handleFilter() {
    if (search != "") {
      const filterTable = paymentlist.filter((o) =>
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
      setFillteredArray([...paymentlist]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  const sortByDate = () => {
    setFillteredArray([
      ...paymentlist.sort(
        (a, b) => new Date(a.paymentdate) - new Date(b.paymentdate)
      ),
    ]);
  };

  const sortByPaymentNumber = () => {
    setFillteredArray([
      ...paymentlist.sort((a, b) => a.paymentnumber - b.paymentnumber),
    ]);
  };

  const sortByReference = () => {
    setFillteredArray([
      ...paymentlist.sort((a, b) => a.reference - b.reference),
    ]);
  };

  const sortByVendor = () => {
    setFillteredArray([
      ...paymentlist.sort((a, b) =>
        a.vendorname.vendorfirstname.localeCompare(b.vendorname.vendorfirstname)
      ),
    ]);
  };

  const sortByAmount = () => {
    setFillteredArray([
      ...paymentlist.sort((a, b) => a.paymentmade - b.paymentmade),
    ]);
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
                <Dropdown.Item onClick={sortByDate}>Date</Dropdown.Item>
                <Dropdown.Item onClick={sortByPaymentNumber}>
                  Payment Number
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByReference}>
                  Reference Number
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByVendor}>
                  Vendor Name
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
              <tr className="text-center">
                <th scope="col" className="text-center">
                  SL.No.
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Payment No.
                </th>
                <th scope="col" className="text-center">
                  Bill#
                </th>
                <th scope="col" className="text-center">
                  Reference No.
                </th>
                <th scope="col" className="text-center">
                  Vendor Name
                </th>
                <th scope="col" className="text-center">
                  Mode
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
                <th scope="col" className="text-center">
                  Unused Amount
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
                          {formatDate(item.paymentdate)}
                        </td>
                        <td className="text-center">{item.paymentnumber}</td>
                        <td className="text-center">
                          <table>
                            {item.billnumbers.map((data) => {
                              return (
                                <tr>
                                  <td className="text-center">{data},</td>
                                </tr>
                              );
                            })}
                          </table>
                        </td>
                        <td className="text-center">{item.reference}</td>
                        <td className="text-center">
                          {item.vendorname?.vendorfirstname}
                        </td>
                        <td className="text-center">{item.paymentmode}</td>
                        <td className="text-center">{item.paymentmade}</td>
                        <td className="text-center">{item.unusedamount}</td>
                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate(
                                "/dashboard/purchase/paymentmadesummary",
                                {
                                  state: item,
                                }
                              )
                            }
                          />

                          <FaEdit
                            onClick={() =>
                              navigate(
                                "/dashboard/purchase/updatePaymentMade",
                                {
                                  state: item,
                                }
                              )
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

      {/* Off-Canvas--------------------------- */}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "1000px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row border-bottom py-2 text-start d-flex ">
            <h3>
              <PiNewspaperClippingFill />
              &nbsp;&nbsp;Bill Payment
            </h3>
          </div>
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                Payment#*
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                required
                value={paymentnumber}
                onChange={(e) => {
                  setPaymentnumber(e.target.value);
                }}
              />
            </div>
          </div>

          {/* ------sales ordder---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Payment Made*
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={paymentmade}
                onChange={(e) => setPaymentmade(e.target.value)}
              />
            </div>
          </div>

          {/* ------sales order date---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Payment Date*
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

          {/* -------------payment term--------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Payment Mode
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="form-select textInput"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                value={paymentmode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                {" "}
                <option value="" disabled>
                  Select{" "}
                </option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
                <option value="Credit Card">Credit Card</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
          </div>

          {/* -------------payment term--------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Paid Through
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="form-select textInput"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                value={paidthrough}
                onChange={(e) => setPaidthrough(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Petty Cash">Petty Cash</option>
                <option value="Undeposite Fund">Undeposite Fund</option>
              </select>
            </div>
          </div>

          {/* ------sales ordder---------- */}
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

          {/* --------------item table------------- */}
          <div className="row mt-3  text-start">
            <h5 className="py-2 bg-secondary text-light">Item Table</h5>
          </div>

          <div className="row mt-1 overflow-auto">
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Bill#</th>
                  <th scope="col">PO#</th>
                  <th scope="col">Bill Amount</th>
                  <th scope="col">Amount Due</th>
                  <th scope="col">Payments</th>
                </tr>
              </thead>
              <tbody>
                {/* --------------first row--------------- */}
                {/* <tr>
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px" }}
                  placeholder="type to select an item"
                />
              </td>
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px" }}
                  value="1.00"
                />
              </td>
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px" }}
                  value="0.00"
                />
              </td>
              <td>
             
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "150px" }}
                      value="0.00"
                    />
          
              </td>
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px" }}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px" }}
                />
              </td>
              <td>
                <RxCross1 />
              </td>
            </tr> */}

                {/* --------------dynamic row--------------- */}

                {/* {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px" }}
                    placeholder="type to select an item"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px" }}
                    value="1.00"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px" }}
                    value="0.00"
                  />
                </td>
                <td>
                 
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "150px" }}
                        value="0.00"
                      />
                
                </td>
                <td>
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px" }}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px" }}
                  />
                </td>

                <td>
                  <RxCross1 />
                </td>
              </tr>
            ))} */}

                <h4>There are no bills for this vendor.</h4>
              </tbody>
            </table>
          </div>

          {/* ---------button----------    */}
          <div className="row">
            {/* <div className="col-md-2">
          <Button variant="secondary" size="sm" onClick={addRow}>
            <AiFillPlusCircle
              data-bs-container="body"
              data-bs-toggle="popover"
              data-bs-placement="bottom"
              data-bs-content="Bottom popover"
            />
            &nbsp; add new row
          </Button>
        </div>
   
        <div className="col-md-6 p-md-5 p-2 mt-1" style={{ background: "aliceblue",float:'right' }}>
          <div className="row">
            <div className="col-md-4 col-4 text-start">
              <h6>subtotal</h6>
            </div>
            <div className="col-md-4 col-4 text-end"></div>
            <div className="col-md-4 col-4 text-center">0.00</div>
          </div>


          <div className="row mt-3">
    <div className="col-md-4 col-4 text-start">
   <small>Shipping Charges</small>
    </div>
    <div className="col-md-4 col-4">
    <input
              type="text"
              id="inputText"
              className="form-control textInput formInput"
            
            
            />
    </div>
    <div className="col-md-4 col-4 text-center">
    <p>0.00</p>
    </div>
  </div>



          <div className="row mt-3">
    <div className="col-md-4 col-4">
    <div className="row">
                  <div className="col-md-6 col-6">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        type="radio"
                        value="TDS"
                    
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        TDS
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 col-6">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="TCS"
                
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                       TCS
                      </label>
                    </div>
                  </div>
                </div>
    </div>
    <div className="col-md-4 col-4">
    <select
                  className="form-select formInput"
                 
                  id="inputGroupSelect03"
                  aria-label="Example select with button addon"
                  style={{width:'150px'}}
                >
                  <option value="INR">select a tax</option>
                  <option value="USD"></option>
                  <option value="JPY"></option>
                </select>
    </div>
    <div className="col-md-4 col-4 text-center">
    <p>0.00</p>
    </div>
  </div>


          <div className="row mt-3">
            <div className="col-md-4 col-4">
              <input
                type="text"
                id="inputText"
                className="form-control textInput formInput"
                
              />
            </div>
            <div className="col-md-4 col-4">
              <input
                type="text"
                id="inputText"
                className="form-control textInput formInput"
        
              />
            </div>
            <div className="col-md-4 col-4 text-center">
              <p>0.00</p>
            </div>
          </div>


          <div className="row mt-2 border-top">
            <div className="col-md-6 col-6">
              <h4>Total (₹)</h4>
            </div>
            <div className="col-md-6 col-6 text-center">
              <h4>0.00</h4>
            </div>
          </div>

  


        </div> */}
            <div className="row py-2">
              <div className="col-md-6 col-6">
                <button
                  type="submit"
                  class="btn btn-primary float-end"
                  onClick={saveBillPayment}
                >
                  Save
                </button>
              </div>
              <div className="col-md-6 col-6">
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

      {/* off-canvas End ------------------ */}
    </div>
  );
}

export default PaymentsMade;
