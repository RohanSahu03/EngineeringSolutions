import React, { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { RiBillLine } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IoIosWarning } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VendorCreditSummary() {
  // const {id}=useParams()
  const location = useLocation();
  const receivedData = location.state;
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [bills, setBills] = useState([]);
  const [billdetail, setBillDetail] = useState({});
  const [billstatus, setBillStatus] = useState("Unpaid");
  const [formData, setFormData] = useState({});
  const inputRef = useRef(null);
  const [vendorcrdit, setVendorCredit] = useState({});
  const [vendorcreditstatus, setVendorCreditStatus] = useState("Draft");

  const [receivedObj, setReceivedObj] = useState({});
  const handleChange = (e, paymentReceivedObj) => {
    setReceivedObj(paymentReceivedObj);
    const { name, value } = e.target;

    if (
      value > Math.min(vendorcrdit?.creditsremaining, receivedObj?.balancedue)
    ) {
      setFormData({
        ...formData,
        [name]: 0,
      });
      return toast.warning(
        "amount must be less than bill balance and available credit"
      );
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function numberToWords(number) {
    const units = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const teens = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const scales = ["", "thousand", "million", "billion", "trillion"];

    function convertBelowThousand(num) {
      let result = "";

      if (num >= 100) {
        result += units[Math.floor(num / 100)] + " hundred ";
        num %= 100;
      }

      if (num >= 20) {
        result += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      }

      if (num > 0) {
        if (num < 10) {
          result += units[num] + " ";
        } else {
          result += teens[num - 10] + " ";
        }
      }

      return result.trim();
    }

    if (number === 0) {
      return "zero";
    }

    let word = "";
    let index = 0;

    while (number > 0) {
      if (number % 1000 !== 0) {
        word =
          convertBelowThousand(number % 1000) +
          " " +
          scales[index] +
          " " +
          word;
      }
      number = Math.floor(number / 1000);
      index++;
    }

    return word.trim();
  }
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

  useMemo(() => {
    setSubtotal(
      receivedData.itemdetailsArray.reduce((accumulator, data) => {
        return accumulator + data.subtotal;
      }, 0)
    );
  }, []);
  const generatePdf = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`vendorCredit.pdf`);
    });
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

  const getBillById = async (id) => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/bill/getBillById/${id}`
      );
      if (res.status === 201) {
        setBillDetail(res.data);
      }
      if (res.status === 500) {
        toast.warning("Failed to retrieve data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendorCreditById();
  }, []);

  const getVendorCreditById = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/vendorcredit/getvendorcreditbyid/${receivedData?._id}`
      );
      if (res.status === 201) {
        setVendorCredit(res.data);
      }
      if (res.status === 500) {
        toast.warning("Failed to retrieve credit details");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyAmount = async (id, inputValue) => {
    if (vendorcrdit?.total - vendorcrdit?.creditsremaining === 0) {
      setVendorCreditStatus("Draft");
    }
    if (
      vendorcrdit?.creditsremaining > 0 &&
      vendorcrdit?.creditsremaining < vendorcrdit?.total
    ) {
      setVendorCreditStatus("Open");
    }
    if (vendorcrdit?.creditsremaining === 0) {
      setVendorCreditStatus("Closed");
    }

    if (billdetail?.total - billdetail?.balancedue === 0) {
      setBillStatus("Unpaid");
    }
    if (billdetail?.total === billdetail?.paymentmade) {
      setBillStatus("Paid");
    } else {
      setBillStatus("Partially Paid");
    }
    try {
      const res = await axios.put(
        `https://engineeringsolutions.net.in/api/vendorcredit/updatevendorcredit/${receivedData?._id}`,
        {
          paymentmade: inputValue,
          status: vendorcreditstatus,
        }
      );
      if (res.status === 201) {
        toast.success("Due credit is updated");
        getVendorCreditById();
        getBillById(id);
      }
      if (res.status === 404) {
        toast.warning("Credit not found");
      }
      if (res.status === 500) {
        toast.warning("Failed to update credit");
      }

      const res1 = await axios.put(
        `https://engineeringsolutions.net.in/api/bill/updateBill/${id}`,
        { status: billstatus, paymentmade: inputValue }
      );
      if (res1.status === 201) {
        toast.success("Credit has applied to Bill");
        getBillById(id);
        getVendorCreditById();
      }
      if (res1.status === 404) {
        toast.warning("Bill not found");
      }
      if (res1.status === 500) {
        toast.warning("Failed to update bill");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* ----------------------Modal2-------------------------- */}
      <Modal show={show1} onHide={handleClose1} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            Apply Credits for {vendorcrdit?.creditnumber}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row text-end">
            Available Credit: ₹ {vendorcrdit?.creditsremaining}
          </div>
          <div className="row mt-3 overflow-auto">
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr style={{ backgroundColor: "aliceblue" }}>
                  <th scope="col">Bill No.</th>
                  <th scope="col">Bill Date</th>
                  <th scope="col">Bill Amount</th>
                  <th scope="col">Bill Balance</th>
                  <th scope="col">Credit to Apply</th>
                  <th scope="col"> Action</th>
                </tr>
              </thead>
              <tbody>
                {bills
                  ?.filter(
                    (val) =>
                      val?.vendorname?._id === vendorcrdit?.vendorname?._id &&
                      val?.status !== "Paid"
                  )
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.billnumber}</td>
                        <td>{formatDate(item.billdate)}</td>
                        <td> ₹ {item.total}</td>
                        <td> ₹ {item.balancedue}</td>
                        <td>
                          <input
                            type="number"
                            id={`field${index + 1}`}
                            name={`field${index + 1}`}
                            value={formData[`field${index + 1}`] || ""}
                            onChange={(e) => {
                              handleChange(e, item);
                            }}
                            ref={inputRef}
                            min="0"
                          />
                        </td>
                        <td>
                          {item.balancedue > 0 ? (
                            <Button
                              variant="primary"
                              onClick={() => {
                                applyAmount(
                                  item?._id,
                                  formData[`field${index + 1}`]
                                );
                              }}
                            >
                              Apply Credits
                            </Button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer className="text-start">
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container mt-3">
        <button type="button" class="btn btn-success" onClick={generatePdf}>
          <FaFilePdf />
          &nbsp;PDF
        </button>
        <button
          type="button"
          class="btn btn-primary mx-3"
          onClick={() => {
            handleShow1();
            getAllBill();
          }}
        >
          <RiBillLine />
          &nbsp;Apply to Bill
        </button>
      </div>
      <section className="mt-3" id="pdf-content">
        <div className="container border p-5">
          <div className="row  " style={{ backgroundColor: "#D6EFD8" }}>
            <div className="col-md-4 text-start pt-2">
              <h5>Engineering Solutions</h5>
              (Engineers & Civil Contractors)
              <br />
              1st Main, No.28, 1st Floor, Apporva Nagar,Near Silver Town Cross,
              Gokul Road Hubbali, Karnataka, 580030
              <br />
              <b>GST No.</b> - 29AADFE3350N1Z7
            </div>
            <div className="col-md-4 mb-2">
              <img
                src="/images/logo-removebg.png"
                alt=""
                srcset=""
                style={{ width: "200px", height: "180px" }}
              />
            </div>
            <div className="col-md-4 text-end align-items">
              <h2>VENDOR CREDITS</h2>
            </div>
          </div>
          <div class="row ">
            <div className="col-md-3 text-start ">
              <p>
                <b>Credit Note# :</b>
              </p>
            </div>
            <div className="col-md-3 text-start border-end">
              {receivedData && receivedData?.creditnumber}
            </div>
          </div>
          <div class="row ">
            <div className="col-md-3 text-start ">
              <p>
                <b>Credit Remaining :</b>
              </p>
            </div>
            <div className="col-md-3 text-start border-end">
              {receivedData && receivedData?.total}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Credit Note Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-start border-end">
              {formatDate(receivedData && receivedData?.creditnotedate)}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Order Number :</b>
              </p>
            </div>
            <div className="col-md-3 text-start border-end">
              {receivedData && receivedData?.ordernumber}
            </div>
          </div>
          <div
            className="row border text-start"
            style={{ backgroundColor: "#F6F5F2" }}
          >
            <div className="col-md-2 ">
              <p>
                <b>Bill To</b>
              </p>
            </div>
            <div className="col-md-10 text-start">
              <p>
                <b>
                  {receivedData && receivedData.vendorname?.vendorfirstname}
                </b>
              </p>
            </div>
          </div>
          <div className="row mt-2">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: "#F6F5F2" }}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item & Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {receivedData &&
                  receivedData.itemdetailsArray.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.itemdetails}</td>
                        <td>{item.quantity}</td>
                        <td>{item.rate}</td>
                        <td>{item.amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-md-7  text-start">
              <div className="row">
                <p>Total In Words</p>
                <p>
                  <i>
                    <b>{receivedData && numberToWords(receivedData.total)}</b>
                  </i>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>subtotal</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {receivedData && receivedData.subtotal}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Shipping Charge</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {receivedData && receivedData.shippingcharges}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Gst tax</p>
                </div>
                <div className="col-md-6  text-end">
                  {receivedData && receivedData.gsttax}%
                </div>
                <hr />
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>
                    <b>Total</b>
                  </p>
                </div>
                <div className="col-md-6  text-end">
                  <b> ₹ {receivedData && receivedData?.total}</b>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>
                    <b>Credit Remaining</b>
                  </p>
                </div>
                <div className="col-md-6  text-end">
                  <b> ₹ {vendorcrdit?.creditsremaining}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 offset-6 " style={{ marginTop: "130px" }}>
              <small>Authorized Signature</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VendorCreditSummary;
