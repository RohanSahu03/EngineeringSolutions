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

function Gin() {
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow1(!show1);
  const target1 = useRef(null);
  const handleShow = () => {
    setShow1(true);
  };

  const navigate = useNavigate();

  const [rfq, setRfq] = useState("");
  const [ginno, setGinNo] = useState("");
  const [gindate, setGinDate] = useState(new Date());
const [issuedto,setIssuedTo]=useState('')
const [issuedfor,setIssuedFor]=useState('')
const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
const[requiredquantity,setRequiredQuantity]=useState(0)
const[issuedquantity,setIssuedQuantity]=useState(0)
const [amount,setAmount]=useState(0)
const [rate,setRate]=useState(0)
const [remarks,setRemarks]=useState('')


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

  useMemo(()=>{
    setAmount(
        Number(rate)*Number(issuedquantity)
    )
  },[rate,issuedquantity])

  const addItemData = () => [
    setItemData([
      ...itemData,
      {
        itemdetails: product?.itemcode,
        unit: product?.unit,
        rate: rate,
        orderedquantity: requiredquantity,
        issuedquantity: issuedquantity,
        amount:amount
      },
    ]),

    setRate(0),
    setRequiredQuantity(0),
    setIssuedQuantity(0),
    setAmount(0)
  ];

  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item, index) => index !== id)]);
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
  }, [selectedObj]);



  const saveGin = async () => {

    if(!issuedto || !issuedfor){
        toast.warning('Please enter all the fields')
        return;
    }
    if(
        itemData.length===0
    ){
        toast.warning('Please add items to the GIN')
        return;
    }

    try {
      const config = {
        url: "/creategin",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/inventory",
        headers: { "content-type": "application/json" },
        data: {
          ginno: ginno,
          gindate: gindate,
          issuedto:issuedto,
          issuedfor:issuedfor,
          itemdetailsArray: JSON.stringify(itemData),
          status: "Pending",
          remarks:remarks
        },
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("GIN saved...");
        handleClose();
        saveGinNo()
        getAllGin()
        setItemData([]);
        setIssuedFor('')
        setIssuedTo('')
        setItemData([])

      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const saveGinNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/inventory/createGinNo",
        { ginno: ginno }
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

  const getLastGinNo = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getLastGinNo"
      );
      if (res.status === 201) {
        // setPurchaseOrderNo(res.data.pono);
        setLastNo(res.data.ginno);
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
    getLastGinNo();
  }, []);

  const incrementGINNo = () => {
    const today = new Date();

    // Extract last 2 digits of the current year
    const year = gindate.getFullYear().toString().slice(-2);

    // Get the current month (pad to 2 digits)
    const month = String(gindate.getMonth() + 1).padStart(2, "0");

    // Get the current date (pad to 2 digits)
    const date = String(gindate.getDate()).padStart(2, "0");

    // Extract the date part of the current indentnumber
    const currentIndentDatePart = lastno.slice(2, 8); // '240924' for example

    // Form the current date part (in the format YYMMDD)
    const currentDatePart = `${year}${month}${date}`;

    let newIndentNo;

    if (currentDatePart !== currentIndentDatePart) {
      // If the date part is different, reset the number part to '000001'
      newIndentNo = `GI${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = lastno.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `GI${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setGinNo(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementGINNo();
  }, [lastno]);


  useMemo(()=>{
    incrementGINNo()
  },[gindate])


  useEffect(() => {
    getAllGin();
  }, []);

  const getAllGin = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getgin"
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
            deleteGin(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteGin = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/inventory/deletegin/${id}`
      );
      if (res.status === 200) {
        toast.success("GIN deleted");
        getAllGin();
      }
      if (res.status === 500) {
        res.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
                getAllItems()
                getAllGin();
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
                  GIN No.
                </th>
                <th scope="col" className="text-center">
                  GIN Date
                </th>
                <th scope="col" className="text-center">
                Issued To
                </th>
                <th scope="col" className="text-center">
                  Issued For
                </th>
                <th scope="col" className="text-center">
               Remarks
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
                        <td className="text-center">{item.ginno}</td>
                        <td className="text-center">
                          {formatDate(item.gindate)}
                        </td>
                        <td className="text-center">{item.issuedto}</td>
                        <td className="text-center">
                          {item.issuedfor}
                        </td>
                        <td className="text-center">{item.remarks}</td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/inventory/ginsummary", {
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
              <div className="container "></div>
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
          <Offcanvas.Title>GIN Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="row mt-2 g-3 align-items-center">
            <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                <label for="inputText" className="col-form-label label">
                  GIN No.
                </label>
              </div>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  required
                  onChange={(e) => setGinNo(e.target.value)}
                  value={ginno}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="col-md-3 offset-1">
                <label for="inputText" className="col-form-label label">
                  GIN Date
                </label>
              </div>
              <div className="col-md-8">
                <DatePicker
                  selected={gindate}
                  onChange={(date) => setGinDate(date)}
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
                  Issued To.
                </label>
              </div>
              <div className="col-md-8 ">
                <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  required
                  onChange={(e) => setIssuedTo(e.target.value)}
                  value={issuedto}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="col-md-3 offset-1">
                <label for="inputText" className="col-form-label label">
                 Item Issued For
                </label>
              </div>
              <div className="col-md-8">
              <input
                  type="text"
                  id="inputText"
                  name="indentno"
                  className="form-control textInput"
                  required
                  onChange={(e) => setIssuedFor(e.target.value)}
                  value={issuedfor}
                />
              </div>
            </div>
          </div>


          <div className="row mt-3 overflow-auto">
            <table className="table table-striped ">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" >
                    Item Name
                  </th>

                  <th >Unit</th>
                  <th>Rate</th>
                  <th >Required Qty.</th>
                  <th >Issue Qty.</th>
                  <th >Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* --------------first row--------------- */}
                <tr className="text-center">
                    <td className="text-center">
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        getOptionLabel={(option) => option?.itemcode}
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
                                  {option?.itemcode}
                                </Typography>

                                <Typography variant="body2" color="textPrimary">
                                  {option?.itemname}
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

                    <td className="text-center">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "150px", height: "57px" }}
                        value={product?.unit}
                      />
                    </td>

                    <td className="text-center">
                      <input
                        type="number"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "180px", height: "60px" }}
                        value={rate}
                        onChange={(e)=>{setRate(e.target.value)}}
                       
                      />
                    </td>

                    <td className="text-center">
                      <input
                        type="number"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "180px", height: "60px" }}
                        value={requiredquantity}
                        onChange={(e) => setRequiredQuantity(e.target.value)}
                      />
                    </td>

                    <td className="text-center">
                      <div className="row">
                        <div className="col">
                          <div class="input-group flex-nowrap ">
                            <input
                              type="number"
                              id="inputText"
                              className="form-control textInput"
                              style={{ width: "130px", height: "57px" }}
                              value={issuedquantity}
                              onChange={(e) =>
                                setIssuedQuantity(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      <input
                        type="number"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "180px", height: "57px" }}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </td>
                    <td className="text-center fs-5">
                      <FaPlusCircle 
                      onClick={addItemData}
                       />
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>

          <div className="row">
              <div className="col-md-12">
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th className="text-center">Sl.No.</th>
                      <th className="text-center">Item Name</th>
                      <th className="text-center">Unit</th>
                      <th className="text-center">Rate</th>
                      <th className="text-center">Quantity Required</th>
                      <th className="text-center">Issued Qty.</th>
                      <th className="text-center">Amount</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((item, index) => {
                      return (
                        <tr key={item?._id} className="text-center">
                          <td>{index + 1}</td>
                          <td>{item.itemdetails}</td>
                          <td>{item.unit}</td>
                          <td>{item?.rate}</td>
                          <td>{item.orderedquantity}</td>
                          <td>{item.issuedquantity}</td>
                          <td>{item.amount}</td>
                          <td className="fs-5">
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
                <div className="col-md-4">
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


          <div className="row g-3 ">
            <div className="col-md-6 col-3 ">
              <button
                type="button"
                // type="submit"
                class="btn btn-primary float-end"
                onClick={saveGin}
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

export default Gin;
