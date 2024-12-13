import { useState, useRef, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import "../../css/dashboard/home.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AiFillPlusCircle } from "react-icons/ai";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { TiArrowSortedDown } from "react-icons/ti";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Placeholder from "react-bootstrap/Placeholder";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { PiUsersThreeFill } from "react-icons/pi";
import CountUp from "react-countup";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

function DashboardHome() {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const target = useRef(null);
  const target2 = useRef(null);
  const [invoicedata, setInvoiceData] = useState([]);
  const [bills, setBills] = useState([]);
  const [customerdata, setCustomerData] = useState([]);
  const [vendordata, setVendorData] = useState([]);
  const [quotedata, setQuotesData] = useState([]);
  const [salesorder, setSalesOrder] = useState([]);
  const [listofpo, setListOfPO] = useState([]);
  const [fifteenterm, setFifteenTerm] = useState([]);
  const [thirteeterm, setThirteeTerm] = useState([]);
  const [fourtyfiveterm, setFourtyFiveTerm] = useState([]);
  const [payablefifteenterm, setPayableFifteenTerm] = useState([]);
  const [payablethirteeterm, setPayableThirteeTerm] = useState([]);
  const [payablefourtyfiveterm, setPayableFourtyFiveTerm] = useState([]);


  useEffect(() => {
    getInvoiceData();
    getAllBill();
    getData();
    getVendorData();
    getAllQuotation();
    getAllPurchaseOrder();
    getAllSalesOrder();
  }, []);

  const getInvoiceData = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/invoices/getinvoice"
      );
      if (res.status === 201) {
        setInvoiceData(res.data);
      } else {
        toast.warning("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBill = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/bill/getBill"
      );
      if (res.status === 201) {
        setBills(res.data);
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateReceivable = useMemo(() => {
    return invoicedata
      .map((item) => item)
      .reduce((acc, data) => {
        return acc + data.dueamount;
      }, 0)
      .toFixed(2);
  }, [invoicedata]);

  const calculatePaybles = useMemo(() => {
    return bills
      .map((item) => item)
      .reduce((acc, data) => {
        return acc + data.balancedue;
      }, 0)
      .toFixed(2);
  }, [bills]);

  const getData = async () => {
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

  const getVendorData = async () => {
    try {
      let res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendorData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSalesOrder = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/salesorder/getsalesorder"
      );
      if (res.status === 201) {
        // console.log("data", res.data);
        setSalesOrder(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPurchaseOrder = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/purchaseorder/getpurchaseorder"
      );
      if (res.status === 200) {
        // console.log("data", res.data);
        setListOfPO(res.data);
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

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 15,
    },
  }));

  const [fifteenday, setFifteenDay] = useState(0);
  const [thirteeday, setThirteeDay] = useState(0);
  const [fourtyfiveday, setFourtyFiveDay] = useState(0);
  const [receivableOverdue, setReceivableOverdue] = useState(0.0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useMemo(() => {
    setFifteenDay(
      invoicedata
        ?.filter(
          (item) =>
            item.terms === "Net-15" &&
            (item.status === "Partially Paid" || item.status === "Unpaid") &&
            new Date(item.duedate) < today
        )
        .reduce((acc, data) => {
          return acc + Number(data?.dueamount);
        }, 0)
    );
  }, [invoicedata]);

  useMemo(() => {
    setThirteeDay(
      invoicedata
        ?.filter(
          (item) =>
            item.terms === "Net-30" &&
            (item.status === "Partially Paid" || item.status === "Unpaid") &&
            new Date(item.duedate) < today
        )
        .reduce((acc, data) => {
          return acc + Number(data?.dueamount);
        }, 0)
    );
  }, [invoicedata]);

  useMemo(() => {
    setFourtyFiveDay(
      invoicedata
        ?.filter(
          (item) =>
            item.terms === "Net-45" &&
            (item.status === "Partially Paid" || item.status === "Unpaid") &&
            new Date(item.duedate) < today
        )
        .reduce((acc, data) => {
          return acc + Number(data?.dueamount);
        }, 0)
    );
  }, [fourtyfiveterm]);

  useMemo(() => {
    setReceivableOverdue((fifteenday + thirteeday + fourtyfiveday).toFixed(2));
  }, [fifteenday, thirteeday, fourtyfiveday]);

  const [payablefifteenday, setPayableFifteenDay] = useState(0);
  const [payablethirteeday, setPayableThirteeDay] = useState(0);
  const [payablefourtyfiveday, setPayableFourtyFiveDay] = useState(0);
  const [payableOverdue, setPayableOverdue] = useState(0.0);

  const [recivablePercent, setReceivablePercent] = useState(0);
  const [receivableoverduepercent, setReceivableoverduepercent] = useState(0);
  useMemo(() => {
    const total = Number(calculateReceivable) + Number(receivableOverdue);
    setReceivablePercent(Number(calculateReceivable / total) * 100);

    setReceivableoverduepercent(Number(receivableOverdue / total) * 100);
  }, [calculateReceivable, receivableOverdue]);

  const [payablePercent, setPayablePercent] = useState(0);
  const [payableoverduepercent, setPayableoverduepercent] = useState(0);
  useMemo(() => {
    const total = Number(calculatePaybles) + Number(payableOverdue);
    setPayablePercent(Number(calculatePaybles / total) * 100);

    setPayableoverduepercent(Number(payableOverdue / total) * 100);
  }, [calculatePaybles, payableOverdue]);

  useMemo(() => {
    setPayableFifteenDay(
      bills
        .filter(
          (item) =>
            item.paymentterm == "Net-15" &&
            (item.status === "Partially Paid" || item.status === "Unpaid") &&
            new Date(item.duedate) < today
        )
        .reduce((acc, data) => {
          return acc + Number(data?.balancedue);
        }, 0)
    );
  }, [bills]);

  useMemo(() => {
    setPayableThirteeDay(
      bills
        ?.filter(
          (item) =>
            item.paymentterm == "Net-30" &&
            (item.status === "Partially Paid" || item.status === "Unpaid") &&
            new Date(item.duedate) < today
        )
        .reduce((acc, data) => {
          return acc + Number(data?.balancedue);
        }, 0)
    );
  }, [bills]);

  useMemo(() => {
    setPayableFourtyFiveDay(
      bills
        ?.filter(
          (item) =>
            item.paymentterm == "Net-45" &&
            (item.status === "Partially Paid" || item.status === "Unpaid") &&
            new Date(item.duedate) < today
        )
        .reduce((acc, data) => {
          return acc + Number(data?.balancedue);
        }, 0)
    );
  }, [bills]);

  useMemo(() => {
    setPayableOverdue(
      (payablefifteenday + payablethirteeday + payablefourtyfiveday).toFixed(2)
    );
  }, [payablefifteenday, payablethirteeday, payablefourtyfiveday]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="row  py-3 d-flex ">
        <div className="col-md-1 col-6">
          <div className="profileImg">
            <img
              src={`https://engineeringsolutions.net.in/Profilepic/${userData?.profilepic}`}
              alt=""
            />
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="text">
            <b> {userData?.email}</b>
            <br />
            <small>
              <i>{userData?.companyname}</i>
            </small>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="row d-flex justify-content-around ">
          <div className="col-md-2 ">
            <Link to="/dashboard/sales/customer">
              <div className="myCard">
                <HiUsers style={{ fontSize: "20px" }} />
                <b>Total Customers</b>
                <span>
                  {" "}
                  <CountUp
                    start={0}
                    end={customerdata.length}
                    duration={2}
                    redraw={true}
                  />
                </span>
              </div>
            </Link>
          </div>
          <div className="col-md-2">
            <Link to="/dashboard/sales/quotes">
              <div className="myCard">
                <FaFileInvoice style={{ fontSize: "19px" }} />
                <b>Total Quotations</b>
                <span>
                  {" "}
                  <CountUp
                    start={0}
                    end={quotedata.length}
                    duration={2}
                    redraw={true}
                  />
                </span>
              </div>
            </Link>
          </div>

          <div className="col-md-2">
            <Link to="/dashboard/purchase/vendors">
              <div className="myCard">
                <PiUsersThreeFill style={{ fontSize: "22px" }} />
                <b>Total Vendors</b>
                <span>
                  {" "}
                  <CountUp
                    start={0}
                    end={vendordata.length}
                    duration={2}
                    redraw={true}
                  />
                </span>
              </div>
            </Link>
          </div>
          <div className="col-md-2">
            <Link to="/dashboard/sales/invoice">
              <div className="myCard">
                <FaFileInvoice style={{ fontSize: "19px" }} />
                <b>Total Invoices</b>
                <span>
                  {" "}
                  <CountUp
                    start={0}
                    end={invoicedata.length}
                    duration={2}
                    redraw={true}
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="row justify-content-around mt-2">
          <div className="col-md-2">
            <Link to="/dashboard/purchase/bill">
              <div className="myCard">
                <FaFileInvoice style={{ fontSize: "19px" }} />
                <b>Total Bills</b>
                <span>
                  {" "}
                  <CountUp
                    start={0}
                    end={bills.length}
                    duration={2}
                    redraw={true}
                  />
                </span>
              </div>
            </Link>
          </div>
          <div className="col-md-2">
            <Link to="/dashboard/sales/salesorder">
              <div className="myCard">
                <FaFileInvoice style={{ fontSize: "19px" }} />
                <b>Total Salesorder</b>
                <span>
                  {" "}
                  <CountUp
                    start={0}
                    end={salesorder.length}
                    duration={2}
                    redraw={true}
                  />
                </span>
              </div>
            </Link>
          </div>
          <div className="col-md-2">
            <Link to="/dashboard/purchase/purchaseorder">
              <div className="myCard">
                <FaFileInvoice style={{ fontSize: "19px" }} />
                <b>Total PurchaseOrder</b>
                <span>
                  {" "}
                  <CountUp
                    start={0}
                    end={listofpo.length}
                    duration={2}
                    redraw={true}
                  />
                </span>
                {/* <span>{listofpo.length}</span> */}
              </div>
            </Link>
          </div>
        </div>

        <div className="row  g-3">
          <div className="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title bg-body-secondary text-start ">
                  Total Receivables{" "}
                  {/* <span className="float-end text-primary">
                        <AiFillPlusCircle
                          data-bs-container="body"
                          data-bs-toggle="popover"
                          data-bs-placement="bottom"
                          data-bs-content="Bottom popover"
                        />
                        <span style={{ fontSize: "13px" }}>New</span>
                      </span> */}
                </h5>
                <div className="w-100  invoiceMoney">
                  Total Unpaid Invoice <LiaRupeeSignSolid />{" "}
                  {calculateReceivable}
                </div>
                <div style={{ width: "100%", height: "10px", display: "flex" }}>
                  <LightTooltip
                    title={`₹ ${calculateReceivable} Current`}
                    placement="top"
                  >
                    <div
                      className="div1"
                      style={{
                        height: "100%",
                        width: `${recivablePercent}%`,
                        backgroundColor: "blue",
                      }}
                    ></div>
                  </LightTooltip>
                  <LightTooltip
                    title={`₹ ${receivableOverdue} Overdue`}
                    placement="top"
                  >
                    <div
                      className="div2"
                      style={{
                        height: "100%",
                        width: `${receivableoverduepercent}%`,
                        backgroundColor: "green",
                      }}
                    ></div>
                  </LightTooltip>
                </div>
                <div className="row ">
                  <div className="col-md-6 py-2 text-start">
                    CURRENT
                    <br />
                    <LiaRupeeSignSolid /> {calculateReceivable}
                  </div>
                  <div className="col-md-6 py-2 text-start">
                    OVERDUE
                    <br />
                    <LiaRupeeSignSolid />{" "}
                    <Button
                      variant="transparent"
                      ref={target}
                      onClick={() => setShow(!show)}
                    >
                      {receivableOverdue} <TiArrowSortedDown />
                    </Button>
                    <Overlay
                      target={target.current}
                      show={show}
                      placement="bottom"
                    >
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
                            backgroundColor: "aliceblue",
                            padding: "2px 10px",
                            color: "black",
                            borderRadius: 3,
                            ...props.style,
                          }}
                        >
                          <ul class="list-group">
                            <li class="list-group-item list-group-item-action">
                              1-15 days{" "}
                              <span className="float-end">
                                {" "}
                                <LiaRupeeSignSolid
                                  style={{ marginLeft: "80px" }}
                                />{" "}
                                {fifteenday.toFixed(2)}
                              </span>
                            </li>
                            <li class="list-group-item list-group-item-action">
                              16-30 days{" "}
                              <span className="float-end">
                                {" "}
                                <LiaRupeeSignSolid
                                  style={{ marginLeft: "80px" }}
                                />{" "}
                                {thirteeday.toFixed(2)}
                              </span>
                            </li>
                            <li class="list-group-item list-group-item-action">
                              31-45 days{" "}
                              <span className="float-end">
                                {" "}
                                <LiaRupeeSignSolid
                                  style={{ marginLeft: "80px" }}
                                />{" "}
                                {fourtyfiveday.toFixed(2)}
                              </span>
                            </li>
                            <li class="list-group-item list-group-item-action">
                              Above 45 days{" "}
                              <span className="float-end">
                                {" "}
                                <LiaRupeeSignSolid
                                  style={{ marginLeft: "80px" }}
                                />{" "}
                                0.00
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </Overlay>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title bg-body-secondary text-start ">
                  Total Payables{" "}
                  {/* <span className="float-end text-primary">
                        <AiFillPlusCircle
                          data-bs-container="body"
                          data-bs-toggle="popover"
                          data-bs-placement="bottom"
                          data-bs-content="Bottom popover"
                        />
                        <span style={{ fontSize: "13px" }}>New</span>
                      </span> */}
                </h5>
                <div className="w-100  invoiceMoney">
                  Total Unpaid Bills <LiaRupeeSignSolid /> {calculatePaybles}
                </div>
                <div style={{ width: "100%", height: "10px", display: "flex" }}>
                  <LightTooltip
                    title={`₹ ${calculatePaybles} Current`}
                    placement="top"
                  >
                    <div
                      className="div1"
                      style={{
                        height: "100%",
                        width: `${payablePercent}%`,
                        backgroundColor: "blue",
                      }}
                    ></div>
                  </LightTooltip>
                  <LightTooltip
                    title={`₹ ${payableOverdue} Overdue`}
                    placement="top"
                  >
                    <div
                      className="div2"
                      style={{
                        height: "100%",
                        width: `${payableoverduepercent}%`,
                        backgroundColor: "green",
                      }}
                    ></div>
                  </LightTooltip>
                </div>
                <div className="row ">
                  <div className="col-md-6 py-2 text-start">
                    CURRENT
                    <br />
                    <LiaRupeeSignSolid /> {calculatePaybles}
                  </div>
                  <div className="col-md-6 py-2 text-start">
                    OVERDUE
                    <br />
                    <LiaRupeeSignSolid />{" "}
                    <Button
                      variant="transparent"
                      ref={target2}
                      onClick={() => setShow1(!show1)}
                    >
                      {payableOverdue} <TiArrowSortedDown />
                    </Button>
                    <Overlay
                      target={target2.current}
                      show={show1}
                      placement="bottom"
                    >
                      {({
                        placement: _placement,
                        arrowProps: _arrowProps,
                        show: _show,
                        popper: _popper,
                        hasDoneInitialMeasure: _hasDoneInitialMeasure,
                        ...propss
                      }) => (
                        <div
                          {...propss}
                          style={{
                            position: "absolute",
                            backgroundColor: "aliceblue",
                            padding: "2px 10px",
                            color: "black",
                            borderRadius: 3,
                            ...propss.style,
                          }}
                        >
                          <ul class="list-group">
                            <li class="list-group-item list-group-item-action">
                              1-15 days{" "}
                              <span className="float-end">
                                {" "}
                                <LiaRupeeSignSolid
                                  style={{ marginLeft: "80px" }}
                                />{" "}
                                {payablefifteenday.toFixed(2)}
                              </span>
                            </li>
                            <li class="list-group-item list-group-item-action">
                              16-30 days{" "}
                              <span className="float-end">
                                {" "}
                                <LiaRupeeSignSolid
                                  style={{ marginLeft: "80px" }}
                                />{" "}
                                {payablethirteeday.toFixed(2)}
                              </span>
                            </li>
                            <li class="list-group-item list-group-item-action">
                              31-45 days{" "}
                              <span className="float-end">
                                {" "}
                                <LiaRupeeSignSolid
                                  style={{ marginLeft: "80px" }}
                                />{" "}
                                {payablefourtyfiveday.toFixed(2)}
                              </span>
                            </li>
                            <li class="list-group-item list-group-item-action">
                              Above 45 days{" "}
                              <span className="float-end">
                                {" "}
                                <LiaRupeeSignSolid
                                  style={{ marginLeft: "80px" }}
                                />{" "}
                                0.00
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </Overlay>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
