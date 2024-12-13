import React, { useState, useRef, useMemo, useEffect } from "react";
import Overlay from "react-bootstrap/Overlay";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../../../css/dashboard/items.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdDeleteForever } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaEdit, FaEye } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ReactPaginate from "react-paginate";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
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
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";

function CashInvoice() {
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(!show1);
  const target1 = useRef(null);
  const handleShow = () => {
    setShow1(true);
  };

  const navigate = useNavigate();

  const [rfq, setRfq] = useState("");
  const [invoiceno, setinvoiceno] = useState("");
  const [invoicedate, setinvoicedate] = useState(new Date());
  const [indentno, setIndentNo] = useState("");
  const [inspectionno, setInspectionNo] = useState("");
  const [inspectiondate, setInspectionDate] = useState(new Date());
  const [billdate, setbilldate] = useState(new Date());
  const [billno, setbillno] = useState("");
  const [description, setdescription] = useState("");
  const [podate, setPoDate] = useState(new Date());
  const [itemData, setItemData] = useState([]);
  const [lastno, setLastNo] = useState("");
  const [inspections, setInspections] = useState([]);

  const [indentdata, setIndentData] = useState([]);
  const [filteredArray, setFillteredArray] = useState([]);
  const [search, setSearch] = useState("");

  const [listofinspection, setListOfInspection] = useState([]);
  const [selectedObj, setSelectedObj] = useState({});
  const [indentdate, setIndentDate] = useState(new Date());
  const [listofgrn, setListofGrn] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [vendorr, setVendorr] = useState({});
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [billamount,setBillAmount]=useState('')
  const [invoiceamount,setInvoiceAmount]=useState('')
  const [subtotal,setSubtotal]=useState(0)

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
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

  const getInspectionByStatus = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getinspectionbystatus"
      );
      if (res.status === 201) {
        // console.log("data", res.data);

        const revdata = res.data.reverse();
        setListOfInspection(revdata);
        // setFillteredArray(revdata);
        // setFillteredArray(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    console.log("selectedObj", selectedObj);
    setInspectionNo(selectedObj?.inspectionno);
    setInspectionDate(selectedObj?.inspectiondate);
    setbillno(selectedObj?.billno);
    setbilldate(selectedObj?.billdate);
    setdescription(selectedObj?.description);
    setPoDate(selectedObj?.podate);
    // setIndentNo(selectedObj?.indentno)
    // setItemData(selectedObj?.itemdetailsArray);
  }, [selectedObj]);


  const addItemData = () => {
    setItemData((prevItemData) => [
      ...prevItemData,
      {
        description,
        billamount,
        invoiceamount,
      },
    ]);

    setdescription('');
    setBillAmount(0);
    setInvoiceAmount(0);
  };

  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item, index) => index !== id)]);
  };

  useMemo(()=>{
    setSubtotal(
        itemData.reduce((acc, current) => acc + Number(current.invoiceamount), 0)
    )
  },[itemData])

  const saveCashInvoice = async () => {
   
    try {
      const config = {
        url: "/createcashinvoice",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/accounts",
        headers: { "content-type": "application/json" },
        data: {
          invoiceno: invoiceno,
          invoicedate: invoicedate,
          supplier:vendorr?.companyname,
          billno:billno,
          billdate:billdate,
          itemdetailsArray: JSON.stringify(itemData),
          subtotal:subtotal,
          status: "Pending",
          total:subtotal
        //   sgsttax: total,
        //   cgsttax: selectedObj?.cgsttax,
        //   igsttax: selectedObj?.igsttax,
        //   shippingcharges: selectedObj?.shippingcharges,
        //   total: selectedObj?.total,
          
        },
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Invoice saved...");
        handleClose();
        saveinvoiceno();
        getAllInvoice();
        setItemData([]);
        setbillno("");
        setbilldate(new Date());

      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveinvoiceno = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/accounts/createcashinvoiceNo",
        { cashinvoiceno: invoiceno }
      );
      if (res.status === 201) {
        console.log("data saved");
      } else {
        console.log("not saved");
      }
    } catch (error) {
      alert(error);
    }
  };

  const getLastinvoiceno = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getLastinvoiceno"
      );
      if (res.status === 201) {
        // setPurchaseOrderNo(res.data.description);
        setLastNo(res.data.invoiceno);
        // console.log('ff',res.data);
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
    getLastinvoiceno();
  }, []);

  const incrementinvoiceno = () => {
    const today = new Date();

    // Extract last 2 digits of the current year
    const year = invoicedate.getFullYear().toString().slice(-2);

    // Get the current month (pad to 2 digits)
    const month = String(invoicedate.getMonth() + 1).padStart(2, "0");

    // Get the current date (pad to 2 digits)
    const date = String(invoicedate.getDate()).padStart(2, "0");

    // Extract the date part of the current indentnumber
    const currentIndentDatePart = lastno.slice(2, 8); // '240924' for example

    // Form the current date part (in the format YYMMDD)
    const currentDatePart = `${year}${month}${date}`;

    let newIndentNo;

    if (currentDatePart !== currentIndentDatePart) {
      // If the date part is different, reset the number part to '000001'
      newIndentNo = `NT${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = lastno.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `NT${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setinvoiceno(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementinvoiceno();
  }, [lastno]);

  useMemo(()=>{
    incrementinvoiceno()
  },[invoicedate])

  const getAllInspection = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getinspection"
      );
      if (res.status === 200) {
        const revdata = res.data.reverse();
        setInspections(revdata);
        setFillteredArray(revdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInvoice();
  }, []);

  const getAllInvoice = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/accounts/getcashinvoice"
      );
      if (res.status === 200) {
        const revdata = res.data.reverse();
        setListofGrn(revdata);
        setFillteredArray(revdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleFilter() {
    if (search != "") {
      const filterTable = inspections.filter((o) =>
        Object.keys(o).some((k) => {
          // If the key is 'customername', check 'customerfirstname'
          // if (k === "vendorname" && o[k]?.vendorfirstname) {
          //   return o[k].vendorfirstname
          //     .toLowerCase()
          //     .includes(search.toLowerCase());
          // }
          // For other keys, convert value to string and perform the check
          return String(o[k]).toLowerCase().includes(search.toLowerCase());
        })
      );

      // Update the state with the filtered array
      setFillteredArray([...filterTable]);
    } else {
      // If search is empty, show all sales orders
      setFillteredArray([...inspections]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Expense Record",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteGrn(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteGrn = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/accounts/deletcashinvoice/${id}`
      );
      if (res.status === 200) {
        toast.success("Invoice deleted");
        getAllInvoice();
      }
      if (res.status === 500) {
        res.warning(res.data.message);
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
        setVendors(res.data);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="row border py-3 d-flex ">
        <div className="col-md-4 col-4">
          <Button
            variant="transparent"
            className="float-start"
            ref={target1}
            // onClick={() => setShow1(!show1)}
          >
            Active <TiArrowSortedDown />
          </Button>
          <Overlay placement="bottom">
            {({
              placement: _placement,
              arrowProps: _arrowProps,
              show: _show,
              popper: _popper,
              hasDoneInitialMeasure: _hasDoneInitialMeasure,
              ...props
            }) => (
              <div
                {...props}
                style={{
                  position: "absolute",
                  backgroundColor: "",
                  padding: "2px 10px",
                  color: "black",
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                <ul class="list-group">
                  <li
                    class="list-group-item list-group-item-action"
                    // onClick={filterAllItem}
                  >
                    All Items
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    // onClick={filterItemsByActiveStatus}
                  >
                    Active Items
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    // onClick={filterItemsByInactivStatus}
                  >
                    Inactive Items
                  </li>
                </ul>
              </div>
            )}
          </Overlay>
        </div>
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

        <div className="col-md-4 col-4 d-flex justify-content-end">
          {/* < BsThreeDotsVertical className='menuDot'/> */}
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary d-inline"
              onClick={() => {
                handleShow();
                getInspectionByStatus();
                getLastinvoiceno();
                getAllVendors()
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
                  Invoice No.
                </th>
                <th scope="col" className="text-center">
                  Invoice Date
                </th>
                <th scope="col" className="text-center">
                  Bill No.
                </th>
                <th scope="col" className="text-center">
                  Bill Date
                </th>

                <th scope="col" className="text-center">
                 Total
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
              <tbody>
                {filteredArray
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">{item.invoiceno}</td>
                        <td className="text-center">
                          {formatDate(item.invoicedate)}
                        </td>
                        <td className="text-center">{item.billno}</td>
                        <td className="text-center">
                          {formatDate(item.billdate)}
                        </td>

                        <td className="text-center">{item.total}</td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/accounts/cashinvoicesummary", {
                                state: item,
                              })
                            }
                          />
                          {/* <FaEdit
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              navigate("/dashboard/purchase/edit", {
                                state: item,
                              })
                            }
                          /> */}
                          <MdDeleteForever
                            style={{ marginLeft: "10px" }}
                            onClick={() => confirmalert(item._id)}
                          />{" "}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <div className="container ">
                <div className="row mt-4 ">
                  <div className="col-md-12 text-center">
                    <h5>Start Managing Your Purchase Activities!</h5>
                    <button
                      type="button"
                      className="btn btn-primary d-inline"
                      onClick={handleShow}
                    >
                      CREATE NEW CASH INVOICE
                    </button>
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
        show={show1}
        onHide={handleClose}
        placement="end"
        style={{ width: "1600px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cash Invoice</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
                  Invoice No.
                </label>
              </div>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  required
                  onChange={(e) => setinvoiceno(e.target.value)}
                  value={invoiceno}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="col-md-3 offset-1">
                <label for="inputText" className="col-form-label label">
                  Invoice Date
                </label>
              </div>
              <div className="col-md-8">
                <DatePicker
                  selected={invoicedate}
                  className="textInput customDateInput"
                  onChange={(date) => setinvoicedate(date)}
                  style={{ outline: "none" }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
              Supplier
              </label>
            </div>
            <div className="col-md-5">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.companyname}
                options={vendors}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  // showAddress();
                  setVendorId(value?._id);
                  setVendorr(value);
                  console.log('val',vendorr)
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
                    label='Select vendor'
                  />
                )}
              />
            </div>
          </div>
          {/* <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
                  Inspection No.
                </label>
              </div>
              <div className="col-md-8 ">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  getOptionLabel={(option) => option?.inspectionno}
                  options={listofinspection}
                  sx={{ width: 300 }}
                  onChange={(e, value) => {
                    setSelectedObj(value);
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
                          <div>
                            <Typography variant="body1">
                              {option?.inspectionno}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </MenuItem>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Inspection No" />
                  )}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="col-md-3 offset-1">
                <label for="inputText" className="col-form-label label">
                  Inspection Date
                </label>
              </div>
              <div className="col-md-8">
                <DatePicker
                  selected={inspectiondate}
                  className="textInput customDateInput"
                  style={{ outline: "none" }}
                  required
                />
              </div>
            </div>
          </div> */} 

          <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
                  Bill No.
                </label>
              </div>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  required
                  onChange={(e) => setbillno(e.target.value)}
                  value={billno}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="col-md-3 offset-1">
                <label for="inputText" className="col-form-label label">
                  Bill Date
                </label>
              </div>
              <div className="col-md-8">
              <DatePicker
                  selected={billdate}
                  className="textInput customDateInput"
                  onChange={(date) => setbilldate(date)}
                  style={{ outline: "none" }}
                  required
                />
              </div>
            </div>
          </div>

          {/* <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
               Invoice Description
                </label>
              </div>
              <div className="col-md-8 ">
              <Form.Control
                as="textarea"
                placeholder="Invoice Description"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="col-md-3 offset-1">
                <label for="inputText" className="col-form-label label">
                  PO Date
                </label>
              </div>
              <div className="col-md-8">
                <DatePicker
                  selected={podate}
                  // filterDate={() => isDateDisabled(new Date())}
                  className="textInput customDateInput"
                  style={{ outline: "none" }}
                  required
                />
              </div>
            </div>
          </div> */}
          {/* 
          <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
                  Indent No.
                </label>
              </div>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  required
                  //   onChange={handleChange}
                  value={indentno}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex">
            
            </div>
          </div> */}

          <div className="row mt-3 text-start">
            <h5 className="py-2 bg-secondary text-light">Item Table</h5>
          </div>

          <div className="row mt-1 overflow-auto">
            <table className="table table-bordered ">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="text-center">
                 Description
                  </th>
                  <th className=" text-center">Bill Amount</th>
                  <th className=" text-center">Invoice Amount</th>
                <th className=" text-center">
                    Action
                </th>
                </tr>
              </thead>
              <tbody>
                {/* --------------first row--------------- */}
                <tr>
                    <td>
                    <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "250px", height: "57px" }}
                        value={description}
                        onChange={(e)=>setdescription(e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "250px", height: "57px" }}
                        value={billamount}
                        onChange={(e)=>setBillAmount(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "250px", height: "60px" }}
                        value={invoiceamount}
                        onChange={(e) => setInvoiceAmount(e.target.value)}
                      />
                    </td>
                   

                    <td>
                      <FaPlusCircle className='fs-5' onClick={addItemData} />
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
                      <th>Sl.No.</th>
                      <th>Description</th>
                      <th>Bill Amount</th>
                      <th>Invoice Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData?.map((item, index) => {
                      return (
                        <tr key={item?._id}>
                          <td>{index + 1}</td>
                          <td>{item.description}</td>
                          <td>{item.billamount}</td>
                          <td>{item?.invoiceamount}</td>
                     
                          <td>
                            <MdDeleteForever
                              onClick={() => deleteItemData(index)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>

          <div className="row">
            <div className="col-md-7  text-start">
              {/* <div className="row">
                <b>Remarks</b>
                <br />
                {selectedObj?.remarks}
              </div> */}
            </div>

            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>subtotal</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {subtotal}
                </div>
              </div>

              {/* <div className="row">
                <div className="col-md-6 text-start">
                  <p>Shipping Charge</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {selectedObj?.shippingcharges}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Sgst tax</p>
                </div>
                <div className="col-md-6  text-end">
                  {" "}
                  ₹
                  {Number(
                    (
                      (Number(selectedObj?.subtotal) *
                        Number(selectedObj?.sgsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${selectedObj?.sgsttax}%)`}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Cgst tax</p>
                </div>
                <div className="col-md-6  text-end">
                  {" "}
                  ₹
                  {Number(
                    (
                      (Number(selectedObj?.subtotal) *
                        Number(selectedObj?.cgsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${selectedObj?.cgsttax}%)`}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Igst tax</p>
                </div>
                <div className="col-md-6  text-end">
                  {" "}
                  ₹
                  {Number(
                    (
                      (Number(selectedObj?.subtotal) *
                        Number(selectedObj?.igsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${selectedObj?.igsttax}%)`}
                </div>
                <hr />
              </div> */}

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>
                    <b>Total</b>
                  </p>
                </div>
                <div className="col-md-6  text-end">
                  <b> ₹ {subtotal}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 ">
            <div className="col-md-6 col-3 ">
              <button
                type="button"
                // type="submit"
                class="btn btn-primary float-end"
                onClick={saveCashInvoice}
              >
                Save
              </button>
            </div>
            <div className="col-md-6 col-3">
              <button
                type="button"
                class="btn btn-outline-info float-start"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CashInvoice;
