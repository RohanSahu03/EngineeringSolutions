import React, { useState, useRef, useEffect } from "react";
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
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function CreateVendors() {
  const fileInputRef = useRef(null);
  const [updateimg, setUpdateImg] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);


  const fileInputRef1 = useRef(null);
  const [updateimg1, setUpdateImg1] = useState(false);
  const [imgUrl1, setImgUrl1] = useState(null);

  const fileInputRef3 = useRef(null);
  const [updateimg3, setUpdateImg3] = useState(false);
  const [imgUrl3, setImgUrl3] = useState(null);

 
  const fileInputRef2 = useRef(null);
  const [updateimg2, setUpdateImg2] = useState(false);
  const [imgUrl2, setImgUrl2] = useState(null);

  const fileInputRef4 = useRef(null);
  const [updateimg4, setUpdateImg4] = useState(false);
  const [imgUrl4, setImgUrl4] = useState(null);
  
  const [panimg, setPanImg] = useState(null);
  const [gstimg, setGstImg] = useState(null);
  const [cancelchequeimg, setCancelChequeImg] = useState(null);
  const [msmeimg, setMsmeImg] = useState(null);
  const [documentImg,setDocumentImg]=useState(null)


  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === "application/pdf") {
        toast.success("PDF is selected..");
      }
      setImgUrl(URL.createObjectURL(e.target.files[0]));
      setMsmeImg(e.target.files[0])
      setUpdateImg(true);
    }
  };

  const handleFileChange1 = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === "application/pdf") {
        toast.success("PDF is selected..");
      }
      setImgUrl1(URL.createObjectURL(e.target.files[0]));
      setDocumentImg(e.target.files[0])
      setUpdateImg1(true);
    }
  };

  const handleFileChange4 = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === "application/pdf") {
        toast.success("PDF is selected..");
      }
      setImgUrl4(URL.createObjectURL(e.target.files[0]));
      setGstImg(e.target.files[0])
      setUpdateImg4(true);
    }
  };

  
  const handleFileChange2 = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === "application/pdf") {
        toast.success("PDF is selected..");
      }
      setImgUrl2(URL.createObjectURL(e.target.files[0]));
      setCancelChequeImg(e.target.files[0])
      setUpdateImg2(true);
    }
  };


  const handleFileChange3 = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === "application/pdf") {
        toast.success("PDF is selected..");
      }
      setImgUrl3(URL.createObjectURL(e.target.files[0]));
      setPanImg(e.target.files[0]);
      setUpdateImg3(true);
    }
  };


  const handlePicChange = () => {
    fileInputRef.current.click();
  };

  const handlePicChange1 = () => {
    fileInputRef1.current.click();
  };

  const handlePicChange3 = () => {
    fileInputRef3.current.click();
  };

  const handlePicChange4 = () => {
    fileInputRef4.current.click();
  };

  const handlePicChange2 = () => {
    fileInputRef2.current.click();
  };

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

  //billing address
  const [countryid, setCountryid] = useState(0);
  const [countryname, setCountryname] = useState("");
  const [stateid, setstateid] = useState(0);
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");

  //shipping address
  const [countryid1, setCountryid1] = useState(0);
  const [countryname1, setCountryname1] = useState("");
  const [stateid1, setstateid1] = useState(0);
  const [statename1, setstatename1] = useState("");
  const [city1, setcity1] = useState("");

  const [vendordata, setVendordata] = useState([]);
  const navigate = useNavigate();
  console.log("ven", vendordata);

  const [show, setShow] = useState(false);
  const [show3, setShow3] = useState(false);
  const [product, setProduct] = useState([]);

  const handleClose = () => {
    setShow(false);
    setFirstName("");
    setLastname("");
    setCompanyName("");
    setVendorDisplayName("");
    setVendorEmail("");
    setvendorphone("");
    setBankName("");
    setBranchName("");
    setIfscCode("");
    setAccountNumber("");
    setAddress("");
    setPincode("");
    setPhone1("");
    setAddress1("");
    setPincode1("");
    setPhone2("");
    setCFname("");
    setCLname("");
    setCemail("");
    setCphone("");
    setDesignation("");
    setRemarks("");
  };
  const handleClose3 = () => setShow3(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const target1 = useRef(null);

  const [show2, setShow2] = useState(false);
  const target2 = useRef(null);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [vendordisplayname, setVendorDisplayName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorphone, setvendorphone] = useState("");
  const [remarks, setRemarks] = useState("");

  const [gstFile, setGstFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [msmeFile, setMsmeFile] = useState(null);
  const [cancelChequeFile, setcancelChequeFile] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [pan, setPan] = useState("");
  const [gstnumber, setGstNumber] = useState("");
  // const [openingbalance, setOpeningBalance] = useState("");
  // const [gst, setGst] = useState("Select");
  const [paymentterm, setPaymentTerm] = useState("Select Payment Term");

  //bankdetails
  const [type, setType] = useState("");
  const [bankname, setBankName] = useState("");
  const [branchname, setBranchName] = useState("");
  const [ifsccode, setIfscCode] = useState("");
  const [accountnumber, setAccountNumber] = useState("");

  //billing address

  const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone1, setPhone1] = useState("");

  //shipping address

  const [address1, setAddress1] = useState("");
  const [pincode1, setPincode1] = useState("");
  const [phone2, setPhone2] = useState("");

  //contactperson details
  const [cFname, setCFname] = useState("");
  const [cLname, setCLname] = useState("");
  const [cemail, setCemail] = useState("");
  const [cphone, setCphone] = useState("");
  const [designation, setDesignation] = useState("");
  const [deparment, setDepartment] = useState("");

  //----------------------------------------------------
  const [firstname1, setFirstName1] = useState("");
  const [lastname1, setLastname1] = useState("");
  const [companyname1, setCompanyName1] = useState("");
  const [vendordisplayname1, setVendorDisplayName1] = useState("");
  const [vendorEmail1, setVendorEmail1] = useState("");
  const [vendorphone1, setvendorphone1] = useState("");
  const [remarks1, setRemarks1] = useState("");

  // const [msmeFile1, setMsmeFile1] = useState(null);
  // const [cancelChequeFile1, setcancelChequeFile1] = useState(null);
  // const [documents1, setDocuments1] = useState(null);
  const [pan1, setPan1] = useState("");
  const [gstnumber1, setGstNumber1] = useState("");
  const [openingbalance1, setOpeningBalance1] = useState("");
  // const [gst1, setGst1] = useState("");
  const [paymentterm1, setPaymentTerm1] = useState("");

  //bankdetails
  const [type1, setType1] = useState("");
  const [bankname1, setBankName1] = useState("");
  const [branchname1, setBranchName1] = useState("");
  const [ifsccode1, setIfscCode1] = useState("");
  const [accountnumber1, setAccountNumber1] = useState("");

  //billing address
  const [country3, setCountry3] = useState("");
  const [countryId3, setCountryId3] = useState(0);
  const [state3, setState3] = useState("");
  const [stateId3, setStateId3] = useState(0);
  const [address3, setAddress3] = useState("");
  const [city3, setCity3] = useState("");
  const [pincode3, setPincode3] = useState("");
  const [phone3, setPhone3] = useState("");

  //shipping address
  // const [country4, setCountry4] = useState("");
  // const [countryId4, setCountryId4] = useState(0);
  // const [state4, setState4] = useState("");
  // const [stateId4, setStateId4] = useState(0);
  // const [city4, setCity4] = useState("");
  // const [address4, setAddress4] = useState("");
  // const [pincode4, setPincode4] = useState("");
  // const [phone4, setPhone4] = useState("");

  //contactperson details
  const [cFname1, setCFname1] = useState("");
  const [cLname1, setCLname1] = useState("");
  const [cemail1, setCemail1] = useState("");
  const [cphone1, setCphone1] = useState("");
  const [designation1, setDesignation1] = useState("");


  const successMsg = () => toast("Vendor Saved Successfully");
  const failureMsg = () => toast("Something went wrong");
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  let formdata = new FormData();
  let formdata2 = new FormData();

  const validateName = (name) => {
    const re = /^[A-Za-z\s]+$/;
    return re.test(name);
  };
  // save vendor data
  const saveVendorData = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname) {
      toast("please enter first name & second name");
      return;
    }
    // if(!validateName(firstname)){
    //   alert("Invalid First Name");
    // }
    if (firstname.length < 4) {
      toast("First name should be at least 4 characters");
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
    } else if (!/\S+@\S+\.\S+/.test(vendorEmail)) {
      toast("please enter valid email");
      return;
    }
    if (!vendorphone) {
      toast("please enter phone number");
      return;
    } else if (!/^[6789]\d{9}$/.test(vendorphone)) {
      toast("please enter valid phone number");
      return;
    }
    if (!pan) {
      toast("please enter pan number");
      return;
    }
    if (!gstnumber) {
      toast("please enter gst number");
      return;
    } else if (
      !/^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1})$/i.test(
        gstnumber
      )
    ) {
      toast("please enter valid gst number");
      return;
    }
  
    if (!paymentterm) {
      toast("please enter payment term");
      return;
    }
    if (!type || !bankname || !branchname || !ifsccode || !accountnumber) {
      toast("please enter all the bank details");
      return;
    }
    if (!address || !city || !state || !countryname || !phone1 || !pincode) {
      toast("please enter all the billing address details");
      return;
    }
    // if (
    //   !address1 ||
    //   !city1 ||
    //   !statename1 ||
    //   !countryname1 ||
    //   !phone2 ||
    //   !pincode1
    // ) {
    //   toast("please enter all the shipping address details");
    //   return;
    // }
    if (
      !cFname ||
      !cLname ||
      !cemail ||
      !cphone 
    ) {
      toast("please enter all the contact person details");
      return;
    }
    if (!validateIndianBankAccountNumber(accountnumber)) {
      toast("Invalid Bank Account Number");
      return;
    }
    if (!validateIFSCCode(ifsccode)) {
      toast("Invalid IFSC Code");
      return;
    }
    if (!validatePAN(pan)) {
      toast("Invalid PAN");
      return;
    }
    if (!validateGST(gstnumber)) {
      toast("Invalid GST");
      return;
    }
    if (
      !validateIndianMobileNumber(phone1) ||
      !validateIndianMobileNumber(cphone) ||
      !validateIndianMobileNumber(vendorphone)
    ) {
      toast("Invalid Phone Number");
      return;
    }

    formdata.set("vendorfirstname", firstname);
    formdata.set("vendorlastname", lastname);
    formdata.set("companyname", companyname);
    formdata.set("vendordisplayname", vendordisplayname);
    formdata.set("vendoremail", vendorEmail);
    formdata.set("vendorphone", vendorphone);
    formdata.set("pan", pan);
    formdata.set("gstnumber", gstnumber);
    formdata.set("pancard", panFile);
    formdata.set("gstdocument", gstFile);
    formdata.set("msmecertificate", msmeFile);
    formdata.set("cancelcheque", cancelChequeFile);
    // formdata.set("openingbalance", openingbalance);
    formdata.set("paymentterm", paymentterm);
    formdata.set("documents", documents);
    formdata.set("accounttype", type);
    formdata.set("bankname", bankname);
    formdata.set("branchname", branchname);
    formdata.set("ifsccode", ifsccode);
    formdata.set("accountnumber", accountnumber);
    formdata.set("billingaddresscountry", countryname);
    formdata.set("billingaddressaddress", address);
    formdata.set("billingaddresscity", city);
    formdata.set("billingaddressstate", state);
    formdata.set("billingaddresspincode", pincode);
    formdata.set("billingaddressphone", phone1);
    // formdata.set("shippingaddresscountry", countryname1);
    // formdata.set("shippingaddressaddress", address1);
    // formdata.set("shippingaddresscity", city1);
    // formdata.set("shippingaddressstate", statename1);
    // formdata.set("shippingaddresspincode", pincode1);
    // formdata.set("shippingaddressphone", phone2);
    formdata.set("contactfirstname", cFname);
    formdata.set("contactlastname", cLname);
    formdata.set("emailaddress", cemail);
    formdata.set("workphone", cphone);
    formdata.set("designation", designation);
    formdata.set("remarks", remarks);
    try {
      const config = {
        url: "/createvendor",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/vendors",
        headers: { "content-type": "multipart/form-data" },
        data: formdata,
      };

      let res = await axios(config);

      if (res.status === 201) {
        successMsg();
        handleClose();
        getData();
      }
    } catch (error) {
      failureMsg();
    }
  };

  function validateIFSCCode(ifscCode) {
    // IFSC code format: 11 characters, starting with bank code, followed by 0, then branch code
    const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscPattern.test(ifscCode.trim());
  }
  function validateIndianMobileNumber(mobileNumber) {
    const mobilePattern = /^(?:\+91|91)?[789]\d{9}$/;
    return mobilePattern.test(mobileNumber);
  }
  function validatePAN(panNumber) {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(panNumber);
  }

  function validateGST(gstNumber) {
    const gstPattern =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z1-9]{1}[Z]{1}[A-Z1-9]{1}$/;
    return gstPattern.test(gstNumber);
  }

  const [fillteredArray, setFillteredArray] = useState([]);
  //fetching vendor data
  const getData = async () => {
    try {
      let res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendordata(res.data);
        setFillteredArray(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(fillteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //delete vendor by id
  const deleteVendor = async (id) => {
    try {
      console.log(id);
      const url =
        "https://engineeringsolutions.net.in/api/vendors/deletevendor";
      const res = await axios.delete(`${url}/${id}`);
      if (res.status === 200) {
        getData();
        toast("Vendor deleted..");
      } else {
        toast("Vendor not deleted..");  
      }
    } catch (error) {
      toast("something went wrong");
    }
  };
  const [selectedItem, setSelectedItem] = useState({});

  //to open offcanvas
  const openOffcanvas = () => {
    setShow3(true);
    console.log(selectedItem);
  };

  const sortByName = () => {
    setFillteredArray([
      ...vendordata.sort((a, b) =>
        a.vendorfirstname.localeCompare(b.vendorfirstname)
      ),
    ]);
  };
  const sortByCompanyName = () => {
    setFillteredArray([
      ...vendordata.sort((a, b) => a.companyname.localeCompare(b.companyname)),
    ]);
  };
  const sortByOpeningBalance = () => {
    setFillteredArray([
      ...vendordata.sort((a, b) => a.openingbalance - b.openingbalance),
    ]);
  };

  //to update vendor data
  const updateVendor = async (id) => {
    if (cphone1) {
      if (validateIndianMobileNumber(cphone1 === false)) {
        toast("Invalid contact person phone number");
        return;
      }
    }

    if (phone3) {
      if (validateIndianMobileNumber(phone3 === false)) {
        toast("Invalid Billing phone number");
        return;
      }
    }

    // if (phone4) {
    //   if (validateIndianMobileNumber(phone4 === false)) {
    //     toast("Invalid Shipping phone number");
    //     return;
    //   }
    // }

    if (pan1) {
      if (validatePAN(pan1) === false) {
        toast("Invalid PAN");
        return;
      }
    }

    if (gstnumber1) {
      if (validateGST(gstnumber1) === false) {
        toast.warning("Invalid gst number");
        return;
      }
    }

    if (accountnumber1) {
      if (validateIndianBankAccountNumber(accountnumber1) === false) {
        toast.warning("Invalid Bank Account Number");
        return;
      }
    }

    if (ifsccode1) {
      if (validateIFSCCode(ifsccode1) === false) {
        toast.warning("Invalid IFSC Code");
        return;
      }
    }

    formdata2.set("vendorfirstname", firstname1);
    formdata2.set("vendorlastname", lastname1);
    formdata2.set("companyname", companyname1);
    formdata2.set("vendordisplayname", vendordisplayname1);
    formdata2.set("vendoremail", vendorEmail1);
    formdata2.set("vendorphone", vendorphone1);
    formdata2.set("pan", pan1);
    formdata2.set("gstnumber", gstnumber1);
    formdata2.set("msmecertificate", msmeimg);
    formdata2.set("cancelcheque", cancelchequeimg);
    formdata2.set("pancard", panimg);
    formdata2.set("gstdocument", gstimg);
    formdata2.set("paymentterm", paymentterm1);
    formdata2.set("documents", documentImg);
    formdata2.set("accounttype", type1);
    formdata2.set("bankname", bankname1);
    formdata2.set("branchname", branchname1);
    formdata2.set("ifsccode", ifsccode1);
    formdata2.set("accountnumber", accountnumber1);
    formdata2.set("billingaddresscountry", country3);
    formdata2.set("billingaddressaddress", address3);
    formdata2.set("billingaddresscity", city3);
    formdata2.set("billingaddressstate", state3);
    formdata2.set("billingaddresspincode", pincode3);
    formdata2.set("billingaddressphone", phone3);

    // formdata2.set("shippingaddresscountry", country4);
    // formdata2.set("shippingaddressaddress", address4);
    // formdata2.set("shippingaddresscity", city4);
    // formdata2.set("shippingaddressstate", state4);
    // formdata2.set("shippingaddresspincode", pincode4);
    // formdata2.set("shippingaddressphone", phone4);
    formdata2.set("contactfirstname", cFname1);
    formdata2.set("contactlastname", cLname1);
    formdata2.set("emailaddress", cemail1);
    formdata2.set("workphone", cphone1);
    formdata2.set("designation", designation1);
    formdata2.set("remarks", remarks1);

    try {
      const res = await axios.put(
        `https://engineeringsolutions.net.in/api/vendors/updatevendor/${id}`,
        formdata2
      );
      if (res.status === 200) {
        toast("vendor updated successfully..");
        handleClose3();
      }
      if (res.status === 404) {
        toast("vendor not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMsmeFileChange = (e) => {
    setMsmeFile(e.target.files[0]);
  };

  const handlePanFileChange = (e) => {
    setPanFile(e.target.files[0]);
  };

  const handleGstFileChange = (e) => {
    setGstFile(e.target.files[0]);
    console.log("gstFile", gstFile);
  };

  const handlecancelchequeFileChange = (e) => {
    setcancelChequeFile(e.target.files[0]);
  };

  const handleDocumentChange = (e) => {
    setDocuments(e.target.files[0]);
  };

  const handleRadioChange = (event) => {
    setType(event.target.value);
  };

  

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Vendor",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteVendor(id);
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
  const [search, setSearch] = useState([]);
  function handleFilter() {
    if (search != "") {
      const filterTable = vendordata.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(search.toLowerCase())
        )
      );
      setFillteredArray([...filterTable]);
    } else {
      setFillteredArray([...vendordata]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  function validateIndianBankAccountNumber(accountNumber) {
    // Convert the input to a string to handle different input types
    const accountNumStr = String(accountNumber);

    const regex = /^[0-9]+$/;

    if (
      accountNumStr.length >= 9 &&
      accountNumStr.length <= 18 &&
      regex.test(accountNumStr)
    ) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div>
      <div className="row border py-3 d-flex ">
        <div className="col-md-4 col-6">
          <Button
            variant="transparent"
            className="float-start"
            ref={target1}
            onClick={() => setShow1(!show1)}
          >
            All Vendors <TiArrowSortedDown />
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
                  <li class="list-group-item list-group-item-action">
                    Active Vendors
                  </li>
                  <li class="list-group-item list-group-item-action">
                    Inactive Vendors
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

        <div className="col-md-4 col-6 d-flex justify-content-end">
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
                {/* <Dropdown.Item onClick={sortByOpeningBalance}>
                  Opening Balance
                </Dropdown.Item> */}
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
                  GST number
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            {fillteredArray.length !== 0 ? (
              <tbody>
                {fillteredArray
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">{item.vendorfirstname}</td>
                        <td className="text-center">{item.companyname}</td>
                        <td className="text-center">{item.vendoremail}</td>
                        <td className="text-center">{item.customerphone}</td>
                        <td className="text-center">{item.gstnumber}</td>
              
                        <td className="text-center">
                          <FaEdit
                            onClick={() => {
                              openOffcanvas();
                              setSelectedItem(item);
                            }}
                          />
                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/purchase/vendors/view", {
                                state: item,
                              })
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
                    <h6>There are no vendors.</h6>
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

      {/* Off-Canvas--------------------------- */}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "1000px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>New Vendor</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <ToastContainer />

            <form
              class="row g-3 needs-validation"
              style={{ width: "100%" }}
              onSubmit={(e) => saveVendorData(e)}
              enctype="multipart/form-data"
            >
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
                        value={firstname}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Remove any non-alphabetic characters
                          const filteredValue = inputValue.replace(
                            /[^A-Za-z\s]/g,
                            ""
                          );
                          setFirstName(filteredValue);
                        }}
                        name="firstname"
                        pattern="[A-Za-z\s]*"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        value={lastname}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Remove any non-alphabetic characters
                          const filteredValue = inputValue.replace(
                            /[^A-Za-z\s]/g,
                            ""
                          );
                          setLastname(filteredValue);
                        }}
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
                    Vendor Display Name
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={vendordisplayname}
                    onChange={(e) => setVendorDisplayName(e.target.value)}
                    name="vendordisplayname"
                  />
                </div>
              </div>

              {/* ------vendor email ---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Vendor Email
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
                    Vendor Phone
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
                      value={vendorphone}
                      onChange={(e) => setvendorphone(e.target.value)}
                      name="vendorphone"
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
                      <div className="col-md-3 text-start">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload PAN
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handlePanFileChange}
                            multiple
                          />
                        </Button>
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          GST Number
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          value={gstnumber}
                          onChange={(e) => setGstNumber(e.target.value)}
                          name="gstnumber"
                        />
                      </div>
                      <div className="col-md-3 text-start">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload GST
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleGstFileChange}
                            multiple
                          />
                        </Button>
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          MSME registration document
                        </label>
                      </div>
                      <div className="col-md-5">
                        <div class="input-group mb-3 textInput">
                          <input
                            type="file"
                            class="form-control"
                            id="inputGroupFile02"
                            onChange={handleMsmeFileChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Cancel Cheque
                        </label>
                      </div>
                      <div className="col-md-5">
                        <div class="input-group mb-3 textInput">
                          <input
                            type="file"
                            class="form-control"
                            id="inputGroupFile02"
                            onChange={handlecancelchequeFileChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                            type="number"
                            class="form-control "
                            aria-label="Username"
                            aria-describedby="addon-wrapping"
                            value={openingbalance}
                            onChange={(e) => setOpeningBalance(e.target.value)}
                            name="openingbalance"
                          />
                        </div>
                      </div>
                    </div> */}

                    {/* ---------------------------------- */}
                    {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          GST
                        </label>
                      </div>
                      <div className="col-md-5">
                        <select
                          className="form-select textInput"
                          id="inputGroupSelect03"
                          aria-label="Example select with button addon"
                          value={gst}
                          onChange={(e) => setGst(e.target.value)}
                          name="gst"
                        >
                          <option value={gst}>{gst}</option>
                          <option value="5%">5%</option>
                          <option value="10%">10%</option>
                          <option value="15%">15%</option>
                          <option value="20%">20%</option>
                          <option value="25%">25%</option>
                        </select>
                      </div>
                    </div> */}

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
                          <option value={paymentterm}>{paymentterm}</option>
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
                            onChange={handleDocumentChange}
                          />
                        </div>
                      </div>
                    </div>
                  </Tab>

                  {/* -------------bank details tab starting---------- */}
                  <Tab eventKey="bankdetails" title="Bank details">
                    {/* ---------------------------------- */}

                    <div className="row g-3 align-items-center">
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
                    </div>

                    {/* ---------------------------------- */}

                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                  </Tab>

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
                                setCountryname(e.name);
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
                                setstate(e.name);
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
                              stateid={stateid}
                              className="textInput"
                              onChange={(e) => {
                                setcity(e.name);
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
                              autocomplete="off"
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
                      {/* <div className="col-md-6 ">
                        <div className="row text-start mb-3">
                          <h6>Shipping Address</h6>
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                                setCountryname1(e.name);
                              }}
                              placeHolder="Select Country"
                            />
                          </div>
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                                setstatename1(e.name);
                              }}
                              placeHolder="Select State"
                            />
                          </div>
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                                setcity1(e.name);
                              }}
                              placeHolder="Select City"
                            />
                          </div>
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-3">
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
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                              autocomplete="off"
                            />
                          </div>
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                        </div> */}
                      {/* </div> */}
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
                              <th scope="col">Designation</th>
                      
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
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    // Remove any non-alphabetic characters
                                    const filteredValue = inputValue.replace(
                                      /[^A-Za-z\s]/g,
                                      ""
                                    );
                                    setCFname(filteredValue);
                                  }}
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
                                  type="number"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => setCphone(e.target.value)}
                                  value={cphone}
                                  style={{ width: "180px" }}
                                  min={10}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const filteredValue = inputValue.replace(
                                      /[^A-Za-z\s]/g,
                                      ""
                                    );
                                    setDesignation(filteredValue);
                                  }}
                                  value={designation}
                                  style={{ width: "180px" }}
                                />
                              </td>
                              {/* <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    // Remove any non-alphabetic characters
                                    const filteredValue = inputValue.replace(
                                      /[^A-Za-z\s]/g,
                                      ""
                                    );
                                    setDepartment(filteredValue);
                                  }}
                                  value={deparment}
                                  style={{ width: "180px" }}
                                  pattern="[A-Za-z]+"
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
                            placeholder="Street 1"
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
                <div className="row">
                  <div className="col-md-6 col-6">
                    <button type="submit" class="btn btn-primary float-end">
                      Save
                    </button>
                  </div>
                  <div className="col-md-6 col-6">
                    <button
                      type="button"
                      class="btn btn-outline-info float-start"
                      onClick={() => handleClose()}
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
            <h3>Update Vendor</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <ToastContainer />

            <div class="row g-3 needs-validation" style={{ width: "100%" }}>
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
                        value={firstname1}
                        onChange={(e) => setFirstName1(e.target.value)}
                        name="firstname"
                        placeHolder={selectedItem?.vendorfirstname}
                      />
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        value={lastname1}
                        onChange={(e) => setLastname1(e.target.value)}
                        placeHolder={selectedItem?.vendorlastname}
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
                    value={companyname1}
                    onChange={(e) => setCompanyName1(e.target.value)}
                    placeHolder={selectedItem?.companyname}
                  />
                </div>
              </div>

              {/* ------vendor display name---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Vendor Display Name
                  </label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    value={vendordisplayname1}
                    onChange={(e) => setVendorDisplayName1(e.target.value)}
                    placeHolder={selectedItem?.vendordisplayname}
                  />
                </div>
              </div>

              {/* ------vendor email ---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Vendor Email
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
                      placeHolder={selectedItem?.vendoremail}
                    />
                  </div>
                </div>
              </div>

              {/* ------vendor phone number---------- */}
              <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                <div className="col-md-2 text-start">
                  <label for="inputText" className="col-form-label label">
                    Vendor Phone
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
                      value={vendorphone1}
                      onChange={(e) => setvendorphone1(e.target.value)}
                      placeHolder={selectedItem?.vendorphone}
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
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border">
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
                          placeHolder={selectedItem?.pan}
                          autocomplete="off"
                        />
                      </div>
                      <div className="col-md-5 ">
                        {updateimg3 ? (
                          <img
                            src={imgUrl3}
                            alt="from0 DB"
                            style={{ width: "200px", height: "120px" }}
                          />
                        ) : (
                          <img
                            src={`https://engineeringsolutions.net.in/Vendor/${selectedItem?.pancard}`}
                            alt="PAN"
                            style={{ width: "200px", height: "120px" }}
                          />
                        )}
                        <input
                          type="file"
                          accept="application/pdf, image/*"
                          ref={fileInputRef3}
                          style={{ display: "none" }}
                          onChange={handleFileChange3}
                        />
                        &nbsp;&nbsp; &nbsp;&nbsp;
                        <FaEdit onClick={handlePicChange3} />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          GST Number
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          value={gstnumber1}
                          onChange={(e) => setGstNumber1(e.target.value)}
                          placeHolder={selectedItem?.gstnumber}
                          autocomplete="off"
                        />
                      </div>
                      <div className="col-md-5 ">
                        {updateimg4 ? (
                          <img
                            src={imgUrl4}
                            alt="GST"
                            style={{ width: "200px", height: "120px" }}
                          />
                        ) : (
                          <img
                            src={`https://engineeringsolutions.net.in/Vendor/${selectedItem?.gstdocument}`}
                            alt="GST"
                            style={{ width: "200px", height: "120px" }}
                          />
                        )}
                        <input
                          type="file"
                          accept="application/pdf, image/*"
                          ref={fileInputRef4}
                          style={{ display: "none" }}
                          onChange={handleFileChange4}
                        />
                        &nbsp;&nbsp; &nbsp;&nbsp;
                        <FaEdit onClick={handlePicChange4} />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div
                      className="row mt-md-2 mt-1 g-md-3 g-1 align-items-start"
                      style={{ height: "150px" }}
                    >
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          MSME registration document
                        </label>
                      </div>
                      <div className="col-md-4">
                        <div class="input-group mb-3 textInput">
                          {updateimg ? (
                            <img
                              src={imgUrl}
                              alt="from0 DB"
                              style={{ width: "200px", height: "120px" }}
                            />
                          ) : (
                            <img
                              src={`https://engineeringsolutions.net.in/Vendor/${selectedItem?.msmecertificate}`}
                              alt="from DB"
                              style={{ width: "200px", height: "120px" }}
                            />
                          )}
                          <input
                            type="file"
                            accept="application/pdf, image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          &nbsp;&nbsp; &nbsp;&nbsp;
                          <FaEdit onClick={handlePicChange} />
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <label for="inputText" className="col-form-label label">
                          Cancel Cheque
                        </label>
                      </div>
                      <div className="col-md-4">
                        <div class="input-group mb-3 textInput">
                          {updateimg2 ? (
                            <img
                              src={imgUrl2}
                              alt="from0 DB"
                              style={{ width: "200px", height: "120px" }}
                            />
                          ) : (
                            <img
                              src={`https://engineeringsolutions.net.in/Vendor/${selectedItem?.cancelcheque}`}
                              alt="from DB"
                              style={{ width: "200px", height: "120px" }}
                            />
                          )}
                          <input
                            type="file"
                            ref={fileInputRef2}
                            accept="application/pdf, image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange2}
                          />
                          &nbsp;&nbsp; &nbsp;&nbsp;
                          <FaEdit onClick={handlePicChange2} />
                        </div>
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
              
            </div> */}

                    {/* ---------------------------------- */}
                    {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                            value={openingbalance1}
                            onChange={(e) => setOpeningBalance1(e.target.value)}
                            placeHolder={selectedItem?.openingbalance}
                          />
                        </div>
                      </div>
                    </div> */}

                    {/* ---------------------------------- */}
                    {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          GST
                        </label>
                      </div>
                      <div className="col-md-5">
                        <select
                          className="form-select textInput"
                          id="inputGroupSelect03"
                          aria-label="Example select with button addon"
                          value={gst1}
                          onChange={(e) => setGst1(e.target.value)}
                        >
                          <option value={gst1 || selectedItem?.gst}>
                            {gst1 || selectedItem?.gst}
                          </option>
                          <option value="5%">5%</option>
                          <option value="10%">10%</option>
                          <option value="15%">15%</option>
                          <option value="20%">20%</option>
                          <option value="25%">25%</option>
                        </select>
                      </div>
                    </div> */}

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
                          value={paymentterm1}
                          onChange={(e) => setPaymentTerm1(e.target.value)}
                          id="inputGroupSelect03"
                          aria-label="Example select with button addon"
                          placeHolder={selectedItem?.paymentterm}
                        >
                          <option
                            value={paymentterm1 || selectedItem?.paymentterm}
                          >
                            {paymentterm1 || selectedItem?.paymentterm}
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

                    {/* ---------------------------------- */}
                    <div
                      className="row mt-md-2 mt-1 g-md-3 g-1 align-items-start"
                      style={{ height: "150px" }}
                    >
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Documents
                        </label>
                      </div>
                      <div className="col-md-5">
                        <div class="input-group mb-3 textInput">
                          {updateimg1 ? (
                            <img
                              src={imgUrl1}
                              alt="from0 DB"
                              style={{ width: "200px", height: "120px" }}
                            />
                          ) : (
                            <img
                              src={`https://engineeringsolutions.net.in/Vendor/${selectedItem?.documents}`}
                              alt="from DB"
                              style={{ width: "200px", height: "120px" }}
                            />
                          )}
                          <input
                            type="file"
                            ref={fileInputRef1}
                            accept="application/pdf, image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange1}
                          />
                          &nbsp;&nbsp; &nbsp;&nbsp;
                          <FaEdit onClick={handlePicChange1} />
                        </div>
                      </div>
                    </div>
                  </Tab>

                  {/* -------------bank details tab starting---------- */}
                  <Tab eventKey="bankdetails" title="Bank details">
                    {/* ---------------------------------- */}

                    <div className="row g-3 align-items-center">
                      <div className="col-md-2 text-start">
                        <label for="inputText" className="col-form-label label">
                          Type
                        </label>
                      </div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          id="inputText"
                          className="form-control textInput"
                          onChange={(e) => setType(e.target.value)}
                          value={type}
                          placeHolder={selectedItem?.accounttype}
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}

                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                          onChange={(e) => setBankName1(e.target.value)}
                          value={bankname1}
                          placeHolder={selectedItem?.bankname}
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                          onChange={(e) => setBranchName1(e.target.value)}
                          value={branchname1}
                          placeHolder={selectedItem?.branchname}
                          autocomplete="off"
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                          onChange={(e) => setIfscCode1(e.target.value)}
                          value={ifsccode1}
                          placeHolder={selectedItem?.ifsccode}
                          autocomplete="off"
                        />
                      </div>
                    </div>

                    {/* ---------------------------------- */}
                    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                          onChange={(e) => setAccountNumber1(e.target.value)}
                          value={accountnumber1}
                          placeHolder={selectedItem?.accountnumber}
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </Tab>

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
                                setCountry3(e.name);
                              }}
                              placeHolder={selectedItem?.billingaddresscountry}
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
                              countryid={countryId3}
                              className="textInput"
                              onChange={(e) => {
                                setStateId3(e.id);
                                setState3(e.name);
                              }}
                              placeHolder={selectedItem?.billingaddressstate}
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
                              countryid={countryId3}
                              className="textInput"
                              stateid={stateId3}
                              onChange={(e) => {
                                setCity3(e.name);
                              }}
                              placeHolder={selectedItem?.billingaddresscity}
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
                                value={address3}
                                onChange={(e) => setAddress3(e.target.value)}
                                placeHolder={
                                  selectedItem?.billingaddressaddress
                                }
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
                              placeHolder={selectedItem?.billingaddresspincode}
                              autocomplete="off"
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
                              placeHolder={selectedItem?.billingaddressphone}
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div className="col-md-6 ">
                        <div className="row text-start mb-3">
                          <h6>Shipping Address</h6>
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                                setCity4(e.name);
                              }}
                              placeHolder={selectedItem?.shippingaddresscity}
                            />
                          </div>
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-3">
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
                              ></textarea>
                            </div>
                          </div>
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                              placeHolder={selectedItem?.shippingaddresspincode}
                            />
                          </div>
                        </div> */}

                      {/* ---------------------------------- */}
                      {/* <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
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
                              placeHolder={selectedItem?.shippingaddressphone}
                            />
                          </div>
                        </div>
                      </div> */}
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
                              <th scope="col">Designation</th>
                           
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
                                  placeHolder={selectedItem?.contactfirstname}
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
                                  placeHolder={selectedItem?.contactlastname}
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
                                  placeHolder={selectedItem?.emailaddress}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => setCphone1(e.target.value)}
                                  value={cphone1}
                                  style={{ width: "180px" }}
                                  placeHolder={selectedItem?.workphone}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const filteredValue = inputValue.replace(
                                      /[^A-Za-z\s]/g,
                                      ""
                                    );
                                    setDesignation1(filteredValue);
                                  }}
                                  value={designation1}
                                  style={{ width: "180px" }}
                                  placeHolder={selectedItem?.designation}
                                />
                              </td>
                              {/* <td>
                                <input
                                  type="text"
                                  id="inputText"
                                  className="form-control"
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const filteredValue = inputValue.replace(
                                      /[^A-Za-z\s]/g,
                                      ""
                                    );
                                    setDepartment1(e.target.value);
                                  }}
                                  value={deparment1}
                                  style={{ width: "180px" }}
                                  placeHolder={selectedItem?.department}
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
                            placeHolder={selectedItem?.remarks}
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
                <div className="row">
                  <div className="col-md-6 col-6">
                    <button
                      onClick={() => updateVendor(selectedItem._id)}
                      class="btn btn-primary float-end"
                    >
                      Update
                    </button>
                  </div>
                  <div className="col-md-6 col-6">
                    <button
                      type="button"
                      class="btn btn-outline-info float-start"
                      onClick={() => handleClose3()}
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
    </div>
  );
}

export default CreateVendors;
