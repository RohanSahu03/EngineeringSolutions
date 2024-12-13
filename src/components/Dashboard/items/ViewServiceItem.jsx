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

function ViewServiceItem() {
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
    
      </div>


      <div className="row  mt-5">
        <div className="col-md-6  text-start">
          <div className="row">
            <div className="col-md-3 text-start">
              <label htmlFor="" className="label1">
                Item Name
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.itemname}
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
                Item Unit
              </label>
            </div>
            <div className="col-md-6">
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
      </div>

      <div className="row  mt-5">
        <div className="col-md-6  text-start">
          <div className="row">
            <div className="col-md-3 text-start">
              <label htmlFor="" className="label1">
               Item Code
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.itemcode}
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
              SAC Code
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.saccode}
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
          SGST
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.sgst}
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
          CGST
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.cgst}
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
          IGST
              </label>
            </div>
            <div className="col-md-6 text-start">
              <input
                type="text"
                name=""
                id=""
                value={receivedData?.igst}
                disabled
                className="input1"
              />
            </div>
          </div>
        </div>
  

      </div>

    </div>
  );
}

export default ViewServiceItem;
