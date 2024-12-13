import React, { useEffect, useMemo, useRef, useState } from "react";
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
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaPen } from "react-icons/fa";
import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import { RxCross1 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
// import CloseIcon from '@mui/icons-material/Close';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  GetCountries,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Modal from "react-bootstrap/Modal";
import { IoMdRefresh } from "react-icons/io";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import Select from "@mui/material/Select";
import { TfiEmail } from "react-icons/tfi";
import Avatar from "@mui/material/Avatar";

function PurchseOrders() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [deliverydate, setDeliveryDate] = useState(new Date());

  const [vendors, setVendors] = useState([]);
  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [vendorId, setVendorId] = useState("");
  const [reference, setReference] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");
  const [cgsttax, setCgstTax] = useState();
  const [igsttax, setIgstTax] = useState(0.0);

  const [costprice, setCostPrice] = useState(0);

  const [listofpo, setListOfPO] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [purchaseorder, setPurchaseOrder] = useState("");
  const [invoiced, setInvoiced] = useState(false);
  const [paymentstatus, setPaymentStatus] = useState(false);
  const [deliveryaddress, setDeliveryAddress] = useState("");
  const [billingaddress, setBillingAddress] = useState("");
  const [termsandcondition, setTermsandCondition] = useState("");

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [quotation, setQuotation] = useState("");
  const [quotationid, setQuoteNoId] = useState("");

  //shipping address
  const [address1, setAddress1] = useState("");
  const [pincode1, setPincode1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [countryid1, setCountryid1] = useState(0);
  const [countryname1, setCountryname1] = useState("");
  const [stateid1, setstateid1] = useState(0);
  const [statename1, setstatename1] = useState("");
  const [city1, setcity1] = useState("");

  const handleClose3 = () => {
    setShow3(false);
    setAddress("");
    setPincode("");
    setPhone1("");
  };
  const openShow3 = () => {
    setShow3(true);
  };
  const handleClose4 = () => {
    setAddress("");
    setPincode("");
    setPhone1("");
    setShow4(false);
  };
  const openShow4 = () => {
    setShow4(true);
  };

  useEffect(() => {
    getAllVendors();
  }, [vendors]);

  const handleShow = () => {
    setShow(true);

    getAllProduct();
    // const purchaseordernumber = generateUniqueQTString();
    // setPurchaseOrder(purchaseordernumber);
  };
  const handleClose = () => setShow(false);
  const [productId, setProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [vendorr, setVendorr] = useState("Select Vendor");

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close dropdown after selecting an item
  };

  //billing address
  const [countryid, setCountryid] = useState(0);
  const [countryname, setCountryname] = useState("");
  const [stateid, setstateid] = useState(0);
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone1, setPhone1] = useState("");

  //shipping address

  const rowRef = useRef(null);

  const [selectedObj, setSelectedObj] = useState({});

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
    const prefix = "PO-";
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
    getAllPurchaseOrder();
  }, []);

  const getAllVendors = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendors(res.data);
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

  const showAddress = () => {
    rowRef.current.style.display = "flex";
  };

  const handleChangeQuantity = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          const valAmt = Number(e.target.value) * Number(val.rate);
          let total;
          if (val.discountunit === "%") {
            total = valAmt - ((valAmt * Number(val.discount)) / 100).toFixed(2);
          } else if (val.discountunit === "₹") {
            total = valAmt - Number(val.discount);
          }
          val.quantity = Number(e.target.value);
          val.amount = total;
        }
        return val;
      }),
    ]);
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
        Number(((gsttax / 100) * subtotal).toFixed(2)) +
        Number(((cgsttax / 100) * subtotal).toFixed(2)) +
        Number(((igsttax / 100) * subtotal).toFixed(2))
    );
  }, [subtotal, shippingChares, gsttax, cgsttax, igsttax]);

  const formdata = new FormData();

  const savePurchaseOrder = async () => {
    formdata.set("vendorname", vendorId);
    formdata.set("purchaseorder", purchaseorder);
    formdata.set("quote", quotationid);
    formdata.set("reference", reference);
    formdata.set("date", startDate);
    formdata.set("paymentterms", paymentterm);
    formdata.set("itemdetailsArray", JSON.stringify(itemData));
    formdata.set("subtotal", selectedObj[0]?.subtotal);
    formdata.set("gsttax", selectedObj[0]?.sgsttax);
    formdata.set("cgsttax", selectedObj[0]?.cgsttax);
    formdata.set("igsttax", selectedObj[0]?.igsttax);
    formdata.set("shippingcharges", selectedObj[0]?.shippingcharges);
    formdata.set("total", selectedObj[0]?.total);
    formdata.set("shippingaddresscountry", countryname1);
    formdata.set("shippingaddressstate", statename1);
    formdata.set("shippingaddresscity", city1);
    formdata.set("shippingaddressaddress", address1);
    formdata.set("shippingaddresspincode", pincode1);
    formdata.set("shippingaddressphone", phone2);
    formdata.set("billingaddresscountry", countryname);
    formdata.set("billingaddressstate", state);
    formdata.set("billingaddresscity", city);
    formdata.set("billingaddressaddress", address);
    formdata.set("billingaddresspincode", pincode);
    formdata.set("billingaddressphone", phone1);
    formdata.set("termsandcondition", termsandcondition);

    try {
      const config = {
        url: "/createpurchaseorder",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/purchaseorder",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast.success("purchase order saved...");
        handleClose();
        savePoNo();
        getAllPurchaseOrder();
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const [filteredArray, setFillteredArray] = useState([]);

  const getAllPurchaseOrder = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/purchaseorder/getpurchaseorder"
      );
      if (res.status === 200) {
        // console.log("data", res.data);
        setListOfPO(res.data);
        const revdata = res.data.reverse();
        setFillteredArray(revdata);
        setFillteredArray(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [podata, setPodata] = useState([]);
  const getPOByStatus = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/purchasequotation/getQuoteByStatus"
      );
      if (res.status === 201) {
        setPodata(res.data);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPOByStatus();
  }, []);

  const deletePurchaseOrder = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/purchaseorder/deletepurchaseorder/${id}`
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        getAllPurchaseOrder();
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

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Expense Record",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deletePurchaseOrder(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  //searchbox
  const [search, setSearch] = useState("");
  function handleFilter() {
    if (search != "") {
      const filterTable = listofpo.filter((o) =>
        Object.keys(o).some((k) => {
          // If the key is 'customername', check 'customerfirstname'
          if (k === "vendorname" && o[k]?.vendorfirstname) {
            return o[k].vendorfirstname
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
      setFillteredArray([...listofpo]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortByDate = () => {
    setFillteredArray([
      ...listofpo.sort((a, b) => new Date(a.date) - new Date(b.date)),
    ]);
  };
  const sortByVendorName = () => {
    setFillteredArray([
      ...listofpo.sort((a, b) =>
        a.vendorname.vendorfirstname.localeCompare(b.vendorname.vendorfirstname)
      ),
    ]);
  };

  const sortByPurchaseOrder = () => {
    setFillteredArray([
      ...listofpo.sort((a, b) =>
        a.purchaseorder.localeCompare(b.purchaseorder)
      ),
    ]);
  };

  const sortByAmount = () => {
    setFillteredArray([...listofpo.sort((a, b) => a.total - b.total)]);
  };

  const updateBillingAddress = async () => {
    try {
      const config = {
        url: `/updatevendor/${selectedObj?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/vendors",
        headers: { "content-type": "application/json" },
        data: {
          billingaddresscountry: countryname,
          billingaddressstate: state,
          billingaddresscity: city,
          billingaddressaddress: address,
          billingaddresspincode: pincode,
          billingaddressphone: phone1,
        },
      };
      const res = await axios(config);
      if (res.status === 404) {
        toast.warning("Vendor Not Found");
      }
      if (res.status === 200) {
        toast.success("Billing Address Updated Successfully");
        handleClose3();
      }
      if (res.status === 500) {
        toast.error("Failed to Update Billing Address");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateShippingAddress = async () => {
    try {
      const config = {
        url: `/updatevendor/${selectedObj?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/vendors",
        headers: { "content-type": "application/json" },
        data: {
          shippingaddresscountry: countryname1,
          shippingaddressstate: statename1,
          shippingaddresscity: city1,
          shippingaddressaddress: address,
          shippingaddresspincode: pincode,
          shippingaddressphone: phone1,
        },
      };
      const res = await axios(config);
      if (res.status === 404) {
        toast.warning("Vendor Not Found");
      }

      if (res.status === 200) {
        toast.success("Shipping Address Updated Successfully");
        handleClose4();
      }
      if (res.status === 500) {
        toast.error("Failed to Update Shipping Address");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshBillingAddress = () => {
    vendors.map((data) => {
      if (data._id === vendorId) {
        getVendorById(vendorId);
      }
    });
  };

  const getVendorById = async (id) => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/vendors/getvendorbyid/${id}`
      );
      if (res.status === 200) {
        setSelectedObj(res.data.vendor);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
      if (res.status === 404) {
        toast.error("Vendor not Found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuoteByQuoteId = async (id) => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/purchasequotation/getQuoteByQuoteId/${id}`
      );
      if (res.status === 201) {
        setSelectedObj(res.data);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
      if (res.status === 404) {
        toast.error("Quote not Found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuoteByQuoteId(quotationid);
  }, [quotationid]);

  useMemo(() => {
    setCgstTax(Number(selectedObj[0]?.sgsttax));
    setIgstTax(Number(selectedObj[0]?.igsttax));
    setGstTax(Number(selectedObj[0]?.sgsttax));
    setShippingCharges(Number(selectedObj[0]?.shippingcharges));
    setTotal(Number(selectedObj[0]?.total));
    setSubtotal(Number(selectedObj[0]?.subtotal));
  }, [selectedObj]);

  const [purchaseordernumber, setPurchaseOrderNo] = useState("");

  const savePoNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/purchaseorder/createPoNo",
        { pono: purchaseorder }
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

  const getLastPONo = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/purchaseorder/getLastPoNo`
      );
      if (res.status === 201) {
        setPurchaseOrderNo(res.data.pono);

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
    getLastPONo();
  }, []);

  const incrementPONo = () => {
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
      newIndentNo = `PO${currentDatePart}000001`;
    } else {
      // Extract the numeric part and increment as usual
      const numberPart = purchaseordernumber.slice(8); // '000001'
      const incrementedNumber = parseInt(numberPart) + 1;
      const newNumberPart = String(incrementedNumber).padStart(
        numberPart.length,
        "0"
      );

      // Combine the current date part with the new incremented number
      newIndentNo = `PO${currentDatePart}${newNumberPart}`;
    }

    // Update the state with the new incremented value
    setPurchaseOrder(newIndentNo);
  };

  const increase = useMemo(() => {
    incrementPONo();
  }, [purchaseordernumber]);

  useMemo(() => {
    incrementPONo();
  }, [startDate]);

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
                <Dropdown.Item onClick={sortByDate}>Date</Dropdown.Item>
                <Dropdown.Item onClick={sortByPurchaseOrder}>
                  Purchase Order
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByVendorName}>
                  Vendor name
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
                  Purchase Order#
                </th>
                <th scope="col" className="text-center">
                  Reference #
                </th>
                <th scope="col" className="text-center">
                  Vendor Name
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
                        <td className="text-center">{formatDate(item.date)}</td>
                        <td className="text-center">{item.purchaseorder}</td>
                        <td className="text-center">{item.reference}</td>
                        <td className="text-center">
                          {item?.vendorname?.companyname}
                        </td>
                        <td className="text-center">{item.total}</td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/purchase/posummary", {
                                state: item,
                              })
                            }
                          />
                          <FaEdit
                            style={{ marginLeft: "10px" }}
                            onClick={() =>
                              navigate("/dashboard/purchase/edit", {
                                state: item,
                              })
                            }
                          />
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
                      CREATE NEW PURCHASE ORDER
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
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "1200px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Purchase Order</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Vendor Name*
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
                  // showAddress();
                  setVendorId(value?._id);
                  // setSelectedObj(value);
                  setVendorr(value?.companyname);
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
                  <TextField
                    {...params}
                    label={selectedObj[0]?.vendorname?.companyname}
                  />
                )}
              />
            </div>
          </div>

          <div className="row mt-3" style={{ display: "none" }}>
            <div className="col-md-6">
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    BILLING ADDRESS &nbsp;&nbsp;&nbsp;
                    <FaPen onClick={openShow3} />
                    &nbsp;&nbsp;&nbsp;
                    <IoMdRefresh
                      style={{ fontSize: "18px" }}
                      onClick={refreshBillingAddress}
                    />
                  </Typography>

                  <Typography variant="body2">
                    {selectedObj?.billingaddressaddress}
                    <br />
                    {selectedObj?.billingaddresscity}
                    <br />
                    {selectedObj?.billingaddressstate}
                    <br />
                    {selectedObj?.billingaddresscountry}
                    <br />
                    {selectedObj?.billingaddresspincode}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="col-md-6">
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    SHIPPING ADDRESS &nbsp;&nbsp;&nbsp;
                    <FaPen onClick={openShow4} />
                    &nbsp;&nbsp;&nbsp;
                    <IoMdRefresh
                      style={{ fontSize: "18px" }}
                      onClick={refreshBillingAddress}
                    />
                  </Typography>
                  <Typography variant="body2">
                    {selectedObj?.shippingaddressaddress}
                    <br />
                    {selectedObj?.shippingaddresscity}
                    <br />
                    {selectedObj?.shippingaddressstate}
                    <br />
                    {selectedObj?.billingaddresscountry}
                    <br />
                    {selectedObj?.shippingaddresspincode}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* //dialog for billing address update */}
          {/* <Modal show={show3} onHide={handleClose3}>
            <Modal.Header closeButton>
              <Modal.Title>Update Billing Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    Country/Region
                  </label>
                </div>
                <div className="col-md-7">
                  <CountrySelect
                    className="textInput"
                    onChange={(e) => {
                      setCountryid(e.id);
                      setCountryname(e.name);
                    }}
                    placeHolder={selectedObj?.billingaddresscountry}
                  />
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    State
                  </label>
                </div>
                <div className="col-md-7">
                  <StateSelect
                    countryid={countryid}
                    className="textInput"
                    onChange={(e) => {
                      setstateid(e.id);
                      setstate(e.name);
                    }}
                    placeHolder={selectedObj?.billingaddressstate}
                  />
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    City
                  </label>
                </div>
                <div className="col-md-7">
                  <CitySelect
                    countryid={countryid}
                    stateid={stateid}
                    className="textInput"
                    onChange={(e) => {
                      setcity(e.name);
                    }}
                    placeHolder={selectedObj?.billingaddresscity}
                  />
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    Address
                  </label>
                </div>
                <div className="col-md-7">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      id="floatingTextarea2"
                      style={{ height: "70px" }}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeHolder={selectedObj?.billingaddressaddress}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    PinCode
                  </label>
                </div>
                <div className="col-md-7">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    name="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder={selectedObj?.billingaddresspincode}
                  />
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    Phone
                  </label>
                </div>
                <div className="col-md-7">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    name="phone"
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                    placeholder={selectedObj?.billingaddressphone}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose3}>
                Close
              </Button>
              <Button variant="primary" onClick={updateBillingAddress}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}

          {/* //dialog for shipping address update */}

          {/* <Modal show={show4} onHide={handleClose4}>
            <Modal.Header closeButton>
              <Modal.Title>Update Shipping Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    Country/Region
                  </label>
                </div>
                <div className="col-md-7">
                  <CountrySelect
                    className="textInput"
                    onChange={(e) => {
                      setCountryid(e.id);
                      setCountryname(e.name);
                    }}
                    placeHolder={selectedObj?.shippingaddresscountry}
                  />
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    State
                  </label>
                </div>
                <div className="col-md-7">
                  <StateSelect
                    countryid={countryid}
                    className="textInput"
                    onChange={(e) => {
                      setstateid(e.id);
                      setstate(e.name);
                    }}
                    placeHolder={selectedObj?.shippingaddressstate}
                  />
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    City
                  </label>
                </div>
                <div className="col-md-7">
                  <CitySelect
                    countryid={countryid}
                    stateid={stateid}
                    className="textInput"
                    onChange={(e) => {
                      setcity(e.name);
                    }}
                    placeHolder={selectedObj?.shippingaddresscity}
                  />
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    Address
                  </label>
                </div>
                <div className="col-md-7">
                  <div className="form-floating">
                    <textarea
                      placeHolder={selectedObj?.shippingaddressaddress}
                      className="form-control"
                      id="floatingTextarea2"
                      style={{ height: "70px" }}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    PinCode
                  </label>
                </div>
                <div className="col-md-7">
                  <input
                    type="number"
                    id="inputText"
                    className="form-control textInput"
                    name="pincode"
                    value={pincode}
                    onChange={(e) => {
                      e.preventDefault();
                      setPincode(e.target.value);
                    }}
                    placeholder={selectedObj?.shippingaddresspincode}
                  />
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-4 text-start">
                  <label for="inputText" className="col-form-label label">
                    Phone
                  </label>
                </div>
                <div className="col-md-7">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    name="phone"
                    value={phone1}
                    onChange={(e) => {
                      e.preventDefault();
                      setPhone1(e.target.value);
                    }}
                    placeholder={selectedObj?.shippingaddressphone}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose4}>
                Close
              </Button>
              <Button variant="primary" onClick={updateShippingAddress}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}

          {/* ---------------------------------------------------------------------------- */}
          {/* <div className="row mt-3">
            <div className="col-md-2">
              <label for="inputText" className="col-form-label label">
                Delivery Address
              </label>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  value={deliveryaddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  name="salesdescription"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "70px" }}
                ></textarea>
              </div>
            </div>
          </div> */}

          {/* ------quote---------- */}

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                PO Date
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="textInput customDateInput"
                style={{ outline: "none", paddingLeft: "10px" }}
                required
              />
            </div>
          </div>

          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Purchase Order# *
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
                Quotation Number
              </label>
            </div>
            <div className="col-md-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option?.quote}
                options={podata}
                sx={{ width: 300 }}
                onChange={(e, value) => {
                  // showAddress();
                  setQuoteNoId(value?.quote);
                  setItemData(value.itemdetailsArray);
                  setQuotation(value?.quote);
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
                  <TextField {...params} label="Select Quote" />
                )}
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

          {/* ------Expiry date---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center  pb-2">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Expected Delivery Date
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={deliverydate}
                onChange={(date) => setDeliveryDate(date)}
                // minDate={new Date()}
                // filterDate={() => isDateDisabled(new Date())}
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
                <option value="" disabled>
                  Select
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

          <div className="row ">
            <div className="row text-start mb-3 pt-4">
              <h6>Shipping Address</h6>
            </div>
            <div className="row">
              <div className="col-md-2 text-start ">
                <label for="inputText" className="col-form-label label">
                  Country/Region
                </label>
              </div>
              <div className="col-md-3 ">
                <CountrySelect
                  onChange={(e) => {
                    setCountryid1(e.id);
                    setCountryname1(e.name);
                  }}
                  placeHolder="Select Country"
                />
              </div>

              <div className="col-md-2 offset-1 text-start">
                <label for="inputText" className="col-form-label label">
                  State
                </label>
              </div>
              <div className="col-md-3">
                <StateSelect
                  countryid={countryid1}
                  onChange={(e) => {
                    setstateid1(e.id);
                    setstatename1(e.name);
                  }}
                  placeHolder="Select State"
                />
              </div>
            </div>

            {/* ---------------------------------- */}
            <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
              <div className="col-md-2 text-start">
                <label for="inputText" className="col-form-label label">
                  City
                </label>
              </div>
              <div className="col-md-3">
                <CitySelect
                  countryid={countryid1}
                  className="textInput"
                  stateid={stateid1}
                  onChange={(e) => {
                    setcity1(e.name);
                  }}
                  placeHolder="Select City"
                />
              </div>

              <div className="col-md-2 offset-1 text-start">
                <label for="inputText" className="col-form-label label">
                  Address
                </label>
              </div>
              <div className="col-md-3">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Street 1"
                    id="floatingTextarea2"
                    style={{ height: "70px" }}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    name="address"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-2 text-start">
                <label for="inputText" className="col-form-label label">
                  PinCode
                </label>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  value={pincode1}
                  onChange={(e) => setPincode1(e.target.value)}
                  name="pincode"
                  autocomplete="off"
                />
              </div>
              <div className="col-md-2 offset-1 text-start">
                <label for="inputText" className="col-form-label label">
                  Phone
                </label>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="row text-start mb-3 pt-4">
              <h6>Billing Address</h6>
            </div>
            <div className="row">
              <div className="col-md-2 text-start ">
                <label for="inputText" className="col-form-label label">
                  Country/Region
                </label>
              </div>
              <div className="col-md-3 ">
                <CountrySelect
                  className="textInput"
                  onChange={(e) => {
                    setCountryid(e.id);
                    setCountryname(e.name);
                  }}
                  placeHolder="select country"
                />
              </div>

              <div className="col-md-2 offset-1 text-start">
                <label for="inputText" className="col-form-label label">
                  State
                </label>
              </div>
              <div className="col-md-3">
                <StateSelect
                  countryid={countryid}
                  className="textInput"
                  onChange={(e) => {
                    setstateid(e.id);
                    setstate(e.name);
                  }}
                  placeHolder="Select State"
                />
              </div>
            </div>

            {/* ---------------------------------- */}
            <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
              <div className="col-md-2 text-start">
                <label for="inputText" className="col-form-label label">
                  City
                </label>
              </div>
              <div className="col-md-3">
                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  className="textInput"
                  onChange={(e) => {
                    setcity(e.name);
                  }}
                  placeHolder="select city"
                />
              </div>

              <div className="col-md-2 offset-1 text-start">
                <label for="inputText" className="col-form-label label">
                  Address
                </label>
              </div>
              <div className="col-md-3">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="floatingTextarea2"
                    style={{ height: "70px" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeHolder="Enter Address"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-2 text-start">
                <label for="inputText" className="col-form-label label">
                  Pincode
                </label>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  name="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Select Pincode"
                />
              </div>
              <div className="col-md-2 offset-1 text-start">
                <label for="inputText" className="col-form-label label">
                  Phone
                </label>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  name="phone"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  placeholder="Enter Phone"
                />
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>quantity</th>
                    <th>Rate</th>
                    <th>discount</th>
                    <th>amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {selectedObj[0]?.itemdetailsArray?.map((item, index) => {
                    return (
                      <tr key={item.itemid}>
                        <td>{item.itemdetails}</td>
                        <td>
                          <input
                            type="number"
                            name=""
                            id=""
                            style={{ height: "35px", paddingLeft: "10px" }}
                            onChange={(e) => {
                              handleQunatityChange(e, index);
                            }}
                          />
                        </td>
                        <td>{item.rate}</td>
                        <td>
                          {item.discount} {item.discountunit}
                        </td>
                        <td>{item.amount}</td>
                      </tr>
                    );
                  })} */}

                  {itemData?.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          disabled
                          sx={{ width: 300 }}
                          // name={`itemdetails${index + 1}`}
                          // value={objjj}

                          renderInput={(params) => (
                            <TextField {...params} label={data?.itemdetails} />
                          )}
                        />
                      </td>

                      <td>
                        <input
                          type="Number"
                          className="form-control textInput"
                          style={{ width: "150px", height: "57px" }}
                          min="1"
                          // name={`quantity${index + 1}`}
                          value={data.quantity}
                          onChange={(e) => handleChangeQuantity(e, index)}
                          placeholder={data?.quantity}
                        />
                      </td>

                      <td>
                        <input
                          type="Number"
                          min="0"
                          className="form-control textInput"
                          style={{ width: "180px", height: "60px" }}
                          value={data?.rate}
                          disabled
                        />
                      </td>

                      <td>
                        <div className="row">
                          <div className="col">
                            <div className="input-group flex-nowrap">
                              <input
                                type="Number"
                                min="0"
                                className="form-control textInput"
                                style={{ width: "130px", height: "57px" }}
                                value={data?.discount}
                                disabled
                              />
                              <span
                                className="input-group-text inputgrouptext"
                                id="addon-wrapping"
                              >
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  disabled
                                  placeholder={data?.discountunit}
                                  style={{ height: "57px" }}
                                  // name={`discountunit${index + 1}`}
                                  value={data?.discountunit}
                                  // value={formData[`discountunit${index + 1}`]}
                                  // onChange={(e) => handleChangeDiscountUnit(e, index)}
                                >
                                  {data?.discountunit === "%" ? (
                                    <MenuItem value="%">
                                      {data?.discountunit}
                                    </MenuItem>
                                  ) : (
                                    <MenuItem value="₹">₹</MenuItem>
                                  )}
                                </Select>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <input
                          type="Number"
                          disabled
                          className="form-control textInput"
                          style={{ width: "180px", height: "57px" }}
                          placeholder={data?.amount}
                          value={data?.amount}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
                  <p>₹{selectedObj[0]?.shippingcharges}</p>
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
                      (
                        (subtotal * Number(selectedObj[0]?.sgsttax)) /
                        100
                      ).toFixed(2)
                    )}
                    &nbsp; {`(${selectedObj[0]?.sgsttax}%)`}
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
                      (
                        (subtotal * Number(selectedObj[0]?.cgsttax)) /
                        100
                      ).toFixed(2)
                    )}
                    &nbsp; {`(${selectedObj[0]?.cgsttax}%)`}
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
                      (
                        (subtotal * Number(selectedObj[0]?.igsttax)) /
                        100
                      ).toFixed(2)
                    )}{" "}
                    &nbsp; {`(${selectedObj[0]?.igsttax}%)`}
                  </p>
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
                  onClick={savePurchaseOrder}
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

export default PurchseOrders;
