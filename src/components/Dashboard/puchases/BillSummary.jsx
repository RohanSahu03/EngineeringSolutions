import React, { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiCoins } from "react-icons/pi";
import { TbCurrencyRupee } from "react-icons/tb";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IoIosWarning } from "react-icons/io";
import "../../../css/dashboard/invoicesummary.css";

function BillSummary() {
  // const {id}=useParams()
  const location = useLocation();
  const receivedData = location.state;
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const [bill, setBill] = useState({});
  const [paymentlist, setPaymentList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [formData, setFormData] = useState({});
  const inputRef = useRef(null);

  const [receivedObj, setReceivedObj] = useState({});
  const handleChange = (e, paymentReceivedObj) => {
    setReceivedObj(paymentReceivedObj);
    const { name, value } = e.target;

    if (value > Math.min(bill?.balancedue, receivedObj?.unusedamount)) {
      setFormData({
        ...formData,
        [name]: 0,
      });
      return toast.warning(
        "amount must be less than bill balance and available balance"
      );
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getAllPaymentDetails = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/paymentmode/getpaymentmode"
      );
      if (res.status === 200) {
        setPaymentList(res.data);
      }
      if (res.status === 500) {
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateCredit = useMemo(() => {
    return paymentlist
      .filter(
        (val) =>
          val.vendorname?._id?.toString() === bill.vendorname?._id?.toString()
      )
      .reduce((acc, data) => {
        return Number(acc + data.unusedamount);
      }, 0)
      ?.toFixed(2);
  }, [paymentlist]);

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

    function convertFractionalPart(num) {
      return num
        .toString()
        .split("")
        .map((digit) => units[parseInt(digit)])
        .join(" ");
    }

    if (number === 0) {
      return "zero";
    }

    let [integerPart, fractionalPart] = number.toString().split(".");
    integerPart = parseInt(integerPart, 10);
    fractionalPart = fractionalPart ? parseInt(fractionalPart, 10) : 0;

    let word = "";
    let index = 0;

    // Convert integer part
    while (integerPart > 0) {
      if (integerPart % 1000 !== 0) {
        word =
          convertBelowThousand(integerPart % 1000) +
          (scales[index] ? " " + scales[index] : "") +
          (word ? " " + word : "");
      }
      integerPart = Math.floor(integerPart / 1000);
      index++;
    }

    // Convert fractional part
    if (fractionalPart > 0) {
      word += " point " + convertFractionalPart(fractionalPart);
    }

    return word.trim();
  }

  const formatDate = (inputDateStr) => {
    // Step 1: Parse the date string into a Date object
    const inputDate = new Date(inputDateStr);

    // Step 2: Format the date into dd/mm/yyyy format
    const day = inputDate.getDate()?.toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1)?.toString().padStart(2, "0"); // Months are zero-indexed
    const year = inputDate.getFullYear();

    // Return the formatted date string
    return `${day}/${month}/${year}`;
  };

  useMemo(() => {
    setSubtotal(
      receivedData?.itemdetailsArray?.reduce((accumulator, data) => {
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

  useEffect(() => {
    getBillById(receivedData?._id);
    getAllPaymentDetails();
  }, []);

  const [billstatus, setBillStatus] = useState("");

  const getBillById = async (id) => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/bill/getBillById/${id}`
      );
      if (res.status === 201) {
        setBill(res.data);
      }
      if (res.status === 500) {
        toast.warning("Failed to retrieve data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyAmount = async (id, inputValue) => {
    if (bill?.total - bill?.balancedue === 0) {
      setBillStatus("Unpaid");
    } else if (bill?.total === bill?.paymentmade) {
      setBillStatus("Paid");
    } else {
      setBillStatus("Partially Paid");
    }
    try {
      const res = await axios.put(
        `https://engineeringsolutions.net.in/api/paymentmode/updatepaymentmode/${id}`,
        { unusedamount: inputValue, billnumbers: bill?.billnumber }
      );
      if (res.status === 201) {
        toast.success("credit has been applied to bill.");
      }

      const res1 = await axios.put(
        `https://engineeringsolutions.net.in/api/bill/updateBill/${bill?._id}`,
        { status: billstatus, paymentmade: inputValue }
      );
      if (res1.status === 201) {
        toast.success("Due balance is updated");
        getBillById(bill?._id);
        getAllPaymentDetails();
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

  console.log("status", bill?.status);

  return (
    <div>
      <ToastContainer />
      {/* ----------------------Modal-------------------------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <IoIosWarning style={{ fontSize: "35px" }} /> This Bill will be
          automatically marked as Open once credits are applied.
        </Modal.Body>
        <Modal.Footer className="text-start">
          <Button
            variant="primary"
            onClick={() => {
              handleShow1();
              handleClose();
            }}
          >
            Ok
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ----------------------Modal2-------------------------- */}
      <Modal show={show1} onHide={handleClose1} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Apply Credits for {bill?.billnumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row text-end">
            Bill Balance : ₹ {bill?.balancedue}
          </div>
          <div className="row mt-3 overflow-auto">
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr style={{ backgroundColor: "aliceblue" }}>
                  <th scope="col">Credit Details</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Available Balance</th>
                  <th scope="col">Amount Applied</th>
                  <th scope="col"> Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentlist
                  ?.filter(
                    (val) => val?.vendorname?._id === bill?.vendorname?._id
                  )
                  .map((item, index) => {
                    return (
                      <tr>
                        <td>{item.reference}</td>
                        <td>{item.paymentmade}</td>
                        <td> ₹ {item.unusedamount}</td>
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
                          {item.unusedamount > 0 ? (
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
            <div className="row">
              <p>Final Bill Balance :{} </p>
            </div>
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
      </div>

      {bill?.status === "Paid" ? (
        ""
      ) : (
        <div className="card mt-2">
          <div className="card-body text-start">
            <p>
              <PiCoins /> &nbsp;<b>Credits Available :</b> <TbCurrencyRupee />
              {calculateCredit}
              &nbsp;&nbsp;
              <span
                onClick={handleShow}
                style={{ color: "blueviolet", cursor: "pointer" }}
              >
                Apply Now
              </span>
            </p>
          </div>
        </div>
      )}
      <section className="mt-3" id="pdf-content">
        <span className="status">
          <i>{bill?.status} </i>
        </span>
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
              <h2>BILL</h2>
            </div>
          </div>
          <div class="row d-flex justify-content-end">
            <div className="col-md-3 text-end ">
              <p>
                <b>Bill Number :</b>
              </p>
            </div>
            <div className="col-md-3 text-end ">{bill?.billnumber}</div>
          </div>
          <div class="row  d-flex justify-content-end">
            <div className="col-md-3 text-end ">
              <p>
                <b>Order Number :</b>
              </p>
            </div>
            <div className="col-md-3 text-end ">{bill?.ordernumber}</div>
          </div>
          <div class="row  d-flex justify-content-end">
            <div className="col-md-3 text-end">
              <p>
                <b>Bill Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-end">
              {formatDate(bill?.billdate)}
            </div>
          </div>
          <div class="row  d-flex justify-content-end">
            <div className="col-md-3 text-end">
              <p>
                <b>Due Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-end">{formatDate(bill?.duedate)}</div>
          </div>
          <div class="row  d-flex justify-content-end">
            <div className="col-md-3 text-end">
              <p>
                <b>Terms :</b>
              </p>
            </div>
            <div className="col-md-3 text-end">{bill?.paymentterm}</div>
          </div>
          <div
            className="row border text-start"
            style={{ backgroundColor: "#F6F5F2" }}
          >
            <div className="col-md-2 ">
              <p>
                <b>Bill From</b>
              </p>
            </div>
            <div className="col-md-10 text-start">
              <p>
                <b>{bill?.vendorname?.vendorfirstname}</b>
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
                {bill?.itemdetailsArray?.map((item, index) => {
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
                    {/* <b>Indian rupees {numberToWords(bill?.total)} only</b> */}
                    <b>
                      Indian rupees {numberToWords(Number(bill?.total))} only
                    </b>
                  </i>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>subtotal</p>
                </div>
                <div className="col-md-6  text-end">₹ {bill?.subtotal}</div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Adjustment</p>
                </div>
                <div className="col-md-6  text-end">₹{bill?.adjustments}</div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Discount</p>
                </div>
                <div className="col-md-6  text-end">{bill?.discount}%</div>
              </div>
              <hr />

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
                <div
                  className="col-md-6 text-start d-flex"
                  style={{ backgroundColor: "aliceblue" }}
                >
                  <p>
                    <b>Balance Due</b>
                  </p>
                </div>
                <div
                  className="col-md-6  text-end"
                  style={{ backgroundColor: "aliceblue" }}
                >
                  <b> ₹ {bill?.balancedue}</b>
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

export default BillSummary;
