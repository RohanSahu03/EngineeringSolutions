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

function Grn() {
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(!show1);
  const target1 = useRef(null);
  const handleShow = () => {
    setShow1(true);
  };

  const navigate = useNavigate();

  const [rfq, setRfq] = useState("");
  const [grnno, setGrnNo] = useState("");
  const [grndate, setGrnDate] = useState(new Date());
  const [indentno, setIndentNo] = useState("");
  const [inspectionno, setInspectionNo] = useState("");
  const [inspectiondate, setInspectionDate] = useState(new Date());
  const [challandate, setChallanDate] = useState(new Date());
  const [challanno, setChallanNo] = useState("");
  const [pono, setPoNo] = useState("");
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
    setChallanNo(selectedObj?.challanno);
    setChallanDate(selectedObj?.challandate);
    setPoNo(selectedObj?.pono);
    setPoDate(selectedObj?.podate);
    // setIndentNo(selectedObj?.indentno)
    setItemData(selectedObj?.itemdetailsArray);
  }, [selectedObj]);

  const handleChallanQuantity = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.challanquantity = Number(e.target.value);
          val.orderedquantity = val.quantity;
        }
        return val;
      }),
    ]);
  };

  const handleDeliveredQuantity = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.deliverdquantity = Number(e.target.value);
        }
        return val;
      }),
    ]);
  };

  const handleShortQuantity = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.shortquantity = Number(e.target.value);
        }
        return val;
      }),
    ]);
  };

  const handleRejectedQuantity = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.rejectedquantity = Number(e.target.value);
        }
        return val;
      }),
    ]);
  };

  const handleNetReceipt = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.netreceipt = Number(e.target.value);
          val.basevalue = Number(e.target.value) * Number(val.rate);
        }
        return val;
      }),
    ]);
  };

  const saveGrn = async () => {
    try {
      const config = {
        url: "/creategrn",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/inventory",
        headers: { "content-type": "application/json" },
        data: {
          grnno: grnno,
          grndate: grndate,
          inspectionno: inspectionno,
          inspectiondate: inspectiondate,
          challanno: challanno,
          challandate: challandate,
          pono: pono,
          podate: podate,
          vendorname: selectedObj?.vendorname,
          itemdetailsArray: JSON.stringify(itemData),
          subtotal: selectedObj?.subtotal,
          sgsttax: selectedObj?.sgsttax,
          cgsttax: selectedObj?.cgsttax,
          igsttax: selectedObj?.igsttax,
          shippingcharges: selectedObj?.shippingcharges,
          total: selectedObj?.total,
          status: "Pending",
        },
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("GRN saved...");
        handleClose();
        saveGrnNo();
        getAllGrn();
        setItemData([]);
        setChallanNo("");
        setInspectionDate(new Date());
        setChallanDate(new Date());
        setPoDate(new Date());
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const saveGrnNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/inventory/createGrnNo",
        { grnno: grnno }
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

  const getLastGrnNo = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getLastGrnNo"
      );
      if (res.status === 201) {
        // setPurchaseOrderNo(res.data.pono);
        setLastNo(res.data.grnno);
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
    getLastGrnNo();
  }, []);

  const incrementGRNNo = () => {
    const today = new Date();

    // Extract last 2 digits of the current year
    const year = grndate.getFullYear().toString().slice(-2);

    // Get the current month (pad to 2 digits)
    const month = String(grndate.getMonth() + 1).padStart(2, "0");

    // Get the current date (pad to 2 digits)
    const date = String(grndate.getDate()).padStart(2, "0");

    // Extract the date part of the current indentnumber
    const currentIndentDatePart = lastno.slice(2, 8); // '240924' for example

    // Form the current date part (in the format YYMMDD)
    const currentDatePart = `${year}${month}${date}`;

    let newIndentNo;

    if (currentDatePart !== currentIndentDatePart) {
      // If the date part is different, reset the number part to '000001'
      newIndentNo = `GR${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = lastno.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `GR${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setGrnNo(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementGRNNo();
  }, [lastno]);

  useMemo(()=>{
    incrementGRNNo()
  },[grndate])

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
    getAllGrn();
  }, []);

  const getAllGrn = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getgrn"
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
        `https://engineeringsolutions.net.in/api/inventory/deletegrn/${id}`
      );
      if (res.status === 200) {
        toast.success("GRN deleted");
        getAllGrn();
      }
      if (res.status === 500) {
        res.warning(res.data.message);
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
            onClick={() => setShow1(!show1)}
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
                getLastGrnNo();
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
                  GRN No.
                </th>
                <th scope="col" className="text-center">
                  GRN Date
                </th>
                <th scope="col" className="text-center">
                  Inspection No.
                </th>
                <th scope="col" className="text-center">
                  Inspection Date
                </th>

                <th scope="col" className="text-center">
                  Challan No.
                </th>
                <th scope="col" className="text-center">
                  Challan Date
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
                        <td className="text-center">{item.grnno}</td>
                        <td className="text-center">
                          {formatDate(item.grndate)}
                        </td>
                        <td className="text-center">{item.inspectionno}</td>
                        <td className="text-center">
                          {formatDate(item.inspectiondate)}
                        </td>

                        <td className="text-center">{item.challanno}</td>
                        <td className="text-center">
                          {formatDate(item.challandate)}
                        </td>

                        <td className="text-center">{item.status}</td>
                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/inventory/grnsummary", {
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
                      CREATE NEW GRN
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
          <Offcanvas.Title>GRN Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
                  GRN No.
                </label>
              </div>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  required
                  onChange={(e) => setGrnNo(e.target.value)}
                  value={grnno}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="col-md-3 offset-1">
                <label for="inputText" className="col-form-label label">
                  GRN Date
                </label>
              </div>
              <div className="col-md-8">
                <DatePicker
                  selected={grndate}
                  className="textInput customDateInput"
                  onChange={(date) => setGrnDate(date)}
                  style={{ outline: "none" }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row mt-2 g-3 align-items-center">
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
          </div>

          <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
                  Challan No.
                </label>
              </div>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  required
                  onChange={(e) => setChallanNo(e.target.value)}
                  value={challanno}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="col-md-3 offset-1">
                <label for="inputText" className="col-form-label label">
                  Challan Date
                </label>
              </div>
              <div className="col-md-8">
                <DatePicker
                  selected={challandate}
                  className="textInput customDateInput"
                  style={{ outline: "none" }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
                  PO No.
                </label>
              </div>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  //   onChange={(e) => setChallanNo(e.target.value)}
                  value={pono}
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
          </div>
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
                    Item Name
                  </th>

                  <th className=" text-center">Order Qty.</th>
                  <th className=" text-center">Rate</th>
                  <th className=" text-center">Challan Qty.</th>
                  <th className=" text-center">Delivered Qty.</th>
                  <th className=" text-center">Short Recv. Qty.</th>
                  <th className=" text-center">Rejected Qty.</th>
                  <th className=" text-center">Net Receipt</th>
                  <th className=" text-center">Item Base Value</th>
                </tr>
              </thead>
              <tbody>
                {/* --------------first row--------------- */}
                {itemData?.map((item, index) => {
                  return (
                    <tr className=" text-center">
                      <td>{item?.itemdetails}</td>

                      <td>{item?.orderedquantity}</td>

                      <td>
                        <div className="row">
                          <div className="col">
                            <div class="input-group flex-nowrap ">
                              {item?.rate}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>{item?.challanquantity}</td>

                      <td>{item?.deliverdquantity}</td>
                      <td>{item?.shortquantity}</td>
                      <td>{item?.rejectedquantity}</td>
                      <td>{item?.netreceipt}</td>
                      <td>{item?.basevalue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-md-7  text-start">
              <div className="row">
                <b>Remarks</b>
                <br />
                {selectedObj?.remarks}
              </div>
            </div>

            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>subtotal</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {selectedObj?.subtotal}
                </div>
              </div>

              <div className="row">
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
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>
                    <b>Total</b>
                  </p>
                </div>
                <div className="col-md-6  text-end">
                  <b> ₹ {selectedObj?.total}</b>
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
                onClick={saveGrn}
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

export default Grn;
