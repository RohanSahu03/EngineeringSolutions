import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../css/dashboard/items.css";
import Button from "@mui/material/Button";
// import Button from 'react-bootstrap/Button';
import Offcanvas from "react-bootstrap/Offcanvas";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Button as BaseButton } from '@mui/base/Button';
import axios from "axios";

function ViewItem() {
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [adjustmentdate, setAdjustmentDate] = useState(new Date());

  const [newquantity, setNewQuantity] = useState(0.0);
  const [quantityadjusted, setQuantityAdjusted] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState(0);
  const [type, setType] = useState("Quantity");

  const [adjustmentdate1, setAdjustmentDate1] = useState(new Date());
  const [reason1, setReason1] = useState("");
  const [description1, setDescription1] = useState("");
  const [reference1, setReference1] = useState(0);
  const [changedValue, setChangedValue] = useState();
  const [adjustedValue, setAdjustedValue] = useState();

  const dateFormat = "dd/MM/yyyy";

  const updateStock = async (id) => {
    try {
      const config1 = {
        url: `/updateproduct/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/products",
        headers: { "content-type": "application/json" },
        data: {
          stockonhand: newquantity,
        },
      };
      const res1 = await axios(config1);
      if (res1.status === 200) {
        toast.success("Stock updated..");
        setTimeout(() => {
          navigate('/dashboard/items')
        }, 2000);
      }
      if (res1.status === 500) {
        toast.error("Error updating stock");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveAdjustment = async (id) => {
    try {
      if (!reference) {
        toast.warning("Please enter reference number");
        return;
      }
      if (!reason) {
        toast.warning("Please select valid reason");
        return;
      }
      if (!newquantity) {
        toast.warning("Please enter valid quantity");
        return;
      }
      const config = {
        url: "/createinventoryadjustment",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/inventoryadjustment",
        headers: { "content-type": "application/json" },
        data: {
          date: adjustmentdate,
          reference: reference,
          description: description,
          status: "Adjusted",
          type: type,
          reason: reason,
          adjustedquantity: quantityadjusted,
          productname: receivedData?._id,
        },
      };
      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Adjustment saved successfully");
      } else if (res.status === 400) {
        toast.error("Error saving adjustment");
        return;
      }

      updateStock(id);
    } catch (error) {
      console.log(error);
    }
  };

  const saveValueAdjustment = async () => {
    try {
      if (!reference1) {
        toast.warning("Please enter reference number");
        return;
      }
      if (!reason1) {
        toast.warning("Please select valid reason");
        return;
      }
      if (!changedValue) {
        toast.warning("Please enter valid value");
        return;
      }
      const config = {
        url: "/createinventoryadjustment",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/inventoryadjustment",
        headers: { "content-type": "application/json" },
        data: {
          date: adjustmentdate1,
          reference: reference1,
          description: description1,
          status: "Adjusted",
          type: type,
          reason: reason1,
          adjustedvalue: adjustedValue,
          productname: receivedData?._id,
        },
      };
      const res = await axios(config);
      if (res.status === 201) {
        toast.success("Adjustment saved successfully");
      } else if (res.status === 400) {
        toast.error("Error saving adjustment");
        return;
      }

      // const config1 = {
      //   url: `/updateproduct/${id}`,
      //   method: "put",
      //   baseURL: "https://engineeringsolutions.net.in/api/products",
      //   headers: { "content-type": "application/json" },
      //   data: {
      //     stockonhand: newquantity,
      //   },
      // };
      // console.log("stockonhand1", newquantity);
      // const res1 = await axios(config1);
      // if (res1.status === 200) {
      //   toast.success("Stock updated..");
      // }
      // if (res1.status === 500) {
      //   toast.error("Error updating stock");
      //   return;
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="row d-flex justify-content-between ">
        <h4>Item Details</h4>
        <div className="btn" style={{ width: "200px" }}>
          <Button variant="contained" onClick={handleShow}>
            Adjust Stock
          </Button>
        </div>
      </div>

      {/* //Offcanvas */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "900px" }}
        className="border"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Stock Adjustment</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Tabs id="uncontrolled-tab-example" className="mb-3">
            <Tab
              eventKey="home"
              title="Quantity Adjustment"
              onClick={() => setType("Quantity")}
            >
              <div className="row">
                <div className="col-md-4">
                  Date*
                  <DatePicker
                    selected={adjustmentdate}
                    onChange={(date) => setAdjustmentDate(date)}
                    className="datepicker"
                    required
                  />
                </div>
                <div className="col-md-4">
                  Reference
                  <input
                    type="text"
                    name=""
                    id=""
                    className="datepicker"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-md-8 border">
                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Quantity Available
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          value={`${receivedData?.openingstock}                                ${receivedData?.unit}`}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        New Quantity on Hand
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          value={newquantity}
                          onChange={(e) => {
                            setNewQuantity(e.target.value);
                            if (e.target.value === "") {
                              setQuantityAdjusted("");
                            } else {
                              setQuantityAdjusted(
                                e.target.value - receivedData?.openingstock
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Quantity Adjusted
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          value={quantityadjusted}
                          onChange={(e) => {
                            setQuantityAdjusted(e.target.value);
                            if (e.target.value === "") {
                              setNewQuantity("");
                            } else {
                              setNewQuantity(
                                Number(receivedData?.openingstock) +
                                  Number(e.target.value)
                              );
                            }
                          }}
                          placeholder="Eg. +10, -10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Cost Price
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          value={receivedData?.openingrateperunit}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Reason*
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <FormControl sx={{ m: 1, minWidth: 385 }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Reasons
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={reason}
                          label="reason"
                          onChange={(e) => setReason(e.target.value)}
                          style={{ width: "310px", marginRight: "30px" }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Stock on Fire">
                            Stock on Fire
                          </MenuItem>
                          <MenuItem value="Stolen Goods">Stolen Goods</MenuItem>
                          <MenuItem value="Damaged Goods">
                            Damaged Goods
                          </MenuItem>
                          <MenuItem value="Stock written off">
                            Stock written off
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Description
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <textarea
                        type="text"
                        name=""
                        id=""
                        className="inputText"
                        style={{
                          height: "60px",
                          width: "315px",
                          marginRight: "50px",
                          outline: "none",
                        }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => saveAdjustment(receivedData?._id)}
                    >
                      Convert To Adjustment
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary mx-2"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab
              eventKey="profile"
              title="Value Adjustment"
              onClick={() => setType("Value")}
            >
              <div className="row">
                <div className="col-md-4">
                  Date*
                  <DatePicker
                    selected={adjustmentdate1}
                    onChange={(date) => setAdjustmentDate1(date)}
                    className="datepicker"
                    inputFormat={dateFormat}
                    required
                  />
                </div>
                <div className="col-md-4">
                  Reference
                  <input
                    type="text"
                    name=""
                    className="datepicker"
                    inputFormat={dateFormat}
                    value={reference1}
                    onChange={(e) => setReference1(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-md-8 border">
                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Current Value
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          disabled
                          value={(
                            receivedData?.openingstock *
                            receivedData?.openingrateperunit
                          ).toFixed(2)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Changed Value
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          value={changedValue}
                          onChange={(e) => {
                            setChangedValue(e.target.value);
                            if (e.target.value === "") {
                              setAdjustedValue("");
                            } else {
                              setAdjustedValue(
                                e.target.value -
                                  Number(
                                    receivedData?.openingstock *
                                      receivedData?.openingrateperunit
                                  )
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Adjusted Value
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          value={adjustedValue}
                          onChange={(e) => {
                            setAdjustedValue(e.target.value);
                            if (e.target.value === "") {
                              setChangedValue("");
                            } else {
                              setChangedValue(
                                Number(
                                  receivedData?.openingstock *
                                    receivedData?.openingrateperunit
                                ) + Number(e.target.value)
                              );
                            }
                          }}
                          placeholder="Eg. +10, -10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Reason*
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <FormControl sx={{ m: 1, minWidth: 310 }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Reasons
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          label="reason"
                          value={reason1}
                          onChange={(e) => setReason1(e.target.value)}
                          style={{ width: "310px", marginRight: "30px" }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Stock on Fire">
                            Stock on Fire
                          </MenuItem>
                          <MenuItem value="Stolen Goods">Stolen Goods</MenuItem>
                          <MenuItem value="Damaged Goods">
                            Damaged Goods
                          </MenuItem>
                          <MenuItem value="Stock written off">
                            Stock written off
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="row mt-3 border-bottom pb-2">
                    <div className="col-md-4 ">
                      <label htmlFor="" style={{ fontSize: "14px" }}>
                        Description*
                      </label>
                    </div>
                    <div className="col-md-7  ">
                      <textarea
                        type="text"
                        name=""
                        id=""
                        className="inputText"
                        value={description1}
                        onChange={(e) => setDescription1(e.target.value)}
                        style={{
                          height: "60px",
                          width: "310px",
                          marginRight: "50px",
                          outline: "none",
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={saveValueAdjustment}
                    >
                      Convert To Adjustment
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary mx-2"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="row  mt-5">
        <div className="col-md-6  text-start">
          <div className="row">
            <div className="col-md-3 text-start">
              <label htmlFor="" className="label1">
                First Name
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.firstname}
                disabled
                className="input1"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 text-start">
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="" className="label1">
                Item Type
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.itemtype}
                disabled
                className="input1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row  mt-5">
        <div className="col-md-6  text-start">
          <div className="row">
            <div className="col-md-3 text-start">
              <label htmlFor="" className="label1">
                Unit
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.unit}
                disabled
                className="input1"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6  text-start">
          <div className="row">
            <div className="col-md-3 text-start">
              <label htmlFor="" className="label1">
                Stock on Hand
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.stockonhand}
                disabled
                className="input1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row  mt-5">
        <div className="col-md-6  text-start">
          <div className="row">
            <div className="col-md-3 text-start">
              <label htmlFor="" className="label1">
                Selling Price
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.sellingprice}
                disabled
                className="input1"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 text-start">
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="" className="label1">
                Sales Description
              </label>
            </div>
            <div className="col-md-6">
              <textarea
                type="text"
                name=""
                id=""
                value={receivedData?.salesdescription}
                disabled
                className="input1"
                style={{ height: "60px" }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="row  mt-5">
        {/* <div className="col-md-6  text-start">
          <div className="row">
            <div className="col-md-3 text-start">
              <label htmlFor="" className="label1">
                Cost Price
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.purchasecostprice}
                disabled
                className="input1"
              />
            </div>
          </div>
        </div> */}
        <div className="col-md-6 text-start">
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="" className="label1">
                Purchase Description
              </label>
            </div>
            <div className="col-md-6">
              <textarea
                type="text"
                name=""
                id=""
                value={receivedData?.purchasedescription}
                disabled
                className="input1"
                style={{ height: "60px" }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewItem;
