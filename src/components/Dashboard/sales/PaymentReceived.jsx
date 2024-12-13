import React, { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/dashboard/quotes.css";
import Dropdown from "react-bootstrap/Dropdown";

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
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

function PaymentReceived() {
  const navigate = useNavigate();
  const [duedate, setDueDate] = useState(new Date());

  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0);
  const [customerId, setCustomerId] = useState("");
  const [reference, setReference] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");

  const [invoices, setInvoices] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [invoiced, setInvoiced] = useState(false);
  const [paymentstatus, setPaymentStatus] = useState(false);
  const [ordernumber, setOrderNumber] = useState("");

  const [paymentreceived, setPaymentReceived] = useState([]);
  const [amountreceived, setAmountReceived] = useState("");
  const [bankcharges, setBankCharges] = useState("");
  const [paymentdate, setPaymentDate] = useState(new Date());
  const [payment, setPayment] = useState("");
  const [depositto, setDepositTo] = useState("");
  const [paymentmode, setPaymentMode] = useState("");
  const [taxdeducted, setTaxDeducted] = useState("");

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => {
    setShow(true);
    getAllCustomer();
    console.log("hiiiii", customers);
    getAllProduct();
    const invoicenumber = generateUniqueQTString();
    setInvoiceNumber(invoicenumber);
  };
  const handleClose = () => setShow(false);
  const [productId, setProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close dropdown after selecting an item
  };
  const [search, setSearch] = useState("");

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
    return paymentdate < new Date(); // Disable if date is before today
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
    getPaymentsDetails();
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

  const saveReceivedPayment = async () => {
    formdata.set("customername", customerId);
    formdata.set("amountreceived", amountreceived);
    formdata.set("bankcharges", bankcharges);
    formdata.set("paymentdate", paymentdate);
    formdata.set("paymentnumber", payment);
    formdata.set("depositto", depositto);
    formdata.set("reference", reference);
    // formdata.set("itemdetailsArray", JSON.stringify(itemData));
    formdata.set("paymentmode", paymentmode);
    formdata.set("taxdeducted", taxdeducted);
    // formdata.set("shippingcharges", shippingChares);
    // formdata.set("total", total);
    // formdata.set("invoiced", invoiced);
    // formdata.set("paymentstatus", paymentstatus);

    try {
      const config = {
        url: "/createPaymentReceived",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/paymentreceived",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Payment Saved..");
        handleClose();
        getPaymentsDetails();
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const [fillteredArray, setFillteredArray] = useState([]);
  const getPaymentsDetails = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/paymentreceived/getpaymentreceived"
      );
      if (res.status === 201) {
        setFillteredArray(res.data);
        setPaymentReceived(res.data);
      }
      if (res.status === 500) {
        // console.log("data", res.data);
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [unpaidinvoice, setUnpaidInvoice] = useState([]);
  const [flag, setFlag] = useState(false);
  const getUnpaidInvoices = async (id) => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/invoices/getunpaidinvoice/${id}`
      );
      if (res.status === 201) {
        // console.log("data", res.data);
        setUnpaidInvoice(res.data);
      }
      if (res.status === 404) {
        setFlag(true);
      }
      if (res.status === 500) {
        // console.log("data", res.data);
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Payment",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deletePayment(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deletePayment = async (id) => {
    console.log("id", id);
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/paymentreceived/deletepaymentreceived/${id}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getPaymentsDetails();
      }
      if (res.status === 400) {
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
    // Step 1: Parse the date string into a Date object
    const inputDate = new Date(inputDateStr);

    // Step 2: Format the date into dd/mm/yyyy format
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = inputDate.getFullYear();

    // Return the formatted date string
    return `${day}/${month}/${year}`;
  };

  const sortByPaymentNumber = () => {
    setFillteredArray(
      [...fillteredArray].sort((a, b) => a.paymentnumber - b.paymentnumber)
    );
  };

  const sortByReference = () => {
    setFillteredArray(
      [...fillteredArray].sort((a, b) => a.reference - b.reference)
    );
  };

  const sortByCustomerName = () => {
    setFillteredArray(
      [...fillteredArray].sort((a, b) =>
        a.customername?.customerfirstname.localeCompare(
          b.customername?.customerfirstname
        )
      )
    );
  };

  const sortByAmount = () => {
    setFillteredArray(
      [...fillteredArray].sort((a, b) => a.amountreceived - b.amountreceived)
    );
  };

  function handleFilter() {
    if (search != "") {
      const filterTable = paymentreceived.filter((o) =>
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
      setFillteredArray([...paymentreceived]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(fillteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // const [formData, setFormData] = useState({});
  // const [receivedObj, setReceivedObj] = useState({});
  // const handleChange = (e, paymentReceivedObj) => {
  //   setReceivedObj(paymentReceivedObj);
  //   console.log(paymentReceivedObj);
  //   const { name, value } = e.target;
  //   if (
  //     value >
  //     Math.min(
  //       amountreceived,paymentReceivedObj?.dueamount
  //     )
  //   ) {
  //     setFormData({
  //       ...formData,
  //       [name]: 0,
  //     });
  //     return toast.warning(
  //       "You can't pay more than dueamount or received amount"
  //     );
  //   }

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleChangePayment = (e, index, data) => {
    setUnpaidInvoice((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          if (
            Number(e.target.value) > Math.min(amountreceived, data?.dueamount)
          ) {
            toast.warning(
              "You can't pay more than DueAmount and Received Amount"
            );
            val.paymentmade = 0;
          } else {
            val.paymentmade = e.target.value;
          }
        }
        return val;
      }),
    ]);
  };

  useMemo(() => {
    setTotal(
      unpaidinvoice.reduce((acc, data) => {
        return acc + Number(data.paymentmade);
      }, 0)
    );
  }, [unpaidinvoice]);

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
              onClick={handleShow}
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
                <Dropdown.Item onClick={sortByPaymentNumber}>
                  Payment Number
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByReference}>
                  Reference
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByCustomerName}>
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
                <th scope="col" className="text-center">
                  SL.No.
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Payment#
                </th>
                <th scope="col" className="text-center">
                  Reference#
                </th>
                <th scope="col" className="text-center">
                  Customer Name
                </th>
                <th scope="col" className="text-center">
                  Invoice#
                </th>
                <th scope="col" className="text-center">
                  Mode
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
                <th scope="col" className="text-center">
                  Unused Amount
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            {fillteredArray?.length !== 0 ? (
              <tbody>
                {fillteredArray
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">
                          {formatDate(item.paymentdate)}
                        </td>
                        <td className="text-center">{item.paymentnumber}</td>
                        <td className="text-center">{item.reference}</td>
                        <td className="text-center">
                          {item.customername.customerfirstname}
                        </td>
                        <td className="text-center"></td>
                        <td className="text-center">{item.paymentmode}</td>
                        <td className="text-center">₹ {item.amountreceived}</td>
                        <td className="text-center">
                          ₹ {item.amountreceived - item.usedamount}
                        </td>
                        <td className="text-center">
                          <MdDeleteForever
                            onClick={() => confirmalert(item._id)}
                          />{" "}
                          <FaEye
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              navigate(
                                "/dashboard/sales/paymentreceived/summary",
                                {
                                  state: item,
                                }
                              )
                            }
                          />
                          <FaEdit
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              navigate(
                                "/dashboard/sales/paymentreceived/editpayment",
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
                    <h2>No Payment Received, Yet</h2>
                    <p>
                      Payments will be added once your customers pay for their
                      invoices.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </table>
          <div style={{ display: "flex" }} className="reactPagination">
            <p style={{ width: "100%", marginTop: "20px" }}>
              Total Count: {fillteredArray?.length}
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
          <Offcanvas.Title>Record Payment</Offcanvas.Title>
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
                  <TextField {...params} label='Select Customer' />
                )}
              />
              {/* <select
                className="textInput"
                value={customerId}
                onChange={(e) => {
                  setCustomerId(e.target.value);
                  getUnpaidInvoices(e.target.value);
                }}
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
                Amount Received *
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="number"
                id="inputText"
                className="form-control textInput"
                required
                value={amountreceived}
                onChange={(e) => setAmountReceived(e.target.value)}
              />
            </div>
          </div>

          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Bank Charges (if any)
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="number"
                id="inputText"
                className="form-control textInput"
                required
                value={bankcharges}
                onChange={(e) => setBankCharges(e.target.value)}
              />
            </div>
          </div>

          {/* ------quote date---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Payment Date*
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={paymentdate}
                onChange={(date) => setPaymentDate(date)}
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
                Payment#
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Payment Mode
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="textInput"
                value={paymentmode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option value="">Select Mode</option>

                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="Credit Card">Credit Card</option>
                <option value="UPI">UPI</option>
                <option value="Bank Remittance">Bank Remittance</option>
              </select>
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Deposite To*
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="textInput"
                value={depositto}
                onChange={(e) => setDepositTo(e.target.value)}
              >
                <option value="">Select</option>

                <option value="Petty Cash">Petty Cash</option>
                <option value="Cash">Undeposited Funds</option>
                <option value="Employee Reimbursement">
                  Employee Reimbursement
                </option>
                <option value="Opening Balance Adjustment">
                  Opening Balance Adjustment
                </option>
                <option value="TDS Paybles">TDS Paybles</option>
              </select>
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

          <div className="row g-3 align-items-center">
            <div className="col-md-2">
              <label for="inputText" className="col-form-label label">
                Tax Deducted?
              </label>
            </div>
            <div className="col-md-5">
              <div className="row">
                <div className="col-md-6">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      name="itemtype"
                      id="flexRadioDefault1"
                      type="radio"
                      value="No"
                      checked={taxdeducted === "No"}
                      onChange={(e) => e.target.value}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      No
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="itemtype"
                      id="flexRadioDefault1"
                      value="Yes"
                      checked={taxdeducted === "Yes"}
                      onChange={(e) => setTaxDeducted(e.target.value)}
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Yes
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --------------item table------------- */}
          {/* <div className="row mt-3 text-start">
            <h5 className="py-2 bg-secondary text-light">Unpaid Invoices</h5>
          </div> */}
          {/* 
          <div className="row mt-1 overflow-auto">
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Invoice Number</th>
                  <th scope="col">Invoice Amount</th>
                  <th scope="col">Amount Due</th>
                  <th scope="col"> Payment</th>
                </tr>
              </thead>
              <tbody>
                {unpaidinvoice.length !== 0 ? (
                  <>
                    {unpaidinvoice.map((item, index) => {
                      return (
                        <tr>
                          <td>{formatDate(item?.invoicedate)}</td>
                          <td>{item?.invoice}</td>
                          <td>₹{(item?.total).toFixed(2)}</td>
                          <td>₹{(item?.dueamount).toFixed(2)}</td>
                          <td>
                            <input
                              type="text"
                              value={item?.paymentmade}
                              onChange={(e) => {
                                // setpaymentReceivedObj(item);
                                handleChangePayment(e, index, item);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <h5>
                      There are no unpaid invoices associated with this
                      customer.
                    </h5>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="row justify-content-end">
            <div className="col-md-3 ">
              <small style={{ marginRight: "50px" }}>Total :</small> {total}
            </div>
          </div> */}
          {/* ---------button----------    */}
          <div className="row justify-content-end">
            {/* <div
              className="col-md-7 p-md-2 p-2 mt-1"
              style={{ background: "aliceblue" }}
            >
              <div className="row justify-content-end mt-2">
                <div className="col-md-4 ">Amount Received: </div>
                <div className="col-md-4 justify-content-center">₹{amountreceived} </div>
              </div>

              <div className="row justify-content-end mt-2">
                <div className="col-md-4 ">Amount used for Payments: </div>
                <div className="col-md-4 justify-content-center">₹{total} </div>
              </div>

              <div className="row justify-content-end mt-2">
                <div className="col-md-4 ">Amount in Excess: </div>
                <div className="col-md-4 justify-content-center">₹{amountreceived-total} </div>
              </div>
            </div> */}
            <div className="row g-3 ">
              <div className="col-md-6 col-3 ">
                <button
                  // type="submit"
                  class="btn btn-primary float-end"
                  onClick={saveReceivedPayment}
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

export default PaymentReceived;
