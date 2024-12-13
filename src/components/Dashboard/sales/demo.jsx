import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography, Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function UpdateInvoice() {
  const location = useLocation();
  const receivedData = location.state;
  const [customers, setCustomers] = useState([]);
  const [invoicedate, setInvoiceDate] = useState(new Date());
  const [duedate, setDueDate] = useState(new Date());
  const [quantity, setQuantity] = useState();
  const [discount, setDiscount] = useState();
  const [amount, setAmount] = useState(0);
  const [paymentterm, setPaymentTerm] = useState("");
  const [itemData, setItemData] = useState([]);
  const [itemData1, setItemData1] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [ordernumber, setOrderNumber] = useState("");
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [customerId, setCustomerId] = useState("");
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");

  const [formData, setFormData] = useState({});
  const handleChange = (e, index, data, newValue) => {
    const name = e?.target?.name || `itemdetails${index + 1}`;
    const value = e.target.value || newValue;

    setFormData((prevData) => {
      const updatedData = { ...prevData };

      // Update formData with new values
      if (name === `itemdetails${index + 1}`) {
        // Find the selected item to get its rate
        const selectedItem = product.find((p) => p._id === newValue?._id) || {};
        const rate = selectedItem.sellingprice || 0;

        // Recalculate amount based on the new rate
        const quantity =
          parseFloat(updatedData[index]?.[`quantity${index + 1}`]) ||
          data?.quantity ||
          0;
        const discount =
          parseFloat(updatedData[index]?.[`discount${index + 1}`]) ||
          data?.discount ||
          0;
        const discountunit =
          updatedData[index]?.[`discountunit${index + 1}`] ||
          data?.discountunit ||
          "%";

        let amount = quantity * rate;
        if (discountunit === "%") {
          amount = amount - (amount * discount) / 100;
        } else if (discountunit === "₹") {
          amount = amount - discount;
        }
        amount = amount < 0 ? 0 : amount;
        amount = amount.toFixed(2);

        updatedData[index] = {
          ...updatedData[index],
          [name]: newValue?._id,
          rate: rate,
          amount: amount,
        };
      } else {
        // Update other fields
        updatedData[index] = {
          ...updatedData[index],
          [name]: value,
        };

        // Recalculate amount based on updated values
        const quantity =
          parseFloat(updatedData[index][`quantity${index + 1}`]) ||
          data?.quantity ||
          0;
        const rate =
          parseFloat(updatedData[index][`rate${index + 1}`]) || data?.rate || 0;
        const discount =
          parseFloat(updatedData[index][`discount${index + 1}`]) ||
          data?.discount ||
          0;
        const discountunit =
          updatedData[index][`discountunit${index + 1}`] ||
          data?.discountunit ||
          "%";

        let amount = quantity * rate;
        if (discountunit === "%") {
          amount = amount - (amount * discount) / 100;
        } else if (discountunit === "₹") {
          amount = amount - discount;
        }
        amount = amount < 0 ? 0 : amount;
        amount = amount.toFixed(2);

        updatedData[index] = {
          ...updatedData[index],
          amount: amount,
        };
      }

      // Update itemData
      setItemData((prevItemData) =>
        prevItemData.map((val, idx) =>
          idx === index
            ? {
                ...val,
                ...updatedData[index],
              }
            : val
        )
      );

      return updatedData;
    });
  };

  //calulate due date based on payment term
  const calculateDueDate = (invoiceDate, term) => {
    if (!invoiceDate) return null;

    const date = new Date(invoiceDate);
    let daysToAdd = 0;

    switch (term) {
      case "Net-15":
        daysToAdd = 15;
        break;
      case "Net-30":
        daysToAdd = 30;
        break;
      case "Net-45":
        daysToAdd = 45;
        break;
      case "Net-60":
        daysToAdd = 60;
        break;
      case "Due end of the month":
        // Set to the last day of the month
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date;
      case "Due end of the next month":
        // Set to the last day of the next month
        date.setMonth(date.getMonth() + 2);
        date.setDate(0);
        return date;
      case "Due on Receipt":
        return invoiceDate; // Due date is the same as invoice date
      case "Custome":
        return invoiceDate;
      default:
        return null;
    }

    date.setDate(date.getDate() + daysToAdd);
    return date;
  };

  useEffect(() => {
    if (invoicedate && paymentterm) {
      const newDueDate = calculateDueDate(invoicedate, paymentterm);
      setDueDate(newDueDate);
    }
  }, [invoicedate, paymentterm]);

  // const deleteRow = (index) => {
  //   setItemData((prevData) => prevData.filter((_, i) => i !== index));
  // };

  const isDateDisabled = (date) => {
    return invoicedate < new Date(); // Disable if date is before today
  };

  const getAllCustomer = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/customers/getcustomer"
      );
      if (res.status === 200) {
        setCustomers(res.data);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/products/getproduct"
      );
      if (res.status === 201) {
        setProduct(res.data);
      } else {
        toast("internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomer();
    getAllProduct();
    setRowData([...receivedData?.itemdetailsArray]);
    setItemData([...receivedData?.itemdetailsArray]);
  }, []);

  const [rowData, setRowData] = useState([]);

  const recalculateAmount = (data) => {
    const { quantity, rate, discount, discountunit } = data;
    let amount = quantity * rate;

    if (discountunit === "%") {
      amount -= amount * (discount / 100);
    } else if (discountunit === "₹") {
      amount -= discount;
    }

    return amount;
  };

  const ItemDetailsEditor = (props) => {
    const [value, setValue] = useState(props.value || "");
    console.log("prop", props);

    const handleChange = (event) => {
      const newValue = event.target.value;
      setValue(newValue);
      props.api.applyTransaction({
        update: [{ ...props.data, itemdetails: newValue }],
      });
    };

    return (
      <select value={value} onChange={handleChange} style={{ width: "100%" }}>
        <option>{props?.value || "Select Item"}</option>
        {product.map((option) => (
          <option key={option._id} value={option._id}>
            {option.firstname}
          </option>
        ))}
      </select>
    );
  };

  const DiscountUnitEditor = (props) => {
    const [value, setValue] = useState(props.value || "");
    console.log("prop", props);

    const handleUnitChange = (event) => {
      const newValue = event.target.value;
      setValue(newValue);
      props.api.applyTransaction({
        update: [{ ...props.data, discountunit: newValue }],
      });
    };

    return (
      <select
        value={value}
        onChange={handleUnitChange}
        style={{ width: "100%" }}
      >
        <option value={props?.value}>{props?.value || "Select Item"}</option>
        {props?.value === "%" ? (
          <option value="₹">₹</option>
        ) : (
          <option value="%">%</option>
        )}
      </select>
    );
  };

  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    setColDefs([
      {
        field: "itemdetails",
        headerName: "Item Details",
        cellRenderer: (props) => ItemDetailsEditor(props),
      },
      {
        field: "quantity",
        editable: true,
        width: 130,
        valueSetter: (params) => {
          const newValue = Number(params.newValue);
          if (isNaN(newValue)) return false;
          params.data.quantity = newValue;
          params.data.amount = recalculateAmount(params.data);
          return true;
        },
      },
      {
        field: "rate",
        editable: true,
        headerName: "Rate",
        valueSetter: (params) => {
          const newValue = Number(params.newValue);
          if (isNaN(newValue)) return false;
          params.data.rate = newValue;
          params.data.amount = recalculateAmount(params.data);
          return true;
        },
      },
      {
        field: "discount",
        headerName: "Discount",
        editable: true,
        width: 130,
        valueSetter: (params) => {
          const newValue = Number(params.newValue);
          if (isNaN(newValue)) return false;
          params.data.discount = newValue;
          params.data.amount = recalculateAmount(params.data);
          return true;
        },
      },
      {
        field: "discountunit",
        headerName: "Discount Unit",
        cellRenderer: (props) => DiscountUnitEditor(props),
        width: 130,
        // cellEditorFramework: DiscountUnitEditor,
        valueSetter: (params) => {
          const newValue = params.newValue;
          if (newValue !== "%" && newValue !== "₹") return false;
          params.data.discountunit = newValue;
          params.data.amount = recalculateAmount(params.data);
          return true;
        },
      },
      {
        field: "amount",
        valueGetter: (params) => {
          return recalculateAmount(params.data);
        },
      },
      {
        field: "action",
        headerName: "Action",
        cellRenderer: (params) => (
          <div>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={(parmas) => deleteRow(params)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
        width: 130,
      },
    ]);
  }, [product]);

  const onCellValueChanged = (params) => {
    const { data, oldValue, newValue, column } = params;

    // Recalculate the amount if necessary
    const updatedData = rowData.map((row, index) => {
      if (index === data.id) {
        // Update the specific row with the new values
        const updatedRow = { ...row, ...data };

        // Recalculate amount if needed
        updatedRow.amount = recalculateAmount(updatedRow);
        return updatedRow;
      }
      return row;
    });

    // Update the state with the modified rows
    setRowData(updatedData);
  };

  const calculateSubtotal = (data) => {
    return data.reduce((total, row) => total + (row.amount || 0), 0);
  };

  useEffect(() => {
    setSubtotal(calculateSubtotal(rowData));
  }, [rowData]);

  const addRow = () => {
    const newRow = {
      itemdetails: "",
      quantity: 0,
      rate: 0,
      discount: 0,
      discountunit: "",
      amount: 0,
    };
    setRowData([...rowData, newRow]);
  };

  const deleteRow = (params) => {
    console.log("params", params);
    setRowData((curr) => [
      ...curr.filter((row, index) => index !== params?.node?.rowIndex),
    ]);
  };

  useMemo(() => {
    setSubtotal(
      itemData.reduce((accumulator, item) => {
        return accumulator + item.amount;
      }, 0)
    );
  }, [itemData]);

  useMemo(() => {
    setTotal(
      Number(subtotal) +
        Number(shippingChares) +
        Number(((subtotal * gsttax) / 100).toFixed(2))
    );
  }, [subtotal, shippingChares, gsttax]);

  const formData1 = new FormData();
  const updateInvoice = async (id) => {
    formData1.set("customername", customerId);
    formData1.set("invoice", invoicenumber);
    formData1.set("ordernumber", ordernumber);
    formData1.set("invoicedate", invoicedate);
    formData1.set("duedate", duedate);
    formData1.set("terms", paymentterm);
    formData1.set("itemdetailsArray", rowData);
    formData1.set("subtotal", subtotal);
    formData1.set("gsttax", gsttax);
    formData1.set("total", total);

    try {
      const config = {
        url: `/updateinvoice/${id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/invoices",
        headers: { "content-type": "application/json" },
        data: formData1,
      };

      const res = await axios(config);
      if (res.status === 201) {
        alert("Invoice Updated Successfully");
      }
      if (res.status === 404) {
        alert("invoice not found");
      }
      if (res.status === 500) {
        alert("something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Customer Name
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="textInput"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeHolder={receivedData?.customername.customerfirstname}
          >
            <option value="">
              {receivedData?.customername.customerfirstname}
            </option>
            {customers.map((item) => {
              return <option value={item._id}>{item.customerfirstname}</option>;
            })}
          </select>
        </div>
      </div>

      {/* ------quote---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Invoice# *
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            placeHolder={receivedData?.invoice}
            value={invoicenumber}
            onChange={(e) => setInvoiceNumber}
          />
        </div>
      </div>

      {/* ------refrence---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Order Number#
          </label>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            id="inputText"
            className="form-control textInput"
            placeHolder={receivedData?.ordernumber}
            value={ordernumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>
      </div>

      {/* ------quote date---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Invoice Date*
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={invoicedate}
            onChange={(date) => setInvoiceDate(date)}
            className="textInput"
            style={{ outline: "none" }}
            placeHolder={receivedData?.invoicedate}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* ---------------------------------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Term
          </label>
        </div>
        <div className="col-md-5">
          <select
            className="form-select textInput"
            value={paymentterm}
            onChange={(e) => setPaymentTerm(e.target.value)}
            id="inputGroupSelect03"
            aria-label="Example select with button addon"
            placeHolder={receivedData?.terms}
          >
            <option value="Net-15">Net 15</option>
            <option value="Net-30">Net 30</option>
            <option value="Net-45">Net 45</option>
            <option value="Net-60">Net 60</option>
            <option value="Due end of the month" active>
              Due end of the month
            </option>
            <option value="Due end of the next month" active>
              Due end of the next month
            </option>
            <option value="Due on Receipt" active>
              Due on Receipt
            </option>
          </select>
        </div>
      </div>

      {/* ------Expiry date---------- */}
      <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center border-bottom pb-2">
        <div className="col-md-2 text-start">
          <label for="inputText" className="col-form-label label">
            Due Date
          </label>
        </div>
        <div className="col-md-5  text-start">
          <DatePicker
            selected={duedate}
            onChange={(date) => setDueDate(date)}
            minDate={new Date()}
            filterDate={() => isDateDisabled(new Date())}
            className="textInput"
            style={{ outline: "none" }}
            placeHolder={receivedData?.duedate}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* --------------item table------------- */}
      <div className="row mt-3 text-start">
        <h5 className="py-2 bg-secondary text-light">Item Table</h5>
      </div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 300 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
      <Button variant="outlined" size="small" onClick={addRow}>
        Add Row
      </Button>
      {/* <div className="row">
            <div className="col-md-12">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>quantity</th>
                    <th>Rate</th>
                    <th>discount</th>
                    <th>amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {itemData.map((item) => {
                    return (
                      <tr key={item.itemid}>
                        <td>{item.itemdetails}</td>
                        <td>{item.quantity}</td>
                        <td>{item.rate}</td>
                        <td>{item.discount}</td>
                        <td>{item.amount}</td>
                        <td>
                          <MdDeleteForever
                            onClick={() => deleteItemData(item.itemid)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div> */}

      {/* ---------button----------    */}
      <div className="row justify-content-center">
        <div
          className="col-md-6 p-md-5 p-2 mt-2"
          style={{ background: "aliceblue" }}
        >
          <div className="row">
            <div className="col-md-4 col-4 text-start">
              <h6>subtotal</h6>
            </div>
            <div className="col-md-4 col-4 "></div>
            <div className="col-md-4 col-4 text-end">{subtotal}</div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4 col-4 text-start">
              <small>Shipping Charges</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="text"
                  class="form-control"
                  placeHolder={receivedData?.itemdetailsArray?.shippingcharges}
                  value={shippingChares}
                  onChange={(e) => {
                    setShippingCharges(e.target.value);
                    // setTotal(total + shippingChares);
                  }}
                />
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
              <p>{shippingChares}</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 col-4 text-start">
              <small>GST</small>
            </div>
            <div className="col-md-4 col-4">
              <div class="input-group mb-3 formInput">
                <input
                  type="number"
                  class="form-control"
                  placeHolder={receivedData?.itemdetailsArray?.gsttax}
                  value={gsttax}
                  onChange={(e) => {
                    setGstTax(e.target.value);
                    // setTotal((gsttax / 100) * total + total);
                  }}
                />
                {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>calculateGst(gsttax)}>%</button> */}
              </div>
            </div>
            <div className="col-md-4 col-4 text-end">
              <p>{gsttax}</p>
            </div>
          </div>

          <div className="row mt-2 border-top">
            <div className="col-md-6 col-6">
              <h4>Total (₹)</h4>
            </div>
            <div className="col-md-6 col-6">
              <h4>{total}</h4>
            </div>
          </div>
        </div>
        <div className="row g-3 ">
          <div className="col-md-6 col-3 ">
            <button
              // type="submit"
              class="btn btn-primary float-end"
              onClick={() => updateInvoice(receivedData?._id)}
            >
              Update
            </button>
          </div>
          <div className="col-md-6 col-3">
            <button
              type="button"
              class="btn btn-outline-info float-start"
              onClick={() => navigate("/dashboard/sales/invoice")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInvoice;
