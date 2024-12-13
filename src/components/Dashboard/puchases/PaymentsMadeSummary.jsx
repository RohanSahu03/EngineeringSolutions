import React from "react";
import { useLocation } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function PaymentsMadeSummary() {
  const location = useLocation();
  const receivedData = location.state;

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

  const generatePdf = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("abc.pdf");
    });
  };

  return (
    <div>
      <div className="container">
        <button
          type="button"
          class="btn btn-success mt-2"
          onClick={generatePdf}
        >
          <FaFilePdf />
          &nbsp;PDF
        </button>
        <section className="mt-3" id="pdf-content">
          <div className="container border p-5">
            <div className="row  " style={{ backgroundColor: "#D6EFD8" }}>
              <div className="col-md-4 text-start pt-2">
                <h5>Engineering Solutions</h5>
                (Engineers & Civil Contractors)
                <br />
                1st Main, No.28, 1st Floor, Apporva Nagar,Near Silver Town
                Cross, Gokul Road Hubbali, Karnataka, 580030
                <br />
                <b>GST No.</b> - 29AADFE3350N1Z7
              </div>
              <div className="col-md-6 mb-2">
                <img
                  src="/images/logo-removebg.png"
                  alt=""
                  srcset=""
                  style={{ width: "200px", height: "180px" }}
                />
              </div>
            </div>

            <div className="col-md-12 mt-4">
              <h4>
                <u>PAYMENTS MADE</u>
              </h4>
            </div>
            <div className="row">
              <div className="col-md-9 ">
                <div class="row  mt-4">
                  <div className="col-md-3 text-start ">
                    <p>
                      <b>Payment# :</b>
                    </p>
                  </div>
                  <div className="col-md-8  text-start">1</div>
                </div>
                <div class="row">
                  <div className="col-md-3 text-start">
                    <p>
                      <b>Payment Date</b>
                    </p>
                  </div>
                  <div className="col-md-8 text-start">
                    {receivedData && formatDate(receivedData.paymentdate)}
                  </div>
                  <div class="row">
                    <div className="col-md-3 text-start">
                      <p>
                        <b>Reference :</b>
                      </p>
                    </div>
                    <div className="col-md-8 text-start">
                      {receivedData && receivedData.reference}
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-3 text-start">
                      <p>
                        <b>Paid To :</b>
                      </p>
                    </div>
                    <div className="col-md-8 text-start">
                      {receivedData &&
                        receivedData?.vendorname?.vendorfirstname}
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-3 text-start">
                      <p>
                        <b>Payment Mode:</b>
                      </p>
                    </div>
                    <div className="col-md-8 text-start">
                      {receivedData && receivedData.paymentmode}
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-3 text-start">
                      <p>
                        <b>Paid through:</b>
                      </p>
                    </div>
                    <div className="col-md-8 text-start">
                      {receivedData && receivedData?.paidthrough}
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-3 text-start">
                      <p>
                        <b>Amount Paid In Word:</b>
                      </p>
                    </div>
                    <div className="col-md-9 text-start">
                      <b>
                        <i>
                          indian rupee{" "}
                          {numberToWords(receivedData?.paymentmade)} Only
                        </i>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  style={{
                    width: "150px",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "green",
                    color: "white",
                  }}
                >
                  <b>Amount Paid</b>
                  <span>₹ {(receivedData?.paymentmade).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6">
                <div class="row">
                  <div className="col-md-3 text-start">
                    <p>
                      <b>Paid To:</b>
                    </p>
                  </div>
                  <div className="col-md-9 text-start">
                    <b>{receivedData?.vendorname?.vendorfirstname}</b>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-end">
                <p>
                  Over Payment : ₹{" "}
                  {(receivedData && receivedData.paymentmade).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PaymentsMadeSummary;
