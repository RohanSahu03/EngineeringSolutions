import React,{useState} from 'react'
import { TiPlus } from "react-icons/ti";
import Dropdown from 'react-bootstrap/Dropdown';
import { AiFillPlusCircle } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { IoDocumentTextOutline } from "react-icons/io5";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";

function ManualJournal() {
    const [startDate, setStartDate] = useState(new Date());
    const [rows, setRows] = useState([]);
    const [show, setShow] = useState(false);
    const addRow = () => {
      const newRow = { id: rows.length + 1, data: 'New Row' };
      setRows([...rows, newRow]);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  return (
    <div>
         <div className="row border py-3 d-flex ">
    <div className="col-md-6 col-6 d-flex justify-content-start">
        <h3>Manual Journal</h3>
    </div>

        <div className="col-md-6 col-6 d-flex justify-content-end">

          {/* < BsThreeDotsVertical className='menuDot'/> */}
        <div className="buttons">
        <button
            type="button"
            className="btn btn-primary d-inline"
onClick={handleShow}
          >
            <TiPlus /> New Journal
          </button>

        </div>
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
        <IoDocumentTextOutline /> &nbsp;&nbsp; New Journal
        </h3>
      </div>

   {/* ------sales order date---------- */}
   <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
          Date*
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="textInput"
            style={{ outline: "none" }}
            required
          />
        </div>
      </div>



      {/* ------refrence---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Journal#*
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
          />
        </div>
      </div>

      {/* ------refrence---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Reference#
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
          />
        </div>
      </div>



      {/* ------refrence---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Notes*
          </label>
        </div>
        <div className="col-md-5">
          <textarea
            type="text"
            id="inputText"
            className="form-control textInput"
          />
        </div>
      </div>

  {/* -------------payment term--------------------- */}
  <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
           Currency
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            placeholder='choose a proper challan type'
          >
            <option value="Net-15">INR-Indian Rupee</option>
            <option value="Net-30">AUD</option>
            <option value="Net-45">USD</option>
          </select>
        </div>
      </div>



{/* --------------Account table------------- */}


      <div className="row mt-3 overflow-auto">
        <table class="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">account</th>
              <th scope="col">description</th>
              <th scope="col">contact(INR)</th>
              <th scope="col">debits</th>
              <th scope="col">credits</th>
            </tr>
          </thead>
          <tbody>
            {/* --------------first row--------------- */}
            <tr>
             
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px" }}
                 placeholder='select an account'
                />
              </td>
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px" }}
                placeholder='description'
                />
              </td>
              <td>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "150px" }}
                      placeholder='select contact'
                    />
                  </div>
              
                </div>
              </td>
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px" }}

                />
              </td>
              <td>
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  style={{ width: "180px" }}

                />
              </td>
              <td>
                <RxCross1 />
              </td>
            </tr>

            {/* --------------dynamic row--------------- */}

            {rows.map((row) => (
              <tr key={row.id}>
                
                <td>
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px" }}
                   placeholder='select an account'
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px" }}
                    placeholder='description'
                  />
                </td>
                <td>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        id="inputText"
                        className="form-control textInput"
                        style={{ width: "150px" }}
                      placeholder='select contact'
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px" }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px" }}
                  />
                </td>

                <td>
                  <RxCross1 />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------button----------    */}
      <div className="row">
        <div className="col-md-2 col-6">
          <Button variant="secondary" size="sm" onClick={addRow}>
            <AiFillPlusCircle
              data-bs-container="body"
              data-bs-toggle="popover"
              data-bs-placement="bottom"
              data-bs-content="Bottom popover"
            />
            &nbsp; add new row
          </Button>
        </div>
        <div className="col-md-6 p-md-5 p-2 mt-1" style={{ background: "aliceblue",float:'right' }}>
          <div className="row">
            <div className="col-md-4 col-4 text-start">
              <h6>subtotal</h6>
            </div>
            <div className="col-md-4 col-4  "></div>
            <div className="col-md-4 col-4  text-end">0.00</div>
          </div>


          <div className="row mt-2 border-top">
            <div className="col-md-6 col-6">
              <h4>Total (₹)</h4>
            </div>
            <div className="col-md-6 col-6 text-end">
              <h4>0.00</h4>
            </div>
          </div>

          <div className="row mt-2 border-top">
            <div className="col-md-6 col-6">
           <span style={{color:'red'}}>Difference</span>
            </div>
            <div className="col-md-6 col-6 text-end">
             0.00
            </div>
          </div>

        </div>
      </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* off-canvas End ------------------ */}



    </div>
  )
}

export default ManualJournal