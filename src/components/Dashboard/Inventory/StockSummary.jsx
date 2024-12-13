import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Form from "react-bootstrap/Form";

function StockSummary() {
  // const {id}=useParams()
  const location = useLocation();
  const receivedData = location.state;
  console.log(receivedData);
  const [grandtotal, setGrandTotal] = useState(0);

  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

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
      receivedData?.itemdetailsArray.reduce((accumulator, data) => {
        return accumulator + data.subtotal;
      }, 0)
    );
  }, [receivedData]);
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

  const [appbtn, setAppBtn] = useState(false);
  const [cancelbtn, setCancelBtn] = useState(false);

  const updateStatus = async (recdata) => {
    if (recdata == "Approved") {
      try {
        const res = await axios.put(
          `https://engineeringsolutions.net.in/api/inventory/updatedespatchchallan/${receivedData?._id}`,
          { status: "Approved" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          setCancelBtn(true);

          getInspectionById();
        } else {
          toast.error("Status Not Changed");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (recdata == "Cancel") {
      try {
        const res = await axios.put(
          `https://engineeringsolutions.net.in/api/inventory/updatedespatchchallan/${receivedData?._id}`,
          { status: "Cancel" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          setAppBtn(true);
          getInspectionById();
        } else {
          toast.error("DC not found..");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [quotedata, setQuoteData] = useState({});
  const getInspectionById = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/inventory/getstockbyid/${receivedData?._id}`
      );
      if (res.status === 201) {
        setQuoteData(res.data);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInspectionById();
  }, [receivedData]);
  console.log("quo", quotedata);

  useMemo(() => {
    setGrandTotal(
      quotedata?.itemdetailsArray
        ?.reduce((acc, item) => {
          return acc + Number(item?.basevalue);
        }, 0)
        .toFixed(2)
    );
  }, [quotedata]);

  return (
    <div>
      <ToastContainer />
      <div className="container mt-3">
        <button type="button" class="btn btn-success" onClick={generatePdf}>
          <FaFilePdf />
          &nbsp;PDF
        </button>

        {/* {quotedata?.status === "Pending" ? (
          <div className="d-flex align-items-center">
            <h6>Change status :</h6>
            <div>
              <Button
                variant="contained"
                className="mx-3"
                disabled={appbtn}
                onClick={() => {
                  updateStatus("Approved");
                }}
              >
                Approved
              </Button>
              <Button
                variant="contained"
                disabled={cancelbtn}
                onClick={() => {
                  updateStatus("Cancel");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          ""
        )} */}
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
              <h2>TRANSFER DETAILS</h2>
            </div>
          </div>
          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Stock No :</b>
              </p>
            </div>

            <div className="col-md-3 text-start">
              {quotedata?.stockno}
            </div>

            <div className="col-md-3 text-start">
              <p>
                <b>Stock Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {formatDate(quotedata?.stockdate)}
            </div>
          </div>

          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Reference :</b>
              </p>
            </div>

            <div className="col-md-3 text-start">{quotedata?.reference}</div>

            <div className="col-md-3 text-start">
              <p>
                <b>Status:</b>
              </p>
            </div>
            <div className="col-md-3 text-start">{quotedata?.status}</div>
          </div>

          <div class="row">
            <div className="col-md-3 text-start">
              <p>
                <b>Transfer From</b>
              </p>
            </div>
            <div className="col-md-3 text-start">{quotedata?.from}</div>

            <div className="col-md-3 text-start">
              <p>
                <b>Transfer To</b>
              </p>
            </div>
            <div className="col-md-3 text-start">{quotedata?.to}</div>
          </div>

          <div className="row mt-2">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: "#F6F5F2" }}>
                <tr className="text-center">
                  <th scope="col" className="text-center">
                    Sl.No.
                  </th>
                  <th scope="col" className="text-center">
                    Item Code
                  </th>
                  <th scope="col" className="text-center">
                    Description
                  </th>
                  <th scope="col" className="text-center">
                   {
                    quotedata?.transfertype==='In' ? ('In Qty.'):('Out Qty.')
                   }
                  </th>
                  <th scope="col" className="text-center">
                    Rate
                  </th>

                  <th scope="col" className="text-center">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotedata &&
                  quotedata?.itemdetailsArray?.map((item, index) => {
                    return (
                      <tr className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.itemcode}</td>
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
            <div className="col-md-6  text-start">
              <div className="row">
                <b>Remarks</b>
                <br />
                {quotedata?.remarks}
              </div>
            </div>
            <div className="col-md-6 text-end">
              {/* <div className="row">
                <div className="col-md-6 text-start">
                  <p>subtotal</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {quotedata?.subtotal}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 text-start">
                  <p>Shipping Charge</p>
                </div>
                <div className="col-md-6  text-end">
                  ₹ {quotedata?.shippingcharges}
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
                      (Number(quotedata?.subtotal) *
                        Number(quotedata?.sgsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${quotedata?.sgsttax}%)`}
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
                      (Number(quotedata?.subtotal) *
                        Number(quotedata?.cgsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${quotedata?.cgsttax}%)`}
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
                      (Number(quotedata?.subtotal) *
                        Number(quotedata?.igsttax)) /
                      100
                    ).toFixed(2)
                  )}
                  &nbsp; {`(${quotedata?.igsttax}%)`}
                </div>
                <hr />
              </div> */}

              <div className="row">
                <div className="col-md-6 text-end">
                  <p>
                    <b>Total</b>
                  </p>
                </div>
                <div className="col-md-6  text-end">
                  <b> ₹ {quotedata?.total}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4 ">
            <div className="col-md-6 " style={{ marginTop: "100px" }}>
              <p>Checked & Approved By</p>
            </div>
            <div className="col-md-6 " style={{ marginTop: "100px" }}>
              <p>Inspected & Approved By</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StockSummary;
