import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMemo } from "react";

function ViewRFQ() {
  const location = useLocation();
  const receivedData = location.state;

  const [appbtn, setAppBtn] = useState(false);
  const [cancelbtn, setCancelBtn] = useState(false);
  const [bill, setBill] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getRFQById();
  }, [receivedData]);

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

  const updateStatus = async (recdata) => {
    if (recdata == "Approved") {
      try {
        const res = await axios.put(
          `https://engineeringsolutions.net.in/api/rfq/updateRFQById/${receivedData?._id}`,
          { status: "Approved" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          getRFQById();
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
          `https://engineeringsolutions.net.in/api/rfq/updateRFQById/${receivedData?._id}`,
          { status: "Cancel" }
        );
        if (res.status === 201) {
          toast.success("Status changed");
          getRFQById();
        } else {
          toast.error("Indent not found..");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getRFQById = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/rfq/getRequestforQuotationById/${receivedData?._id}`
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

  return (
    <div>
      <ToastContainer />
      <div className="container mt-3 d-flex justify-content-around">
        <button type="button" class="btn btn-success" onClick={generatePdf}>
          <FaFilePdf />
          &nbsp;PDF
        </button>

        {receivedData?.status === "Pending" ? (
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
          <div className="row " style={{ backgroundColor: "#D6EFD8" }}>
            <div className="col-md-4  pt-3 text-start">
              <h5>Engineering Solutions</h5>
              <br />
              1st Main, No.28, 1st Floor, Apporva Nagar,Near Silver Town Cross,
              Gokul Road Hubbali, Karnataka, 580030
              <br />
              <b>GST No.</b> - 29AADFE3350N1Z7
            </div>
            <div className="col-md-2 text-start">
              <img
                src="/images/logo-removebg.png"
                alt=""
                srcset=""
                style={{ width: "200px", height: "180px" }}
              />
            </div>

            <div className="col-md-6 text-end align-items-center pt-3">
              <h2>Request For Quotation</h2>
            </div>
          </div>
          <div
            class="row d-flex justify-content-end text-start mt-3 pb-3"
            style={{ borderBottom: "1px solid black" }}
          >
            <div className="col-md-12">
              <h6>To :</h6>
              {receivedData?.vendordetails[0]?.vendorfirstname}&nbsp;{" "}
              {receivedData?.vendordetails[0]?.vendorlastname}
              <br />
              {receivedData?.vendordetails[0]?.billingaddressaddress}
              <br />
              {receivedData?.vendordetails[0]?.billingaddresscity}
              <br />
              {receivedData?.vendordetails[0]?.billingaddressstate}
              <br />
              {receivedData?.vendordetails[0]?.billingaddresscountry},{" "}
              {receivedData?.vendordetails[0]?.billingaddresspincode}
              <br />
              {receivedData?.vendordetails[0]?.billingaddressphone}
            </div>
          </div>

          <div class="row  d-flex justify-content-start mt-3">
            <div className="col-md-3 text-start">
              <p>
                <b>RFQ No. :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">{receivedData?.rfqno}</div>
            <div className="col-md-3 text-end">
              <p>
                <b>RFQ Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-end">
              {formatDate(receivedData?.rfqdate)}
            </div>
          </div>

          <div class="row  d-flex justify-content-start">
            <div className="col-md-3 text-start">
              <p>
                <b>Quotation Deadline :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {formatDate(receivedData?.quotedeadline)}
            </div>
            <div className="col-md-3 text-end">
              <p>
                <b>Indent No. :</b>
              </p>
            </div>
            <div className="col-md-3 text-end">
              {receivedData?.indentdetails?.indentno}
            </div>
          </div>

          <div class="row  d-flex justify-content-start">
            <div className="col-md-3 text-start">
              <p>
                <b>Status :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {receivedData?.status || bill?.status}
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
                {receivedData?.indentdetails?.indentItems?.map(
                  (item, index) => {
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
                  }
                )}
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

export default ViewRFQ;
