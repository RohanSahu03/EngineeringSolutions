import React, { useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Home from "./Dashboard/DashboardHome";
import { Link } from "react-router-dom";
import Items from "./Dashboard/items/Items";
import "../css/dashboard.css";
import Collapse from "react-bootstrap/Collapse";
import { RiArrowDownSLine } from "react-icons/ri";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "@mui/material/Popover";
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import Badge from "@mui/material/Badge";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";

function Dashboard(props) {
  // const location = useLocation();
  // const receivedData = location.state.data;
  // console.log(receivedData)
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("user"));

  const [currentPage, setCurrentPage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);

  const [isHighlighted, setIsHighlighted] = useState(false);
  const toggleHighlight = () => {
    setIsHighlighted(!isHighlighted);
  };

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getAllItems();
    getAllCustomer();
    getAllQuotation();
  }, []);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 12,
      top: 20,
      padding: "0 4px",
      fontSize: "11px",
    },
  }));

  const [products, setProducts] = useState([]);
  const [customerdata, setCustomerData] = useState([]);
  const [quotesdata, setQuotesData] = useState([]);

  const getAllItems = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/products/getproduct"
      );
      if (res.status === 201) {
        setProducts(res.data);
      } else {
        alert("data not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    toast.success("You are logged out..");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const getAllCustomer = async () => {
    try {
      let res = await axios.get(
        "https://engineeringsolutions.net.in/api/customers/getcustomer"
      );
      if (res.status === 200) {
        setCustomerData(res.data);
      }
    } catch (error) {
      console.log(error);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    // Toggle the collapse state
  };

  //popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlepopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open5 = Boolean(anchorEl);
  const id = open5 ? "simple-popover" : undefined;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Navbar
            className="bg-body-tertiary bg-dark"
            style={{ height: "60px" }}
          >
            <Container>
              <Navbar.Brand href="" className="text-light">
                {userData?.companyname}
              </Navbar.Brand>
              <IoSettingsOutline />
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="text-light">
                  <div className="profilePicture" onClick={handlepopover}>
                    <img
                      src={`https://engineeringsolutions.net.in/Profilepic/${userData?.profilepic}`}
                      alt=""
                    />
                  </div>
                  <Popover
                    id={id}
                    open={open5}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Typography sx={{ p: 2 }}>
                      <div className="row">
                        <div className="col-md-12">
                          <b>{userData?.companyname}</b>
                        </div>
                        <div className="col-md-12">{userData?.email}</div>
                        <div className="col-md-12">
                          User Id : {userData?._id?.substr(0, 8)}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-6 col-6">
                          <Link to="/dashboard/profile">My Account</Link>
                        </div>
                        <div className="col-md-6 col-6 text-end">
                          <span
                            style={{
                              color: "red",
                              padding: "5px",
                              cursor: "pointer",
                            }}
                            onClick={handleLogout}
                          >
                            {" "}
                            <IoLogOutOutline />
                            &nbsp;Sign out
                          </span>
                        </div>
                      </div>
                    </Typography>
                  </Popover>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>

        <div className="row">
          {/* <div className="col hamburgerColumn ">
<img src="../images/hamburger.png" alt="" srcset=""  onClick={handleShow} />
</div> */}
          <div className="col-md-2 sidebarColumn overflow-auto sidebar forBoxSadow">
            <div
              class="list-group h-100 border d-flex justify-content-evenly border-0 rounded-0 custome-list-group"
              style={{ width: "100%" }}
            >
              {userData?.dashboard ? (
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                  to="/dashboard/home"
                  onClick={() => handleItemClick("dashboard")}
                  style={{
                    backgroundColor:
                      selectedItem === "dashboard"
                        ? "aliceblue"
                        : "transparent",
                  }}
                >
                  <span style={{ marginRight: "20px" }}>
                    <img
                      src="/images/dashboard.png" //E:\Rohan\concrete_company\frontend\public\images\dashboard.png
                      alt=""
                      srcset=""
                      style={{ width: "25px", height: "30px" }}
                    />
                  </span>
                  Dashboard
                </Link>
              ) : (
                ""
              )}

              {userData?.subadmin ? (
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                  to="/dashboard/subadmin"
                  onClick={() => handleItemClick("subadmin")}
                  style={{
                    backgroundColor:
                      selectedItem === "subadmin" ? "aliceblue" : "transparent",
                  }}
                >
                  <span style={{ marginRight: "13px" }}>
                    <img
                      src="/images/setting.png"
                      alt=""
                      srcset=""
                      style={{ width: "28px", height: "28px" }}
                    />
                  </span>
                  Subadmin
                </Link>
              ) : (
                ""
              )}

              
{userData?.master ? (
                <>
                  <Link
                    class="list-group-item list-group-item-action text-start border-0 custome-list-group align-items-center"
                    aria-controls="example-collapse-text"
                    aria-expanded={open7}
                    onClick={() => {
                      handleItemClick("master");
                      setOpen7(!open7);
                    }}
                    style={{
                      backgroundColor:
                        selectedItem === "master" ? "aliceblue" : "transparent",
                    }}
                  >
                    <span style={{ marginRight: "13px" }}>
                      <img
                        src="/images/order.png"
                        alt=""
                        srcset=""
                        style={{ width: "30px", height: "30px" }}
                      />
                    </span>
                   Master
                    <span style={{ float: "right" }}>
                      <RiArrowDownSLine
                        style={{
                          color: "blueviolet",
                          fontSize: "20px",
                          transition: "transform 0.3s ease",
                          transform: open7 ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </span>
                  </Link>
                  <Collapse in={open7}>
                    <div id="example-collapse-text">
                      {/* <StyledBadge
                        badgeContent={products.length}
                        color="success"
                        className="w-100"
                      >
                     <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/items"
                        >
                          Items
                        </Link> 
                
                      </StyledBadge> */}
                         <Link
                        class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                        to="/dashboard/purchase/vendors"
                      >
                        Vendors
                      </Link>
                      <Link
                          class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                          to="/dashboard/sales/customer"
                        >
                          Customers
                        </Link>
                      {/* <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/dashboard/inventoryadjustment"
                      >
                        Inventory Adjustment
                      </Link> */}
                    </div>
                  </Collapse>
                </>
              ) : (
                ""
              )}

              {userData?.items ? (
                <>
                  <Link
                    class="list-group-item list-group-item-action text-start border-0 custome-list-group align-items-center"
                    aria-controls="example-collapse-text"
                    aria-expanded={open1}
                    onClick={() => {
                      handleItemClick("items");
                      setOpen1(!open1);
                    }}
                    style={{
                      backgroundColor:
                        selectedItem === "items" ? "aliceblue" : "transparent",
                    }}
                  >
                    <span style={{ marginRight: "13px" }}>
                      <img
                        src="/images/order.png"
                        alt=""
                        srcset=""
                        style={{ width: "30px", height: "30px" }}
                      />
                    </span>
                    Items
                    <span style={{ float: "right" }}>
                      <RiArrowDownSLine
                        style={{
                          color: "blueviolet",
                          fontSize: "20px",
                          transition: "transform 0.3s ease",
                          transform: open1 ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </span>
                  </Link>
                  <Collapse in={open1}>
                    <div id="example-collapse-text">
                     
                      <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/purchaseitem"
                        >
                         Purchase Items
                        </Link>
                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/salesitem"
                        >
                         Sales Items
                        </Link> 

                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/serviceitem"
                        >
                         Service Items
                        </Link>
                      {/* <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/dashboard/inventoryadjustment"
                      >
                        Inventory Adjustment
                      </Link> */}
                    </div>
                  </Collapse>
                </>
              ) : (
                ""
              )}

              {/* --------------Sales Collapse start-------- */}

              {/* <Link
  class="list-group-item list-group-item-action text-start border-0 custome-list-group"
to='/dashboard/inventory'
>
  <span style={{ marginRight: "10px" }}>
    <img src="../images/inventory.png" alt="" srcset="" />
  </span>
  Inventory
</Link> */}

              {/* --------------Sales Collapse start-------- */}
              {userData?.sales ? (
                <>
                  <Link
                    class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    onClick={() => {
                      handleItemClick("sales");
                      setOpen(!open);
                    }}
                    style={{
                      backgroundColor:
                        selectedItem === "sales" ? "aliceblue" : "transparent",
                    }}
                  >
                    <span style={{ marginRight: "13px" }}>
                      <img
                        src="/images/shopping-cart.png"
                        alt=""
                        srcset=""
                        style={{ width: "28px", height: "28px" }}
                      />
                    </span>
                    Sales
                    <span style={{ float: "right" }}>
                      <RiArrowDownSLine
                        style={{
                          color: "blueviolet",
                          fontSize: "20px",
                          transition: "transform 0.3s ease",
                          transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </span>
                  </Link>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                   
                      <StyledBadge
                        badgeContent={quotesdata.length}
                        color="success"
                        className="w-100"
                      >
                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/sales/quotes"
                        >
                          Quotes
                        </Link>
                      </StyledBadge>
                      <Link
                        class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                        to="/dashboard/sales/salesorder"
                      >
                        Sales Orders
                      </Link>
                      <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/dashboard/sales/deliverychallan"
                      >
                        Delivery Challans
                      </Link>
                      <Link
                        class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                        to="/dashboard/sales/invoice"
                      >
                        Invoices
                      </Link>
                      <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/dashboard/sales/payment-received"
                      >
                        Payments Received
                      </Link>

                      <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/dashboard/sales/creditnote"
                      >
                        Credit Notes
                      </Link>
                    </div>
                  </Collapse>
                </>
              ) : (
                ""
              )}

              {/* --------------Sales Collapse end-------- */}

              {/* --------------Purchase Collapse start-------- */}
              {userData?.purchase ? (
                <>
                  <Link
                    class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                    onClick={() => setOpen2(!open2)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open2}
                  >
                    <span style={{ marginRight: "10px" }}>
                      <img
                        src="/images/bag.png"
                        alt=""
                        srcset=""
                        style={{ width: "28px", height: "28px" }}
                      />
                    </span>
                    Purchases
                    <span style={{ float: "right" }}>
                      <RiArrowDownSLine
                        style={{
                          color: "blueviolet",
                          fontSize: "20px",
                          transition: "transform 0.3s ease",
                          transform: open2 ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </span>
                  </Link>

                  <Collapse in={open2}>
                    <div id="example-collapse-text">
                    
                      <Link
                        class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                        to="/dashboard/purchase/indent"
                      >
                        Indent
                      </Link>
                      <Link
                        class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                        to="/dashboard/purchase/requestquotaion"
                      >
                       Request Quotation
                      </Link>
                      <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/dashboard/purchase/purchasequotation"
                      >
                       Quotations
                      </Link>
                 
                      {/* <Link
      class="list-group-item list-group-item-action text-start w-100 border-0"
      onClick={() =>
        setCurrentPage("/dashboard/purchase/recurring-expense")
      }
    >
      Recurring Expenses
    </Link> */}
                      <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/dashboard/purchase/purchaseorder"
                      >
                        Purchase Orders
                      </Link>
                      {/* <Link
                        class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                        to="/dashboard/purchase/bill"
                      >
                        Bills
                      </Link>
                      <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/purchase/paymentsmade"
                      >
                        Payments Made
                      </Link>

                      <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/dashboard/purchase/vendorcredit"
                      >
                        Vendor Credits
                      </Link>
                      <Link
                        class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                        to="/dashboard/purchase/expense"
                      >
                        Expenses
                      </Link> */}
                    </div>
                  </Collapse>
                </>
              ) : (
                ""
              )}

{userData?.inventory ? (
                <>
                  <Link
                    class="list-group-item list-group-item-action text-start border-0 custome-list-group align-items-center"
                    aria-controls="example-collapse-text"
                    aria-expanded={open6}
                    onClick={() => {
                      handleItemClick("inventory");
                      setOpen6(!open6);
                    }}
                    style={{
                      backgroundColor:
                        selectedItem === "inventory" ? "aliceblue" : "transparent",
                    }}
                  >
                    <span style={{ marginRight: "13px" }}>
                      <img
                        src="/images/order.png"
                        alt=""
                        srcset=""
                        style={{ width: "30px", height: "30px" }}
                      />
                    </span>
                    Inventory
                    <span style={{ float: "right" }}>
                      <RiArrowDownSLine
                        style={{
                          color: "blueviolet",
                          fontSize: "20px",
                          transition: "transform 0.3s ease",
                          transform: open6 ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </span>
                  </Link>
                  <Collapse in={open6}>
                    <div id="example-collapse-text">
                  
                      <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/inventory/inspection"
                        >
                       Inspection
                        </Link>
                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/inventory/grn"
                        >
                       G R N
                        </Link> 

                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/inventory/gin"
                        >
                         G I N
                        </Link>
                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/inventory/cashgoodrecnote"
                        >
                         Cash Good Rec Note
                        </Link>
                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/inventory/dispatchchallan"
                        >
                        Dispatch Challan
                        </Link>

                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/inventory/stock"
                        >
                        Stock in
                        </Link>
              
                    </div>
                  </Collapse>
                </>
              ) : (
                ""
              )}


{userData?.inventory ? (
                <>
                  <Link
                    class="list-group-item list-group-item-action text-start border-0 custome-list-group align-items-center"
                    aria-controls="example-collapse-text"
                    aria-expanded={open8}
                    onClick={() => {
                      handleItemClick("accounts");
                      setOpen8(!open8);
                    }}
                    style={{
                      backgroundColor:
                        selectedItem === "accounts" ? "aliceblue" : "transparent",
                    }}
                  >
                    <span style={{ marginRight: "13px" }}>
                      <img
                        src="/images/order.png"
                        alt=""
                        srcset=""
                        style={{ width: "30px", height: "30px" }}
                      />
                    </span>
                    Accounts
                    <span style={{ float: "right" }}>
                      <RiArrowDownSLine
                        style={{
                          color: "blueviolet",
                          fontSize: "20px",
                          transition: "transform 0.3s ease",
                          transform: open8 ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </span>
                  </Link>
                  <Collapse in={open8}>
                    <div id="example-collapse-text">
                  
                      <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/accounts/fundtransfer"
                        >
                      Fund Transfer
                        </Link>
                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/accounts/payment"
                        >
                     Payment
                        </Link> 

                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/accounts/cashinvoice"
                        >
                      Cash Invoice
                        </Link>
                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/accounts/iteminvoice"
                        >
                        Item Invoice
                        </Link>
                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/accounts/serviceinvoice"
                        >
                        Service Invoice
                        </Link>

                        <Link
                          class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                          to="/dashboard/accounts/advanceinvoice"
                        >
                       Advance Invoice
                        </Link>
              
                    </div>
                  </Collapse>
                </>
              ) : (
                ""
              )}




              {/* --------------Purchase Collapse end-------- */}

              {/* --------------Time tracking Collapse start-------- */}
              {/* <Link
                class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                onClick={() => setOpen3(!open3)}
                aria-controls="example-collapse-text"
                aria-expanded={open3}
              >
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/watch.png" alt="" srcset="" />
                </span>
                Time Tracking
                <span style={{ float: "right" }}>
                  <RiArrowDownSLine
                     style={{
                      color: "white",
                      fontSize: "20px",
                      transition: 'transform 0.3s ease',
            transform: open3 ? 'rotate(180deg)' : 'rotate(0deg)'

                    }}
                  />
                </span>
              </Link>

              <Collapse in={open3}>
                <div id="example-collapse-text">
                  <Link
                    class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group"
                    to="/dashboard/timetracking/projects"
                  >
                    Projects
                  </Link>
                  <Link class="list-group-item list-group-item-action text-start border-0 custome-list-group">
                    TimeSheet
                  </Link>
                </div>
              </Collapse> */}

              {/* --------time tracking collapse end--------- */}

              {/* --------------Accountant Collapse start-------- */}
              {/* <Link
                class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                onClick={() => setOpen4(!open4)}
                aria-controls="example-collapse-text"
                aria-expanded={open4}
              >
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/accountant.png" alt="" srcset="" />
                </span>
                Accountant
                <span style={{ float: "right" }}>
                  <RiArrowDownSLine
                        style={{
                          color: "white",
                          fontSize: "20px",
                          transition: 'transform 0.3s ease',
                transform: open4 ? 'rotate(180deg)' : 'rotate(0deg)'
    
                        }}
                  />
                </span>
              </Link>

              <Collapse in={open4}>
                <div id="example-collapse-text">
                  <Link class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group">
                    Manual Journals
                  </Link>
                  <Link class="list-group-item list-group-item-action text-start border-0 custome-list-group">
                    Bulk Update
                  </Link>
                  <Link class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group">
                    Currency Adjustments
                  </Link>
                  <Link class="list-group-item list-group-item-action text-start border-0 custome-list-group">
                    Charts of Account
                  </Link>
                  <Link class="list-group-item list-group-item-action text-start w-100 border-0 custome-list-group">
                    Budgets
                  </Link>
                  <Link class="list-group-item list-group-item-action text-start border-0 custome-list-group">
                    Transction Locking
                  </Link>
                </div>
              </Collapse> */}

              {/* --------------Accountant Collapse end-------- */}

              {/* -------------------reports---------------- */}
              {/* <Link
                class="list-group-item list-group-item-action text-start border-0 custome-list-group"
                to="/dashboard/reports"
              >
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/reports.png" alt="" srcset="" />
                </span>
                Reports
              </Link> */}

              {/* -------------------reports end---------------- */}

              {/* -------------------Payroll---------------- */}
              {/* <Link class="list-group-item list-group-item-action text-start border-0 custome-list-group">
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/payroll.png" alt="" srcset="" />
                </span>
                Payroll
              </Link> */}

              {/* -------------------Payroll---------------- */}
            </div>
          </div>
          <div className="col-md-10  overflow-auto sidebar ">
            {props.children}
          </div>
        </div>
      </div>

      {/* ---------------offcanvas------------- */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{ background: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="border">
          <div class="list-group bg-transparent h-100 d-flex justify-content-evenly">
            <Link
              class="list-group-item list-group-item-action text-start w-100 border-0"
              onClick={() => {
                setCurrentPage("/dashboard/home");
                setShow(false);
              }}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/home.png" alt="" srcset="" />
              </span>
              Home
              <span class="badge float-end text-bg-primary rounded-pill">
                14
              </span>
            </Link>
            <Link
              class="list-group-item list-group-item-action text-start border-0"
              onClick={() => {
                setCurrentPage("/dashboard/items");
                setShow(false);
              }}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/items.png" alt="" srcset="" />
              </span>
              Items
            </Link>

            {/* --------------Sales Collapse start-------- */}

            <Link
              class="list-group-item list-group-item-action text-start border-0"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/cart.png" alt="" srcset="" />
              </span>
              Sales
              <span style={{ float: "right" }}>
                <RiArrowDownSLine
                  style={{ color: "blueviolet", fontSize: "20px" }}
                />
              </span>
            </Link>
            <Collapse in={open}>
              <div id="example-collapse-text">
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/sales/customer");
                    setShow(false);
                  }}
                >
                  Customers
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/sales/quotes");
                    setShow(false);
                  }}
                >
                  Quotes
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/sales/salesorder");
                    setShow(false);
                  }}
                >
                  Sales Orders
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/sales/deliverychallan");
                    setShow(false);
                  }}
                >
                  Delivery Challans
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/sales/invoice");
                    setShow(false);
                  }}
                >
                  Invoices
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/sales/payment-received");
                    setShow(false);
                  }}
                >
                  Payments Received
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/home");
                    setShow(false);
                  }}
                >
                  Recurring Invoices
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/items");
                    setShow(false);
                  }}
                >
                  Credit Notes
                </Link>
              </div>
            </Collapse>

            {/* --------------Sales Collapse end-------- */}

            {/* --------------Purchase Collapse start-------- */}
            <Link
              class="list-group-item list-group-item-action text-start border-0"
              onClick={() => setOpen2(!open2)}
              aria-controls="example-collapse-text"
              aria-expanded={open2}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/bag.png" alt="" srcset="" />
              </span>
              Purchases
              <span style={{ float: "right" }}>
                <RiArrowDownSLine
                  style={{ color: "blueviolet", fontSize: "20px" }}
                />
              </span>
            </Link>

            <Collapse in={open2}>
              <div id="example-collapse-text">
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/purchase/vendors");
                    setShow(false);
                  }}
                >
                  Vendors
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/purchase/expense");
                    setShow(false);
                  }}
                >
                  Expenses
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/purchase/recurring-expense");
                    setShow(false);
                  }}
                >
                  Recurring Expenses
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/purchase/purchaseorder");
                    setShow(false);
                  }}
                >
                  Purchase Orders
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/purchase/bill");
                    setShow(false);
                  }}
                >
                  Bills
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/purchase/paymentsmade");
                    setShow(false);
                  }}
                >
                  Payments Made
                </Link>
                {/* <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/home");
                    setShow(false);
                  }}
                >
                  Recurring Bills
                </Link> */}
                <Link
                  class="list-group-item list-group-item-action text-start border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/items");
                    setShow(false);
                  }}
                >
                  Vendor Credits
                </Link>
              </div>
            </Collapse>

            {/* --------------Purchase Collapse end-------- */}

            {/* --------------Time tracking Collapse start-------- */}
            {/* <Link
              class="list-group-item list-group-item-action text-start border-0"
              onClick={() => setOpen3(!open3)}
              aria-controls="example-collapse-text"
              aria-expanded={open3}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/watch.png" alt="" srcset="" />
              </span>
              Time Tracking
              <span style={{ float: "right" }}>
                <RiArrowDownSLine
                  style={{ color: "blueviolet", fontSize: "20px" }}
                />
              </span>
            </Link> */}

            {/* <Collapse in={open3}>
              <div id="example-collapse-text">
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/timetracking/projects");
                    setShow(false);
                  }}
                >
                  Projects
                </Link>
                <Link
                  class="list-group-item list-group-item-action text-start border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/items");
                    setShow(false);
                  }}
                >
                  TimeSheet
                </Link>
              </div>
            </Collapse> */}

            {/* --------time tracking collapse end--------- */}

            {/* --------------Accountant Collapse start-------- */}
            {/* <Link
              class="list-group-item list-group-item-action text-start border-0"
              onClick={() => setOpen4(!open4)}
              aria-controls="example-collapse-text"
              aria-expanded={open4}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/accountant.png" alt="" srcset="" />
              </span>
              Accountant
              <span style={{ float: "right" }}>
                <RiArrowDownSLine
                  style={{ color: "blueviolet", fontSize: "20px" }}
                />
              </span>
            </Link> */}

            {/* <Collapse in={open4}>
              <div id="example-collapse-text">
                <Link
                  class="list-group-item list-group-item-action text-start w-100 border-0"
                  onClick={() => {
                    setCurrentPage("/dashboard/accountant/manualjournal");
                    setShow(false);
                  }}
                >
                  Manual Journals
                </Link>
                <Link class="list-group-item list-group-item-action text-start border-0">
                  Bulk Update
                </Link>
                <Link class="list-group-item list-group-item-action text-start w-100 border-0">
                  Currency Adjustments
                </Link>
                <Link class="list-group-item list-group-item-action text-start border-0">
                  Charts of Account
                </Link>
                <Link class="list-group-item list-group-item-action text-start w-100 border-0">
                  Budgets
                </Link>
                <Link class="list-group-item list-group-item-action text-start border-0">
                  Transction Locking
                </Link>
              </div>
            </Collapse> */}

            {/* --------------Accountant Collapse end-------- */}

            {/* -------------------reports---------------- */}
            {/* <Link
              class="list-group-item list-group-item-action text-start border-0"
              onClick={() => {
                setCurrentPage("/dashboard/reports");
                setShow(false);
              }}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/charts.png" alt="" srcset="" />
              </span>
              Reports
            </Link> */}

            {/* -------------------reports end---------------- */}

            {/* -------------------payroll---------------- */}
            {/* <Link
              class="list-group-item list-group-item-action text-start border-0"
              onClick={() => {
                setCurrentPage("/dashboard/payroll");
                setShow(false);
              }}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/payroll.png" alt="" srcset="" />
              </span>
              Payroll
            </Link> */}

            {/* -------------------payroll end---------------- */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Dashboard;
