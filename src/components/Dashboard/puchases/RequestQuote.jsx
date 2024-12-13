import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { TiPlus } from "react-icons/ti";
import Offcanvas from "react-bootstrap/Offcanvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import { FaPlusCircle } from "react-icons/fa";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { resolveTimeViewsResponse } from "@mui/x-date-pickers/internals";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useMemo } from "react";

function RequestQuote() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);
  const handleShow = () => {
    setShow(true);
  };
  const navigate = useNavigate();
  const [indents, setIndents] = useState([]);
  const [indentdata, setIndentData] = useState({});
  const [selectedVendor, setSelectedVendor] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [quotedeadline, setQuoteDeadline] = useState(new Date());
  const [rfqno, setRfqno] = useState("");
  const [rfqdata, setRfqdata] = useState([]);
  const [filteredArray, setFillteredArray] = useState([]);
  const [rfqnumber, setRfqNumber] = useState("");

  const getIndentByStatus = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/indent/getIndentByStatus"
      );
      if (res.status === 201) {
        setIndents(res.data);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (inputDateStr) => {
    // Step 1: Parse the date string into a Date object
    const inputDate = new Date(inputDateStr);

    // Step 2: Format the date into dd/mm/yyyy format
    const day = inputDate.getDate()?.toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1)?.toString().padStart(2, "0"); // Months are zero-indexed
    const year = inputDate.getFullYear();

    // Return the formatted date string
    return `${day}/${month}/${year}`;
  };

  const [vendordata, setVendordata] = useState([]);

  const getVendorData = async () => {
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

  const formdata = new FormData();

  const saveRFQ = async (e) => {
    e.preventDefault();
    if (!indentdata) {
      return toast.warning("Please select Indent..");
    }
    if (!selectedVendor) {
      return toast.warning("Please select Vendor..");
    }
    formdata.set("rfqno", rfqno);
    formdata.set("rfqdate", startDate);
    formdata.set("quotedeadline", quotedeadline);
    formdata.set("vendordetails", JSON.stringify(selectedVendor));
    formdata.set("indentdetails", JSON.stringify(indentdata));
    formdata.set("status", "Pending");
    try {
      const config = {
        url: "/createQuotation",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/rfq",
        headers: { "content-type": "application/json" },
        data: formdata,
      };
      let res = await axios(config);

      if (res.status === 201) {
        toast.success("Request for Quotation saved..");
        handleClose();
        saveRfqNo();
        getRFQ();
        setRfqno("");
        setIndentData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRFQ = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/rfq/getRequestforQuotation"
      );
      if (res.status === 200) {
        setRfqdata(res.data);
        const revdata = res.data.reverse();
        setFillteredArray(revdata);
      } else {
        toast.warning("something went wrong");
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

  useEffect(() => {
    getVendorData();
    getIndentByStatus();
    getRFQ();
  }, []);

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete RFQ",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteRFQ(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteRFQ = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/rfq/deleteQuotationById/${id}`
      );
      if (res.status === 200) {
        toast.success("RFQ deleted Successfully..");
        getRFQ();
      }
      if (res.status === 404) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveRfqNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/rfq/createRfqNo",
        { rfqno: rfqno }
      );
      if (res.status === 201) {
        console.log("data saved");
      } else {
        console.log("not saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLastRfqNo = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/rfq/getLastRfqNo`
      );
      if (res.status === 201) {
        setRfqNumber(res.data.rfqno);
        increase();
      }
      if (res.status === 500) {
        toast.warning("Failed to retrieve data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLastRfqNo();
  }, []);

  const incrementRfqNo = () => {
    const today = new Date();

    // Extract last 2 digits of the current year
    const year = startDate.getFullYear().toString().slice(-2);

    // Get the current month (pad to 2 digits)
    const month = String(startDate.getMonth() + 1).padStart(2, "0");

    // Get the current date (pad to 2 digits)
    const date = String(startDate.getDate()).padStart(2, "0");

    // Extract the date part of the current indentnumber
    const currentIndentDatePart = rfqnumber.slice(2, 8); // '240924' for example

    // Form the current date part (in the format YYMMDD)
    const currentDatePart = `${year}${month}${date}`;

    let newIndentNo;

    if (currentDatePart !== currentIndentDatePart) {
      // If the date part is different, reset the number part to '000001'
      newIndentNo = `RF${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = rfqnumber.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `RF${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setRfqno(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementRfqNo();
  }, [rfqnumber]);


  useMemo(()=>{
    incrementRfqNo()
   },[startDate])

  return (
    <div>
      <ToastContainer />
      <div className="row border py-3 d-flex ">
        <div className="col-md-4 offset-8 col-4 d-flex justify-content-end">
          {/* < BsThreeDotsVertical className='menuDot'/> */}
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary d-inline"
              onClick={() => {
                handleShow();
                getLastRfqNo();
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
                <Dropdown.Item>Name</Dropdown.Item>
                <Dropdown.Item>Rate</Dropdown.Item>
                <Dropdown.Item>Purchase Rate</Dropdown.Item>
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
                  RFQ No.
                </th>
                <th scope="col" className="text-center">
                  RFQ Date
                </th>
                <th scope="col" className="text-center">
                  Indent No.
                </th>
                <th scope="col" className="text-center">
                  Vendor Name
                </th>
                <th scope="col" className="text-center">
                  Quotation Deadline
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            {filteredArray?.length !== 0 ? (
              <>
                <tbody>
                  {filteredArray
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    ?.map((item, index) => {
                      return (
                        <tr>
                          <td className="text-center">
                            {index + 1 + usersPerPage * pageNumber}
                          </td>
                          <td className="text-center">{item.rfqno}</td>

                          <td className="text-center">
                            {formatDate(item?.rfqdate)}
                          </td>

                          <td className="text-center">
                            {item?.indentdetails?.indentno}
                          </td>

                          <td className="text-center">
                            {item?.vendordetails[0]?.vendorfirstname}
                          </td>

                          <td className="text-center">
                            {formatDate(item?.quotedeadline)}
                          </td>
                          <td className="text-center">{item?.status}</td>
                          <td className="text-center">
                            <FaEye
                              onClick={() =>
                                navigate("/dashboard/rfq/summary", {
                                  state: item,
                                })
                              }
                            />
                            <MdDeleteForever
                              onClick={() => confirmalert(item._id)}
                              style={{ marginLeft: "20px" }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </>
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
                    <h6>There are no Quotes.</h6>
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
        style={{ width: "1600px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Request for Quotation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form class="row g-3 needs-validation">
            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-6  d-flex ">
                <div className="col-md-4 ">
                  <label for="inputText" className="col-form-label label">
                    RFQ No.
                  </label>
                </div>
                <div className="col-md-8 ">
                  <input
                    type="text"
                    id="inputText"
                    name="rfq"
                    className="form-control textInput"
                    required
                    value={rfqno}
                    onChange={(e) => setRfqno(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="col-md-3 offset-1">
                  <label for="inputText" className="col-form-label label">
                    RFQ Date
                  </label>
                </div>
                <div className="col-md-8">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    // minDate={new Date()}
                    // filterDate={() => isDateDisabled(new Date())}
                    className="textInput customDateInput"
                    style={{ outline: "none" }}
                    required
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-6  d-flex ">
                <div className="col-md-4 ">
                  <label for="inputText" className="col-form-label label">
                    Quote Deadline
                  </label>
                </div>
                <div className="col-md-8 ">
                  <DatePicker
                    selected={quotedeadline}
                    onChange={(date) => setQuoteDeadline(date)}
                    // minDate={startDate}
                    // filterDate={() => isDateDisabled(new Date())}
                    className="textInput customDateInput"
                    style={{ outline: "none" }}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="col-md-3 offset-1">
                  <label for="inputText" className="col-form-label label">
                    Select Vendor
                  </label>
                </div>
                <div className="col-md-8">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(option) =>
                      option?.vendorfirstname && option?.companyname
                    }
                    options={vendordata}
                    sx={{ width: 300 }}
                    onChange={(e, value) => {
                      setSelectedVendor(value);
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
                            <div className="mx-1">
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
                      <TextField {...params} label="Select Vendor" />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-6  d-flex ">
                <div className="col-md-4 ">
                  <label for="inputText" className="col-form-label label">
                    Select Indent
                  </label>
                </div>
                <div className="col-md-8 ">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(option) => option?.indentno}
                    options={indents}
                    sx={{ width: 300 }}
                    onChange={(e, value) => setIndentData(value)}
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
                              {option?.indentno}
                            </Typography>

                            <Typography variant="body2" color="textPrimary">
                              {/* {option?.hsncode} */}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              variant="body2"
                              color="textPrimary"
                              className="text-end"
                            >
                              date
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textPrimary"
                              className="text-end"
                            >
                              {formatDate(option?.indentdate)}
                            </Typography>
                          </div>
                        </Box>
                      </MenuItem>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Item" />
                    )}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="col-md-3 offset-1">
                  <label for="inputText" className="col-form-label label">
                    Indent Date
                  </label>
                </div>
                <div className="col-md-8">
                  <DatePicker
                    // selected={startdate}
                    // onChange={(date) => setStartDate(date)}
                    // minDate={new Date()}
                    // filterDate={() => isDateDisabled(new Date())}
                    value={formatDate(indentdata?.indentdate || new Date())}
                    className="textInput customDateInput"
                    style={{ outline: "none" }}
                    required
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="row mt-3 text-start">
              <h5 className="py-2 bg-secondary text-light">Item Table</h5>
            </div>

            <div className="row">
              <div className="col-md-12">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl.No.</th>
                      <th>Item Name</th>
                      <th>Unit</th>
                      <th>Stock Qty.</th>
                      <th>Quantity Required</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {indentdata?.indentItems?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.itemname}</td>
                          <td>{item.unit}</td>
                          <td>{item?.stockquantity}</td>
                          <td>{item.quantityrequired}</td>
                          <td>{item.remarks}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>

            <div className="row g-3 ">
              <div className="col-md-6 col-3 ">
                <button
                  class="btn btn-primary float-end"
                  onClick={(e) => saveRFQ(e)}
                >
                  Save
                </button>
              </div>
              <div className="col-md-6 col-3">
                <button
                  type="button"
                  class="btn btn-outline-info float-start"
                  //   onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default RequestQuote;
