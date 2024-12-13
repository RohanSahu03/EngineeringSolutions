import React, { useEffect, useMemo, useState, useRef } from "react";
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
import { IoMdSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Button from "react-bootstrap/Button";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { TiArrowSortedDown } from "react-icons/ti";
import Overlay from "react-bootstrap/Overlay";
import ReactPaginate from "react-paginate";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";

function Quotes() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [expirydate, setExpiryDate] = useState(new Date());
  const [text, setText] = useState("All Qutation");
  const [quote, setQuote] = useState("");
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState([]);
  const [rate,setRate]=useState(0)
  const [itemname,setItemName]=useState('')
  const [itemcode,setItemCode]=useState('')
  const [cgsttax,setCGstTax]=useState(0)
  const [igsttax,setIGstTax]=useState(0)
  const [purchaseorder, setPurchaseOrder] = useState("");
  const [termsandcondition, setTermsandCondition] = useState("");

  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [customerId, setCustomerId] = useState("");
  const [reference, setReference] = useState("");
  const [search, setSearch] = useState("");

  const [quotesdata, setQuotesData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => {
    setShow(true);
    getAllCustomer();
  };
  const [show1, setShow1] = useState(false);
  const target1 = useRef(null);
  const handleClose = () => setShow(false);
  const [productId, setProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [filteredArray, setFillteredArray] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close dropdown after selecting an item
    const quotenumber = generateUniqueNumber();
    setQuote(quotenumber);
  };

  //to genrate unique number
  function generateUniqueNumber() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomString = generateUniqueAlphanumeric(8); // Generate random alphanumeric string
    return timestamp + randomString;
  }

  //to generate generateUniqueAlphanumeric
  function generateUniqueAlphanumeric(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }
    return result;
  }

  // Function to disable past dates
  const isDateDisabled = (date) => {
    return startDate < new Date(); // Disable if date is before today
  };

  function generateUniqueQTString() {
    const prefix = "QT-";
    const maxLength = 6; // Adjust this to the desired length of the random part of the string
    let uniqueString = "";
    uniqueString = prefix + generateRandomString(maxLength);

    return uniqueString;
  }

  function generateRandomString(length) {
    const charset = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  const [purchaseordernumber, setPurchaseOrderNo] = useState("");
  const saveQuoteNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/quotation/createQuoteNo",
        { quotenumber: purchaseorder }
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

  const getLastQuoteNo = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/quotation/getLastQuoteNo`
      );
      if (res.status === 201) {
        setPurchaseOrderNo(res.data.quotenumber);

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
    getLastQuoteNo();
  }, []);

  const incrementQuoteNo = () => {
    const today = new Date();

    // Extract last 2 digits of the current year
    const year = startDate.getFullYear().toString().slice(-2);

    // Get the current month (pad to 2 digits)
    const month = String(startDate.getMonth() + 1).padStart(2, "0");

    // Get the current date (pad to 2 digits)
    const date = String(startDate.getDate()).padStart(2, "0");

    // Extract the date part of the current indentnumber
    const currentIndentDatePart = purchaseordernumber.slice(2, 8); // '240924' for example

    // Form the current date part (in the format YYMMDD)
    const currentDatePart = `${year}${month}${date}`;

    let newIndentNo;

    if (currentDatePart !== currentIndentDatePart) {
      // If the date part is different, reset the number part to '000001'
      newIndentNo = `QT${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = purchaseordernumber.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `QT${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setPurchaseOrder(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementQuoteNo();
  }, [purchaseordernumber]);

  useMemo(()=>{
    incrementQuoteNo();
  },[startDate])

  useEffect(() => {
    const quotenumber = generateUniqueQTString();
    setQuote(quotenumber);
    getAllQuotation();
  }, []);

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

  const getAllSalesProduct = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/salesitem/getproduct"
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

  useEffect(() => {
    getAllSalesProduct();
  }, []);
  const getProductById = async (id) => {
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
        Number(((subtotal * gsttax) / 100).toFixed(2)) +
        Number(((subtotal * cgsttax) / 100).toFixed(2)) +
        Number(((subtotal * igsttax) / 100).toFixed(2))
    );
  }, [subtotal, shippingChares, gsttax,cgsttax,igsttax]);

  const addItemData = () => [
    setItemData([
      ...itemData,
      {
        itemid: products?._id,
        itemcode:itemcode,
        itemdetails:itemname,
        quantity: quantity,
        rate: rate,
        discount: discount,
        amount:
          DiscountUnit === "%"
            ? quantity * rate-
              Number(
                (quantity * rate * (discount / 100)).toFixed(2)
              )
            : quantity * rate - discount,
        discountunit: DiscountUnit,
      },
    ]),
    setTotal(subtotal),
    setQuantity(1),
    setDiscount(0),
    setAmount(0),
    setRate(0)
  ];
  const deleteItemData = (index) => {
    setItemData([...itemData.filter((item, i) => i !== index)]);
  };

  const formdata = new FormData();

  const saveQuotation = async () => {
    formdata.set("customername", customerId);
    formdata.set("quote", purchaseorder);
    formdata.set("reference", reference);
    formdata.set("quotedate", startDate);
    formdata.set("expirydate", expirydate);
    formdata.set("itemdetailsArray", JSON.stringify(itemData));
    formdata.set("subtotal", subtotal);
    formdata.set("sgsttax", gsttax);
    formdata.set("cgsttax", cgsttax);
    formdata.set("igsttax", igsttax);
    formdata.set("shippingcharges", shippingChares);
    formdata.set("total", total);
    formdata.set("termsandconditions", termsandcondition);

    try {
      const config = {
        url: "/createquatation",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/quotation",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast("quotation saved...");
        handleClose();
        saveQuoteNo()
        getAllQuotation();
      } else {
        toast("something went wrong...");
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getAllQuotation = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/quotation/getquotation"
      );
      if (res.status === 201) {
        // console.log("data", res.data);
        setQuotesData(res.data);
        let revdata = res.data.reverse()
        setFillteredArray(revdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuote = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/quotation/deletequotation/${id}`
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        getAllQuotation();
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

  const sortByQuote = () => {
    setFillteredArray([...quotesdata.sort((a, b) => a.quote - b.quote)]);
  };
  const sortByAmount = () => {
    setFillteredArray([...quotesdata.sort((a, b) => a.total - b.total)]);
  };

  const sortByReference = () => {
    setFillteredArray([
      ...quotesdata.sort((a, b) => a.reference - b.reference),
    ]);
  };

  const sortByDate = () => {
    setFillteredArray([
      ...quotesdata.sort(
        (a, b) => new Date(a.quotedate) - new Date(b.quotedate)
      ),
    ]);
  };

  const sortByExpiryDate = () => {
    setFillteredArray([
      ...quotesdata.sort(
        (a, b) => new Date(a.expirydate) - new Date(b.expirydate)
      ),
    ]);
  };

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Quotation",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteQuote(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const filterInvoicedQuote = () => {
    setFillteredArray(
      quotesdata.filter((item) => {
        return item.status === "Invoiced";
      })
    );
    setShow1(!show1);
    setText("Invoiced Quotation");
  };

  const filterAllQuote = () => {
    setFillteredArray(quotesdata);
  };

  function handleFilter() {
    if (search != "") {
      const filterTable = quotesdata.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(search.toLowerCase())
        )
      );
      setFillteredArray([...filterTable]);
    } else {
      setFillteredArray([...quotesdata]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
            {text} <TiArrowSortedDown />
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
                    onClick={filterAllQuote}
                  >
                    All Quotation
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={filterInvoicedQuote}
                  >
                    Invoiced Quotation
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
              onClick={()=>{
                handleShow()
                getLastQuoteNo()
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
                {/* <Dropdown.Item onClick={sortByQuote}>
                  Quote Number
                </Dropdown.Item> */}
                <Dropdown.Item onClick={sortByReference}>
                  Reference
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByDate}>Quote Date</Dropdown.Item>
                <Dropdown.Item onClick={sortByExpiryDate}>
                  Expiry Date
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
                <th scope="col" className="text-center">
                  SL.No.
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Quote Number
                </th>
                <th scope="col" className="text-center">
                  Reference Number
                </th>
                <th scope="col" className="text-center">
                  Expiry Date
                </th>
                <th scope="col" className="text-center">
                  Status
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
                          <td className="text-center">
                            {formatDate(item.quotedate)}
                          </td>
                          <td className="text-center">{item.quote}</td>
                          <td className="text-center">{item.reference}</td>
                          <td className="text-center">
                            {formatDate(item.expirydate)}
                          </td>
                          <td className="text-center">{item.status}</td>
                          <td className="text-center">{item.total}</td>
                          <td className="text-center">
                            <FaEye
                              onClick={() =>
                                navigate("/dashboard/sales/quotes/summary", {
                                  state: item,
                                })
                              }
                            />{" "}
                            <FaEdit
                              onClick={() =>
                                navigate("/dashboard/sales/quotes/edit", {
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
        style={{ width: "1200px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Quotaion</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Customer Name
              </label>
            </div>
            <div className="col-md-5">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.customerfirstname}
                options={customers.filter(
                  (item) => item?.customerstatus === "Active"
                )}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  setCustomerId(value?._id);
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
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option value="">Select Customer</option>
                {customers.map((item)=>{
                  if(item?.customerstatus==='Active'){
                    return (
                      <option value={item?._id}>{item?.customerfirstname}</option>
                    );
                  }

                })
                }
              </select> */}
            </div>
          </div>

          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Quote*
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                required
                value={purchaseorder}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Quote Date*
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

              {/* ------Expiry date---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border-bottom pb-2">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Expiry Date*
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={expirydate}
                onChange={(date) => setExpiryDate(date)}
                minDate={startDate}
                filterDate={() => isDateDisabled(new Date())}
                className="textInput customDateInput"
                style={{ outline: "none" }}
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

          {/* ------quote date---------- */}
         

      

          {/* --------------item table------------- */}
          <div className="row mt-3 text-start">
            <h5 className="py-2 bg-secondary text-light">Item Table</h5>
          </div>

          <div className="row mt-1 overflow-auto">
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Item Details</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Discount</th>
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
                      getOptionLabel={(option) => option?.itemname}
                      options={product}
                      sx={{ width: 300 }}
                      onChange={(e, value) =>{ setProducts(value)
                        setItemName(value?.itemname)
                        setItemCode(value?.itemcode)
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
                                {option?.itemname}
                              </Typography>
                            </div>
                            <div>
                              
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
                        <TextField {...params} label="Item Details" />
                      )}
                    />
                  </td>

                  <td>
                    <input
                       type="number"
                       min={0}
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "150px", height: "57px" }}
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        setAmount(e.target.value * rate);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "180px", height: "60px" }}
                      value={rate}
                      onChange={(e)=>{
                        setRate(e.target.value)
                        setAmount(quantity*e.target.value)
                      }}
                
                    />
                  </td>

                  <td>
                    <div className="row">
                      <div className="col">
                        <div class="input-group flex-nowrap ">
                          <input
                            type="text"
                            id="inputText"
                            className="form-control textInput"
                            style={{ width: "130px", height: "57px" }}
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                          />
                          <span
                            class="input-group-text inputgrouptext"
                            id="addon-wrapping"
                          >
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={DiscountUnit}
                              style={{ height: "57px" }}
                            >
                              <MenuItem
                                value="%"
                                onClick={() => setDiscountUnit("%")}
                              >
                                %
                              </MenuItem>
                              <MenuItem
                                value="₹"
                                onClick={() => setDiscountUnit("₹")}
                              >
                                ₹
                              </MenuItem>
                            </Select>
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <input
                      type="text"
                      id="inputText"
                      disabled
                      className="form-control textInput"
                      style={{ width: "180px", height: "57px" }}
                      value={
                        !products || Object.keys(products)?.length === 0
                          ? 0
                          : DiscountUnit === "%"
                          ? quantity * rate -
                            Number(
                              (
                                quantity *
                                rate *
                                (discount / 100)
                              ).toFixed(2)
                            )
                          : quantity * rate - discount
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
              {itemData.length !== 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((item, index) => {
                      return (
                        <tr key={item.itemid}>
                          <td>{item.itemdetails}</td>
                          <td>{item.quantity}</td>
                          <td>{item.rate}</td>
                          <td>
                            {item.discount}&nbsp;{item?.discountunit}
                          </td>
                          <td>{item.amount}</td>
                          <td className="text-center">
                            <MdDeleteForever
                              onClick={() => deleteItemData(index)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* ---------button----------    */}
          <div className="row justify-content-center">
          <div className="col-md-6 mt-2">
              <b>Terms & Conditions</b>
              <Form.Control
                as="textarea"
                placeholder="terms & conditions"
                style={{ height: "150px" }}
                value={termsandcondition}
                onChange={(e) => setTermsandCondition(e.target.value)}
              />
            </div>

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
                  <small>Shipping Charges</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="in rupees"
                      value={shippingChares}
                      onChange={(e) => {
                        setShippingCharges(e.target.value);
                        // setTotal(total + shippingChares);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>₹{shippingChares}</p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>GST</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="in %"
                      value={gsttax}
                      onChange={(e) => {
                        setGstTax(e.target.value);
                        // setTotal((gsttax / 100) * total + total);
                      }}
                    />
                    {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>₹{(Number(gsttax/100)*subtotal).toFixed(2)}</p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>CGST</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="in %"
                      value={cgsttax}
                      onChange={(e) => {
                        setCGstTax(e.target.value);
                        // setTotal((gsttax / 100) * total + total);
                      }}
                    />
                    {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                <p>₹{(Number(cgsttax/100)*subtotal).toFixed(2)}</p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>IGST</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="in %"
                      value={igsttax}
                      onChange={(e) => {
                        setIGstTax(e.target.value);
                        // setTotal((gsttax / 100) * total + total);
                      }}
                    />
                    {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                <p>₹{(Number(igsttax/100)*subtotal).toFixed(2)}</p>
                </div>
              </div>

              <div className="row mt-2 border-top">
                <div className="col-md-6 col-6">
                  <h4>Total </h4>
                </div>
                <div className="col-md-6 col-6 text-end">
                  <h4>₹{total.toFixed(2)}</h4>
                </div>
              </div>
            </div>
            <div className="row g-3 ">
              <div className="col-md-6 col-3 ">
                <button
                  // type="submit"
                  class="btn btn-primary float-end"
                  onClick={saveQuotation}
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
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Quotes;
