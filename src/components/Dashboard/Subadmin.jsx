import React, { useEffect, useMemo, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "../../css/dashboard/quote.css";
import Dropdown from "react-bootstrap/Dropdown";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { TiArrowSortedDown } from "react-icons/ti";
import Overlay from "react-bootstrap/Overlay";
import ReactPaginate from "react-paginate";
const moment = require("moment");

function Subadmin() {
  const navigate = useNavigate();
  const [companyname, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [selectedobj, setSelectedObj] = useState({});
  //edit
  const [companyname1, setCompanyName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");

  useEffect(() => {
    setCompanyName1(selectedobj?.companyname);
    setEmail1(selectedobj?.email);
    setPhone1(selectedobj?.mobileno);
    setCheckboxse1({
      dashboard: selectedobj?.dashboard,
      items: selectedobj?.items,
      subadmin: selectedobj?.subadmin,
      sales: selectedobj?.sales,
      purchase: selectedobj?.purchase,
      master: selectedobj?.master,
      inventory: selectedobj?.inventory,
    });
  }, [selectedobj]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [checkboxes, setCheckboxes] = useState({
    dashboard: false,
    items: false,
    subadmin: false,
    sales: false,
    purchase: false,
    master: false,
    inventory: false
  });
  const [checkboxes1, setCheckboxse1] = useState({});

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChange1 = (event) => {
    const { name, checked } = event.target;
    setCheckboxse1((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const [show1, setShow1] = useState(false);
  const [text, setText] = useState("All Users");
  const target1 = useRef(null);
  const handleClose = () => {
    setShow(false);
    setCheckboxes({
      dashboard: false,
      items: false,
      subadmin: false,
      sales: false,
      purchase: false,
      master:false,
      inventory:false
    });
    setCompanyName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => {
    setShow4(!show4);
  };
  const handleShow4 = () => {
    setShow4(true);
    //   getAllCustomer();
  };
  const handleClose2 = () => {
    setShow2(!show2);
  };
  const handleClose3 = () => {
    setShow3(false);
  };
  const handleShow = () => {
    setShow(true);
    //   getAllCustomer();
  };
  const [filteredArray, setFillteredArray] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Quotation",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteUser(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/user/deleteuser/${id}`
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        getAllUsers();
      }
      if (res.status === 404) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [search, setSearch] = useState("");
  function handleFilter() {
    if (search != "") {
      const filterTable = userData.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(search.toLowerCase())
        )
      );
      setFillteredArray([...filterTable]);
    } else {
      setFillteredArray([...userData]);
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

  const validatePassword = (password) => {
    const passwordregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;
    if (passwordregex.test(password)) {
      return true;
    } else {
      toast.warning("enter valid password");
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/user/allusers"
      );
      if (res.status === 201) {
        // console.log("data", res.data);
        setUserData(res.data);
        setFillteredArray(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formData = new FormData();

  const createSubadmin = async () => {
    if (!email) {
      toast.warning("Email Id is required");
      return;
    }
    if (!password) {
      toast.warning("Password is required");
      return;
    }
    if (!companyname) {
      toast.warning("Company name is required");
      return;
    }
    if (!phone) {
      toast.warning("Phone number is required");
      return;
    }
    try {
      if (
        validateEmail(email) &&
        validatePhone(phone) &&
        validatePassword(password)
      ) {
        formData.set("companyname", companyname);
        formData.set("email", email);
        formData.set("mobileno", phone);
        formData.set("password", password);
        formData.set("subadmin", checkboxes.subadmin);
        formData.set("dashboard", checkboxes.dashboard);
        formData.set("items", checkboxes.items);
        formData.set("sales", checkboxes.sales);
        formData.set("purchase", checkboxes.purchase);
        formData.set("inventory", checkboxes.inventory);
        formData.set("master", checkboxes.master);
      }
      const config = {
        url: "/register",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/user",
        headers: { "content-type": "application/json" },
        data: formData,
      };
      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Subadmin created successfully");
        handleClose();
      }
      if (res.status === 409) {
        toast.error("Email Id already exists");
      }
      if (res.status === 500) {
        toast.warning("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formData1 = new FormData();
  const updateSubadmin = async (id) => {
    formData1.set("companyname", companyname1);
    formData1.set("email", email1);
    formData1.set("mobileno", phone1);
    formData1.set("subadmin", checkboxes1?.subadmin);
    formData1.set("dashboard", checkboxes1?.dashboard);
    formData1.set("items", checkboxes1?.items);
    formData1.set("sales", checkboxes1?.sales);
    formData1.set("purchase", checkboxes1?.purchase);
    formData1.set("inventory", checkboxes1?.inventory);
    formData1.set("master", checkboxes1?.master);
 
    try {
      const config = {
        url: `/updatesubadmin/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/user",
        headers: { "content-type": "application/json" },
        data: formData1,
      };
      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Subadmin updated successfully");
        handleClose2();
      } else if (res.status === 400) {
        toast.error("User Not Found..");
      } else {
        toast.warning("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filterAdmin = () => {
    setFillteredArray(userData.filter((item) => item.type === "ADMIN"));
    setText("Admin Users");
    handleClose4();
  };

  const filterSubadmin = () => {
    setFillteredArray(userData.filter((item) => item.type === "SUBADMIN"));
    setText("Subadmin Users");
    handleClose4();
  };
  const filterAll = () => {
    setFillteredArray(userData);
    setText("All Users");
    handleClose4();
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
            onClick={() => setShow4(!show4)}
          >
            {text} <TiArrowSortedDown />
          </Button>
          <Overlay target={target1.current} show={show4} placement="bottom">
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
                    onClick={filterAll}
                  >
                    All Users
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={filterAdmin}
                  >
                    Admin User
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={filterSubadmin}
                  >
                    Subadmin User
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
                  Created At
                </th>
                <th scope="col" className="text-center">
                  Company Name
                </th>
                <th scope="col" className="text-center">
                  Email Id
                </th>
                <th scope="col" className="text-center">
                  Phone
                </th>
                <th scope="col" className="text-center">
                  Type
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
                            {moment(item.createdAt).format(
                              "DD-MM-YYYY  HH:mm:ss"
                            )}
                          </td>
                          <td className="text-center">{item.companyname}</td>
                          <td className="text-center"> {item.email}</td>
                          <td className="text-center">{item.mobileno}</td>
                          <td className="text-center">{item.type}</td>
                          <td className="text-center">
                            <FaEye
                              onClick={() => {
                                setSelectedObj(item);
                                setShow3(true);
                              }}
                            />{" "}
                            <FaEdit
                              onClick={() => {
                                setSelectedObj(item);
                                setShow2(true);
                              }}
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
                      src="../images/emptybox.jpg"
                      alt=""
                      srcset=""
                      style={{
                        width: "200px",
                        height: "200px",
                        opacity: "0.4",
                      }}
                    />
                    <h6>There are no Users.</h6>
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
          <Offcanvas.Title>Create Subadmin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="w-100 h-100  d-flex justify-content-center align-items-center">
            <div className="border p-4">
              <div>
                <TextField
                  label="Company name"
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={companyname}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <TextField
                  label="Email"
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <TextField
                  label="Password"
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className="mt-3">
                <TextField
                  label="Phone"
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Box
                component="section"
                sx={{ p: 2, border: "1px solid grey" }}
                className="mt-3"
              >
                <h6>Modules</h6>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes.dashboard}
                      onChange={handleChange}
                      name="dashboard"
                    />
                  }
                  label="Dashboard"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes.items}
                      onChange={handleChange}
                      name="items"
                    />
                  }
                  label="Items"
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes.subadmin}
                      onChange={handleChange}
                      name="subadmin"
                    />
                  }
                  label="Subadmin"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes.sales}
                      onChange={handleChange}
                      name="sales"
                    />
                  }
                  label="Sales"
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes.purchase}
                      onChange={handleChange}
                      name="purchase"
                    />
                  }
                  label="Purchase"
                />

<FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes.master}
                      onChange={handleChange}
                      name="master"
                    />
                  }
                  label="Master"
                />

<FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes.inventory}
                      onChange={handleChange}
                      name="inventory"
                    />
                  }
                  label="Inventory"
                />

              </Box>
              <div
                className="mt-3 d-flex justify-content-around"
                style={{ width: "400px", height: "35px" }}
              >
                <Button variant="contained" onClick={createSubadmin}>
                  Create
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={show2}
        onHide={handleClose2}
        placement="end"
        style={{ width: "1200px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update Subadmin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="w-100 h-100  d-flex justify-content-center align-items-center">
            <div className="border p-4">
              <div>
                <TextField
                  //   label={selectedobj.companyname}
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={companyname1}
                  onChange={(e) => setCompanyName1(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <TextField
                  //   label="Email"
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                />
              </div>

              <div className="mt-3">
                <TextField
                  //   label="Phone"
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                />
              </div>
              <Box
                component="section"
                sx={{ p: 2, border: "1px solid grey" }}
                className="mt-3"
              >
                <h6>Modules</h6>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.dashboard}
                      onChange={handleChange1}
                      name="dashboard"
                    />
                  }
                  label="Dashboard"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.items}
                      onChange={handleChange1}
                      name="items"
                    />
                  }
                  label="Items"
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.subadmin}
                      onChange={handleChange1}
                      name="subadmin"
                    />
                  }
                  label="Subadmin"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.sales}
                      onChange={handleChange1}
                      name="sales"
                    />
                  }
                  label="Sales"
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.purchase}
                      onChange={handleChange1}
                      name="purchase"
                    />
                  }
                  label="Purchase"
                />

<FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.master}
                      onChange={handleChange1}
                      name="master"
                    />
                  }
                  label="Master"
                />

<FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.inventory}
                      onChange={handleChange1}
                      name="inventory"
                    />
                  }
                  label="Inventory"
                />

              </Box>
              <div
                className="mt-3 d-flex justify-content-around"
                style={{ width: "400px", height: "35px" }}
              >
                <Button
                  variant="contained"
                  onClick={() => updateSubadmin(selectedobj?._id)}
                >
                  Update
                </Button>
                <Button variant="outlined" onClick={handleClose2}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={show3}
        onHide={handleClose3}
        placement="end"
        style={{ width: "1200px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Subadmin Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="w-100 h-100  d-flex justify-content-center align-items-center">
            <div className="border p-4">
              <div>
                <TextField
                  //   label={selectedobj.companyname}
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={companyname1}
                  disabled
                />
              </div>
              <div className="mt-3">
                <TextField
                  //   label="Email"
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={email1}
                  disabled
                />
              </div>

              <div className="mt-3">
                <TextField
                  //   label="Phone"
                  id="outlined-size-small"
                  //   defaultValue="Small"
                  size="small"
                  style={{ width: "400px" }}
                  value={phone1}
                  disabled
                />
              </div>
              <Box
                component="section"
                sx={{ p: 2, border: "1px solid grey" }}
                className="mt-3"
              >
                <h6>Modules</h6>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.dashboard}
                      onChange={handleChange1}
                      name="dashboard"
                      disabled
                    />
                  }
                  label="Dashboard"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.items}
                      onChange={handleChange1}
                      name="items"
                      disabled
                    />
                  }
                  label="Items"
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.subadmin}
                      onChange={handleChange1}
                      name="subadmin"
                      disabled
                    />
                  }
                  label="Subadmin"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.sales}
                      onChange={handleChange1}
                      name="sales"
                      disabled
                    />
                  }
                  label="Sales"
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.purchase}
                      onChange={handleChange1}
                      name="purchase"
                      disabled
                    />
                  }
                  label="Purchase"
                />

<FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.master}
                      onChange={handleChange1}
                      name="master"
                      disabled
                    />
                  }
                  label="Master"
                />

<FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxes1.inventory}
                      onChange={handleChange1}
                      name="inventory"
                      disabled
                    />
                  }
                  label="Inventory"
                />


              </Box>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Subadmin;
