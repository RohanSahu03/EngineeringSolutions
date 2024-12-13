import React,{useState} from 'react'
import { TiPlus } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from 'react-bootstrap/Accordion';


function Budget() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
  
  return (
    <div>
              <div className="row border py-3 d-flex ">
    <div className="col-md-6 col-6 d-flex justify-content-start">
        <h3>Budget</h3>
    </div>

        <div className="col-md-6 col-6 d-flex justify-content-end">

          {/* < BsThreeDotsVertical className='menuDot'/> */}
        <div className="buttons">
        <button
            type="button"
            className="btn btn-primary d-inline"
onClick={handleShow}
          >
            <TiPlus /> New Budget
          </button>

        </div>
        </div>
      </div>

      <div class="row mt-5">
        <div className="col-md-12 py-5">
            <h4>Budget your business finance. Stay on top of your expenses.</h4>
            <br />
            <button type="button" class="btn btn-primary" onClick={handleShow}>Create Budget</button>
        </div>
      </div>

      {/* Off-Canvas--------------------------- */}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "1200px",backgroundColor:'white' }}
      >
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="row border-bottom py-2 text-start d-flex ">
        <h3>
      New Budget
        </h3>
      </div>

          {/* ------sales ordder---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
          Name*
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            required
    
          />
        </div>
      </div>

  {/* -------------payment term--------------------- */}
  <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
      Fiscal Year*
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            placeholder='choose a proper challan type'
          >
            <option value="Net-15">Apr 2024 - Mar 2025</option>
            <option value="Net-30">Apr 2025 - Mar 2026</option>
            <option value="Net-45">Apr 2026 - Mar 2027</option>
          </select>
        </div>
      </div>

  {/* -------------payment term--------------------- */}
  <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
   Budget period*
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            placeholder='choose a proper challan type'
          >
            <option value="Net-15">Monthly</option>
            <option value="Net-30">Quaterly</option>
            <option value="Net-45">Half Yearly</option>
            <option value="Net-45">Yearly</option>
          </select>
        </div>
      </div>

<div className="row mt-5">
<h6>Income and Expense Accounts</h6>

</div>

<div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 col-6 text-start">
          <label for="inputText" className="col-form-label label">
          Income Accounts
          </label>
        </div>
        <div className="col-md-5 col-6">
          <a href="" >add account</a>
        </div>
      </div>
    
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 col-6 text-start">
          <label for="inputText" className="col-form-label label">
          Expense Accounts
          </label>
        </div>
        <div className="col-md-5 col-6">
          <a href="">add account</a>
        </div>
      </div>
<br />
<Accordion defaultActiveKey="" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header> <TiPlus /> &nbsp; Include Asset,Liability,and Equity Accounts</Accordion.Header>
        <Accordion.Body>
        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 col-6 text-start">
          <label for="inputText" className="col-form-label label">
          Asset Accounts
          </label>
        </div>
        <div className="col-md-5 col-6">
          <a href="">add account</a>
        </div>
      </div>

      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 col-6 text-start">
          <label for="inputText" className="col-form-label label">
          Liability Accounts
          </label>
        </div>
        <div className="col-md-5 col-6">
          <a href="">add account</a>
        </div>
      </div>

      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 col-6 text-start">
          <label for="inputText" className="col-form-label label">
          Equity Accounts
          </label>
        </div>
        <div className="col-md-5 col-6">
          <a href="">add account</a>
        </div>
      </div>

        </Accordion.Body>
      </Accordion.Item>
      </Accordion>

<br />

<div className="row g-3 ">
<div className="col-md-6 col-3 ">
                  <button
                    type="submit"
                    class="btn btn-primary float-end"
                
                  >
                    Save
                  </button>
                </div>
                <div className="col-md-6 col-3">
                  <button type="button" class="btn btn-outline-info float-start">
                    Cancel
                  </button>
                </div>
</div>

        </Offcanvas.Body>
      </Offcanvas>

      {/* off-canvas End ------------------ */}
    </div>
  )
}

export default Budget