import React, { useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import "../../../css/dashboard/reports.css";
function Reports() {
  const myRef1 = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const myRef4 = useRef(null);
  const myRef5 = useRef(null);
  const myRef6 = useRef(null);
  const myRef7 = useRef(null);
  const myRef8 = useRef(null);
  const myRef9 = useRef(null);
  const myRef10 = useRef(null);
  const myRef11 = useRef(null);
  const myRef12 = useRef(null);
  const myRef13 = useRef(null);

  const scrollToRef1 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef1.current) {
      myRef1.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef2 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef2.current) {
      myRef2.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef3 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef3.current) {
      myRef3.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef4 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef4.current) {
      myRef4.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef5 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef5.current) {
      myRef5.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef6 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef6.current) {
      myRef6.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef7 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef7.current) {
      myRef7.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef8 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef8.current) {
      myRef8.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef9 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef9.current) {
      myRef9.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef10 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef10.current) {
      myRef10.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef11 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef11.current) {
      myRef11.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef12 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef12.current) {
      myRef12.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToRef13 = () => {
    // Check if scrollRef is defined and not null before accessing scrollIntoView
    if (myRef13.current) {
      myRef13.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [Business, SetBusiness] = useState(true);
  const [Sales, setSales] = useState(false);

  return (
    <div>
      <div className="row py-3 gy-2">
        <div className="col-md-12">
          <h3>Reports Center</h3>
        </div>
        <div className="col-md-12 text-center d-flex justify-content-center align-items-center">
          <div class="input-group mb-3 textInput text-center">
            <input
              type="text"
              class="form-control"
              placeholder="select Reports"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button class="btn btn-primary" type="button" id="button-addon2">
              {" "}
              <IoSearch style={{ fontSize: "22px" }} />
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div
          className="col-md-3  overflow-auto sidebar"
          style={{ maxHeight: "500px" }}
        >
          <div id="list-example" class="list-group text-start">
          <div
                onClick={() => {
                  SetBusiness(true);
                  setSales(false);
                }}
              >
                <a
                  class="list-group-item list-group-item-action"
                  onClick={scrollToRef2}
                >
                  <span style={{ marginRight: "10px" }}>
                    <img src="../images/file.png" alt="" srcset="" />
                  </span>
                  bussiness
                </a>
              </div>


              <div
                onClick={() => {
                  SetBusiness(false);
                  setSales(true);
                }}
              >
                <a
                  class="list-group-item list-group-item-action"
                  onClick={scrollToRef2}
                >
                  <span style={{ marginRight: "10px" }}>
                    <img src="../images/file.png" alt="" srcset="" />
                  </span>
                  Sales
                </a>
              </div>
         

            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef3}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Receivables
            </a>
            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef4}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Payment Received
            </a>
            {/* <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef5}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Recurring Invoice
            </a> */}
            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef6}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Payable
            </a>
            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef7}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Purchase & Expenses
            </a>
            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef8}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Taxes
            </a>
            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef9}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Banking
            </a>
            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef10}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Project & TimeSheet
            </a>
            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef11}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Accountant
            </a>
            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef12}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Budget
            </a>
            <a
              class="list-group-item list-group-item-action"
              onClick={scrollToRef13}
            >
              <span style={{ marginRight: "10px" }}>
                <img src="../images/file.png" alt="" srcset="" />
              </span>
              Currency
            </a>
          </div>
        </div>

        {/* --------------------content------------------- */}



        {Business ? (
          <>
            <div>business</div>
          </>
        ) : (
          <></>
        )}

        {Sales ? (
          <>
            <div>Sales</div>
          </>
        ) : (
          <></>
        )}

        {/* <div
          className="col-md-9 border overflow-auto sidebar"
          style={{ maxHeight: "500px" }}
        >
          <div className="row">
            <div className="col-md-6 col-6 text-start py-2">
              <h5>All Reports</h5>
            </div>
            <div className="col-md-6 col-6 text-end py-2 ">
              <button type="button" class="btn btn-primary btn-sm">
                create custome report
              </button>
            </div>
          </div>

          <div className="row ">
            <table class="table">
              <thead>
                <tr style={{ background: "aliceblue" }}>
                  <th scope="col">
                    <small>Report Name</small>
                  </th>
                  <th scope="col">
                    <small>Type</small>
                  </th>
                  <th scope="col">
                    <small>Created By</small>
                  </th>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef1}
                >
                  <td colspan="3">
                    <b>Business Overview</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Profit & Loss</td>
                  <td>Profit & Loss</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Cash Flow Statement</td>
                  <td>Cash Flow Statement</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Balance Statement</td>
                  <td>Balance Statement</td>
                  <td>System Generated</td>
                </tr>
               
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Business Performance</td>
                  <td>Business Performance</td>
                  <td>System Generated</td>
                </tr>
           
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef2}
                >
                  <td colspan="3">
                    <b>Sales</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Sales By Customer</td>
                  <td>Sales By Customer</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Sales By Item</td>
                  <td>Sales By Item</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Sales By Person</td>
                  <td>Sales By Person</td>
                  <td>System Generated</td>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef3}
                >
                  <td colspan="3">
                    <b>Receivables</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Customer Balance</td>
                  <td>Customer Balance</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>AR Aging Summary</td>
                  <td>AR Aging Summary</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Invoice Details</td>
                  <td>Invoice Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Sales Order Details</td>
                  <td>Sales Order Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    Delivery Challan Details
                  </td>
                  <td>Delivery Challan Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Quote Details</td>
                  <td>Quote Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Receivable Summary</td>
                  <td>Receivable Summary</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Receivable Details</td>
                  <td>Sales By Person</td>
                  <td>System Generated</td>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef4}
                >
                  <td colspan="3">
                    <b>Payment Received</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Payment Received</td>
                  <td>Payment Received</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Time to Get Paid</td>
                  <td>Time to Get Paid</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}> Creadit Note Details</td>
                  <td>Creadit Note Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Refund history</td>
                  <td>Refund history</td>
                  <td>System Generated</td>
                </tr>
               
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef6}
                >
                  <td colspan="3">
                    <b>Payables</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Vendor Balance</td>
                  <td>Vendor Balance</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    Vendor Balance Summary
                  </td>
                  <td>Vendor Balance</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>AP Aging Summary</td>
                  <td>Vendor Balance</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>AP Aging Details</td>
                  <td>Vendor Balance</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Bills Details</td>
                  <td>Bills Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Payment Made</td>
                  <td>Payment Made</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Refund History</td>
                  <td>Refund History</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    Purchase Order Details
                  </td>
                  <td>Purchase Order Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    Purchase Order by Vendor
                  </td>
                  <td>Purchase Order by Vendor</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}> Payable Summary</td>
                  <td>Purchase Order by Vendor</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Payable Details</td>
                  <td>Purchase Order by Vendor</td>
                  <td>System Generated</td>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef7}
                >
                  <td colspan="3">
                    <b>Purchase and Expenses</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Purchase by Vendor</td>
                  <td>Purchase by Vendor</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Purchase by Item</td>
                  <td>Purchase by Item</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Expense Details</td>
                  <td>Expense Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Expense by Category</td>
                  <td>Expense by Category</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Expense by Customer</td>
                  <td>Expense by Customer</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Expense by Project</td>
                  <td>Payment Made</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    Billable Expense Details
                  </td>
                  <td>Billable Expense Details</td>
                  <td>System Generated</td>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef8}
                >
                  <td colspan="3">
                    <b>Taxes</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Tax Summary</td>
                  <td>Purchase by Vendor</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>TDS Summary</td>
                  <td>TDS Summary</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>TCS Summary</td>
                  <td>TCS Summary</td>
                  <td>System Generated</td>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef9}
                >
                  <td colspan="3">
                    <b>Banking</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Reconciliation Status</td>
                  <td>Reconciliation Status</td>
                  <td>System Generated</td>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef10}
                >
                  <td colspan="3">
                    <b>Project and TimeSheet</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>TimeSheet Details</td>
                  <td>TimeSheet Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    TimeSheet Profitability Summary
                  </td>
                  <td>TimeSheet Profitability Summary</td>
                  <td>System Generated</td>
                </tr>{" "}
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Project Summary</td>
                  <td>Project Summary</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Project Details</td>
                  <td>Project Details</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Project Cost Summary</td>
                  <td>Project Cost Summary</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    Project Revenue Summary
                  </td>
                  <td>Project Revenue Summary</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    Project Performance Summary
                  </td>
                  <td>Project Performance Summary</td>
                  <td>System Generated</td>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef11}
                >
                  <td colspan="3">
                    <b>Accountant</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Accountant Transction</td>
                  <td>Accountant Transction</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Account type Summary</td>
                  <td>Account type Summary</td>
                  <td>System Generated</td>
                </tr>{" "}
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    Account type Transction
                  </td>
                  <td>Account type Transction</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Day Book</td>
                  <td>Day Book</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Journal Report</td>
                  <td>Journal Report</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Trial Balance</td>
                  <td>Trial Balance</td>
                  <td>System Generated</td>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef12}
                >
                  <td colspan="3">
                    <b>Budget</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Budget VS Actuals</td>
                  <td>Budget vs Acctual</td>
                  <td>System Generated</td>
                </tr>
                <tr
                  className="text-start"
                  style={{ background: "aliceblue" }}
                  ref={myRef13}
                >
                  <td colspan="3">
                    <b>Currency</b>
                  </td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>Realized gain or Loss</td>
                  <td>Budget vs Acctual</td>
                  <td>System Generated</td>
                </tr>
                <tr className="text-start">
                  <td style={{ color: "blueviolet" }}>
                    Unrealized gain or Loss
                  </td>
                  <td>Budget vs Acctual</td>
                  <td>System Generated</td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Reports;
