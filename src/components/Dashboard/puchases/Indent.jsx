import React, { useState, useRef, useEffect, useMemo } from "react";
// import Button from "react-bootstrap/Button";
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

function Indent() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);
  const handleShow = () => {
    setShow(true);
  };

  const [show1, setShow1] = useState(false);
  const target1 = useRef(null);

  const [indentno, setIndentNo] = useState("");
  const [startdate, setStartDate] = useState(new Date());
  const [requiredDate, setRequiredDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [stockquantity, setStockQuantity] = useState(0);
  const [quantityrequired, setQuantityRequired] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("Pending");
  const [itemData, setItemData] = useState([]);

  const [indentdata, setIndentData] = useState([]);
  const [filteredArray, setFillteredArray] = useState([]);
  const [search, setSearch] = useState("");

  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [indentnumber, setIndentNumber] = useState("");

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Quotation",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteIndent(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const getLastIndentNo = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/indent/getLastIndentNo`
      );
      if (res.status === 201) {
        setIndentNumber(res.data.indentno);
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
    getLastIndentNo();
  }, []);


  const incrementIndentNo = () => {
    const today = new Date();

    // Extract last 2 digits of the current year
    const year = startdate.getFullYear().toString().slice(-2);

    // Get the current month (pad to 2 digits)
    const month = String(startdate.getMonth() + 1).padStart(2, "0");

    // Get the current date (pad to 2 digits)
    const date = String(startdate.getDate()).padStart(2, "0");

    // Extract the date part of the current indentnumber
    const currentIndentDatePart = indentnumber.slice(2, 8); // '240924' for example

    // Form the current date part (in the format YYMMDD)
    const currentDatePart = `${year}${month}${date}`;

    let newIndentNo;

    if (currentDatePart !== currentIndentDatePart) {
      // If the date part is different, reset the number part to '000001'
      newIndentNo = `IN${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = indentnumber.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `IN${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setIndentNo(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementIndentNo();
  }, [indentnumber]);

  const deleteIndent = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/indent/deleteIndentById/${id}`
      );
      if (res.status === 200) {
        toast.success("Indent deleted Successfully..");
        getAllIndent();
      }
      if (res.status === 404) {
        toast(res.data.message);
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

  const addItemData = () => [
    setItemData([
      ...itemData,
      {
        itemname: product?.itemname,
        unit: product?.unit,
        stockquantity: stockquantity,
        quantityrequired: quantityrequired,
        remarks: remarks,
      },
    ]),
  ];

  useMemo(()=>{
    incrementIndentNo()
   },[startdate])
    

  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item, index) => index !== id)]);
  };
  const getAllItems = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/purchaseitem/getproduct"
      );
      if (res.status === 201) {
        setProducts(res.data);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllIndent = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/indent/getIndent"
      );
      if (res.status === 201) {
        setIndentData(res.data);
        const revdata = res.data.reverse();
        setFillteredArray(revdata);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveIndentNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/indent/createIndentNo",
        { indentno: indentno }
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

  useEffect(() => {
    getAllItems();
    getAllIndent();
  }, []);

  const formdata = new FormData();
  const saveIndent = async (e) => {
    e.preventDefault();

    if (itemData?.length === 0) {
      return toast.warning("Please add some product");
    }

    formdata.set("indentno", indentno);
    formdata.set("indentdate", startdate);
    formdata.set("requireddate", requiredDate);
    formdata.set("indentItems", JSON.stringify(itemData));
    formdata.set("status", status);

    try {
      const config = {
        url: "/createIndent",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/indent",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast("Indent Saved...");
        handleClose();
        saveIndentNo();
        getAllIndent();
        setIndentNo("");
        setItemData([]);
      } else {
        toast("something went wrong...");
      }
    } catch (error) {
      alert("something went wrong");
    }
  };

  function handleFilter() {
    if (search != "") {
      const filterTable = indentdata.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(search.toLowerCase())
        )
      );
      setFillteredArray([...filterTable]);
    } else {
      setFillteredArray([...indentdata]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

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
          <Overlay target={target1.current} show={show1} placement="bottom">
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
                getLastIndentNo();
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
                  Indent Date
                </th>
                <th scope="col" className="text-center">
                  Indent No.
                </th>
                <th scope="col" className="text-center">
                  Required By
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
                    ?.slice(pagesVisited, pagesVisited + usersPerPage)
                    ?.map((item, index) => {
                      return (
                        <tr>
                          <td className="text-center">
                            {index + 1 + usersPerPage * pageNumber}
                          </td>
                          <td className="text-center">
                            {formatDate(item?.indentdate)}
                          </td>
                          <td className="text-center">{item.indentno}</td>
                          <td className="text-center">
                            {formatDate(item?.requireddate)}
                          </td>
                          <td className="text-center">{item.status}</td>
                          <td className="text-center">
                            <FaEye
                              onClick={() =>
                                navigate("/dashboard/indent/summary", {
                                  state: item,
                                })
                              }
                            />{" "}
                            <FaEdit
                              onClick={() =>
                                navigate("/dashboard/indent/edit", {
                                  state: item,
                                })
                              }
                              style={{ marginLeft: "10px" }}
                            />
                            {"  "}
                            <MdDeleteForever
                              onClick={() => confirmalert(item._id)}
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
          <Offcanvas.Title>New Indent</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form class="row g-3 needs-validation" novalidate>
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
                    disabled
                    //   onChange={handleChange}
                    value={indentno}
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
                    selected={startdate}
                    onChange={(date) => setStartDate(date)}
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
                    Required By Date
                  </label>
                </div>
                <div className="col-md-8">
                  <DatePicker
                    selected={requiredDate}
                    onChange={(date) => setRequiredDate(date)}
                    // minDate={startdate}
                    // filterDate={() => isDateDisabled(new Date())}
                    className="textInput customDateInput"
                    style={{ outline: "none" }}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex">
                {/* <div className="col-md-3 offset-1">
                <label for="inputText" className="col-form-label label">
           Indent Date
                </label>
              </div>
              <div className="col-md-8">
              <DatePicker
                selected={startdate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                // filterDate={() => isDateDisabled(new Date())}
                className="textInput customDateInput"
                style={{ outline: "none" }}
                required
              />
              </div> */}
              </div>
            </div>

            <div className="row mt-3 text-start">
              <h5 className="py-2 bg-secondary text-light">Item Table</h5>
            </div>

            <div className="row mt-1 overflow-auto">
              <table class="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Item Name</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Stock Qty.</th>
                    <th scope="col">Quantity Required</th>
                    <th scope="col">Remarks</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* --------------first row--------------- */}
                  <tr>
                    <td>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        getOptionLabel={(option) => option?.itemname}
                        options={products}
                        sx={{ width: 300 }}
                        onChange={(e, value) => setProduct(value)}
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
                                  {option?.itemname}
                                </Typography>

                                <Typography variant="body2" color="textPrimary">
                                  {option?.hsncode}
                                </Typography>
                              </div>
                              <div>
                                <Typography
                                  variant="body2"
                                  color="textPrimary"
                                  className="text-end"
                                >
                                  unit
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textPrimary"
                                  className="text-end"
                                >
                                  {option?.unit}
                                </Typography>
                              </div>
                            </Box>
                          </MenuItem>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Item" />
                        )}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "150px", height: "57px" }}
                        value={product?.unit}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "180px", height: "60px" }}
                        value={stockquantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
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
                              style={{ width: "130px", height: "57px" }}
                              value={quantityrequired}
                              onChange={(e) =>
                                setQuantityRequired(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "180px", height: "57px" }}
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
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
                      <th>Sl.No.</th>
                      <th>Item Name</th>
                      <th>Unit</th>
                      <th>Stock Qty.</th>
                      <th>Quantity Required</th>
                      <th>Remarks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((item, index) => {
                      return (
                        <tr key={item?._id}>
                          <td>{index + 1}</td>
                          <td>{item.itemname}</td>
                          <td>{item.unit}</td>
                          <td>{item?.stockquantity}</td>
                          <td>{item.quantityrequired}</td>
                          <td>{item.remarks}</td>
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

            <div className="row g-3 ">
              <div className="col-md-6 col-3 ">
                <button
                  // type="submit"
                  class="btn btn-primary float-end"
                  onClick={(e) => saveIndent(e)}
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
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Indent;
