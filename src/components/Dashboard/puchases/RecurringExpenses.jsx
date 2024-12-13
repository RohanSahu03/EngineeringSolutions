import React,{useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoSearch } from "react-icons/io5";

function RecurringExpenses() {
    const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
                   <div className="row border-bottom py-2 text-start d-flex ">
        <h3>
           New Recurring Expense
        </h3>
      </div>

        {/* ------refrence---------- */}
        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
         Profile Name*
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
   {/* -------------payment term--------------------- */}
   <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
      Repeat Every*
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
          >
            <option value="Net-15">Every Week</option>
            <option value="Net-30">2 week</option>
            <option value="Net-45">month</option>
            <option value="Net-45">2 month</option>
            <option value="Net-45">3 month</option>
          </select>
        </div>
      </div>

         {/* ------sales order date---------- */}
         <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
         Start Date
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="textInput"
            style={{ outline: "none" }}
        
          />
        </div>
      </div>

       {/* ------sales order date---------- */}
       <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
        Ends On
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="textInput"
            style={{ outline: "none" }}
        
          />
        </div>
      </div>



   {/* -------------payment term--------------------- */}
   <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
      Expense Account*
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
          >
            <option value="Net-15">Every Week</option>
            <option value="Net-30">2 week</option>
            <option value="Net-45">month</option>
            <option value="Net-45">2 month</option>
            <option value="Net-45">3 month</option>
          </select>
        </div>
      </div>

   {/* ------refrence---------- */}
   <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
           Ammount*
          </label>
        </div>
        <div className="col-md-5">
        <div class="input-group flex-nowrap textInput">
              <span class="input-group-text" id="addon-wrapping">
                INR
              </span>
              <input
                type="number"
                class="form-control "
                required
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
        </div>
      </div>



      {/* -------------payment term--------------------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
         Paid Through*
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            placeholder='select an account'
          >
            <option value="Net-15">Advance Tax</option>
            <option value="Net-30">Job work</option>
            <option value="Net-45">Other</option>
          </select>
        </div>
      </div>


      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
             Vendor
            </label>
          </div>
          <div className="col-md-5 ">
            <div className="row">
              <div className="col-md-8 ">
              <div class="input-group mb-3 textInput">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="select customer"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        class="btn btn-primary"
                        type="button"
                        id="button-addon2"
                      >
                        {" "}
                        <IoSearch style={{ fontSize: "22px" }} />
                      </button>
                    </div>
              </div>
           
            </div>
          </div>
        </div>

{/* ---------------------------------- */}
<div className="row mt-md-2 mt-1 g-md-3 g-1">
                  <div className="col-md-2 text-start">
                    <label for="inputText" className="col-form-label label">
                   Notes
                    </label>
                  </div>
                  <div className="col-md-5">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Max 500 characters"
                        id="floatingTextarea2"
                        style={{ height: "60px",width:'300px' }}
                      ></textarea>
                    </div>
                  </div>
                </div>

   {/* -------------------------------- */}
   <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Customer Name
          </label>
        </div>
        <div className="col-md-5 ">
          <div className="row">
            <div className="col-md-8 ">
            <div class="input-group mb-3 textInput">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="select customer"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        class="btn btn-primary"
                        type="button"
                        id="button-addon2"
                      >
                        {" "}
                        <IoSearch style={{ fontSize: "22px" }} />
                      </button>
                    </div>
                    </div>
          </div>
        </div>
      </div>
      <div className="row ">
<div className="col-md-6 col-6">
                  <button
                    type="submit"
                    class="btn btn-primary float-end"
                
                  >
                    Save
                  </button>
                </div>
                <div className="col-md-6 col-6">
                  <button type="button" class="btn btn-outline-info float-start">
                    Cancel
                  </button>
                </div>
</div>

   
    </div>
  )
}

export default RecurringExpenses