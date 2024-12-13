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

import { Typography, Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function FundTransfer() {
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
  const [destination, setDestination] = useState("");
  const [destination1, setDestination1] = useState("");
  const [remarks, setRemarks] = useState("");
  const [despatchchallanno, setdespatchchallanno] = useState("");
  const [inquantity, setInQuantity] = useState(0);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => {
    setShow(true);
    getAllCustomer();
    getAllProduct();
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
  const [selectedDesc, setSelectedDesc] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [rate, setRate] = useState(0);
  const [lastno, setLastNo] = useState("");
  const [selectedOption, setSelectedOption] = useState("In");
  const [stock, setStock] = useState(0);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close dropdown after selecting an item
  };

  // Function to disable past dates
  const isDateDisabled = (date) => {
    return deliverychallandate < new Date(); // Disable if date is before today
  };

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
        "https://engineeringsolutions.net.in/api/purchaseitem/getproduct"
      );
      if (res.status === 201) {
        setProduct(res.data);
      } else {
        toast.error("something went wrong");
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

  useMemo(() => {
    setAmount(Number(inquantity) * Number(rate));
  }, [rate, inquantity]);

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
        itemcode: selectedCode,
        itemdetails: selectedDesc,
        stockquantity: stock,
        quantity: inquantity,
        rate: rate,
        amount: amount,
      },
    ]),
    setTotal(subtotal),
    setSelectedCode(""),
    setSelectedDesc(""),
    setQuantity(0),
    setInQuantity(0),
    setRate(0),
    setAmount(0),
  ];
  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item) => item.itemid !== id)]);
  };

  const saveDeliveryChallan = async () => {



    try {
      const config = {
        url: "/createStock",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/inventory",
        headers: { "content-type": "application/json" },
        data: {
          transfertype: selectedOption,
          stockno: despatchchallanno,
          stockdate: deliverychallandate,
          reference: reference,
          remarks: remarks,
          from: destination,
          to: destination1,
          itemdetailsArray: JSON.stringify(itemData),
          status: "Pending",
          total: total,
        },
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Transfer data saved...");
        handleClose();
        savedespatchchallanno();
        if(selectedOption==='In'){
          itemData?.map((item)=>{
            console.log('item',item)
            addStock(item?.itemcode,item?.quantity)
          })
          
        }
        if(selectedOption==='Out'){
          itemData?.map((item)=>{
            console.log('item',item)
            deductStock(item?.itemcode,item?.quantity)
          })
        }
        setItemData([]);
        getAllDeliveryChallan();
        setReference("");
        setRemarks("");
        setDestination("");
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDeliveryChallan = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getStock"
      );
      if (res.status === 200) {
        // console.log("data", res.data);
        setAllDeliveryChallan(res.data);
        let revdata = res.data.reverse();
        setFillteredArray(revdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDeliveryChallan = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/inventory/deletestock/${id}`
      );
      if (res.status === 200) {
        toast.success("Data Deleted..");
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

  const savedespatchchallanno = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/inventory/creatStockNo",
        { stockno: despatchchallanno }
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

  const getLastdespatchchallanno = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventory/getlaststockNo"
      );
      if (res.status === 201) {
        // setPurchaseOrderNo(res.data.pono);
        setLastNo(res.data.stockno);
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
    getLastdespatchchallanno();
  }, []);

  const incrementdespatchchallanno = () => {
    const today = new Date();

    // Extract last 2 digits of the current year
    const year = deliverychallandate.getFullYear().toString().slice(-2);

    // Get the current month (pad to 2 digits)
    const month = String(deliverychallandate.getMonth() + 1).padStart(2, "0");

    // Get the current date (pad to 2 digits)
    const date = String(deliverychallandate.getDate()).padStart(2, "0");

    // Extract the date part of the current indentnumber
    const currentIndentDatePart = lastno?.slice(2, 8); // '240924' for example

    // Form the current date part (in the format YYMMDD)
    const currentDatePart = `${year}${month}${date}`;

    let newIndentNo;

    if (currentDatePart !== currentIndentDatePart) {
      // If the date part is different, reset the number part to '000001'
      newIndentNo = `ST${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = lastno.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `ST${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setdespatchchallanno(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementdespatchchallanno();
  }, [lastno]);

  useMemo(() => {
    incrementdespatchchallanno();
  }, [deliverychallandate]);


  const addStock=async(productcode,inquantity)=>{
    try{
      const config = {
        url: "/updatestock",
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/purchaseitem",
        headers: { "content-type": "application/json" },
        data: {
          itemcode:productcode,
          quantity:inquantity
        },
      };
      const response = await axios(config);
      if(response.status===200){
        alert('stock updated')
      }
      else{
        alert('stock not updated')
      }
    }
    catch(error){
      console.error(error);
    }
  }

  const deductStock=async(productcode,inquantity)=>{
    try{
      const config = {
        url: "/deductstock",
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/purchaseitem",
        headers: { "content-type": "application/json" },
        data: {
          itemcode:productcode,
          quantity:inquantity
        },
      };
      const response = await axios(config);
      if(response.status===200){
        alert('stock updated')
      }
      else{
        alert('stock not updated')
      }
    }
    catch(error){
      console.error(error);
    }
  }


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
                getLastdespatchchallanno();
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
                  ST Number
                </th>
                <th scope="col" className="text-center">
                  Reference
                </th>
                <th scope="col" className="text-center">
                  Amount
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
                          {formatDate(item.stockdate)}
                        </td>
                        <td className="text-center">{item.stockno}</td>
                        <td className="text-center">{item.reference}</td>
                        <td className="text-center">{item.total}</td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">
                          <MdDeleteForever
                            onClick={() => confirmalert(item._id)}
                          />{" "}
                          {/* <FaEdit
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              navigate(
                                "/dashboard/sales/deliverychallan/editdeliverychallan",
                                {
                                  state: item,
                                }
                              )
                            }
                          /> */}
                          <FaEye
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              navigate(
                                "/dashboard/inventory/stock/summary",
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
        style={{ width: "1500px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Stock Transfer</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Transfer Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="In"
                control={<Radio />}
                label="In"
                checked={selectedOption === "In"}
                onChange={handleRadioChange}
              />
              <FormControlLabel
                value="Out"
                control={<Radio />}
                label="Out"
                checked={selectedOption === "Out"}
                onChange={handleRadioChange}
              />
            </RadioGroup>
          </FormControl>
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                STN No.
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                required
                value={despatchchallanno}
              />
            </div>
          </div>

          {/* ------quote date---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                STN Date*
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

          {/* ------refrence---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Transfer From
              </label>
            </div>
            <div className="col-md-5">
              <Form.Control
                as="textarea"
                placeholder="from"
                style={{ height: "100px" }}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* ------refrence---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Transfer To
              </label>
            </div>
            <div className="col-md-5">
              <Form.Control
                as="textarea"
                placeholder="to"
                style={{ height: "100px" }}
                value={destination1}
                onChange={(e) => setDestination1(e.target.value)}
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
                  <th scope="col">Description</th>
                  <th scope="col">Stock Qty.</th>
                  <th scope="col">
                    {selectedOption === "In" ? <>In Qty.</> : <>Out Qty.</>}
                  </th>
                  <th scope="col">Rate</th>
                  <th scope="col">Amount</th>
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
                      getOptionLabel={(option) => option?.itemcode}
                      options={product}
                      sx={{ width: 300 }}
                      onChange={(e, value) => {
                        setProducts(value);
                        console.log("val", value);
                        setSelectedDesc(value?.itemname);
                        setSelectedCode(value?.itemcode);
                        setStock(value?.quantity);
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
                            <div>
                              <Typography variant="body1">
                                {option?.itemcode}
                              </Typography>
                            </div>
                            <div>
                              {/* <Typography
                                variant="body2"
                                color="textPrimary"
                                className="text-end"
                              >
                                Stock on Hand&nbsp;
                              </Typography> */}
                              {/* <Typography
                                variant="body2"
                                color="textPrimary"
                                className="text-end"
                              >
                                {option?.stockonhand?.toFixed(2)}&nbsp;&nbsp;
                                {option?.unit}
                              </Typography> */}
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
                      value={selectedDesc}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "150px", height: "57px" }}
                      min={0}
                      value={stock}
                      //   onChange={(e) => {
                      //     setQuantity(e.target.value);
                      //   }}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "150px", height: "57px" }}
                      min={0}
                      value={inquantity}
                      onChange={(e) => {
                        setInQuantity(e.target.value);
                      }}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "180px", height: "60px" }}
                      value={rate}
                      min={0}
                      onChange={(e) => {
                        setRate(e.target.value);
                      }}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      id="inputText"
                      disabled
                      className="form-control textInput"
                      style={{ width: "180px", height: "57px" }}
                      value={amount}
                    />
                  </td>
                  <td>
                    <FaPlusCircle className="fs-5" onClick={addItemData} />
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
                    <th scope="col">Item details</th>
                    <th scope="col">Description</th>
                    <th scope="col">Stock Qty.</th>
                    <th scope="col">
                      {selectedOption === "In" ? <>In Qty.</> : <>Out Qty.</>}
                    </th>
                    <th scope="col">Rate</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {itemData.map((item) => {
                    return (
                      <tr key={item.itemid}>
                        <td>{item.itemcode}</td>
                        <td>{item.itemdetails}</td>
                        <td>{item.stockquantity}</td>
                        <td>{item.quantity}</td>
                        <td>{item.rate}</td>
                        <td>{item.amount}</td>
                        <td>
                          <MdDeleteForever
                            className="fs-5"
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
            <div className="col-md-6">
              <b>Remarks</b>
              <Form.Control
                as="textarea"
                placeholder="remarks"
                style={{ height: "150px" }}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <div className="col-md-6 p-md-5 p-2 mt-2">
              <div className="row mt-2">
                <div className="col-md-6 text-end">
                  <h5>Total (₹)</h5>
                </div>
                <div className="col-md-6 text-end">
                  <h4>{total.toFixed(2)}</h4>
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

export default FundTransfer;
