import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SalesOrderSummary() {
  // const {id}=useParams()
  const location = useLocation();
  const receivedData = location.state;
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const [appbtn, setAppBtn] = useState(false);
  const [cancelbtn, setCancelBtn] = useState(false);

  const [listofquote, setListofQuote] = useState({});
 


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
      if (num === 0) return "";
      return (
        num
          .toString()
          .split("")
          .map((digit) => units[parseInt(digit)])
          .join(" ") + " "
      );
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
          " " +
          scales[index] +
          " " +
          word;
      }
      integerPart = Math.floor(integerPart / 1000);
      index++;
    }

    // Convert fractional part
    if (fractionalPart > 0) {
      word += "point " + convertFractionalPart(fractionalPart);
    }

    return word.trim();
  }

  useMemo(() => {
    setSubtotal(
      listofquote?.itemdetailsArray?.reduce((accumulator, data) => {
        return accumulator + data.subtotal;
      }, 0)
    );
  }, [listofquote]);
  const generatePdf = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${listofquote.quote}.pdf`);
    });
  };

  const getQuoteById = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/salesorder/getsalesorderbyid/${receivedData?._id}`
      );
      if (res.status === 201) {
        setListofQuote(res.data);
          console.log('fdf',res.data)
      }
      if (res.status === 500) {
        toast.warning("Failed to retrieve data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getQuoteById()
  },[])

  const updateStatus = async (recdata) => {
    if (recdata == "Approved") {
      try {
        const res = await axios.put(
          `https://engineeringsolutions.net.in/api/quotation/quotationupdate/${receivedData?._id}`,
          { status: "Approved" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          getQuoteById()
      
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
          `https://engineeringsolutions.net.in/api/quotation/quotationupdate/${receivedData?._id}`,
          { status: "Cancel" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          getQuoteById()
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
      <div className="container mt-3">
        <button type="button" class="btn btn-success" onClick={generatePdf}>
          <FaFilePdf />
          &nbsp;PDF
        </button>
        {/* {receivedData.status === "quotation" ? (
          <button
            type="button"
            class="btn btn-primary mx-3"
            onClick={() =>
              navigate("/dashboard/sales/quotetoinvoice", {
                state: receivedData,
              })
            }
          >
            Convert to Invoice
          </button>
        ) : (
          ""
        )} */}

{listofquote?.status === "Pending" ? (
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
          <div className="row pt-2" style={{ backgroundColor: "#D6EFD8" }}>
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
            <div className="col-md-4 text-end align-items-center h-100">
              <h2>SALES ORDER</h2>
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>SO Number :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              { listofquote?.salesorder}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>SO Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {formatDate(listofquote?.salesorderdate)}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Quotation Number :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              { listofquote?.quotenumber}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Quotation Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {formatDate(listofquote?.quotedate)}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Expected Shipment Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {formatDate(listofquote?.expectedshipmentdate)}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Reference# :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {listofquote && listofquote?.reference}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Status:</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {listofquote && listofquote?.status}
            </div>
          </div>
          <div
            className="row border text-start"
            style={{ backgroundColor: "#F6F5F2" }}
          >
            <div className="col-md-12">
              <b>
                To
              </b>
            </div>
          
            <div className="col-md-12 mt-2 text-start">
              <p>
               
                  {listofquote &&
                    listofquote?.customername?.customerfirstname}
                    <br />
                    {listofquote?.customername?.billingaddressaddress}
                    <br />
                    {listofquote?.customername?.billingaddresscity}

              </p>
            </div>
          </div>
          <div className="row mt-2">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: "#F6F5F2" }}>
                <tr>
                  <th scope="col">Sl.No.</th>
                  <th scope="col">Item & Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {listofquote &&
                  listofquote?.itemdetailsArray?.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.itemdetails}</td>
                        <td>{item.quantity}</td>
                        <td>{item.rate}</td>
                        <td>{item.discount} {item.discountunit}</td>
                        <td>{item.amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-md-7  text-start">
              {/* <div className="row">
                <p>Terms & Conditions</p>
                <br />
                <p>
                  {listofquote?.termsandconditions}
                </p>
              </div> */}
              <div className="row">
                <p>Total In Words</p>
                <p>
                  <i>
                    <b>
                      Indian rupee {listofquote?.total ? numberToWords(listofquote.total) : 'N/A'} only
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
                <div className="col-md-6  text-end">
                  ₹ {listofquote?.subtotal}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Shipping Charge</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {listofquote && listofquote?.shippingcharges}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>SGST tax</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹
                  {Number(
                    (
                      (Number(listofquote?.subtotal) *
                        Number(listofquote?.sgsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${listofquote?.sgsttax}%)`}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>CGST tax</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹
                  {Number(
                    (
                      (Number(listofquote?.subtotal) *
                        Number(listofquote?.cgsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${listofquote?.cgsttax}%)`}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>IGST tax</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹
                  {Number(
                    (
                      (Number(listofquote?.subtotal) *
                        Number(listofquote?.igsttax)) /
                      100
                    ).toFixed(2)
                  )}{" "}
                  &nbsp; {`(${listofquote?.igsttax}%)`}
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
                  <b> ₹ {listofquote && listofquote.total}</b>
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

export default SalesOrderSummary;
