import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateAdjustment() {
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate();

  const [adjustment, setAdjustment] = useState({});
  const [reference, setReference] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState({});

  const [newQuantity, setNewQuantity] = useState("");
  const [quantityAdjusted, setQuantityAdjusted] = useState("");

  const getAdjustmentById = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/inventryadjustment/getinventoryadjustmentbyid/${receivedData?._id}`
      );
      if (res.status === 201) {
        setAdjustment(res.data.inventory);
      } else {
        alert("unable to fetch data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdjustmentById();
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/products/getproduct"
      );
      if (res.status === 201) {
        setProduct(res.data);
      } else {
        alert("internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateAdjustments = async () => {
    try {
      const config1 = {
        url: `/updateproduct/${receivedData?.productname?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/products",
        headers: { "content-type": "application/json" },
        data: {
          stockonhand: newQuantity,
        },
      };

      const res1 = await axios(config1);
      if (res1.status === 200) {
        toast.success("Stock updated..");
      }
      if (res1.status === 500) {
        toast.error("Error updating stock");
        return;
      }

      const config2 = {
        url: `/updateadjustment/${receivedData?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/inventryadjustment",
        headers: { "content-type": "application/json" },
        data: {
          reference: reference,
          reason: reason,
          description: description,
          date: date,
          adjustedquantity: quantityAdjusted,
        },
      };

      const res2 = await axios(config2);
      if (res2.status === 400) {
        toast.error("Data not found");
        return;
      }
      if (res2.status === 201) {
        toast.success("Successfully Updated the Adjustment");
      }
      setTimeout(() => {
        navigate("/dashboard/inventoryadjustment");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div class="row g-3 needs-validation" novalidate>
        <div className="row mt-2 g-3 align-items-center">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
              Reference
            </label>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              id="inputText"
              name="firstname"
              className="form-control textInput"
              onChange={(e) => setReference(e.target.value)}
              value={reference}
              placeHolder={adjustment?.reference}
            />
          </div>
        </div>

        <div className="row mt-2 g-3 align-items-center">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
              Date
            </label>
          </div>
          <div className="col-md-5 text-start">
            <DatePicker
              selected={receivedData?.date || date}
              onChange={(date) => setDate(date)}
              className="datepicker"
            />
          </div>
        </div>

        <div className="row mt-2 g-3 align-items-center">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
              Reason
            </label>
          </div>
          <div className="col-md-5  text-start">
            <FormControl sx={{ minWidth: 305 }} size="small">
              <InputLabel id="demo-select-small-label">Reasons</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={reason || receivedData?.reason}
                label="Reason"
                onChange={(e) => setReason(e.target.value)}
              >
                <MenuItem value="Stock on Fire">Stock on Fire</MenuItem>
                <MenuItem value="Stolen Goods">Stolen Goods</MenuItem>
                <MenuItem value="Damaged Goods">Damaged Goods</MenuItem>
                <MenuItem value="Stock written off">Stock written off</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="row mt-2 g-3 align-items-center">
          <div className="col-md-2 text-start">
            <label for="inputText" className="col-form-label label">
              Description
            </label>
          </div>
          <div className="col-md-5">
            <input
              type="text"
              id="inputText"
              name="firstname"
              className="form-control textInput"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeHolder={adjustment?.description}
            />
          </div>
        </div>

        {/* --------------item table------------- */}
        <div className="row mt-3 text-start">
          <h5 className="py-2 bg-secondary text-light">Item Table</h5>
        </div>
        <div className="row mt-1 overflow-auto">
          <table class="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Item Details</th>
                <th scope="col">Quantity Available</th>
                <th scope="col">New Quantity on Hand</th>
                <th scope="col">Qyantity Adjusted</th>
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    id="inputText"
                    disabled
                    className="form-control textInput"
                    style={{ width: "150px", height: "57px" }}
                    placeholder={adjustment?.productname?.firstname}
                  />
                </td>
                {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(option) => option?.firstname}
                    options={product}
                    value={products}
                    onChange={() => setProducts(option)}
                    // getOptionLabel={(option) => option}
                    // options={option}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (
                      <MenuItem>
                        <Box
                          component="li"
                          {...props}
                          style={{ display: "flex", flexDirection: "column" }}
                          className="text-start mb-2 px-1"
                        >
                          <Typography variant="body1">
                            {option?.firstname}
                          </Typography>

                          <Typography variant="body2" color="textPrimary">
                            <small>Stock on Hand</small>
                            &nbsp;{option?.stockonhand}
                          </Typography>
                        </Box>
                      </MenuItem>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={products || adjustment?.productname?.firstname}
                      />
                    )}
                  />
                </td>*/}

                <td>
                  <input
                    type="Number"
                    id="inputText"
                    disabled
                    className="form-control textInput"
                    style={{ width: "150px", height: "57px" }}
                    min="0"
                    placeholder={
                      Number(adjustment?.productname?.stockonhand) -
                      Number(adjustment?.adjustedquantity)
                    }
                    autocomplete="off"
                  />
                </td>
                <td>
                  <input
                    type="Number"
                    id="inputText"
                    min="0"
                    className="form-control textInput"
                    style={{ width: "180px", height: "60px" }}
                    autocomplete="off"
                    placeHolder={adjustment?.productname?.stockonhand}
                    value={newQuantity}
                    onChange={(e) => {
                      setNewQuantity(e.target.value);
                      if (
                        e.target.value === "" ||
                        e.target.value === undefined ||
                        e.target.value === 0
                      ) {
                        setQuantityAdjusted("");
                      } else {
                        setQuantityAdjusted(
                          Number(e.target.value) -
                            (Number(adjustment?.productname?.stockonhand) -
                              Number(adjustment?.adjustedquantity))
                        );
                      }
                    }}
                  />
                </td>

                <td>
                  <input
                    type="Number"
                    id="inputText"
                    className="form-control textInput"
                    style={{ width: "180px", height: "57px" }}
                    placeHolder={adjustment?.adjustedquantity}
                    autocomplete="off"
                    value={quantityAdjusted}
                    onChange={(e) => {
                      setQuantityAdjusted(e.target.value);
                      if (e.target.value === "") {
                        setNewQuantity("");
                      } else {
                        setNewQuantity(
                          Number(adjustment?.productname?.stockonhand) +
                            Number(e.target.value)
                        );
                      }
                    }}
                  />
                </td>
                {/* <td>
                    <MdDeleteForever />
                  </td> */}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row mt-4">
          <div className="row mt-5">
            <div className="col-md-1 col-2 mx-3">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={updateAdjustments}
              >
                Update
              </button>
            </div>
            <div className="col-md-1 col-2">
              <button type="button" class="btn btn-outline-info">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAdjustment;
