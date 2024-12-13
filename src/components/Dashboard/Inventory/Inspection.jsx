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

function Inspection() {
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(!show1);
  const target1 = useRef(null);
  const handleShow = () => {
    setShow1(true);
  };

  const navigate = useNavigate();

  const [rfq, setRfq] = useState("");
  // const [indentno, setIndentNo] = useState("");
  const [inspectionno, setInspectionNo] = useState("");
  const [inspectiondate, setInspectionDate] = useState(new Date());
  const [challandate, setChallanDate] = useState(new Date());
  const [challanno, setChallanNo] = useState("");
  const [pono, setPoNo] = useState("");
  const [podate, setPoDate] = useState(new Date());
  const [itemData, setItemData] = useState([]);
  const [lastno, setLastNo] = useState("");
  const [inspections, setInspections] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [indentdata, setIndentData] = useState([]);
  const [filteredArray, setFillteredArray] = useState([]);
  const [search, setSearch] = useState("");

  const [listofpo, setListOfPO] = useState([]);
  const [selectedObj, setSelectedObj] = useState({});
  const [indentdate, setIndentDate] = useState(new Date());

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

  const getAllPurchaseOrder = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/purchaseorder/getpurchaseorder"
      );
      if (res.status === 200) {
        // console.log("data", res.data);

        const revdata = res.data.reverse();
        setListOfPO(revdata);
        // setFillteredArray(revdata);
        // setFillteredArray(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getQuoteById = async (id) => {
  //   try {
  //     const res = await axios.get(
  //       `https://engineeringsolutions.net.in/api/purchasequotation/getQuoteByQuoteId/${id}`
  //     );
  //     if (res.status === 201) {
  //       setIndentNo(res.data[0].indentno);
  //     } else {
  //       alert("something went wrong");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useMemo(() => {
    console.log("selectedObj", selectedObj);
    setItemData(selectedObj?.itemdetailsArray);
    // getQuoteById(selectedObj?.quote);
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

  const saveInspection = async () => {
    try {
      const config = {
        url: "/createinspection",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/inventory",
        headers: { "content-type": "application/json" },
        data: {
          vendorname: selectedObj?.vendorname,
          inspectionno: inspectionno,
          inspectiondate: inspectiondate,
          challanno: challanno,
          challandate: challandate,
          pono: pono,
          podate: podate,
          itemdetailsArray: JSON.stringify(itemData),
          subtotal: subtotal,
          shippingcharges: selectedObj?.shippingcharges,
          sgsttax: selectedObj?.gsttax,
          cgsttax: selectedObj?.cgsttax,
          igsttax: selectedObj?.igsttax,
          total: total,
          status: "Pending",
          remarks: remarks,
        },
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Inspection saved...");
        handleClose();
        // savePoNo();
        saveInspectionNo();
        getAllInspection();
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

  const saveInspectionNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/inventory/createInspectionNo",
        { inspectionno: inspectionno }
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

  const getLastInspectionNo = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getLastInspectionNo"
      );
      if (res.status === 201) {
        // setPurchaseOrderNo(res.data.pono);
        setLastNo(res.data.inspectionno);
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
    getLastInspectionNo();
  }, []);

  const incrementInspectionNo = () => {
    const today = new Date();

    // Extract last 2 digits of the current year
    const year = inspectiondate.getFullYear().toString().slice(-2);

    // Get the current month (pad to 2 digits)
    const month = String(inspectiondate.getMonth() + 1).padStart(2, "0");

    // Get the current date (pad to 2 digits)
    const date = String(inspectiondate.getDate()).padStart(2, "0");

    // Extract the date part of the current indentnumber
    const currentIndentDatePart = lastno.slice(2, 8); // '240924' for example

    // Form the current date part (in the format YYMMDD)
    const currentDatePart = `${year}${month}${date}`;

    let newIndentNo;

    if (currentDatePart !== currentIndentDatePart) {
      // If the date part is different, reset the number part to '000001'
      newIndentNo = `IP${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = lastno.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `IP${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setInspectionNo(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementInspectionNo();
  }, [lastno]);

useMemo(()=>{
  incrementInspectionNo()
},[inspectiondate])


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
    getAllInspection();
  }, []);

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
            deleteInspection(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteInspection = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/inventory/deleteinspection/${id}`
      );
      if (res.status === 200) {
        toast.success("Inspection deleted");
        getAllInspection();
      }
      if (res.status === 500) {
        res.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    setSubtotal(
      itemData?.reduce((acc, data) => {
        return acc + Number(data.basevalue);
      }, 0)
    );
  }, [itemData]);

  useMemo(() => {
    setTotal(
      Number(subtotal) +
        Number(selectedObj?.shippingcharges) +
        Number(((selectedObj?.gsttax / 100) * subtotal).toFixed(2)) +
        Number(((selectedObj?.cgsttax / 100) * subtotal).toFixed(2)) +
        Number(((selectedObj?.igsttax / 100) * subtotal).toFixed(2))
    );
  }, [subtotal, selectedObj]);

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
                getAllPurchaseOrder();
                getLastInspectionNo();
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
                  Inspection Date
                </th>
                <th scope="col" className="text-center">
                  Inspection No.
                </th>
                <th scope="col" className="text-center">
                  Challan No.
                </th>
                <th scope="col" className="text-center">
                  Challan Date
                </th>
                <th scope="col" className="text-center">
                  PO No.
                </th>
                <th scope="col" className="text-center">
                  PO Date
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
                        <td className="text-center">
                          {formatDate(item.inspectiondate)}
                        </td>
                        <td className="text-center">{item.inspectionno}</td>
                        <td className="text-center">{item.challanno}</td>
                        <td className="text-center">
                          {formatDate(item.challandate)}
                        </td>
                        <td className="text-center">{item.pono}</td>
                        <td className="text-center">
                          {formatDate(item.podate)}
                        </td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/inventory/inspectionNote", {
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
                      CREATE NEW INSPECTION ENTRY
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
          <Offcanvas.Title>Inspection Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
                  Inspection No.
                </label>
              </div>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  required
                  onChange={(e) => setInspectionNo(e.target.value)}
                  value={inspectionno}
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
                  onChange={(date) => setInspectionDate(date)}
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
                  onChange={(date) => setChallanDate(date)}
                  // minDate={new Date()}
                  // filterDate={() => isDateDisabled(new Date())}
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
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  getOptionLabel={(option) => option?.purchaseorder}
                  options={listofpo.filter(
                    (item) => item.status === "Approved"
                  )}
                  sx={{ width: 300 }}
                  onChange={(e, value) => {
                    setSelectedObj(value);
                    setPoNo(value?.purchaseorder);
                    setPoDate(value?.date);
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
                              {option?.purchaseorder}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </MenuItem>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Select PO" />
                  )}
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

          {/* <div className="row mt-2 g-3 align-items-center">
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
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Item Name</th>

                  <th>Order Qty.</th>
                  <th>Rate</th>
                  <th>Challan Qty.</th>
                  <th>Delivered Qty.</th>
                  <th>Short Recv. Qty.</th>
                  <th>Rejected Qty.</th>
                  <th>Net Receipt</th>
                  <th>Item Base Value</th>
                </tr>
              </thead>
              <tbody>
                {/* --------------first row--------------- */}
                {itemData?.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          getOptionLabel={(option) => option?.itemdetails}
                          options={itemData}
                          sx={{ width: 250 }}
                          disabled
                          renderOption={(props, option) => (
                            <MenuItem></MenuItem>
                          )}
                          renderInput={(params) => (
                            <TextField {...params} label={item?.itemdetails} />
                          )}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          id="inputText"
                          className="form-control textInput"
                          style={{ width: "100px", height: "60px" }}
                          value={item?.quantity}
                          // onChange={(e) => setStockQuantity(e.target.value)}
                        />
                      </td>

                      <td>
                        <div className="row">
                          <div className="col">
                            <div class="input-group flex-nowrap ">
                              <input
                                type="number"
                                id="inputText"
                                className="form-control textInput"
                                style={{ width: "100px", height: "57px" }}
                                value={item?.rate}
                              />
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <input
                          type="number"
                          id="inputText"
                          className="form-control textInput"
                          style={{ width: "100px", height: "57px" }}
                          value={item?.challanquantity}
                          onChange={(e) => handleChallanQuantity(e, index)}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          id="inputText"
                          className="form-control textInput"
                          style={{ width: "100px", height: "57px" }}
                          value={item?.deliverdquantity}
                          onChange={(e) => handleDeliveredQuantity(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          id="inputText"
                          className="form-control textInput"
                          style={{ width: "100px", height: "57px" }}
                          value={item?.shortquantity}
                          onChange={(e) => handleShortQuantity(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          id="inputText"
                          className="form-control textInput"
                          style={{ width: "100px", height: "57px" }}
                          value={item?.rejectedquantity}
                          onChange={(e) => handleRejectedQuantity(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          id="inputText"
                          className="form-control textInput"
                          style={{ width: "100px", height: "57px" }}
                          value={item?.netreceipt}
                          onChange={(e) => handleNetReceipt(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          id="inputText"
                          className="form-control textInput"
                          style={{ width: "150px", height: "57px" }}
                          value={item?.basevalue}
                          // onChange={(e) => handleBaseValue(e,index)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-md-6  text-start">
              <div className="row">
                <b>Remarks</b>
                <Form.Control
                  as="textarea"
                  placeholder="remarks"
                  style={{ height: "150px" }}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4 col-4 text-start">
                  <h6>subtotal</h6>
                </div>
                <div className="col-md-4 col-4 "></div>
                <div className="col-md-4 col-4 text-end">₹ {subtotal}</div>
              </div>
              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>Shipping Charges</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput"></div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>₹{selectedObj?.shippingcharges}</p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>SGST</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput"></div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>
                    ₹
                    {Number(
                      ((subtotal * Number(selectedObj?.gsttax)) / 100).toFixed(
                        2
                      )
                    )}
                    &nbsp; {`(${selectedObj?.gsttax}%)`}
                  </p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>CGST</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput"></div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>
                    ₹
                    {Number(
                      ((subtotal * Number(selectedObj?.cgsttax)) / 100).toFixed(
                        2
                      )
                    )}
                    &nbsp; {`(${selectedObj?.cgsttax}%)`}
                  </p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>IGST</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput"></div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>
                    ₹
                    {Number(
                      ((subtotal * Number(selectedObj?.igsttax)) / 100).toFixed(
                        2
                      )
                    )}{" "}
                    &nbsp; {`(${selectedObj?.igsttax}%)`}
                  </p>
                </div>
              </div>

              <div className="row mt-2 border-top">
                <div className="col-md-6 col-6">
                  <h4>Total (₹)</h4>
                </div>
                <div className="col-md-6 col-6">
                  <h4>{total.toFixed(2)}</h4>
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
                onClick={saveInspection}
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

export default Inspection;
