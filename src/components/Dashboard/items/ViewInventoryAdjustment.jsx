import React from 'react'
import { useLocation } from 'react-router-dom';
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ViewInventoryAdjustment() {
    const location = useLocation();
    const receivedData = location.state;


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
          pdf.save(`${receivedData.invoice}.pdf`);
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
           <span className="status">
          <i>{receivedData?.status} </i>
        </span>
        <div className="container border p-5">
          <div className="row  justify-content-end" style={{ backgroundColor: "#D6EFD8" }}>
        
            <div className="col-md-6 text-end align-items">
              <h2>INVENTORY ADJUSTMENT</h2>
            </div>
          </div>
          <div class="row justify-content-end">
            <div className="col-md-3 text-start">
              <p>
                <b>Date :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">{formatDate(receivedData?.date)}</div>
          </div>
          <div class="row justify-content-end">
            <div className="col-md-3 text-start">
              <p>
                <b>Reason :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {receivedData?.reason}
            </div>
          </div>
          <div class="row justify-content-end">
            <div className="col-md-3 text-start">
              <p>
                <b>Adjustment type :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">
              {receivedData?.type}
            </div>
          </div>
          <div class="row justify-content-end">
            <div className="col-md-3 text-start">
              <p>
                <b>Created By :</b>
              </p>
            </div>
            <div className="col-md-3 text-start">xyz</div>
          </div>
     
          <div className="row mt-2">
            <table class="table table-bordered">
              <thead style={{ backgroundColor: "#F6F5F2" }}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item & Description</th>
                  {
                    receivedData?.type==='Value' ?  <th scope="col">Value Adjusted</th>:  <th scope="col">Qty Adjusted</th>
                  }
                
                
                </tr>
              </thead>
              <tbody>
         
                    <tr>
                      <td>{1}</td>
                      <td>{receivedData?.productname?.firstname}</td>
                      {
                         receivedData?.type==='Value' ? <td> ₹ {(receivedData?.adjustedvalue).toFixed(2)}</td> : <td>{receivedData?.adjustedquantity}</td>
                      }

                    </tr>
               
              </tbody>
            </table>
          </div>

<div className="row">
    Description
</div>
<div className="row">
    {receivedData?.description}
</div>


        </div>
      </section>
    </div>
  )
}

export default ViewInventoryAdjustment
