import React, { useEffect, useMemo, useState, useRef } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/dashboard/quotes.css";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TiPlus } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Overlay from "react-bootstrap/Overlay";
import { TiArrowSortedDown } from "react-icons/ti";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";

function SalesOrder() {
  const navigate = useNavigate();

  const [invoicedate, setInvoiceDate] = useState(new Date());
  const [duedate, setDueDate] = useState(new Date());
  const [rate, setRate] = useState("");
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [customerId, setCustomerId] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");

  const [invoices, setInvoices] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [ordernumber, setOrderNumber] = useState("");

  const [show, setShow] = useState(false);
  const [filterdInvoice, setFilteredInvoice] = useState([]);

  const handleShow = () => {
    setShow(true);
    getAllCustomer();
    getAllProduct();
    const invoicenumber = generateUniqueQTString();
    setInvoiceNumber(invoicenumber);
  };
  const handleClose = () => setShow(false);

  const target2 = useRef(null);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  // const handleShow2 = () => setShow2(true);

  // const handleItemClick = (item) => {
  //   setSelectedItem(item);
  //   setIsOpen(false); // Close dropdown after selecting an item
  // };

  // const calculateDueDate =
  useMemo(() => {
    if (paymentterm === "Net-15") {
      setDueDate(invoicedate + 15);
    }
  }, [paymentterm]);

  // Function to disable past dates
  const isDateDisabled = (date) => {
    return invoicedate < new Date(); // Disable if date is before today
  };

  function generateUniqueQTString() {
    const prefix = "INV-";
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
    getAllInvoices();
  }, []);

  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filterdInvoice.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
        Number(((subtotal * gsttax) / 100).toFixed(2))
    );
  }, [subtotal, shippingChares, gsttax]);

  const addItemData = () => [
    setItemData([
      ...itemData,
      {
        itemid: products?._id,
        itemdetails: products?.firstname,
        quantity: quantity,
        rate: products?.sellingprice,
        discount: discount,
        amount:
          DiscountUnit === "%"
            ? quantity * products.sellingprice -
              Number(
                (quantity * products.sellingprice * (discount / 100)).toFixed(2)
              )
            : quantity * products.sellingprice - discount,
        discountunit: DiscountUnit,
      },
    ]),
    setTotal(subtotal),
  ];
  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item) => item.itemid !== id)]);
  };

  const formdata = new FormData();

  const saveInvoice = async () => {
    if (!customerId) {
      toast.warning("Please select customer name");
      return;
    }
    if (!invoicenumber) {
      toast.warning("Please enter invoice number");
      return;
    }
    if (!ordernumber) {
      toast.warning("Please enter order number");
      return;
    }
    if (!paymentterm) {
      toast.warning("Please select payment term");
      return;
    }
    if (itemData.length === 0) {
      toast.warning("Please select product");
      return;
    }

    formdata.set("customername", customerId);
    formdata.set("invoice", invoicenumber);
    formdata.set("ordernumber", ordernumber);
    formdata.set("invoicedate", invoicedate);
    formdata.set("duedate", duedate);
    formdata.set("terms", paymentterm);
    formdata.set("itemdetailsArray", JSON.stringify(itemData));
    formdata.set("subtotal", subtotal);
    formdata.set("gsttax", gsttax);
    formdata.set("shippingcharges", shippingChares);
    formdata.set("total", total);
    // formdata.set("invoiced", invoiced);
    // formdata.set("paymentstatus", paymentstatus);

    try {
      const config = {
        url: "/createinvoice",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/invoices",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Invoice Saved...");
        handleClose();
        getAllInvoices();
        itemData.map((item) => {
          updateStock(item?.itemid, item?.quantity);
        });
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const updateStock = async (id, data) => {
    try {
      let config = {
        url: `updatestock/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/products",
        headers: { "content-type": "application/json" },
        data: { stockonhand: data },
      };
      const res = await axios(config);
      if (res.status === 200) {
        console.log("data updated..");
      }

      if (res.status === 404) {
        console.log("data not found..");
      }
      if (res.status === 500) {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInvoices = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/invoices/getinvoice"
      );
      if (res.status === 201) {
        // console.log("data", res.data);
        setInvoices(res.data);
        setFilteredInvoice(res.data);
      }
      if (res.status === 500) {
        // console.log("data", res.data);
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInvoice = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/invoices/deleteinvoice/${id}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getAllInvoices();
      }
      if (res.status === 404) {
        toast.warning(res.data.message);
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
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

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Invoice",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteInvoice(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const showAllInvoice = () => {
    setFilteredInvoice(invoices);
    handleClose2();
  };

  const showPaidInvoice = () => {
    setFilteredInvoice(invoices.filter((item) => item.status === "Paid"));
    handleClose2();
  };

  const showUnPaidInvoice = () => {
    setFilteredInvoice(
      invoices.filter((item) => {
        return item.status === "Unpaid" || item.status === "Partially Paid";
      })
    );
    handleClose2();
  };

  const showPartiallyPaidInvoice = () => {
    setFilteredInvoice(
      invoices.filter((item) => item.status === "Partially Paid")
    );
    handleClose2();
  };

  const sortByInvoice = () => {
    setFilteredInvoice([
      ...invoices.sort((a, b) => a.invoice.localeCompare(b.invoice)),
    ]);
  };

  const sortByOrderNumber = () => {
    setFilteredInvoice([
      ...invoices.sort((a, b) => a.ordernumber - b.ordernumber),
    ]);
  };
  const sortByCustomerName = () => {
    setFilteredInvoice([
      ...invoices.sort((a, b) =>
        a.customername.customerfirstname.localeCompare(
          b.customername.customerfirstname
        )
      ),
    ]);
  };
  const sortByAmount = () => {
    setFilteredInvoice([...invoices.sort((a, b) => a.total - b.total)]);
  };

  const sortByDueAmmount = () => {
    setFilteredInvoice([...invoices.sort((a, b) => a.dueamount - b.dueamount)]);
  };

  //calulate due date based on payment term
  const calculateDueDate = (invoiceDate, term) => {
    if (!invoiceDate) return null;

    const date = new Date(invoiceDate);
    let daysToAdd = 0;

    switch (term) {
      case "Net-15":
        daysToAdd = 15;
        break;
      case "Net-30":
        daysToAdd = 30;
        break;
      case "Net-45":
        daysToAdd = 45;
        break;
      case "Net-60":
        daysToAdd = 60;
        break;
      case "Due end of the month":
        // Set to the last day of the month
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date;
      case "Due end of the next month":
        // Set to the last day of the next month
        date.setMonth(date.getMonth() + 2);
        date.setDate(0);
        return date;
      case "Due on Receipt":
        return invoiceDate; // Due date is the same as invoice date
      case "Custome":
        return invoiceDate;
      default:
        return null;
    }

    date.setDate(date.getDate() + daysToAdd);
    return date;
  };

  useEffect(() => {
    if (invoicedate && paymentterm) {
      const newDueDate = calculateDueDate(invoicedate, paymentterm);
      setDueDate(newDueDate);
    }
  }, [invoicedate, paymentterm]);

  return (
    <div>
      <ToastContainer />
      <div className="row border py-3 d-flex ">
        <div className="col-md-6 col-6">
          <Button
            variant="transparent"
            className="float-start"
            ref={target2}
            onClick={() => setShow2(!show2)}
          >
            All Invoices
            <TiArrowSortedDown />
          </Button>
          <Overlay target={target2.current} show={show2} placement="bottom">
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
                    onClick={showAllInvoice}
                  >
                    All
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={showPaidInvoice}
                  >
                    Paid
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={showPartiallyPaidInvoice}
                  >
                    Partially Paid
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={showUnPaidInvoice}
                  >
                    Unpaid
                  </li>
                </ul>
              </div>
            )}
          </Overlay>
        </div>
        <div className="col-md-6 col-6 d-flex justify-content-end">
          {/* < BsThreeDotsVertical className='menuDot'/> */}
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary d-inline"
              onClick={handleShow}
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
                <Dropdown.Item onClick={sortByInvoice}>
                  Invoice Number
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByOrderNumber}>
                  Order Number
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByCustomerName}>
                  Customer Name
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByAmount}>Amount</Dropdown.Item>
                <Dropdown.Item onClick={sortByDueAmmount}>
                  Balance Due
                </Dropdown.Item>
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
                  Invoice No.
                </th>
                <th scope="col" className="text-center">
                  Order No.
                </th>
                <th scope="col" className="text-center">
                  Customer Name
                </th>
                <th scope="col" className="text-center">
                  Due Date
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
                <th scope="col" className="text-center">
                  Balance Due
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            {filterdInvoice?.length !== 0 ? (
              <tbody>
                {filterdInvoice
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">
                          {formatDate(item.invoicedate)}
                        </td>
                        <td className="text-center">{item.invoice}</td>
                        <td className="text-center">{item.ordernumber}</td>
                        <td className="text-center">
                          {item.customername.customerfirstname}
                        </td>
                        <td className="text-center">
                          {formatDate(item.duedate)}
                        </td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">₹ {item.total}</td>
                        <td className="text-center">₹ {item.dueamount}</td>
                        <td className="text-center">
                          <FaEdit
                            onClick={() =>
                              navigate("/dashboard/sales/updateInvoice", {
                                state: item,
                              })
                            }
                          />
                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/sales/invoicesummary", {
                                state: item,
                              })
                            }
                            style={{ marginLeft: "10px" }}
                          />
                          <MdDeleteForever
                            onClick={() => confirmalert(item._id)}
                            style={{ marginLeft: "10px" }}
                          />{" "}
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
                    <h6>There are no Invoices.</h6>
                  </div>
                </div>
              </div>
            )}
          </table>
          <div style={{ display: "flex" }} className="reactPagination">
            <p style={{ width: "100%", marginTop: "20px" }}>
              Total Count: {filterdInvoice?.length}
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
          <Offcanvas.Title>New Invoice</Offcanvas.Title>
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
                {customers.map((item) => {
                  return (
                    <option value={item._id}>{item.customerfirstname}</option>
                  );
                })}
              </select> */}
            </div>
          </div>

          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Invoice# *
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                required
                value={invoicenumber}
              />
            </div>
          </div>

          {/* ------refrence---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Order Number#
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={ordernumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
          </div>

          {/* ------quote date---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Invoice Date*
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={invoicedate}
                onChange={(date) => setInvoiceDate(date)}
                className="textInput customDateInput"
                style={{ outline: "none", paddingLeft: "10px" }}
                required
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          {/* ---------------------------------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Term
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
                <option value="" disabled>
                  Select term
                </option>
                <option value="Net-15">Net 15</option>
                <option value="Net-30">Net 30</option>
                <option value="Net-45">Net 45</option>
                <option value="Net-60">Net 60</option>
                <option value="Due end of the month">
                  Due end of the month
                </option>
                <option value="Due end of the next month">
                  Due end of the next month
                </option>
                <option value="Due on Receipt">Due on Receipt</option>
                <option value="Custome">Custome</option>
              </select>
            </div>
          </div>

          {/* ------Expiry date---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border-bottom pb-2">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Due Date
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={duedate}
                onChange={(date) => setDueDate(date)}
                minDate={new Date()}
                filterDate={() => isDateDisabled(new Date())}
                className="textInput customDateInput"
                style={{ outline: "none", paddingLeft: "10px" }}
                dateFormat="dd/MM/yyyy"
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
                      value={products?.sellingprice || rate}
                      onChange={(e) => setRate(e.target.value)}
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
                    <FaPlusCircle
                      onClick={() => {
                        if (quantity > products?.stockonhand) {
                          toast.warning("Quantity is more than stock");
                          return;
                        }
                        addItemData();
                      }}
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
                  {itemData.map((item) => {
                    return (
                      <tr key={item.itemid}>
                        <td>{item.itemdetails}</td>
                        <td>{item.quantity}</td>
                        <td>{item.rate}</td>
                        <td>{item.discount}</td>
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
                  <p>{shippingChares}</p>
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
                  <p>{gsttax}</p>
                </div>
              </div>

              <div className="row mt-2 border-top">
                <div className="col-md-6 col-6">
                  <h4>Total (₹)</h4>
                </div>
                <div className="col-md-6 col-6">
                  <h4>{total}</h4>
                </div>
              </div>
            </div>
            <div className="row g-3 ">
              <div className="col-md-6 col-3 ">
                <button
                  // type="submit"
                  class="btn btn-primary float-end"
                  onClick={saveInvoice}
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
