import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import Button from "@mui/material/Button";
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
import { FaEdit, FaEye } from "react-icons/fa";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  GetCountries,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MdAlternateEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";

function Customer() {
  const fileInputRef = useRef(null);
  const [updateimg, setUpdateImg] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImgUrl(URL.createObjectURL(e.target.files[0]));
      setUpdateImg(true);
    }
  };
  const handlePicChange = () => {
    fileInputRef.current.click();
  };

  const [countryid, setCountryid] = useState(0);
  const [country, setCountry] = useState("");
  const [stateid, setstateid] = useState(0);
  const [state, setState] = useState("");
  const [cityid, setcityid] = useState("");
  const [city, setCity] = useState("");

  const [countryid1, setCountryid1] = useState(0);
  const [country1, setCountry1] = useState("");
  const [stateid1, setstateid1] = useState(0);
  const [state1, setState1] = useState("");
  const [cityid1, setcityid1] = useState("");
  const [city1, setCity1] = useState("");
  const [customerStatus, setCustomerStatus] = useState("Active");

  const [customerdata, setCustomerData] = useState([]);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose3 = () => setShow3(false);
  const handleClose4 = () => setShow4(false);
  const handleClose5 = () => setShow5(false);
  const handleShow = () => setShow(true);
  const handleShow4 = () => setShow4(true);
  const handleShow5 = () => setShow5(true);

  const [show1, setShow1] = useState(false);
  const target1 = useRef(null);

  const [show2, setShow2] = useState(false);
  const target2 = useRef(null);
  const target3 = useRef(null);
  const [search, setSearch] = useState("");

  const [customertype, setCustomertype] = useState("business");
  const handleOptionChange = (event) => {
    setCustomertype(event.target.value);
  };
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [vendordisplayname, setVendorDisplayName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [customerphone, setCustomerPhone] = useState("");
  const [remarks, setRemarks] = useState("");

  // const [msmeFile, setMsmeFile] = useState(null);
  // const [cancelChequeFile, setcancelChequeFile] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [pan, setPan] = useState("");
  // const [gstnumber, setGstNumber] = useState("");
  const [openingbalance, setOpeningBalance] = useState("");
  // const [gst, setGst] = useState("");
  const [paymentterm, setPaymentTerm] = useState("");

  //bankdetails
  // const [type, setType] = useState("");
  // const [bankname, setBankName] = useState("");
  // const [branchname, setBranchName] = useState("");
  // const [ifsccode, setIfscCode] = useState("");
  // const [accountnumber, setAccountNumber] = useState("");

  //billing address
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone1, setPhone1] = useState("");
  const [faxnumber, setFaxnumber] = useState("");

  //shipping address

  const [address1, setAddress1] = useState("");
  const [pincode1, setPincode1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [faxnumber1, setFaxnumber1] = useState("");

  //contactperson details
  const [cFname, setCFname] = useState("");
  const [cLname, setCLname] = useState("");
  const [cemail, setCemail] = useState("");
  const [cphone, setCphone] = useState("");

  //----------------------------------------------------
  const [firstname1, setFirstName1] = useState("");
  const [lastname1, setLastname1] = useState("");
  const [companyname1, setCompanyName1] = useState("");
  const [vendordisplayname1, setVendorDisplayName1] = useState("");
  const [vendorEmail1, setVendorEmail1] = useState("");
  const [customerphone1, setCustomerPhone1] = useState("");
  const [remarks1, setRemarks1] = useState("");

  // const [msmeFile1, setMsmeFile1] = useState(null);
  // const [cancelChequeFile1, setcancelChequeFile1] = useState(null);
  const [documents1, setDocuments1] = useState(null);
  const [pan1, setPan1] = useState("");
  const [gstnumber1, setGstNumber1] = useState("");
  const [openingbalance1, setOpeningBalance1] = useState("");
  const [gst1, setGst1] = useState("");
  const [paymentterm1, setPaymentTerm1] = useState("");

  const [type1, setType1] = useState("");
  const [bankname1, setBankName1] = useState("");
  const [branchname1, setBranchName1] = useState("");
  const [ifsccode1, setIfscCode1] = useState("");
  const [accountnumber1, setAccountNumber1] = useState("");

  //billing address
  const [countryId3, setCountryId3] = useState("");
  const [country3, setCountry3] = useState("");
  const [state3, setState3] = useState("");
  const [stateId3, setStateId3] = useState("");
  const [address3, setAddress3] = useState("");
  const [city3, setCity3] = useState("");
  const [cityId3, setCityId3] = useState("");
  const [pincode3, setPincode3] = useState("");
  const [phone3, setPhone3] = useState("");
  const [faxnumber3, setFaxnumber3] = useState("");

  //shipping address
  const [countryId4, setCountryId4] = useState("");
  const [country4, setCountry4] = useState("");
  const [stateId4, setStateId4] = useState("");
  const [state4, setState4] = useState("");
  const [cityId4, setCityId4] = useState("");
  const [city4, setCity4] = useState("");
  const [address4, setAddress4] = useState("");
  const [pincode4, setPincode4] = useState("");
  const [phone4, setPhone4] = useState("");
  const [faxnumber4, setFaxnumber4] = useState("");

  //contactperson details
  const [cFname1, setCFname1] = useState("");
  const [cLname1, setCLname1] = useState("");
  const [cemail1, setCemail1] = useState("");
  const [cphone1, setCphone1] = useState("");
  const [designation1, setDesignation1] = useState("");
  const [deparment1, setDepartment1] = useState("");

  const successMsg = () => toast("Customer Saved Successfully");
  const failureMsg = () => toast("Something went wrong");

  const [filteredArray, setFillteredArray] = useState([]);
  const [text, setText] = useState("All Customer");

  const [count2, setCount2] = useState(0);

  let formdata = new FormData();
  let formdata2 = new FormData();

  const [salutation, setSalutation] = useState("");

  const handleSalutation = (event) => {
    setSalutation(event.target.value);
  };

  useEffect(() => {
    if (firstname && lastname) {
      const combinations = [
        ` ${salutation} ${firstname} ${lastname}`,
        `${lastname}, ${firstname}`,
        `${firstname.charAt(0)}. ${lastname}`,
        `${firstname} ${lastname.charAt(0)}.`,
      ];
      setAutocompleteOptions(combinations);
    } else {
      setAutocompleteOptions([]);
    }
  }, [firstname, lastname, salutation]);

  const validatePhone = (phone) => {
    const phoneregex = /^[6789]\d{9}$/;
    if (phoneregex.test(phone)) {
      return true;
    } else {
      toast.warning("enter valid mobile number");
    }
  };

  const validateEmail = (email) => {
    const emailregex = /\S+@\S+\.\S+/;
    if (emailregex.test(email)) {
      return true;
    } else {
      toast.warning("enter valid email");
    }
  };
  const [invoices, setInvoices] = useState([]);
  const getAllInvoices = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/invoices/getinvoice"
      );
      if (res.status === 201) {
        console.log("data", res.data);
        setInvoices(res.data);
      }
      if (res.status === 500) {
        // console.log("data", res.data);
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // save vendor data
  const saveCustomerData = async (e) => {
    e.preventDefault();
    if (!customertype) {
      toast("please enter type of customer");
      return;
    }
    if (!firstname || !lastname) {
      toast("please enter first name & second name");
      return;
    }
    if (!vendordisplayname) {
      toast("please enter display name");
      return;
    }
    if (!companyname) {
      toast("please enter company name");
      return;
    }
    if (!vendorEmail) {
      toast("please enter email");
      return;
    }
    if (!customerphone) {
      toast("please enter phone number");
      return;
    }
    if (!pan) {
      toast("please enter pan number");
      return;
    }

    if (!openingbalance) {
      toast("please enter opening balance");
      return;
    }

    if (!paymentterm) {
      toast("please enter payment term");
      return;
    }

    if (!address || !city || !state || !country || !phone1 || !pincode) {
      toast("Please add billing address");
      return;
    }
    if (!address1 || !city1 || !state1 || !country1 || !phone2 || !pincode1) {
      toast("Please add shipping address ");
      return;
    }
    if (!cFname || !cLname || !cemail || !cphone) {
      toast("Please add contact person details");
      return;
    }

    try {
      if (validateEmail(vendorEmail) && validatePhone(customerphone)) {
        formdata.set("customertype", customertype);
        formdata.set("customerfirstname", firstname);
        formdata.set("customerlastname", lastname);
        formdata.set("companyname", companyname);
        formdata.set("customerdisplayname", vendordisplayname);
        formdata.set("customeremail", vendorEmail);
        formdata.set("customerphone", customerphone);
        formdata.set("pan", pan);
        formdata.set("openingbalance", openingbalance);
        formdata.set("paymentterm", paymentterm);
        formdata.set("documents", documents);
        formdata.set("billingaddresscountry", country);
        formdata.set("billingaddressaddress", address);
        formdata.set("billingaddressstate", state);
        formdata.set("billingaddresscity", city);
        // formdata.set("billingaddresscity", stateid);
        formdata.set("billingaddresspincode", pincode);
        formdata.set("billingaddressphone", phone1);
        formdata.set("billingaddressfaxnumber", faxnumber);
        formdata.set("shippingaddresscountry", country1);
        formdata.set("shippingaddressaddress", address1);
        formdata.set("shippingaddresscity", city1);
        formdata.set("shippingaddressstate", state1);
        formdata.set("shippingaddresspincode", pincode1);
        formdata.set("shippingaddressphone", phone2);
        formdata.set("shippingaddressfaxnumber", faxnumber1);
        formdata.set("contactpersonfirstname", cFname);
        formdata.set("contactpersonlastname", cLname);
        formdata.set("contactpersonemail", cemail);
        formdata.set("contactpersonworkphone", cphone);
        formdata.set("remarks", remarks);
        formdata.set("customerstatus", customerStatus);

        const config = {
          url: "/createcustomer",
          method: "post",
          baseURL: "https://engineeringsolutions.net.in/api/customers",
          headers: { "content-type": "multipart/form-data" },
          data: formdata,
        };

        let res = await axios(config);

        if (res.status === 201) {
          setShow(false);
          successMsg();
          getData();
        }
      }
    } catch (error) {
      failureMsg();
    }
  };

  //fetching customer data
  const getData = async () => {
    try {
      let res = await axios.get(
        "https://engineeringsolutions.net.in/api/customers/getcustomer"
      );
      if (res.status === 200) {
        setCustomerData(res.data);
        setFillteredArray(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();

    getAllInvoices();
  }, []);

  //delete vendor by id
  const deleteCustomer = async (id) => {
    try {
      const url =
        "https://engineeringsolutions.net.in/api/customers/deletecustomer";
      const res = await axios.delete(`${url}/${id}`);
      if (res.status === 200) {
        getData();
        toast("Customer deleted..");
      } else {
        toast("Customer not deleted..");
      }
    } catch (error) {
      toast("something went wrong");
    }
  };
  const [selectedItem, setSelectedItem] = useState({});

  //to open offcanvas
  const openOffcanvas = (id) => {
    setShow3(true);
  };

  const sortByName = () => {
    setCustomerData([
      ...customerdata.sort((a, b) =>
        a.customerfirstname.localeCompare(b.customerfirstname)
      ),
    ]);
  };
  const sortByCompanyName = () => {
    setCustomerData([
      ...customerdata.sort((a, b) =>
        a.companyname.localeCompare(b.companyname)
      ),
    ]);
  };
  const sortByOpeningBalance = () => {
    setCustomerData([
      ...customerdata.sort((a, b) => a.openingbalance - b.openingbalance),
    ]);
  };
  const [customertype1, setCustomerType1] = useState("");

  //to update vendor data
  const updateCustomer = async () => {
    // console.log(id);
    try {
      let config = {
        url: `updatecustomer/${selectedItem?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/customers",
        headers: { "content-type": "multipart/form-data" },
        data: {
          cutomertype: customertype1,
          customerfirstname: firstname1,
          customerlastname: lastname1,
          companyname: companyname1,
          customerdisplayname: vendordisplayname1,
          customeremail: vendorEmail1,
          customerphone: customerphone1,
          pan: pan1,
          openingbalance: openingbalance1,
          paymentterm: paymentterm1,
          documents: documents,
          billingaddresscountry: country3,
          billingaddressaddress: address3,
          billingaddresscity: city3,
          billingaddressstate: state3,
          billingaddresspincode: pincode3,
          billingaddressphone: phone3,
          billingaddressfaxnumber: faxnumber3,
          shippingaddresscountry: country4,
          shippingaddressaddress: address4,
          shippingaddresscity: city4,
          shippingaddressstate: state4,
          shippingaddresspincode: pincode4,
          shippingaddressphone: phone4,
          shippingaddressfaxnumber: faxnumber4,
          contactpersonfirstname: cFname1,
          contactpersonlastname: cLname1,
          contactpersonemail: cemail1,
          contactpersonworkphone: cphone1,
          remarks: remarks1,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        toast.success("customer updated successfully...");
      }

      if (res.status === 404) {
        toast("vendor not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [formErrors, setFormErrors] = useState({
    companyname: "",
    vendordisplayname: "",
    vendoremail: "",
    customerphone: "",
    pan: "",
    gstnumber: "",
    openingbalance: "",
    gst: "",
    paymentterm: "",
    accounttype: "",
    bankname: "",
    branchname: "",
    ifsccode: "",
    accountnumber: "",
    billingaddresscountry: "",
    billingaddressaddress: "",
    billingaddresscity: "",
    billingaddressstate: "",
    billingaddresspincode: "",
    billingaddressphone1: "",
    billingaddressfaxnumber: "",
    shippingaddresscountry: "",
    shippingaddressaddress: "",
    shippingaddresscity: "",
    shippingaddressstate: "",
    shippingaddresspincode: "",
    shippingaddressphone: "",
    shippingaddressfaxnumber: "",
    contactfirstname: "",
    contactlastname: "",
    emailaddress: "",
    workphone: "",
    designation: "",
    department: "",
  });

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Customer",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteCustomer(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const changeStatus = async (item) => {
    let status = "";
    if (item?.customerstatus === "Active") {
      status = "Inactive";
    } else {
      status = "Active";
    }
    try {
      let config = {
        url: `updatecustomer/${item?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/customers",
        headers: { "content-type": "multipart/form-data" },
        data: { customerstatus: status },
      };
      const res = await axios(config);
      if (res.status === 200) {
        toast.success("customer status changed");
        getData();
      }

      if (res.status === 404) {
        toast.warning("customer not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterActiveCustomer = () => {
    setFillteredArray(
      customerdata.filter((item) => {
        return item.customerstatus === "Active";
      })
    );
    setShow1(!show1);
    setText("Active Customer");
  };

  const filterInActiveCustomer = () => {
    setFillteredArray(
      customerdata.filter((item) => {
        return item.customerstatus === "Inactive";
      })
    );
    setShow1(!show1);
    setText("Inactive Customer");
  };

  const filterAllCustomer = () => {
    setFillteredArray(customerdata);
    setShow1(!show1);
    setText("All Customer");
  };

  function handleFilter() {
    if (search != "") {
      const filterTable = customerdata.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(search.toLowerCase())
        )
      );
      setFillteredArray([...filterTable]);
    } else {
      setFillteredArray([...customerdata]);
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

  return (
    <div>
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
                    onClick={filterAllCustomer}
                  >
                    All Customer
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={filterActiveCustomer}
                  >
                    Active Customer
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={filterInActiveCustomer}
                  >
                    Inactive Customer
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
                <Dropdown.Item onClick={sortByName}>Name</Dropdown.Item>
                <Dropdown.Item onClick={sortByCompanyName}>
                  Company Name
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByOpeningBalance}>
                  Opening Balance
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
                <th className="text-center">Sl.No.</th>
                <th scope="col" className="text-center">
                  Name
                </th>
                <th scope="col" className="text-center">
                  Company Name
                </th>
                <th scope="col" className="text-center">
                  Email
                </th>
                <th scope="col" className="text-center">
                  Work Phone
                </th>

                <th scope="col" className="text-center">
                  Recivables
                </th>

                <th scope="col" className="text-center">
                  Status
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: "130px" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            {filteredArray.length !== 0 ? (
              <tbody>
                {filteredArray.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td className="text-center font-weight-normal">
                        {index + 1 + usersPerPage * pageNumber}
                      </td>
                      <td className="text-center font-weight-normal">
                        {item.customerfirstname}
                      </td>
                      <td className="text-center font-weight-normal">
                        {item.companyname}
                      </td>
                      <td className="text-center font-weight-normal">
                        {item.customeremail}
                      </td>
                      <td className="text-center font-weight-normal">
                        {item.customerphone}
                      </td>
                      <td className="text-center font-weight-normal">
                        {invoices?.filter(
                          (val) =>
                            val?.customername?._id.toString() ===
                            item?._id.toString()
                        )?.length ? (
                          <>
                            {invoices
                              ?.filter(
                                (val) => val?.customername?._id === item?._id
                              )
                              ?.reduce((acc, data) => {
                                return acc + data.dueamount;
                              }, 0)}
                          </>
                        ) : (
                          <>0</>
                        )}
                      </td>
                      <td className="text-center font-weight-normal">
                        {item.customerstatus === "Active" ? (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => changeStatus(item)}
                          >
                            {item.customerstatus}
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => changeStatus(item)}
                          >
                            {item.customerstatus}
                          </Button>
                        )}
                        {/* <button className={item?.customerstatus==='Active'?"btn btn-primary":"btn btn-secondary"} onClick={()=>changeStatus(item)}>{item?.customerstatus}</button> */}
                      </td>
                      <td className="text-center font-weight-normal">
                        <FaEye
                          onClick={() => {
                            setShow5(true);
                            setSelectedItem(item);
                          }}
                        />
                        <FaEdit
                          onClick={() => {
                            openOffcanvas();
                            setSelectedItem(item);
                          }}
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
                    <h6>There are no customers.</h6>
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

      {/* Off-Canvas--------------------------- */}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "1000px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>New Customer</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <ToastContainer />

            <form
              class="row g-3 needs-validation"
              style={{ width: "100%" }}
              onSubmit={saveCustomerData}
              enctype="multipart/form-data"
            >
              <div className="row g-3 align-items-center">
                <div className="col-md-2">
                  <label for="inputText" className="col-form-label label">
                    Type
                  </label>
                </div>
                <div className="col-md-5">
                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="flexRadioDefault1"
                          type="radio"
                          value="business"
                          checked={customertype === "business"}
                          onChange={handleOptionChange}
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Business
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="flexRadioDefault1"
                          value="individual"
                          checked={customertype === "individual"}
                          onChange={handleOptionChange}
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Individual
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --customer name---- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Primary Contact*
                  </label>
                </div>
                <div className="col-md-10">
                  <div className="row gy-1">
                    <div className="col-md-2  ">
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={salutation}
                        label="Salutation"
                        onChange={handleSalutation}
                        style={{ height: "38px", width: "100px" }}
                      >
                        <MenuItem value="Mr." selected>
                          Mr.
                        </MenuItem>
                        <MenuItem value="Mrs.">Mrs.</MenuItem>
                        <MenuItem value="Ms.">Ms.</MenuItem>
                        <MenuItem value="Miss.">Miss.</MenuItem>
                        <MenuItem value="Dr.">Dr..</MenuItem>
                      </Select>
                    </div>
                    <div className="col-md-5 ">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        name="firstname"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Last Name"
                        name="lastname"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ------company name---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Company Name*
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={companyname}
                    onChange={(e) => setCompanyName(e.target.value)}
                    name="companyname"
                  />
                </div>
              </div>

              {/* ------vendor display name---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Display Name
                  </label>
                </div>
                <div className="col-md-5">
                  {/* <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={vendordisplayname}
                    onChange={(e) => setVendorDisplayName(e.target.value)}
                    name="vendordisplayname"
                  /> */}

                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    size="small"
                    value={vendordisplayname}
                    onChange={(e, newValue) => {
                      setVendorDisplayName(newValue);
                    }}
                    // onChange={(e) => setVendorDisplayName(e.target.value)}
                    options={autocompleteOptions}
                    renderInput={(params) => <TextField {...params} label="" />}
                    style={{ width: "300px" }}
                  />
                </div>
              </div>

              {/* ------vendor email ---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Email
                  </label>
                </div>
                <div className="col-md-5">
                  <div class="input-group flex-nowrap textInput">
                    <span class="input-group-text" id="addon-wrapping">
                      <MdAlternateEmail />
                    </span>
                    <input
                      type="email"
                      class="form-control "
                      value={vendorEmail}
                      onChange={(e) => setVendorEmail(e.target.value)}
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      name="vendoremail"
                    />
                  </div>
                </div>
              </div>

              {/* ------vendor phone number---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Phone
                  </label>
                </div>
                <div className="col-md-5">
                  <div class="input-group flex-nowrap textInput">
                    <span class="input-group-text" id="addon-wrapping">
                      <MdPhone />
                    </span>
                    <input
                      type="tel"
                      class="form-control "
                      maxLength={10}
                      value={customerphone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      name="customerphone"
                    />
                  </div>
                </div>
              </div>

              {/* ----------------Tabs starting---------- */}
              <div className="row my-5">
                <Tabs
                  defaultActiveKey="other"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  {/* -------------other details tab starting---------- */}
                  <Tab eventKey="other" title="Other details">
                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          PAN
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="tel"
                          class="form-control  textInput"
                          value={pan}
                          onChange={(e) => setPan(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Opening Balance
                        </label>
                      </div>
                      <div className="col-md-5">
                        <div class="input-group flex-nowrap textInput">
                          <span class="input-group-text" id="addon-wrapping">
                            INR
                          </span>
                          <input
                            type="text"
                            class="form-control "
                            aria-label="Username"
                            aria-describedby="addon-wrapping"
                            value={openingbalance}
                            onChange={(e) => setOpeningBalance(e.target.value)}
                            name="openingbalance"
                          />
                        </div>
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

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Documents
                        </label>
                      </div>
                      <div className="col-md-5">
                        <div class="input-group mb-3 textInput">
                          <input
                            type="file"
                            class="form-control"
                            id="inputGroupFile02"
                            onChange={(e) => setDocuments(e.target.files[0])}
                          />
                        </div>
                      </div>
                    </div>
                  </Tab>

                  {/* -------------bank details tab starting---------- */}
                  {/* <Tab eventKey="bankdetails" title="Bank details"> */}

                  {/* <div className="row g-3 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Type
                        </label>
                      </div>
                      <div className="col-md-3">
                        <div className="row">
                          <div className="col-md-5 col-3">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                type="radio"
                                value="saving"
                                checked={type === "saving"}
                                onChange={handleRadioChange}
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault1"
                              >
                                Saving
                              </label>
                            </div>
                          </div>
                          <div className="col-md-5 col-3">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value="current"
                                checked={type === "current"}
                                onChange={handleRadioChange}
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault1"
                              >
                                Current
                              </label>
                            </div>
                          </div>
                         
                        </div>
                      </div>
                    </div> */}

                  {/* ---------------------------------- */}

                  {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Bank Name
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          onChange={(e) => setBankName(e.target.value)}
                          value={bankname}
                        />
                      
                      </div>
                    </div> */}

                  {/* ---------------------------------- */}
                  {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Branch Name
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          onChange={(e) => setBranchName(e.target.value)}
                          value={branchname}
                          name="branchname"
                        />
                       
                      </div>
                    </div> */}

                  {/* ---------------------------------- */}
                  {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          IFSC Code
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          onChange={(e) => setIfscCode(e.target.value)}
                          value={ifsccode}
                          name="ifsccode"
                        />
                        
                      </div>
                    </div> */}

                  {/* ---------------------------------- */}
                  {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Account Number
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          onChange={(e) => setAccountNumber(e.target.value)}
                          value={accountnumber}
                          name="accountnumber"
                        />
                      
                      </div>
                    </div>
                  </Tab> */}

                  {/* -------------Address tab starting---------- */}
                  <Tab eventKey="address" title="Address">
                    <div className="row gy-3">
                      <div className="col-md-6 ">
                        <div className="row text-start mb-md-3 mb-0">
                          <h6>Billing Address</h6>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Country/Region
                            </label>
                          </div>
                          <div className="col-md-7">
                            <CountrySelect
                              className="textInput"
                              onChange={(e) => {
                                setCountryid(e.id);
                                setCountry(e.name);
                              }}
                              placeHolder="Select Country"
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              State
                            </label>
                          </div>
                          <div className="col-md-7">
                            <StateSelect
                              countryid={countryid}
                              className="textInput"
                              onChange={(e) => {
                                setstateid(e.id);
                                setState(e.name);
                              }}
                              placeHolder="Select State"
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              City
                            </label>
                          </div>
                          <div className="col-md-7">
                            <CitySelect
                              countryid={countryid}
                              className="textInput"
                              stateid={stateid}
                              onChange={(e) => {
                                setcityid(e);
                                setCity(e.name);
                              }}
                              placeHolder="Select City"
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Address
                            </label>
                          </div>
                          <div className="col-md-7">
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                placeholder="Street 1"
                                id="floatingTextarea2"
                                style={{ height: "70px" }}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                name="address"
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
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
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
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
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div className="row text-start mb-3">
                          <h6>Shipping Address</h6>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Country/Region
                            </label>
                          </div>
                          <div className="col-md-7">
                            <CountrySelect
                              onChange={(e) => {
                                setCountryid1(e.id);
                                setCountry1(e.name);
                              }}
                              placeHolder="Select Country"
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              State
                            </label>
                          </div>
                          <div className="col-md-7">
                            <StateSelect
                              countryid={countryid1}
                              onChange={(e) => {
                                setstateid1(e.id);
                                setState1(e.name);
                              }}
                              placeHolder="Select State"
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              City
                            </label>
                          </div>
                          <div className="col-md-7">
                            <CitySelect
                              countryid={countryid1}
                              className="textInput"
                              stateid={stateid1}
                              onChange={(e) => {
                                setcityid1(e);
                                setCity1(e.name);
                              }}
                              placeHolder="Select City"
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-3">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Address
                            </label>
                          </div>
                          <div className="col-md-7">
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

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              PinCode
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              value={pincode1}
                              onChange={(e) => setPincode1(e.target.value)}
                              name="pincode"
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Phone
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              value={phone2}
                              onChange={(e) => setPhone2(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                      </div>
                    </div>
                  </Tab>

                  {/* ------------contact person tab starting---------- */}

                  <Tab eventKey="contactperson" title="Contact Person">
                    <div className="row overflow-auto">
                      <div className="col-md-12">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">First Name</th>
                              <th scope="col">Last Name</th>
                              <th scope="col">Email Address</th>
                              <th scope="col">Work Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  style={{ width: "180px" }}
                                  onChange={(e) => setCFname(e.target.value)}
                                  value={cFname}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => setCLname(e.target.value)}
                                  value={cLname}
                                  style={{ width: "180px" }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => setCemail(e.target.value)}
                                  value={cemail}
                                  style={{ width: "180px" }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => setCphone(e.target.value)}
                                  value={cphone}
                                  style={{ width: "180px" }}
                                />
                              </td>
                              {/* <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) =>
                                    setDesignation(e.target.value)
                                  }
                                  value={designation}
                                  style={{ width: "180px" }}
                                />
                               
                              </td> */}
                              {/* <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) =>
                                    setDepartment(e.target.value)
                                  }
                                  value={deparment}
                                  style={{ width: "180px" }}
                                />
                                
                              </td> */}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="remarks" title="Remarks">
                    <div className="row">
                      Remarks (for internal use)
                      <br />
                      <div className="col-md-7">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder={selectedItem?.remarks}
                            id="floatingTextarea2"
                            style={{ height: "70px" }}
                            name="remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                <div className="row fixed-bottom mb-2">
                  <div className="col-md-6 col-6">
                    <button
                      type="submit"
                      class="btn btn-primary float-end px-3"
                    >
                      Save
                    </button>
                  </div>
                  <div className="col-md-6 col-6">
                    <button
                      type="button"
                      class="btn btn-outline-info float-start"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* off-canvas End ------------------ */}

      {/* Off-Canvas-2-------------------------- */}

      <Offcanvas
        show={show3}
        onHide={handleClose3}
        placement="end"
        style={{ width: "1000px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>Update Customer</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <ToastContainer />

            <div
              class="row g-3 needs-validation"
              style={{ width: "100%" }}
              // enctype="multipart/form-data"
            >
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Type
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    placeholder={selectedItem.customertype}
                    value={customertype1}
                    onChange={(e) => setCustomerType1(e.target.value)}
                    name="companyname"
                  />
                </div>
              </div>

              {/* --customer name---- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Primary Contact*
                  </label>
                </div>
                <div className="col-md-10">
                  <div className="row gy-1">
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        placeholder={selectedItem?.customerfirstname}
                        value={firstname1}
                        onChange={(e) => setFirstName1(e.target.value)}
                        name="firstname"
                      />
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        value={lastname1}
                        onChange={(e) => setLastname1(e.target.value)}
                        placeholder={selectedItem?.customerlastname}
                        name="lastname"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ------company name---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Company Name*
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder={selectedItem?.companyname}
                    id="inputText"
                    className="form-control textInput"
                    value={companyname1}
                    onChange={(e) => setCompanyName1(e.target.value)}
                    name="companyname"
                  />
                </div>
              </div>

              {/* ------vendor display name---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Display Name
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    placeholder={selectedItem?.customerdisplayname}
                    className="form-control textInput"
                    value={vendordisplayname1}
                    onChange={(e) => setVendorDisplayName1(e.target.value)}
                    name="vendordisplayname"
                  />
                </div>
              </div>

              {/* ------vendor email ---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Email
                  </label>
                </div>
                <div className="col-md-5">
                  <div class="input-group flex-nowrap textInput">
                    <span class="input-group-text" id="addon-wrapping">
                      <img src="../images/email-icon.png" alt="" srcset="" />
                    </span>
                    <input
                      type="email"
                      class="form-control "
                      value={vendorEmail1}
                      onChange={(e) => setVendorEmail1(e.target.value)}
                      placeholder={selectedItem?.customeremail}
                      name="vendoremail"
                    />
                  </div>
                </div>
              </div>

              {/* ------vendor phone number---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Phone
                  </label>
                </div>
                <div className="col-md-5">
                  <div class="input-group flex-nowrap textInput">
                    <span class="input-group-text" id="addon-wrapping">
                      <img src="../images/phone-icon.png" alt="" srcset="" />
                    </span>
                    <input
                      type="tel"
                      class="form-control "
                      maxLength={10}
                      value={customerphone1}
                      onChange={(e) => setCustomerPhone1(e.target.value)}
                      name="customerphone"
                      placeholder={selectedItem?.customerphone}
                    />
                  </div>
                </div>
              </div>

              {/* ----------------Tabs starting---------- */}
              <div className="row my-5">
                <Tabs
                  defaultActiveKey="other"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  {/* -------------other details tab starting---------- */}
                  <Tab eventKey="other" title="Other details">
                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          PAN
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="tel"
                          class="form-control  textInput"
                          value={pan1}
                          onChange={(e) => setPan1(e.target.value)}
                          placeholder={selectedItem?.pan}
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Opening Balance
                        </label>
                      </div>
                      <div className="col-md-5">
                        <div class="input-group flex-nowrap textInput">
                          <span class="input-group-text" id="addon-wrapping">
                            INR
                          </span>
                          <input
                            type="text"
                            class="form-control "
                            value={openingbalance1}
                            onChange={(e) => setOpeningBalance1(e.target.value)}
                            name="openingbalance"
                            placeholder={selectedItem?.openingbalance}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ---------------------------------- */}

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
                          selected={selectedItem?.paymentterm}
                          value={paymentterm1}
                          onChange={(e) => setPaymentTerm1(e.target.value)}
                          name="paymentterm"
                        >
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
                        </select>
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center pb-5">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Documents
                        </label>
                      </div>
                      <div className="col-md-5">
                        {" "}
                        <div class="input-group mb-3 textInput">
                          {updateimg ? (
                            <img
                              src={imgUrl}
                              alt="from0 DB"
                              style={{ width: "250px", height: "120px" }}
                            />
                          ) : (
                            <img
                              src={`https://engineeringsolutions.net.in/Customer/${selectedItem?.documents}`}
                              alt="from DB"
                              style={{ width: "250px", height: "120px" }}
                            />
                          )}
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          &nbsp;&nbsp; &nbsp;&nbsp;
                          <FaEdit onClick={handlePicChange} />
                        </div>
                      </div>
                    </div>
                  </Tab>

                  {/* -------------bank details tab starting---------- */}
                  {/* <Tab eventKey="bankdetails" title="Bank details"> */}
                  {/* ---------------------------------- */}

                  {/* ---------------------------------- */}

                  {/* ---------------------------------- */}

                  {/* ---------------------------------- */}

                  {/* ---------------------------------- */}

                  {/* -------------Address tab starting---------- */}
                  <Tab eventKey="address" title="Address">
                    <div className="row gy-3">
                      <div className="col-md-6 ">
                        <div className="row text-start mb-md-3 mb-0">
                          <h6>Billing Address</h6>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Country/Region
                            </label>
                          </div>
                          <div className="col-md-7">
                            <CountrySelect
                              placeHolder={selectedItem?.billingaddresscountry}
                              className="textInput"
                              onChange={(e) => {
                                setCountryid(e.id);
                                setCountry3(e.name);
                              }}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              State
                            </label>
                          </div>
                          <div className="col-md-7">
                            <StateSelect
                              placeHolder={selectedItem?.billingaddressstate}
                              countryid={countryid}
                              className="textInput"
                              onChange={(e) => {
                                setstateid(e.id);
                                setState3(e.name);
                              }}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              City
                            </label>
                          </div>
                          <div className="col-md-7">
                            <CitySelect
                              placeHolder={selectedItem?.billingaddresscity}
                              countryid={countryid}
                              className="textInput"
                              stateid={stateid}
                              onChange={(e) => {
                                setcityid(e);
                                setCity3(e.name);
                              }}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Address
                            </label>
                          </div>
                          <div className="col-md-7">
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                placeHolder={
                                  selectedItem?.billingaddressaddress
                                }
                                style={{ height: "70px" }}
                                value={address3}
                                onChange={(e) => setAddress3(e.target.value)}
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              PinCode
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              name="pincode"
                              value={pincode3}
                              onChange={(e) => setPincode3(e.target.value)}
                              placeholder={selectedItem?.billingaddresspincode}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Phone
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              name="phone"
                              value={phone3}
                              onChange={(e) => setPhone3(e.target.value)}
                              placeholder={selectedItem?.billingaddressphone}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                      </div>
                      <div className="col-md-6 ">
                        <div className="row text-start mb-3">
                          <h6>Shipping Address</h6>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Country/Region
                            </label>
                          </div>
                          <div className="col-md-7">
                            <CountrySelect
                              onChange={(e) => {
                                setCountryId4(e.id);
                                setCountry4(e.name);
                              }}
                              placeHolder={selectedItem?.shippingaddresscountry}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              State
                            </label>
                          </div>
                          <div className="col-md-7">
                            <StateSelect
                              countryid={countryId4}
                              onChange={(e) => {
                                setStateId4(e.id);
                                setState4(e.name);
                              }}
                              placeHolder={selectedItem?.shippingaddressstate}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              City
                            </label>
                          </div>
                          <div className="col-md-7">
                            <CitySelect
                              countryid={countryId4}
                              className="textInput"
                              stateid={stateId4}
                              onChange={(e) => {
                                setCityId4(e.id);
                                setCity4(e.name);
                              }}
                              placeHolder={selectedItem?.shippingaddresscity}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-3">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Address
                            </label>
                          </div>
                          <div className="col-md-7">
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                placeHolder={
                                  selectedItem?.shippingaddressaddress
                                }
                                id="floatingTextarea2"
                                style={{ height: "70px" }}
                                value={address4}
                                onChange={(e) => setAddress4(e.target.value)}
                                name="address"
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              PinCode
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              value={pincode4}
                              onChange={(e) => setPincode4(e.target.value)}
                              name="pincode"
                              placeholder={selectedItem?.shippingaddresspincode}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Phone
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              value={phone4}
                              onChange={(e) => setPhone4(e.target.value)}
                              placeholder={selectedItem?.shippingaddressphone}
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                      </div>
                    </div>
                  </Tab>

                  {/* ------------contact person tab starting---------- */}

                  <Tab eventKey="contactperson" title="Contact Person">
                    <div className="row overflow-auto">
                      <div className="col-md-12">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">First Name</th>
                              <th scope="col">Last Name</th>
                              <th scope="col">Email Address</th>
                              <th scope="col">Work Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  style={{ width: "180px" }}
                                  onChange={(e) => setCFname1(e.target.value)}
                                  value={cFname1}
                                  placeholder={
                                    selectedItem?.contactpersonfirstname
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => setCLname1(e.target.value)}
                                  value={cLname1}
                                  style={{ width: "180px" }}
                                  placeholder={
                                    selectedItem?.contactpersonlastname
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => setCemail1(e.target.value)}
                                  value={cemail1}
                                  style={{ width: "180px" }}
                                  placeholder={selectedItem?.contactpersonemail}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => setCphone1(e.target.value)}
                                  value={cphone1}
                                  style={{ width: "180px" }}
                                  placeholder={
                                    selectedItem?.contactpersonworkphone
                                  }
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="remarks" title="Remarks">
                    <div className="row">
                      Remarks (for internal use)
                      <br />
                      <div className="col-md-7">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder={selectedItem?.remarks}
                            id="floatingTextarea2"
                            style={{ height: "70px" }}
                            name="remarks"
                            value={remarks1}
                            onChange={(e) => setRemarks1(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                <div className="row fixed-bottom">
                  <div className="col-md-6 col-6">
                    <button
                      onClick={updateCustomer}
                      class="btn btn-primary float-end"
                    >
                      Update
                    </button>
                  </div>
                  <div className="col-md-6 col-6">
                    <button
                      type="button"
                      class="btn btn-outline-info float-start"
                      onClick={() => setShow3(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* off-canvas 2 End ------------------ */}

      {/* Off-Canvas-3-------------------------- */}

      <Offcanvas
        show={show5}
        onHide={handleClose5}
        placement="end"
        style={{ width: "1000px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>Customer Details</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <ToastContainer />

            <div
              class="row g-3 needs-validation"
              style={{ width: "100%" }}
              // enctype="multipart/form-data"
            >
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Type
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={selectedItem.customertype}
                    disabled
                  />
                </div>
              </div>

              {/* --customer name---- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Primary Contact*
                  </label>
                </div>
                <div className="col-md-10">
                  <div className="row gy-1">
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        value={selectedItem?.customerfirstname}
                        disabled
                      />
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        value={selectedItem?.customerlastname}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Status
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={selectedItem?.customerstatus}
                    disabled
                  />
                </div>
              </div>

              {/* ------company name---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Company Name*
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={selectedItem?.companyname}
                    disabled
                  />
                </div>
              </div>

              {/* ------vendor display name---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Display Name
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={selectedItem?.customerdisplayname}
                    disabled
                  />
                </div>
              </div>

              {/* ------vendor email ---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Email
                  </label>
                </div>
                <div className="col-md-5">
                  <div class="input-group flex-nowrap textInput">
                    <span class="input-group-text" id="addon-wrapping">
                      <img src="../images/email-icon.png" alt="" srcset="" />
                    </span>
                    <input
                      type="email"
                      class="form-control "
                      value={selectedItem?.customeremail}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* ------vendor phone number---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Customer Phone
                  </label>
                </div>
                <div className="col-md-5">
                  <div class="input-group flex-nowrap textInput">
                    <span class="input-group-text" id="addon-wrapping">
                      <img src="../images/phone-icon.png" alt="" srcset="" />
                    </span>
                    <input
                      type="tel"
                      class="form-control "
                      maxLength={10}
                      value={selectedItem?.customerphone}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* ----------------Tabs starting---------- */}
              <div className="row my-5">
                <Tabs
                  defaultActiveKey="other"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  {/* -------------other details tab starting---------- */}
                  <Tab eventKey="other" title="Other details">
                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          PAN
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="tel"
                          class="form-control  textInput"
                          value={selectedItem?.pan}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Opening Balance
                        </label>
                      </div>
                      <div className="col-md-5">
                        <div class="input-group flex-nowrap textInput">
                          <span class="input-group-text" id="addon-wrapping">
                            INR
                          </span>
                          <input
                            type="text"
                            class="form-control "
                            value={selectedItem?.openingbalance}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    {/* ---------------------------------- */}

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Payment Term
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="tel"
                          class="form-control  textInput"
                          value={selectedItem?.paymentterm}
                          disabled
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center pb-5">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Documents
                        </label>
                      </div>
                      <div className="col-md-5">
                        {" "}
                        <div class="input-group mb-3 textInput">
                          {updateimg ? (
                            <img
                              src={imgUrl}
                              alt="from0 DB"
                              style={{ width: "250px", height: "120px" }}
                            />
                          ) : (
                            <img
                              src={`https://engineeringsolutions.net.in/Customer/${selectedItem?.documents}`}
                              alt="from DB"
                              style={{ width: "250px", height: "120px" }}
                            />
                          )}
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          &nbsp;&nbsp; &nbsp;&nbsp;
                          {/* <FaEdit onClick={handlePicChange} /> */}
                        </div>
                      </div>
                    </div>
                  </Tab>

                  {/* -------------bank details tab starting---------- */}
                  {/* <Tab eventKey="bankdetails" title="Bank details"> */}
                  {/* ---------------------------------- */}

                  {/* ---------------------------------- */}

                  {/* ---------------------------------- */}

                  {/* ---------------------------------- */}

                  {/* ---------------------------------- */}

                  {/* -------------Address tab starting---------- */}
                  <Tab eventKey="address" title="Address">
                    <div className="row gy-3">
                      <div className="col-md-6 ">
                        <div className="row text-start mb-md-3 mb-0">
                          <h6>Billing Address</h6>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Country/Region
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="tel"
                              class="form-control  textInput"
                              value={selectedItem?.billingaddresscountry}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              State
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="tel"
                              class="form-control  textInput"
                              value={selectedItem?.billingaddressstate}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              City
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="tel"
                              class="form-control  textInput"
                              value={selectedItem?.billingaddresscity}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Address
                            </label>
                          </div>
                          <div className="col-md-7">
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                style={{ height: "70px" }}
                                value={selectedItem?.billingaddressaddress}
                                disabled
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              PinCode
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              name="pincode"
                              value={selectedItem?.billingaddresspincode}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Phone
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              name="phone"
                              value={selectedItem?.billingaddressphone}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                      </div>
                      <div className="col-md-6 ">
                        <div className="row text-start mb-3">
                          <h6>Shipping Address</h6>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Country/Region
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              value={selectedItem?.shippingaddresscountry}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              State
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              name="faxnumber"
                              value={selectedItem?.shippingaddressstate}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              City
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              name="faxnumber"
                              value={selectedItem?.shippingaddresscity}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-3">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Address
                            </label>
                          </div>
                          <div className="col-md-7">
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                id="floatingTextarea2"
                                style={{ height: "70px" }}
                                value={selectedItem?.shippingaddressaddress}
                                disabled
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              PinCode
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              value={selectedItem?.shippingaddresspincode}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                          <div className="col-md-4 text-start">
                            <label
                              for="inputText"
                              className="col-form-label label"
                            >
                              Phone
                            </label>
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              id="inputText"
                              className="form-control textInput"
                              value={selectedItem?.shippingaddressphone}
                              disabled
                            />
                          </div>
                        </div>

                        {/* ---------------------------------- */}
                      </div>
                    </div>
                  </Tab>

                  {/* ------------contact person tab starting---------- */}

                  <Tab eventKey="contactperson" title="Contact Person">
                    <div className="row overflow-auto">
                      <div className="col-md-12">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">First Name</th>
                              <th scope="col">Last Name</th>
                              <th scope="col">Email Address</th>
                              <th scope="col">Work Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  style={{ width: "180px" }}
                                  value={selectedItem?.contactpersonfirstname}
                                  disabled
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  disabled
                                  value={selectedItem?.contactpersonlastname}
                                  style={{ width: "180px" }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  disabled
                                  value={selectedItem?.contactpersonemail}
                                  style={{ width: "180px" }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  value={selectedItem?.contactpersonworkphone}
                                  style={{ width: "180px" }}
                                  disabled
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="remarks" title="Remarks">
                    <div className="row">
                      Remarks (for internal use)
                      <br />
                      <div className="col-md-7">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            disabled
                            id="floatingTextarea2"
                            style={{ height: "70px" }}
                            name="remarks"
                            value={selectedItem?.remarks}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* off-canvas 2 End ------------------ */}
    </div>
  );
}

export default Customer;
