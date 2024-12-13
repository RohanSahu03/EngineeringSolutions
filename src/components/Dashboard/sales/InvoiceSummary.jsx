import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PiCoins } from "react-icons/pi";
import { TbCurrencyRupee } from "react-icons/tb";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IoIosWarning } from "react-icons/io";
import "../../../css/dashboard/invoicesummary.css";

function InvoiceSummary() {
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
  const [invoicestatus, setInvoiceStatus] = useState("");

  const [amounttocredit, setAmountToCredit] = useState(0);
  const [formData, setFormData] = useState({});
  const inputRef = useRef(null);

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
      pdf.save(`${receivedData.invoice}.pdf`);
    });
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

  const [paymentreceived, setPaymentReceived] = useState([]);

  const getPaymentsDetails = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/paymentreceived/getpaymentreceived"
      );
      if (res.status === 201) {
        setPaymentReceived(res.data);
      }
      if (res.status === 500) {
        // console.log("data", res.data);
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoiceById(receivedData._id);
    getPaymentsDetails();
  }, []);

  const [invoiceitem, setInvoiceItem] = useState({});
  const getInvoiceById = async (id) => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/invoices/getinvoice/${id}`
      );
      if (res.status === 201) {
        setInvoiceItem(res.data);
        console.log("data", res.data);
      }
      if (res.status === 500) {
        // console.log("data", res.data);
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateCredit = useMemo(() => {
    return paymentreceived
      .filter(
        (val) =>
          val.customername._id === receivedData.customername._id &&
          val.amountreceived > 0
      )
      .reduce((acc, data) => {
        return acc + data.amountreceived;
      }, 0)
      .toFixed(2);
  }, [paymentreceived]);

  const calculateUsedAmount = useMemo(() => {
    return paymentreceived
      .filter((val) => val.customername?._id === invoiceitem?.customername?._id)
      .reduce((acc, data) => {
        return acc + data.usedamount;
      }, 0)
      .toFixed(2);
  }, [paymentreceived]);

  const calculateTotalAmount = useMemo(() => {
    return paymentreceived
      .filter(
        (val) =>
          val.customername._id === receivedData.customername._id &&
          val.amountreceived > 0
      )
      .reduce((acc, data) => {
        return acc + data.amountreceived;
      }, 0)
      .toFixed(2);
  }, [paymentreceived]);

  const [receivedObj, setReceivedObj] = useState({});
  const handleChange = (e, paymentReceivedObj) => {
    setReceivedObj(paymentReceivedObj);
    console.log(paymentReceivedObj);
    const { name, value } = e.target;

    if (
      value >
      Math.min(
        paymentReceivedObj?.amountreceived - paymentReceivedObj?.usedamount,
        invoiceitem?.dueamount
      )
    ) {
      setFormData({
        ...formData,
        [name]: 0,
      });
      return toast.warning(
        "amount must be less than invoice balance and available credit"
      );
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateCredit = async (id, inputValue) => {
    if (invoiceitem?.total - invoiceitem?.dueamount === 0) {
      setInvoiceStatus("Unpaid");
    }
    if (invoiceitem?.total === invoiceitem?.paymentmade) {
      setInvoiceStatus("Paid");
    } else {
      setInvoiceStatus("Partially Paid");
    }
    try {
      const res = await axios.put(
        `https://engineeringsolutions.net.in/api/paymentreceived/updatepaymentreceived/${id}`,
        { usedamount: inputValue }
      );
      if (res.status === 201) {
        toast.success("credit has been applied to invoice.");
      }

      const res1 = await axios.put(
        `https://engineeringsolutions.net.in/api/invoices/updateinvoice/${receivedData._id}`,
        { status: invoicestatus, paymentmade: inputValue }
      );
      if (res1.status === 201) {
        toast.success("Due balance is updated");
        getInvoiceById(receivedData._id);
        getPaymentsDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const calculateSum = useMemo(() => {
  //   return( Object.values(formData)
  //     .map((value) => parseFloat(value) || 0) // Convert to number, default to 0 if NaN
  //     .reduce((acc, curr) => acc + curr, 0)).toFixed(2)// Sum up the values
  // }, [formData]);

  const creditAvailable = useMemo(() => {
    return (calculateTotalAmount - calculateUsedAmount).toFixed(2);
  }, [paymentreceived]);

  //   const totalAmount = useMemo(()=>{
  // return invoiceitem?.total
  //   },[invoiceitem])

  //   const dueAmount = useMemo(()=>{
  //     return invoiceitem?.dueamount
  //       },[invoiceitem])

  return (
    <div>
      <ToastContainer />
      {/* ----------------------Modal-------------------------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <IoIosWarning style={{ fontSize: "35px" }} /> On applying credits, the
          invoice status will be changed to 'Sent'.
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
          <Modal.Title>
            Apply Credits for {receivedData && receivedData.invoice}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row text-end">
            Invoice Balance : ₹ {invoiceitem?.total}
          </div>
          <div className="row mt-3 overflow-auto">
            <table class="table table-striped">
              <thead className="thead-dark">
                <tr style={{ backgroundColor: "aliceblue" }}>
                  <th scope="col">Credit Note#</th>
                  <th scope="col">Credit Note Date</th>
                  <th scope="col">Credit Amount</th>
                  <th scope="col">Credit Available</th>
                  <th scope="col"> Amount to Credit</th>
                  <th scope="col"> Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentreceived
                  ?.filter(
                    (val) =>
                      val?.customername?._id === receivedData?.customername?._id
                  )
                  .map((item, index) => {
                    return (
                      <tr>
                        <td>{item.reference}</td>
                        <td>{formatDate(item.paymentdate)}</td>
                        <td> ₹ {item.amountreceived}</td>
                        <td>₹ {item.amountreceived - item.usedamount}</td>
                        <td>
                          <input
                            type="number"
                            id={`field${index + 1}`}
                            name={`field${index + 1}`}
                            value={formData[`field${index + 1}`] || ""}
                            onChange={(e) => {
                              // setpaymentReceivedObj(item);
                              handleChange(e, item);
                            }}
                            ref={inputRef}
                          />
                        </td>
                        <td>
                          {item.amountreceived - item.usedamount !== 0 ? (
                            <Button
                              variant="primary"
                              onClick={() => {
                                updateCredit(
                                  receivedObj._id,
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
              <p>Invoice Balance Due: {invoiceitem?.dueamount}</p>
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

      {receivedData && receivedData?.status === "Paid" ? (
        ""
      ) : (
        <div className="card mt-2">
          <div className="card-body text-start">
            <p>
              <PiCoins /> &nbsp;<b>Credits Available :</b> <TbCurrencyRupee />
              {creditAvailable}
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

      {/* );
        })} */}

      <section className="mt-3" id="pdf-content">
        <span className="status">
          <i>{receivedData && receivedData?.status} </i>
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
              <h2>TAX INVOICE</h2>
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Invoice No. :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {receivedData && receivedData.invoice}
            </div>

            <div className="col-md-3 text-end">
              <p>
                <b>GSTIN :</b>
              </p>
            </div>
            <div className="col-md-3 text-end">22AAAAA0000A1Z5</div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Invoice Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {receivedData && formatDate(receivedData.invoicedate)}
            </div>
            <div className="col-md-3 text-end">
              <p>
                <b>PAN No. :</b>
              </p>
            </div>
            <div className="col-md-3 text-end">AADFE3350N</div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Terms:</b>
              </p>
            </div>
            <div className="col-md-3 text-start">{receivedData?.terms}</div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Due Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {receivedData && formatDate(receivedData.duedate)}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>P.O.# :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {receivedData && receivedData.ordernumber}
            </div>
          </div>
          <div
            className="row border text-start"
            style={{ backgroundColor: "#F6F5F2" }}
          >
            <div className="col-md-6 pb-3 pt-3">
              <p>
                <b>Name & Address of Buyer</b>
              </p>
              <p style={{ textTransform: "uppercase", marginBottom: "4px" }}>
                <b>
                  {receivedData && receivedData.customername.customerfirstname}
                </b>
              </p>
              {receivedData && receivedData.customername.billingaddressaddress},
              {receivedData && receivedData.customername.billingaddresscity}
              <br />
              {receivedData && receivedData.customername.billingaddresspincode}
              <br />
              PAN No. : {receivedData && receivedData.customername.pan}
            </div>
            <div className="col-md-6 text-start pb-3  pt-3">
              <p>
                <b>Site Address(Place of Supply)</b>
              </p>
              {receivedData && receivedData.customername.shippingaddressaddress}
              ,{receivedData && receivedData.customername.shippingaddresscity}
              <br />
              {receivedData && receivedData.customername.shippingaddresspincode}
            </div>
          </div>
          <div className="row mt-2">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: "#F6F5F2" }}>
                <tr>
                  <th scope="col">Sl.No.</th>
                  <th scope="col">Description of Goods</th>
                  <th scope="col">HSN Code</th>
                  <th scope="col">Qty in CU.MTR</th>
                  <th scope="col">Rate Per Cu.MTR</th>
                  <th scope="col">Assessable Value</th>
                </tr>
              </thead>
              <tbody>
                {receivedData &&
                  receivedData?.itemdetailsArray.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.itemdetails}</td>
                        <td></td>
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
                    <b>Indian Rupee {numberToWords(invoiceitem?.total)} only</b>
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
                  ₹ {invoiceitem?.subtotal}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Shipping Charge</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {invoiceitem?.shippingcharges}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Gst tax</p>
                </div>
                <div className="col-md-6  text-end">{invoiceitem?.gsttax}%</div>
                <hr />
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>
                    <b>Total</b>
                  </p>
                </div>
                <div className="col-md-6  text-end">
                  <b> ₹ {invoiceitem?.total}</b>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Payment Made</p>
                </div>
                <div className="col-md-6  text-end">
                  <span style={{ color: "red" }}>
                    (-) {invoiceitem?.paymentmade}
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>
                    <b>Balance Due</b>
                  </p>
                </div>
                <div className="col-md-6  text-end">
                  <b> ₹ {invoiceitem?.dueamount}</b>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-start">
              <p>
                <b>Declaration :</b>
              </p>
            </div>
            <div className="col-md-12 text-start">
              We declare to the best of our knowledge and belief that the
              particulars stated herein are true and correct and there is no
              additional consideration accruing to us either directly or
              indirectly in any mannerother than the amounts indicated here.
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-md-12 text-start">
              <p>
                <b>Terms & Conditions:</b>
              </p>
            </div>
            <div className="col-md-12 text-start">
              <ol>
                <li>
                  Interest will be recovered @24% p.a on overdue unpaid bills.
                </li>
                <li>
                  Claims of any nature whatsoever will lapse unless raised in
                  writing within 3 days from the date of invoice. Goods once
                  sold cannot be return and/or exchanged.
                </li>
                <li>
                  We reserved to ourselves the right to demand payment of this
                  bill any time before due date.
                </li>
                <li>
                  Payment are to be made at our office by a/c payee's cheque.
                </li>
              </ol>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12 text-start">
              <p>
                <b>Warnig:</b>
              </p>
            </div>
            <div className="col-md-12 text-start">
              <ol>
                <li>
                  Concrete should be unloaded within two hours after reaching at
                  your site, otherwise detention charges will be applicable & we
                  are not responsible for quality of product.
                </li>
                <li>
                  Do not add any water & admixture without consultation with
                  Quality Department
                </li>
                <li>
                  Will cause serious eye iritation and allergic skin reaction .
                </li>
                <li>
                  Do not handle concrete until all safety precautions have been
                  taken.
                </li>
                <li>Wash any exposed body parts after handling </li>
                <li>Avoid Breathing dust.</li>
              </ol>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6 " style={{ marginTop: "130px" }}>
              <small>Receiver's Signature</small>
            </div>
            <div className="col-md-6" style={{ marginTop: "130px" }}>
              <small>Authorized Signature</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InvoiceSummary;
