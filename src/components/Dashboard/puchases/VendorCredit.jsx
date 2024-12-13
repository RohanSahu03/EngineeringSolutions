import React, { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../css/dashboard/quotes.css";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TiPlus } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";

function VendorCredit() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [expirydate, setExpiryDate] = useState(new Date());

  const [creditnumber, setCreditNumber] = useState("");
  const [vendors, setVendors] = useState([]);
  const [product, setProduct] = useState([]);
  const [DiscountUnit, setDiscountUnit] = useState("%");
  const [gsttax, setGstTax] = useState(0.0);
  const [shippingChares, setShippingCharges] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [customerId, setCustomerId] = useState("");
  const [ordernumber, setOrderNumber] = useState("");
const [costprice,setCostPrice]=useState(0)
  const [creditNotes, setCreditNotes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [itemData, setItemData] = useState([]);
  const [products, setProducts] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => {
    setShow(true);
    getAllVendor();
    getAllProduct();
  };
  const handleClose = () => setShow(false);
  const [productId, setProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  useEffect(() => {
    getAllVendorCredit();
  }, []);

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
  const getProductById = async (id) => {
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

  const addItemData = () => [
    setItemData([
      ...itemData,
      {
        itemid: products?._id,
        itemdetails: products?.firstname,
        quantity: quantity,
        rate: costprice,
        discount: discount,
        amount:
          DiscountUnit === "%"
            ? quantity * costprice -
              Number(
                (
                  quantity *
                  costprice *
                  (discount / 100)
                ).toFixed(2)
              )
            : quantity * costprice - discount,
        discountunit: DiscountUnit,
      },
    ]),
    setTotal(subtotal),
  ];
  const deleteItemData = (id) => {
    setItemData([...itemData.filter((item) => item.itemid !== id)]);
  };

  const formdata = new FormData();

  const saveVendorCredit = async () => {
    try {
      if (!customerId) {
        toast.warning("Please select a vendor");
        return;
      }
      if (!creditnumber) {
        toast.warning("Please enter the credit number");
        return;
      }

      formdata.set("vendorname", customerId);
      formdata.set("creditnumber", creditnumber);
      formdata.set("ordernumber", ordernumber);
      formdata.set("creditnotedate", startDate);
      formdata.set("itemdetailsArray", JSON.stringify(itemData));
      formdata.set("subtotal", subtotal);
      formdata.set("gsttax", gsttax);
      formdata.set("shippingcharges", shippingChares);
      formdata.set("total", total);

      const config = {
        url: "/createvendorcredit",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/vendorcredit",
        headers: { "content-type": "application/json" },
        data: formdata,
      };

      const res = await axios(config);
      if (res.status === 201) {
        handleClose();
        toast.success("Vendor Credit  Created");
        getAllVendorCredit();
      }
      if (res.status === 400) {
        toast(res.data.message);
      }
      if (res.status === 500) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [filteredArray, setFillteredArray] = useState([]);
  const getAllVendorCredit = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendorcredit/getvendorcredit"
      );
      if (res.status === 201) {
        // console.log("data", res.data);
        setCreditNotes(res.data);
        setFillteredArray(res.data);
      }
      if (res.status === 500) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVendorCredit = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/vendorcredit/deletevendorcredit/${id}`
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        getAllVendorCredit();
      }
      if (res.status === 404) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteVendorCredit(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const getAllVendor = async () => {
    try {
      let res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendors(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [search, setSearch] = useState("");
  function handleFilter() {
    if (search != "") {
      const filterTable = creditNotes.filter((o) =>
        Object.keys(o).some((k) => {
          // If the key is 'customername', check 'customerfirstname'
          if (k === "vendorname" && o[k]?.vendorfirstname) {
            return o[k].vendorfirstname
              .toLowerCase()
              .includes(search.toLowerCase());
          }
          // For other keys, convert value to string and perform the check
          return String(o[k]).toLowerCase().includes(search.toLowerCase());
        })
      );

      // Update the state with the filtered array
      setFillteredArray([...filterTable]);
    } else {
      // If search is empty, show all sales orders
      setFillteredArray([...creditNotes]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortByDate = () => {
    setFillteredArray([
      ...creditNotes.sort(
        (a, b) => new Date(a.creditnotedate) - new Date(b.creditnotedate)
      ),
    ]);
  };

  const sortByCreditNumber = () => {
    setFillteredArray([
      ...creditNotes.sort((a, b) => a.creditnumber - b.creditnumber),
    ]);
  };

  const sortByVendorName = () => {
    setFillteredArray([
      ...creditNotes.sort((a, b) =>
        a.vendorname.vendorfirstname.localeCompare(b.vendorname.vendorfirstname)
      ),
    ]);
  };

  const sortByAmount = () => {
    setFillteredArray([...creditNotes.sort((a, b) => a.total - b.total)]);
  };

  return (
    <div>
      <ToastContainer />

      <div className="row border py-3 d-flex ">
        <div className="col-md-4 col-4 d-flex justify-content-center">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search"
              aria-label="customer"
              aria-describedby="basic-addon2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-4 offset-4 col-6 d-flex justify-content-end">
          {/* < BsThreeDotsVertical className='menuDot'/> */}
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary d-inline"
              onClick={handleShow}
              style={{ height: "38px" }}
            >
              <TiPlus /> New
            </button>
            <Dropdown className="mx-3">
              <Dropdown.Toggle
                variant="transparent outline btn-outline-primary"
                id="dropdown-basic"
              >
                Sort
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* <Dropdown.Item onClick={sortByQuote}>
                  Quote Number
                </Dropdown.Item> */}
                <Dropdown.Item onClick={sortByDate}>Date</Dropdown.Item>
                <Dropdown.Item onClick={sortByCreditNumber}>
                  Credit Number
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByVendorName}>
                  Vendor Name
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByAmount}>Amount</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="row overflow-auto">
        <div className="col-md-12">
          <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col" className="text-center">
                  SL.No.
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Credit Note#
                </th>
                <th scope="col" className="text-center">
                  Order Number
                </th>
                <th scope="col" className="text-center">
                  Vendor Name
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
                <th scope="col" className="text-center">
                  Balance
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            {filteredArray?.length !== 0 ? (
              <tbody>
                {filteredArray
                  ?.slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">
                          {formatDate(item.creditnotedate)}
                        </td>
                        <td className="text-center">{item.creditnumber}</td>
                        <td className="text-center">{item.ordernumber}</td>
                        <td className="text-center">
                          {item.vendorname.vendorfirstname}
                        </td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-center">{item.total}</td>
                        <td className="text-center">{item.creditsremaining}</td>
                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate(
                                "/dashboard/purchase/vendorcreditsummary",
                                {
                                  state: item,
                                }
                              )
                            }
                          />
                          <FaEdit
                            onClick={() =>
                              navigate(
                                "/dashboard/purchase/updateVendorCredit",
                                {
                                  state: item,
                                }
                              )
                            }
                            style={{ marginLeft: "10px" }}
                          />
                          <MdDeleteForever
                            onClick={() => confirmalert(item._id)}
                            style={{ marginLeft: "10px" }}
                          />{" "}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <div className="container ">
                <div className="row mt-4 ">
                  <div className="col-md-12 ">
                    <img
                      src="../images/emptybox.jpg"
                      alt=""
                      srcset=""
                      style={{
                        width: "200px",
                        height: "200px",
                        opacity: "0.4",
                      }}
                    />
                    <h6>There are no Credit Notes.</h6>
                  </div>
                </div>
              </div>
            )}
          </table>
          <div style={{ display: "flex" }} className="reactPagination">
            <p style={{ width: "100%", marginTop: "20px" }}>
              Total Count: {filteredArray?.length}
            </p>
            <ReactPaginate
              previousLabel={"Back"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "1200px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Credit Note</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Vendor Name
              </label>
            </div>
            <div className="col-md-5">
              <select
                className="textInput"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option value="">Select Vendor</option>
                {vendors.map((item) => {
                  return (
                    <option value={item._id}>{item.vendorfirstname}</option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* ------quote---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Credit Note#*
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                required
                value={creditnumber}
                onChange={(e) => setCreditNumber(e.target.value)}
              />
            </div>
          </div>

          {/* ------refrence---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Order number
              </label>
            </div>
            <div className="col-md-5">
              <input
                type="text"
                id="inputText"
                className="form-control textInput"
                value={ordernumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
          </div>

          {/* ------quote date---------- */}
          <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
            <div className="col-md-2 text-start">
              <label for="inputText" className="col-form-label label">
                Vendor Credit Date*
              </label>
            </div>
            <div className="col-md-5  text-start">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="textInput customDateInput"
                style={{ outline: "none" }}
                required
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
                  <th scope="col">Item details</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* --------------first row--------------- */}
                <tr>
                  <td>
                    <select
                      name=""
                      id=""
                      className="textInput outline-0"
                      value={products}
                      onChange={(e) => setProducts(JSON.parse(e.target.value))}
                    >
                      <option value="">Select Item</option>
                      {product.map((item) => {
                        return (
                          <option value={JSON.stringify(item)} key={item._id}>
                            {item.firstname}
                          </option>
                        );
                      })}
                    </select>
                  </td>

                  <td>
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "180px" }}
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        setAmount(quantity * costprice);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      style={{ width: "180px" }}
                      value={costprice}
                      onChange={(e)=>setCostPrice(e.target.value)}
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
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="col">
                      {["bottom"].map((placement) => (
                        <OverlayTrigger
                          trigger="click"
                          key={placement}
                          placement={placement}
                          overlay={
                            <Popover
                              id={`popover-positioned-${placement}`}
                              style={{ backgroundColor: "aliceblue" }}
                            >
                              <Popover.Body>
                                <ul class="list-group">
                                  <li
                                    class="list-group-item"
                                    onClick={() => setDiscountUnit("%")}
                                  >
                                    %
                                  </li>
                                  <li
                                    class="list-group-item"
                                    onClick={() => setDiscountUnit("₹")}
                                  >
                                    ₹
                                  </li>
                                </ul>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="downarrow">
                            <IoIosArrowDropdownCircle />
                          </div>
                        </OverlayTrigger>
                      ))}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="inputText"
                      disabled
                      className="form-control textInput"
                      style={{ width: "180px" }}
                      value={
                        !products || Object.keys(products)?.length === 0
                          ? 0
                          : DiscountUnit === "%"
                          ? quantity * costprice -
                            Number(
                              (
                                quantity *
                                costprice*
                                (discount / 100)
                              ).toFixed(2)
                            )
                          : quantity * costprice - discount
                      }
                    />
                  </td>
                  <td>
                    <FaPlusCircle onClick={addItemData} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Discount</th>
                    <th>Amount</th>
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
          </div>

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
                      placeholder="in rupees"
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
                      placeholder="in %"
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
                  onClick={saveVendorCredit}
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
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default VendorCredit;
