import React, { useEffect,useState } from 'react'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Table from "react-bootstrap/Table";
import { FaPlusCircle } from "react-icons/fa";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

function UpdateIndent() {
    const location = useLocation();
    const receivedData = location.state;
    console.log("receivedData",receivedData)
    const navigate = useNavigate()

    const [products, setProducts] = useState([]);
    const [startdate, setStartDate] = useState(receivedData?.indentdate);
    const [requiredDate, setRequiredDate] = useState(receivedData?.requireddate);
    const [itemData, setItemData] = useState([
        {
          itemname: '',
          unit: '',
          stockquantity: 0,
          quantityrequired:0,
          remarks: "",
    
        },
      ]);

      
  const addRow = () => {
    setItemData([
      ...itemData,
      {
        itemname: "Select Product",
        unit: '',
        stockquantity: 0,
        quantityrequired: 0,
        remarks:'',
      },
    ]);
  };

  const deleteRow = (index) => {
    setItemData((prevData) => prevData.filter((_, i) => i !== index));
  };

     useEffect(()=>{
      setItemData(receivedData?.indentItems);
     },[receivedData])

      const handleChangeProduct = (data, index) => {
console.log("data",data)
setItemData((curr) =>
  curr.map((val, indexData) =>
    indexData === index
      ? {
          ...val,
          itemname: data.itemname,
          unit: data.unit
        }
      : val
  )
);
      };

      
  const handleChangeUnit = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.unit = e.target.value;
        }
        return val;
      }),
    ]);
  };

  const handleStockQuantity = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.stockquantity = e.target.value;
        }
        return val;
      }),
    ]);
  };

  const handlequantityrequired = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.quantityrequired = e.target.value;
        }
        return val;
      }),
    ]);
  };

  const handleremarks = (e, index) => {
    setItemData((curr) => [
      ...curr.map((val, indexData) => {
        if (indexData === index) {
          val.remarks = e.target.value;
        }
        return val;
      }),
    ]);
  };

      const getAllItems = async () => {
        try {
          const res = await axios.get(
            "https://engineeringsolutions.net.in/api/purchaseitem/getproduct"
          );
          if (res.status === 201) {
            setProducts(res.data);
          } else {
            toast.error('something went wrong')
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        getAllItems();
      },[])

      const formData1 = new FormData();
  const updateindent = async (id) => {
    const dataArr = itemData.map((valdata) => {
      return {
        itemname: valdata.itemname,
        unit: valdata.unit,
        stockquantity: valdata.stockquantity,
        quantityrequired: valdata.quantityrequired,
        remarks: valdata.remarks,
      };
    });

    formData1.set("indentdate", startdate);
    formData1.set("requireddate", requiredDate);
    formData1.set("indentItems", JSON.stringify(dataArr));


    try {
      const config = {
        url: `/updateIndent/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/indent",
        headers: { "content-type": "application/json" },
        data: formData1,
      };

      const res = await axios(config);
      if (res.status === 201) {
        setTimeout(() => {
          navigate("/dashboard/purchase/indent");
        }, 3000);
        alert("Indent Updated Successfully");
      }
      if (res.status === 400) {
        alert("Indent not found");
      }
      if (res.status === 500) {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="row mt-3">
        <h3>Update Indent</h3>
      </div>
            <div className="row mt-2 g-3 align-items-center pt-3 pb-3">
              <div className="col-md-6  d-flex ">
              <div className="col-md-4 ">
                  <label for="inputText" className="col-form-label label">
                    Indent Date
                  </label>
                </div>
                <div className="col-md-8">
                  <DatePicker
                    selected={startdate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    // filterDate={() => isDateDisabled(new Date())}
                    className="textInput customDateInput"
                    style={{ outline: "none" }}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex">
              <div className="col-md-4 ">
                  <label for="inputText" className="col-form-label label">
                    Required By Date
                  </label>
                </div>
                <div className="col-md-8 ">
                  <DatePicker
                    selected={requiredDate}
                    onChange={(date) => setRequiredDate(date)}
                    minDate={startdate}
                    // filterDate={() => isDateDisabled(new Date())}
                    className="textInput customDateInput"
                    style={{ outline: "none" }}
                  />
                </div>
              </div>
            </div>
    

            <div className="row mt-3 text-start">
              <h5 className="py-2 bg-secondary text-light">Item Table</h5>
            </div>

            <div className="row mt-1 overflow-auto">
        <table class="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Unit</th>
              <th scope="col">Stock Qty.</th>
              <th scope="col">Required Quantity</th>
              <th scope="col">Remarks</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* --------------first row--------------- */}
            {itemData?.map((data, index) => (
              <tr key={index}>
                <td>
                <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        getOptionLabel={(option) => option?.itemname}
                        options={products}
                        sx={{ width: 300 }}
                        onChange={(event, value) => {
                          if (value) {
                            handleChangeProduct(value, index);
                          }
                        }}
                        // onChange={(e, value) => setProduct(value)}
                        renderOption={(props, option) => (
                          <MenuItem
                          {...props}
                  
                          >
                            <Box
                              component="li"
                              {...props}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                              className="text-start mb-2 px-1 "
                            >
                              <div>
                                <Typography variant="body1">
                                  {option?.itemname}
                                </Typography>

                                <Typography variant="body2" color="textPrimary">
                                  {option?.hsncode}
                                </Typography>
                              </div>
                              <div>
                                <Typography
                                  variant="body2"
                                  color="textPrimary"
                                  className="text-end"
                                >
                                  unit
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textPrimary"
                                  className="text-end"
                                >
                                  {option?.unit}
                                </Typography>
                              </div>
                            </Box>
                          </MenuItem>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} label={data?.itemname} />
                        )}
                      />
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control textInput"
                    style={{ width: "150px", height: "57px" }}
                    min="0"
                    // name={`quantity${index + 1}`}
                    value={data.unit}
                    onChange={(e) => handleChangeUnit(e, index)}
                    placeholder={data?.unit}
                  />
                </td>

                <td>
                  <input
                    type="Number"
                    min="0"
                    className="form-control textInput"
                    style={{ width: "180px", height: "60px" }}
                    value={data?.stockquantity}
                    placeholder={data?.stockquantity}
                    onChange={(e) => handleStockQuantity(e, index)}
                  />
                </td>

                <td>
                  <div className="row">
                    <div className="col">
                      <div className="input-group flex-nowrap">
                        <input
                          type="Number"
                          min="0"
                          className="form-control textInput"
                          style={{ width: "130px", height: "57px" }}
                          value={data?.quantityrequired}
                          placeholder={data?.quantityrequired}
                          onChange={(e) => handlequantityrequired(e, index, data)}
                        />
                        
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <input
                    type="text"
                  
                    className="form-control textInput"
                    style={{ width: "180px", height: "57px" }}
                    placeholder={data?.remarks}
                    value={data?.remarks}
                    onChange={(e) => handleremarks(e, index, data)}

                  />
                </td>

                <td>
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => deleteRow(index)}
                    />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Button variant="contained" onClick={addRow}>
            Add Row
          </Button>
        </div>
      </div>

      <div className="row g-3 ">
          <div className="col-md-6 col-3 ">
            <button
              // type="submit"
              class="btn btn-primary float-end"
              onClick={() => updateindent(receivedData?._id)}
            >
              Update
            </button>
          </div>
      
        </div>

    </div>
  )
}

export default UpdateIndent