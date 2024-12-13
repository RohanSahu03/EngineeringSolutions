import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../../css/dashboard/customer.css'
import { IoSearch } from "react-icons/io5";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { AiFillPlusCircle } from "react-icons/ai";


function Project() {

  const [name, setName] = useState("");


  const [rows, setRows] = useState([]);
  const [projectRow, setProjectRow] = useState([]);

  const addRow = () => {
    const newRow = { id: rows.length + 1, data: 'New Row' };
    setRows([...rows, newRow]);
};
const addProject = () => {
  const projectrow = { id: projectRow.length + 1, data: 'New Row' };
  setProjectRow([...projectRow, projectrow]);
};
  return (
    <div>
      <div className="row border-bottom py-2 text-start d-flex ">
        <h3>New Customer</h3>
      </div>

  
      <form class="row g-3 needs-validation" novalidate>
     

        {/* ------company name---------- */}
        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
              Project Name*
            </label>
          </div>
          <div className="col-md-5">
            <input
              type="text"
              id="inputText"
              className="form-control textInput"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>


                {/* ------company name---------- */}
                <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
              Project Code
            </label>
          </div>
          <div className="col-md-5">
            <input
              type="text"
              id="inputText"
              className="form-control textInput"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>

        {/* ------customer display name---------- */}
        <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Customer Name*
          </label>
        </div>
        <div className="col-md-5 ">
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

         {/* ---------------------------------- */}
         <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
              <div className="col-md-2 text-start">
                <label for="inputText" className="col-form-label label">
                 billing Method
                </label>
              </div>
              <div className="col-md-5">
                <select
                  className="form-select textInput"
                 
                  id="inputGroupSelect03"
                  aria-label="Example select with button addon"
                  required
                >
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="JPY">JPY - japani yen</option>
                </select>
              </div>
            </div>

    {/* ------company name---------- */}
    <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
            Description
            </label>
          </div>
          <div className="col-md-5">
            <textarea
              type="text"
              id="inputText"
              className="form-control textInput"
              placeholder="max 200 words"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>
<div className="row text-start mt-4" >
<h5>Budget</h5>

   {/* ---------------------------------- */}
   <div className="row mt-md-2 mt-1 g-md-3 g-1 text-left">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
         Cost Budget
            </label>
          </div>
          <div className="col-md-5">
            <div class="input-group flex-nowrap textInput">
              <span class="input-group-text" id="addon-wrapping">
               INR
              </span>
              <input
                type="email"
                class="form-control "
                required
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>

   {/* ---------------------------------- */}
   <div className="row mt-md-2 mt-1 g-md-3 g-1  text-left">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
         Revenue Budget
            </label>
          </div>
          <div className="col-md-5">
            <div class="input-group flex-nowrap textInput">
              <span class="input-group-text" id="addon-wrapping">
               INR
              </span>
              <input
                type="email"
                class="form-control "
                required
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>

<div className="row mt-4 overflow-auto">
  <h5>Users</h5>
  <div className="container">
  <Table striped>
      <thead>
        <tr>
          <th>S.No</th>
          <th>User</th>
          <th>Email</th>
  
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>xyz@gmail.com</td>
        </tr>
        {rows.map(row => (
                        <tr key={row.id}>
                           <td>  <input
              type="text"
              id="inputText"
              className="form-control textInput formInput"
            
            /></td>
          <td>  <input
              type="text"
              id="inputText"
              className="form-control textInput formInput"
          
            /></td>
          <td>  <input
              type="text"
              id="inputText"
              className="form-control textInput formInput"
    
            /></td>
                        </tr>
                    ))}
      </tbody>
    </Table>
    
  </div>

</div>
<Button variant="secondary" size="sm" onClick={addRow} className="w-25">
    <AiFillPlusCircle data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover" />&nbsp;
          add user
        </Button>

<div className="row mt-4 overflow-auto">
  <h5>Project Task</h5>
  <div className="container">
  <Table striped>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Task Name</th>
          <th>Description</th>
          <th>Billable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>  <input
              type="text"
              id="inputText"
              className="form-control textInput"
              style={{width:'180px'}}
            /></td>
          <td>  <input
              type="text"
              id="inputText"
              className="form-control textInput"
              style={{width:'180px'}}
            /></td>
          <td>  <input
              type="text"
              id="inputText"
              className="form-control textInput"
              style={{width:'180px'}}
            /></td>
            <td>
            <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>

</div>
            </td>
        </tr>
        {rows.map(row => (
                        <tr key={row.id}>
                           <td>  <input
              type="text"
              id="inputText"
              className="form-control textInput"
              style={{width:'180px'}}
            /></td>
          <td>  <input
              type="text"
              id="inputText"
              className="form-control textInput"
              style={{width:'180px'}}
            /></td>
          <td>  <input
              type="text"
              id="inputText"
              className="form-control textInput"
              style={{width:'180px'}}
            /></td>
            <td>
            <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>

</div>
            </td>
                        </tr>
                    ))}
      </tbody>
    </Table>
   
  </div>
</div>
<Button variant="secondary" size="sm" onClick={addProject} className="w-25">
    <AiFillPlusCircle data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover" />&nbsp;
          add project task
        </Button>
</div>




      </form>



    </div>
  );
}

export default Project;
