import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Button from "@mui/material/Button";

function PurchaseOrderSummary() {
  // const {id}=useParams()
  const location = useLocation();
  const receivedData = location.state;
  const [subtotal, setSubtotal] = useState(0);
  const [appbtn, setAppBtn] = useState(false);
  const [cancelbtn, setCancelBtn] = useState(false);

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
      pdf.save(`${receivedData.purchaseorder}.pdf`);
    });
  };

  console.log("rec", receivedData);

  const updateStatus = async (recdata) => {
    if (recdata == "Approved") {
      try {
        const res = await axios.put(
          `https://engineeringsolutions.net.in/api/purchaseorder/updatepurchaseorder/${receivedData?._id}`,
          { status: "Approved" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          getPoById();
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
          `https://engineeringsolutions.net.in/api/purchaseorder/updatepurchaseorder/${receivedData?._id}`,
          { status: "Cancel" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          getPoById();
        } else {
          toast.error("Indent not found..");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [podata, setPoData] = useState({});
  const getPoById = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/purchaseorder/getpurchaseorderbyid/${receivedData?._id}`
      );
      if (res.status === 201) {
        setPoData(res.data);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPoById();
  }, [receivedData]);

  return (
    <div>
      <ToastContainer />
      <div className="container mt-3">
        <button type="button" class="btn btn-success" onClick={generatePdf}>
          <FaFilePdf />
          &nbsp;PDF
        </button>

        {podata?.status === "Pending" ? (
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
            <div className="col-md-4 mb-2">
              <img
                src="/images/logo-removebg.png"
                alt=""
                srcset=""
                style={{ width: "200px", height: "180px" }}
              />
            </div>
            <div className="col-md-4 text-end align-items">
              <h2>PURCHASE ORDER</h2>
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>PO Number :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {podata && podata.purchaseorder}
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Vendor Address</b>
              </p>
            </div>
            <div className="col-md-4 text-start ">
              {podata?.vendorname?.companyname}
              <p>
                {podata?.vendorname?.billingaddressaddress}&nbsp;{" "}
                {podata?.vendorname?.billingaddresscity}
                {podata?.vendorname?.billingaddressstate}&nbsp;
                {podata?.vendorname?.billingaddresspincode}&nbsp;
                {podata?.vendorname?.billingaddresscountry}
              </p>
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Deliver To :</b>
              </p>
            </div>
            <div className="col-md-4 text-start">
              <p>
                {podata?.shippingaddressaddress}&nbsp;{" "}
                {podata?.shippingaddresscity}&nbsp;{" "}
                {podata?.shippingaddressstate}&nbsp;
                {podata?.shippingaddresspincode}&nbsp;
                {podata?.shippingaddresscountry}
              </p>
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Billing Address :</b>
              </p>
            </div>
            <div className="col-md-4 text-start">
              <p>
                {podata?.billingaddressaddress}&nbsp;{" "}
                {podata?.billingaddresscity}&nbsp; {podata?.billingaddressstate}
                &nbsp;
                {podata?.billingaddresspincode}&nbsp;
                {podata?.billingaddresscountry}
              </p>
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Status :</b>
              </p>
            </div>
            <div className="col-md-4 text-start">
              <p>{podata?.status}</p>
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
                {podata &&
                  podata?.itemdetailsArray?.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {item.itemdetails}
                          {item.salesdescription}
                        </td>
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
                <b>Terms & Conditions</b>
                <br />
                <p>{podata?.termsandcondition}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>subtotal</p>
                </div>
                <div className="col-md-6  text-end">₹ {podata?.subtotal}</div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Shipping Charge</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {podata?.shippingcharges}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Sgst tax</p>
                </div>
                <div className="col-md-6  text-end">
                  {" "}
                  ₹
                  {Number(
                    (
                      (Number(podata?.subtotal) * Number(podata?.gsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${podata?.gsttax}%)`}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Cgst tax</p>
                </div>
                <div className="col-md-6  text-end">
                  {" "}
                  ₹
                  {Number(
                    (
                      (Number(podata?.subtotal) * Number(podata?.cgsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${podata?.cgsttax}%)`}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Igst tax</p>
                </div>
                <div className="col-md-6  text-end">
                  {" "}
                  ₹
                  {Number(
                    (
                      (Number(podata?.subtotal) * Number(podata?.igsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${podata?.igsttax}%)`}
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
                  <b> ₹ {podata && podata.total}</b>
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

export default PurchaseOrderSummary;
