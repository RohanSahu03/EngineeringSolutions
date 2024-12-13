import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function CreditNoteSummary() {
  // const {id}=useParams()
  const location = useLocation();
  const receivedData = location.state;
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

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
      pdf.save(`${receivedData.quote}.pdf`);
    });
  };

  return (
    <div>
      <div className="container mt-3">
        <button type="button" class="btn btn-success" onClick={generatePdf}>
          <FaFilePdf />
          &nbsp;PDF
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
              <h2>CREDIT NOTE</h2>
            </div>
          </div>
          <div class="row ">
            <div className="col-md-3 text-start ">
              <p>
                <b>Credit Note# :</b>
              </p>
            </div>
            <div className="col-md-3 text-start border-end">
              {receivedData && receivedData?.creditnotenumber}
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
                <b>Reference# :</b>
              </p>
            </div>
            <div className="col-md-3 text-start border-end">
              {receivedData && receivedData.reference}
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
                  {receivedData && receivedData.customername.customerfirstname}
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
                    <b>
                      Indian rupee {numberToWords(receivedData?.total)} only
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
                  <b> ₹ {receivedData && receivedData.total}</b>
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

export default CreditNoteSummary;
