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
import Button from "@mui/material/Button";
import { IoIosWarning } from "react-icons/io";
import "../../../css/dashboard/invoicesummary.css";
import ButtonGroup from "@mui/material/ButtonGroup";

function ViewIndent() {
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

  const [indentStatus, setIndentStatus] = useState();

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

    console.log("bill", bill);

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
      pdf.save(`${receivedData?.indentno}.pdf`);
    });
  };

  const [billstatus, setBillStatus] = useState("");

  const getIndentById = async (id) => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/indent/getIndentById/${receivedData?._id}`
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

  useEffect(() => {
    getIndentById();
    // getAllPaymentDetails();
  }, []);

  const [appbtn, setAppBtn] = useState(false);
  const [cancelbtn, setCancelBtn] = useState(false);

  const updateStatus = async (recdata) => {
    if (recdata == "Approved") {
      try {
        const res = await axios.put(
          `https://engineeringsolutions.net.in/api/indent/updateIndent/${receivedData?._id}`,
          { status: "Approved" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          console.log(res);
          getIndentById();
        } else {
          toast.error("Indent not found..");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (recdata == "Cancel") {
      try {
        const res = await axios.put(
          `https://engineeringsolutions.net.in/api/indent/updateIndent/${receivedData?._id}`,
          { status: "Cancel" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          console.log(res);
          getIndentById();
        } else {
          toast.error("Indent not found..");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mt-3 d-flex justify-content-around">
        updateRFQById
        <button type="button" class="btn btn-success" onClick={generatePdf}>
          <FaFilePdf />
          &nbsp;PDF
        </button>
        {bill?.status === "Pending" ? (
          <div className="d-flex align-items-center">
            <h6>Change status :</h6>
            <div>
              <Button
                variant="contained"
                className="mx-3"
                disabled={appbtn}
                onClick={() => {
                  updateStatus("Approved");
                  setCancelBtn(true);
                }}
              >
                Approved
              </Button>
              <Button
                variant="contained"
                disabled={cancelbtn}
                onClick={() => {
                  updateStatus("Cancel");
                  setAppBtn(true);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
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
            <div className="col-md-4 mb-2 ">
              <img
                src="/images/logo-removebg.png"
                alt=""
                srcset=""
                style={{ width: "200px", height: "180px" }}
              />
            </div>
            <div className="col-md-4 text-end align-items pt-2">
              <h2>INDENT</h2>
            </div>
          </div>
          <div class="row d-flex justify-content-end">
            <div className="col-md-3 text-end ">
              <p>
                <b>Indent Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-end ">
              {formatDate(receivedData?.indentdate)}
            </div>
          </div>
          <div class="row  d-flex justify-content-end">
            <div className="col-md-1 text-start ">
              <p>
                <b>Status :</b>
              </p>
            </div>
            <div className="col-md-5 text-start">
              <Button variant="outlined">{bill?.status}</Button>
            </div>

            <div className="col-md-3 text-end ">
              <p>
                <b>Indent Number :</b>
              </p>
            </div>
            <div className="col-md-3 text-end ">{receivedData?.indentno}</div>
          </div>
          <div class="row  d-flex justify-content-end">
            <div className="col-md-3 text-end">
              <p>
                <b>Required By :</b>
              </p>
            </div>
            <div className="col-md-3 text-end">
              {formatDate(receivedData?.requireddate)}
            </div>
          </div>

          <div className="row mt-2">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: "#F6F5F2" }}>
                <tr>
                  <th scope="col">Sl.no</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Stock Qty.</th>
                  <th scope="col">Quantity Required</th>
                  <th scope="col">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {receivedData?.indentItems?.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.itemname}</td>
                      <td>{item.unit}</td>
                      <td>{item.stockquantity}</td>
                      <td>{item.quantityrequired}</td>
                      <td>{item.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 offset-6 " style={{ marginTop: "90px" }}>
              <small>Authorized Signature</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewIndent;
