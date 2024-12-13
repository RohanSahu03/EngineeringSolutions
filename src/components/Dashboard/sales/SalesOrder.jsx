import React, { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/dashboard/quotes.css";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
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
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Button from "react-bootstrap/Button";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";

function SalesOrder() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [expirydate, setExpiryDate] = useState(new Date());
  const [quoteDate, setQuoteDate] = useState(new Date());
  const [customers, setCustomers] = useState([]);
  const [quotedata,setQuotedata]=useState({})
  const [quotes, setQuotes] = useState('');
  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(0);
  const [cgsttax, setCgstTax] = useState(0);
  const [igsttax, setIgstTax] = useState(0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [customerId, setCustomerId] = useState("");
  const [reference, setReference] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");

  const [salesorder, setSalesOrder] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [salesordernumber, setSalesOrderNumber] = useState("");
  const [invoiced, setInvoiced] = useState("false");
  const [paymentstatus, setPaymentStatus] = useState("false");
  const [purchaseorder, setPurchaseOrder] = useState("");


  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => {
    setShow(true);
    getAllQuotation();
    getAllProduct();
    const salesnumber = generateUniqueQTString();
    setSalesOrderNumber(salesnumber);
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close dropdown after selecting an item
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
    const prefix = "SO-";
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

  useEffect(() => {
    getAllSalesOrder();
  }, []);

  const getAllQuotation = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/quotation/getquotation"
      );
      if (res.status === 201) {
        setCustomers(res.data);
        console.log('quote',res.data);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getAllQuotation();
  },[])

  const getAllProduct = async () => {
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

  // useMemo(() => {
  //   setSubtotal(
  //     itemData.reduce((accumulator, item) => {
  //       return accumulator + item.amount;
  //     }, 0)
  //   );
  // }, [itemData]);

  // useMemo(() => {
  //   setTotal(
  //     Number(subtotal) +
  //       Number(shippingChares) +
  //       Number(((subtotal * gsttax) / 100).toFixed(2))
  //   );
  // }, [subtotal, shippingChares, gsttax]);

  // const addItemData = () => [
  //   setItemData([
  //     ...itemData,
  //     {
  //       itemid: products?._id,
  //       itemdetails: products?.firstname,
  //       quantity: quantity,
  //       rate: products?.sellingprice,
  //       discount: discount,
  //       amount:
  //         DiscountUnit === "%"
  //           ? quantity * products.sellingprice -
  //             Number(
  //               (quantity * products.sellingprice * (discount / 100)).toFixed(2)
  //             )
  //           : quantity * products.sellingprice - discount,
  //       discountunit: DiscountUnit,
  //     },
  //   ]),
  //   setTotal(subtotal),
  // ];
  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item) => item.itemid !== id)]);
  };

  const formdata = new FormData();

  const saveSalesOrder = async () => {
    try {
      formdata.set("customername", customerId);
      formdata.set("salesorder", purchaseorder);
      formdata.set("reference", reference);
      formdata.set("quotenumber", quotes);
      formdata.set("quotedata", quoteDate);
      formdata.set("salesorderdate", startDate);
      formdata.set("expectedshipmentdate", expirydate);
      formdata.set("paymentterm", paymentterm);
      formdata.set("itemdetailsArray", JSON.stringify(itemData));
      formdata.set("subtotal", subtotal);
      formdata.set("sgsttax", gsttax);
      formdata.set("cgsttax", cgsttax);
      formdata.set("igsttax", igsttax);
      formdata.set("shippingcharges", shippingChares);
      formdata.set("total", total);
      // formdata.set("invoiced", invoiced);
      // formdata.set("paymentstatus", paymentstatus);

      const config = {
        url: "/createsalesorder",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/salesorder",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("sales order saved...");
        handleClose();
        saveQuoteNo()
        getAllSalesOrder();
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const [filteredArray, setFilteredArray] = useState([]);
  const getAllSalesOrder = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/salesorder/getsalesorder"
      );
      if (res.status === 201) {
        // console.log("data", res.data);
        setSalesOrder(res.data);
        let revdata = res.data.reverse()
        setFilteredArray(revdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSalesOrder = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/salesorder/deletesalesorder/${id}`
      );
      if (res.status === 201) {
        toast.success('Sales Order Deleted Successfully');
        getAllSalesOrder();
      }
      if (res.status === 404) {
        toast.warning('Sales Order Not Deleted');
      }
      if (res.status === 500) {
        toast.warning('Sales Order Not Deleted');
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

  const sortByDate = () => {
    setFilteredArray([
      ...salesorder?.sort(
        (a, b) => new Date(a.salesorderdate) - new Date(b.salesorderdate)
      ),
    ]);
  };
  const sortByName = () => {
    setFilteredArray([
      ...salesorder?.sort((a, b) =>
        a.customername?.customerfirstname.localeCompare(
          b.customername?.customerfirstname
        )
      ),
    ]);
  };
  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortByReference = () => {
    setFilteredArray([...salesorder?.sort((a, b) => a.reference - b.reference)]);
  };

  const sortByAmount = () => {
    setFilteredArray([...salesorder?.sort((a, b) => a.total - b.total)]);
  };

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Sales Order",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteSalesOrder(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  function handleFilter() {
    if (search != "") {
      const filterTable = salesorder.filter((o) =>
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
      setFilteredArray([...filterTable]);
    } else {
      // If search is empty, show all sales orders
      setFilteredArray([...salesorder]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  const [purchaseordernumber, setPurchaseOrderNo] = useState("");
  const saveQuoteNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/salesorder/createSoNo",
        { salesorder: purchaseorder }
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
        `https://engineeringsolutions.net.in/api/salesorder/getLastSoNo`
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
      newIndentNo = `SO${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = purchaseordernumber.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `SO${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setPurchaseOrder(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementQuoteNo();
  }, [purchaseordernumber]);

  return (
    <div>
      <ToastContainer />

      <div className="row border py-3 d-flex">
        <div className="col-md-4 col-4 d-flex justify-content-center ">
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
        <div className="col-md-4 col-4 offset-4 d-flex justify-content-end ">
          {/* < BsThreeDotsVertical className='menuDot'/> */}
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary d-inline"
              onClick={()=>{
                handleShow()
                getAllQuotation()
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
                <Dropdown.Item onClick={sortByReference}>
                  Reference
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
                <th className="text-center">SL.No</th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Sales Order#
                </th>
                <th scope="col" className="text-center">
                  Quote No.
                </th>
                <th scope="col" className="text-center">
                  Quote Date.
                </th>
                <th scope="col" className="text-center">
                  Reference #
                </th>

                <th scope="col" className="text-center">
                  Payment Term
                </th>
                <th className="text-center">Status</th>
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
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">
                          {formatDate(item.salesorderdate)}
                        </td>
                        <td className="text-center">{item.salesorder}</td>
                        <td className="text-center">{item.quotenumber}</td>
                        <td className="text-center">
                          {formatDate(item.quotedate)}
                        </td>
                        <td className="text-center">{item.reference}</td>
                        
                        <td className="text-center">{item.paymentterm}</td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">{item.total}</td>
                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/sales/salesorder/summary", {
                                state: item,
                              })
                            }
                          />
                          <FaEdit
                            onClick={() =>
                              navigate(
                                "/dashboard/sales/salesorder/editsalesorder",
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
                    <h6>There are no Sales Order.</h6>
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
          <Offcanvas.Title>New Sales Order</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
    

          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Sales Order# *
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                required
                value={purchaseorder}
              />
            </div>

            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Sales Order Date*
              </label>
            </div>
            <div className="col-md-4  text-start">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="textInput customDateInput"
                style={{ outline: "none" }}
                required
              />
            </div>
          </div>




      {/* ------quote---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Quotation No.
              </label>
            </div>
            <div className="col-md-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.quote}
                options={customers.filter(
                  (item) => item?.status=== "Approved"
                )}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  setCustomerId(value?.customername?._id);
                  // console.log('dat',value)
                  setQuotes(value?.quote)
                  setQuoteDate(value?.quotedate)
                  setReference(value?.reference)
                  setItemData(value?.itemdetailsArray)
                  setShippingCharges(value?.shippingcharges)
                  setCgstTax(value?.cgsttax)
                  setIgstTax(value?.igsttax)
                  setGstTax(value?.sgsttax)
                  setTotal(value?.total)
                  setSubtotal(value?.subtotal)
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
                            {option?.quote}
                          </Typography>

                        </div>
                      </div>
                    </Box>
                  </MenuItem>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Select Quote No." />
                )}
              />
             
            </div>

            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Quote Date
              </label>
            </div>
            <div className="col-md-4  text-start">
              <DatePicker
                selected={quoteDate}
                // onChange={(date) => setStartDate(date)}
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
                Reference
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={reference}
                // onChange={(e) => setReference(e.target.value)}
              />
            </div>
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Expected Shippment Date
              </label>
            </div>
            <div className="col-md-4  text-start">
              <DatePicker
                selected={expirydate}
                onChange={(date) => setExpiryDate(date)}
                minDate={new Date()}
                filterDate={() => isDateDisabled(new Date())}
                className="textInput customDateInput"
                style={{ outline: "none" }}
              />
            </div>
          </div>

      
          {/* ---------------------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Payment Term
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="form-select textInput"
                value={paymentterm}
                onChange={(e) => setPaymentTerm(e.target.value)}
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="paymentterm"
              >
                <option value={paymentterm || ""}>
                  {paymentterm || "Select Payment Term"}
                </option>
                <option value="Net-15">Net 15</option>
                <option value="Net-30">Net 30</option>
                <option value="Net-45">Net 45</option>
                <option value="Net-60">Net 60</option>
                <option value="Due end of the month" active>
                  Due end of the month
                </option>
                <option value="Due end of the next month" active>
                  Due end of the next month
                </option>
                <option value="Due on Receipt" active>
                  Due on Receipt
                </option>
              </select>
            </div>
          </div>

          {/* --------------item table------------- */}
          <div className="row mt-3 text-start">
            <h5 className="py-2 bg-secondary text-light">Item Table</h5>
          </div>

          {/* <div className="row mt-1 overflow-auto">
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Item Details</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
            
                <tr>
                  <td>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      getOptionLabel={(option) => option?.firstname}
                      options={product}
                      sx={{ width: 300 }}
                      onChange={(e, value) => setProducts(value)}
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
                                {option?.firstname}
                              </Typography>

                              <Typography variant="body2" color="textPrimary">
                                ₹&nbsp;{option?.sellingprice}
                              </Typography>
                            </div>
                            <div>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                className="text-end"
                              >
                                Stock on Hand&nbsp;
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textPrimary"
                                className="text-end"
                              >
                                {option?.stockonhand?.toFixed(2)}&nbsp;&nbsp;
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
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "150px", height: "57px" }}
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        setAmount(quantity * products.sellingprice);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "180px", height: "60px" }}
                      value={products?.sellingprice}
                      disabled
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
                          ? quantity * products?.sellingprice -
                            Number(
                              (
                                quantity *
                                products?.sellingprice *
                                (discount / 100)
                              ).toFixed(2)
                            )
                          : quantity * products?.sellingprice - discount
                      }
                    />
                  </td>
                  <td>
                    <FaPlusCircle onClick={addItemData} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <Table striped bordered hover>
                <thead>
                  <tr>
                  <th>Sl. No.</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Dicount</th>
                    <th>Amount</th>
                    <th>Action</th>
           
                  </tr>
                </thead>
                <tbody>
                  {itemData.map((item,index) => {
                    return (
                      <tr key={item.itemid}>
                        <td>{index+1}</td>
                        <td>{item.itemdetails}</td>
                        <td>{item.quantity}</td>
                        <td>{item.rate}</td>
                        <td>{item.discount}{item.discountunit}</td>
                        <td>{item.amount}</td>
                        <td>
                          <MdDeleteForever
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
                    {/* <input
                      type="text"
                      class="form-control"
                      placeholder="in rupees"
                      value={shippingChares}
                      onChange={(e) => {
                        setShippingCharges(e.target.value);
                        // setTotal(total + shippingChares);
                      }}
                    /> */}
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>{shippingChares}</p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4 col-4 text-start">
                  <small>SGST</small>
                </div>
                <div className="col-md-4 col-4">
                  <div class="input-group mb-3 formInput">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="in %"
                      value={gsttax}
                      disabled
                      // onChange={(e) => {
                      //   setGstTax(e.target.value);
                      //   setTotal((gsttax / 100) * total + total);
                      // }}
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
                      disabled
                      // onChange={(e) => {
                      //   setGstTax(e.target.value);
                      //   setTotal((gsttax / 100) * total + total);
                      // }}
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
                      disabled
                      // onChange={(e) => {
                      //   setGstTax(e.target.value);
                      //   setTotal((gsttax / 100) * total + total);
                      // }}
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
                  <h4>Total (₹)</h4>
                </div>
                <div className="col-md-6 col-6">
                  <h4>{total.toFixed(2)}</h4>
                </div>
              </div>
            </div>
            <div className="row g-3 ">
              <div className="col-md-6 col-3 ">
                <button
                  // type="submit"
                  class="btn btn-primary float-end"
                  onClick={saveSalesOrder}
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

export default SalesOrder;
