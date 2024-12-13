import React, { useState, useRef, useEffect, useMemo } from "react";
import { Formik } from "formik";
// import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../../../css/dashboard/items.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdDeleteForever } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  GetCountries,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FaBullseye } from "react-icons/fa6";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import InputGroup from "react-bootstrap/InputGroup";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlusCircle } from "react-icons/fa";
import Table from "react-bootstrap/Table";

function Quotations() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  const navigate = useNavigate();

  const [rfqdata, setRfqData] = useState({});

  const [indentno, setIndentNo] = useState("");
  const [rfqno, setRFQNo] = useState("");
  const [rate, setRate] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [expirydate, setExpiryDate] = useState(new Date());
  const [text, setText] = useState("All Qutation");
  const [quote, setQuoteNo] = useState("");
  const [vendors, setVendors] = useState([]);
  const [product, setProduct] = useState({});
  const [cgsttax, setCgstTax] = useState(0.0);
  const [sgsttax, setSgstTax] = useState(0.0);
  const [igsttax, setIgstTax] = useState(0.0);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [vendorId, setVendorId] = useState("");
  const [reference, setReference] = useState("");
  const [search, setSearch] = useState("");
  const [pqno, setPQNo] = useState("");

  const [quotesdata, setQuotesData] = useState([]);
  const [filteredArray, setFillteredArray] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const [termsandconditons, setTermsandCondtions] = useState("");

  useEffect(() => {
    setIndentNo(rfqdata?.indentdetails?.indentno);
    const formattedItems = rfqdata?.indentdetails?.indentItems.map((item) => ({
      itemdetails: item?.itemname,
      quantity: item?.quantityrequired,
      rate: 0,
      discount: 0,
      discountunit: "%",
      amount: 0,
    }));

    setItemData(formattedItems);
  }, [rfqdata]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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

  const getAllVendors = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendors(res.data);
      } else {
        toast("something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
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

  const deleteQuote = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/purchasequotation/deleteQuoteById/${id}`
      );
      if (res.status === 200) {
        getAllQuotation();
        alert("Quotation deleted successfully");
      }
      if (res.status === 404) {
        alert("Something went wrong");
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

  useEffect(() => {
    getAllVendors();
    getAllItems();
  }, []);

  const formdata = new FormData();

  const saveQuotation = async () => {
    formdata.set("vendorname", vendorId);
    formdata.set("quote", quote);
    formdata.set("pqno", pqno);
    formdata.set("reference", reference);
    formdata.set("rfqno", rfqdata?.rfqno);
    formdata.set("indentno", indentno);
    formdata.set("quotedate", startDate);
    formdata.set("expirydate", expirydate);
    formdata.set("itemdetailsArray", JSON.stringify(itemData));
    formdata.set("subtotal", subtotal);
    formdata.set("sgsttax", sgsttax);
    formdata.set("cgsttax", cgsttax);
    formdata.set("igsttax", igsttax);
    formdata.set("shippingcharges", shippingChares);
    formdata.set("total", total.toFixed(2));
    formdata.set("termsandcondition", termsandconditons);

    try {
      const config = {
        url: "/createQuote",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/purchasequotation",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast("quotation saved...");
        handleClose();
        savePQNo();
        setRfqData({});
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
        "https://engineeringsolutions.net.in/api/purchasequotation/getQuote"
      );
      if (res.status === 201) {
        // console.log("data", res.data);
        setQuotesData(res.data);
        const revdata = res.data.reverse();
        setFillteredArray(revdata);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuotation();
  }, []);

  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //searchbox
  function handleFilter() {
    if (search != "") {
      const filterTable = quotesdata.filter((o) =>
        Object.keys(o).some((k) => {
          // If the key is 'customername', check 'customerfirstname'
          if (k === "vendorname" && o[k]?.vendorfirstname) {
            return o[k].vendorfirstname
              .toLowerCase()
              .includes(search.toLowerCase());
          }
          if (k === "vendorname" && o[k]?.companyname) {
            return o[k].companyname
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
      setFillteredArray([...quotesdata]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  // const sortByVendorname=()=>{
  //   setFillteredArray([
  //     ...quotesdata.sort((a, b) =>
  //       a.vendorname.vendorfirstname.localeCompare(b.vendorname.vendorfirstname)
  //     ),
  //   ]);
  // }
  //  const sortByDate = () => {
  //   setFillteredArray([
  //     ...quotesdata.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
  //   ]);
  // };

  const [rfqs, setRfqs] = useState([]);
  const getRfqByStatus = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/rfq/getRfqByStatus"
      );
      if (res.status === 201) {
        setRfqs(res.data);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRfqByStatus();
  }, []);

  const handleRateChange = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          const valAmt = Number(e.target.value) * Number(val.quantity);
          let total;
          if (val.discountunit === "%") {
            total = valAmt - ((valAmt * Number(val.discount)) / 100).toFixed(2);
          } else if (val.discountunit === "₹") {
            total = valAmt - Number(val.discount);
          }
          return { ...val, rate: Number(e.target.value), amount: total }; // Immutable update
        }
        return val;
      }),
    ]);
  };

  const handleDiscountChange = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          const valAmt = Number(val.rate) * Number(val.quantity);
          let total;
          if (val.discountunit === "%") {
            total =
              valAmt - ((valAmt * Number(e.target.value)) / 100).toFixed(2);
          } else if (val.discountunit === "₹") {
            total = valAmt - Number(e.target.value);
          }
          return { ...val, discount: Number(e.target.value), amount: total }; // Immutable update
        }
        return val;
      }),
    ]);
  };

  const handleChangeDiscountUnit = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          const valAmt = Number(val.rate) * Number(val.quantity);
          let total;
          if (e.target.value === "%") {
            total = valAmt - ((valAmt * Number(val.discount)) / 100).toFixed(2);
          } else if (e.target.value === "₹") {
            total = valAmt - Number(val.discount);
          }
          return { ...val, discountunit: e.target.value, amount: total }; // Immutable update
        }
        return val;
      }),
    ]);
  };

  const handleChangeAmount = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.amount = e.target.value;
        }
        return val;
      }),
    ]);
  };

  useMemo(() => {
    setSubtotal(
      itemData?.reduce((accumulator, item) => {
        return accumulator + item.amount;
      }, 0)
    );
  }, [itemData]);

  useMemo(() => {
    setTotal(
      Number(subtotal) +
        Number(Number(shippingChares).toFixed(2)) +
        Number(Number(((subtotal * sgsttax) / 100).toFixed(2))) +
        Number(Number(((subtotal * cgsttax) / 100).toFixed(2))) +
        Number(Number(((subtotal * igsttax) / 100).toFixed(2)))
    );
  }, [subtotal, shippingChares, cgsttax, sgsttax, igsttax]);

  const savePQNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/purchasequotation/createPQNo",
        { pqno: pqno }
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
  const [purchaseequote, setPurchaseQuoteNo] = useState("");
  const getLastPQNo = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/purchasequotation/getLastPQNo`
      );
      if (res.status === 201) {
        setPurchaseQuoteNo(res.data.pqno);
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
    getLastPQNo();
  }, []);

  const incrementPQNo = () => {
    // Extract the prefix 'IN240924'
    const today = new Date();

    // Extract last 2 digits of the current year
    const year = today.getFullYear().toString().slice(-2);

    // Get the current month (pad to 2 digits)
    const month = String(today.getMonth() + 1).padStart(2, "0");

    // Get the current date (pad to 2 digits)
    const date = String(today.getDate()).padStart(2, "0");
    // Extract the numeric part '000001'
    const numberPart = purchaseequote.toString().slice(8);

    // Convert the number part to an integer and increment
    const incrementedNumber = parseInt(numberPart) + 1;

    // Pad the number with leading zeros to maintain the same length (6 digits)
    const newNumberPart = String(incrementedNumber).padStart(
      numberPart.length,
      "0"
    );

    // Combine the prefix with the new incremented number part
    const newPQNo = `QN${year}${month}${date}${newNumberPart}`;

    // Update the state with the new incremented value
    setPQNo(newPQNo);
  };

  const increase = useMemo(() => {
    incrementPQNo();
  }, [purchaseequote]);

  return (
    <div>
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
              }}
              style={{ height: "38px" }}
            >
              <TiPlus /> New
            </button>
            {/* <Dropdown className="mx-3">
              <Dropdown.Toggle
                variant="transparent outline btn-outline-primary"
                id="dropdown-basic"
              >
                Sort
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={sortByVendorname}>
                  Vendor Name
                </Dropdown.Item>
               <Dropdown.Item >Amount</Dropdown.Item> 
                <Dropdown.Item onClick={sortByDate}>Date</Dropdown.Item>
                <Dropdown.Item >
                  Due Amount
                </Dropdown.Item> 
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
        </div>
      </div>

      <div className="row overflow-auto mt-4">
        <div className="col-md-12">
          <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col" className="text-center">
                  SL.No.
                </th>
                <th scope="col" className="text-center">
                  Quote Date
                </th>
                <th scope="col" className="text-center">
                  Quote No.
                </th>
                <th scope="col" className="text-center">
                  Vendor
                </th>
                <th scope="col" className="text-center">
                  Reference No.
                </th>
                <th scope="col" className="text-center">
                  Expiry Date
                </th>
                <th scope="col" className="text-center">
                  Indent No.
                </th>
                <th scope="col" className="text-center">
                  RFQ No.
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
                            {formatDate(item.quotedate)}
                          </td>
                          <td className="text-center">{item.quote}</td>
                          <td className="text-center">
                            {item.vendorname?.vendorfirstname}
                            <br />
                            {item.vendorname?.companyname}
                          </td>
                          <td className="text-center">{item.reference}</td>
                          <td className="text-center">
                            {formatDate(item.expirydate)}
                          </td>
                          <td className="text-center">{item.indentno}</td>
                          <td className="text-center">{item.rfqno}</td>
                          <td className="text-center">{item.total}</td>
                          <td className="text-center">{item.status}</td>
                          <td className="text-center">
                            <FaEye
                              onClick={() =>
                                navigate("/dashboard/purchase/quotes/summary", {
                                  state: item,
                                })
                              }
                            />{" "}
                            <FaEdit
                              onClick={() =>
                                navigate("/dashboard/purchase/quotes/edit", {
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
          <Offcanvas.Title>Quotaion Entry</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Vendor Name
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
                  setVendorId(value?._id);
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
                  <TextField {...params} label="Select Vendor" />
                )}
              />
            </div>
          </div>

          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center ">
            <div className="col-md-2 text-start d-flex">
              <label for="inputText" className="col-form-label label">
                Quote No.*
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                required
                value={quote}
                onChange={(e) => setQuoteNo(e.target.value)}
              />
            </div>
            <div className="col-md-2 text-start d-flex">
              <label for="inputText" className="col-form-label label">
                RFQ No.
              </label>
            </div>
            <div className="col-md-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.rfqno}
                options={rfqs}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  setRfqData(value);
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
                            {option?.rfqno}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </MenuItem>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Select RFQ No." />
                )}
              />
            </div>
          </div>

          {/* ------refrence---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start d-flex">
              <label for="inputText" className="col-form-label label">
                Reference#
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
            <div className="col-md-2 text-start d-flex">
              <label for="inputText" className="col-form-label label">
                Indent No.
              </label>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={indentno}
                onChange={(e) => setIndentNo(e.target.value)}
              />
            </div>
          </div>

          {/* ------quote date---------- */}
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
                // minDate={startDate}
                // filterDate={() => isDateDisabled(new Date())}
                className="textInput customDateInput"
                style={{ outline: "none" }}
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
                          // getOptionLabel={(option) => option?.itemname}
                          // options={products}
                          sx={{ width: 300 }}
                          disabled
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
                          style={{ width: "150px", height: "57px" }}
                          value={item?.quantity}
                          // onChange={(e) => {
                          //   setQuantity(e.target.value);
                          //   setAmount(quantity * rate);
                          // }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          id="inputText"
                          className="form-control textInput"
                          style={{ width: "180px", height: "60px" }}
                          value={item?.rate}
                          onChange={(e) => {
                            handleRateChange(e, index);
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
                                value={item?.discount}
                                onChange={(e) => handleDiscountChange(e, index)}
                              />
                              <span
                                class="input-group-text inputgrouptext"
                                id="addon-wrapping"
                              >
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={item?.discountunit}
                                  style={{ height: "57px" }}
                                  onChange={(e) =>
                                    handleChangeDiscountUnit(e, index)
                                  }
                                >
                                  <MenuItem value="%">%</MenuItem>
                                  <MenuItem value="₹">₹</MenuItem>
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
                          className="form-control textInput"
                          style={{ width: "180px", height: "57px" }}
                          placeholder={item?.amount}
                          // onChange={(e) =>
                          //   handleChangeAmount(e, index)
                          // }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div className="row">
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
          </div> */}

          {/* ---------button----------    */}
          <div className="row justify-content-center">
            <div className="col-md-6 mt-2">
              <b>Terms & Conditions</b>
              <Form.Control
                as="textarea"
                placeholder="terms & conditions"
                style={{ height: "150px" }}
                value={termsandconditons}
                onChange={(e) => setTermsandCondtions(e.target.value)}
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
                <div className="col-md-4 col-4 text-end">₹{subtotal}</div>
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
                  <p> ₹ {shippingChares}</p>
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
                      value={sgsttax}
                      onChange={(e) => {
                        setSgstTax(e.target.value);
                        // setTotal((gsttax / 100) * total + total);
                      }}
                    />
                    {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>₹{Number(((subtotal * sgsttax) / 100).toFixed(2))}</p>
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
                        setCgstTax(e.target.value);
                        // setTotal((gsttax / 100) * total + total);
                      }}
                    />
                    {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>₹{Number(((subtotal * cgsttax) / 100).toFixed(2))}</p>
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
                        setIgstTax(e.target.value);
                      }}
                    />
                    {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
                  </div>
                </div>
                <div className="col-md-4 col-4 text-end">
                  <p>₹{Number(((subtotal * igsttax) / 100).toFixed(2))}</p>
                </div>
              </div>

              <div className="row mt-2 border-top">
                <div className="col-md-6 col-6">
                  <h4>Total (₹)</h4>
                </div>
                <div className="col-md-6 col-6">
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

export default Quotations;
