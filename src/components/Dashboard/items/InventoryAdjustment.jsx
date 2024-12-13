import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../../../css/dashboard/items.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdDeleteForever } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaEdit, FaEye } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert module
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactPaginate from "react-paginate";

function InventoryAdjustment() {
  const [show, setShow] = useState(false);
  const [product, setProducts] = useState([]);
  const [selecteItem, setSelectedItem] = useState({});

  const [vendordata, setVendordata] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getAllVendor();
    setShow(true);
  };

  const navigate = useNavigate();

  const [show1, setShow1] = useState(false);
  const target1 = useRef(null);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const target2 = useRef(null);

  const failureMsg = () => toast("Something went wrong");

  const [formData, setFormData] = useState({
    hsncode: "",
    productname: "",
    description: "",
    quantity: 0,
    purchaseprice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [description, setDescription] = useState("");
  const [hsncode, setHSNCode] = useState("");
  const [productname, setProductName] = useState("");
  const [quantity, setQuantity] = useState();
  const [purchaseprice, setPurchasePrice] = useState("");

  // let formdata = new FormData();

  const saveProduct = async (e) => {
    e.preventDefault();

    // if (!formData.slno) {
    //   return toast.warning("Please enter Sl.No.");
    // }
    if (!formData.hsncode) {
      return toast.warning("Plese enter HSN Code");
    }
    if (!formData.productname) {
      return toast.warning("Please enter product name");
    }
    if (!formData.quantity) {
      return toast.warning("Please enter Quantity");
    }
    if (!formData.purchaseprice) {
      return toast.warning("Please enter purchase price");
    }
    if (!formData.description) {
      return toast.warning("Please enter description");
    }

    try {
      const config = {
        url: "/createinventory",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/inventory",
        headers: { "content-type": "application/json" },
        data: formData,
      };

      let res = await axios(config);
      if (res.status === 201) {
        toast.success("Product added successfully");
        getAllAdjustments();
        handleClose();
        setFormData({
          hsncode: "",
          productname: "",
          description: "",
          quantity: 0,
          purchaseprice: "",
        });
      }
    } catch (error) {
      failureMsg();
    }
  };

  useEffect(() => {
    getAllAdjustments();
  }, []);

  const getAllAdjustments = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/inventoryadjustment/getinventoryadjustment"
      );

      if (res.status === 201) {
        setProducts(res.data.inventory);
        setFillteredArray(res.data.inventory);
      } else {
        failureMsg();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAdjustment = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/inventoryadjustment/deleteadjustment/${id}`
      );
      if (res.status === 200) {
        getAllAdjustments();
        toast.success("Adjustment deleted successfully..");
      } else {
        toast("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openOffcanvas = () => {
    setShow2(!show2);
  };

  const updateItem = async () => {
    try {
      let config = {
        url: `updateinventory/${selecteItem?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/inventory",
        headers: { "content-type": "application/json" },
        data: {
          hsncode: hsncode,
          productname: productname,
          description: description,
          quantity: quantity,
          purchaseprice: purchaseprice,
        },
      };

      const res = await axios(config);
      if (res.status === 201) {
        toast("product updated successfully...");
        getAllAdjustments();
        handleClose2();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllVendor = async () => {
    try {
      let res = await axios.get(
        "https://engineeringsolutions.net.in/api/vendors/getallvendor"
      );
      if (res.status === 200) {
        setVendordata(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Product",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteAdjustment(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const [filteredArray, setFillteredArray] = useState([]);
  const [search, setSearch] = useState([]);
  //searchbox
  function handleFilter() {
    if (search != "") {
      const filterTable = product.filter((o) =>
        Object.keys(o).some((k) => {
          // For other keys, convert value to string and perform the check
          return String(o[k]).toLowerCase().includes(search.toLowerCase());
        })
      );

      // Update the state with the filtered array
      setFillteredArray([...filterTable]);
    } else {
      // If search is empty, show all sales orders
      setFillteredArray([...product]);
    }
  }
  useEffect(() => {
    handleFilter();
  }, [search]);

  //pagination code
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sortByProductName = () => {
    setFillteredArray([
      ...filteredArray.sort((a, b) =>
        a.productname.localeCompare(b.productname)
      ),
    ]);
  };

  const sortByQuantity = () => {
    setFillteredArray([
      ...filteredArray.sort((a, b) => a.quantity - b.quantity),
    ]);
  };

  const sortByPurchaseRate = () => {
    setFillteredArray([
      ...filteredArray.sort((a, b) => a.purchaseprice - b.purchaseprice),
    ]);
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

  function formatTimeWithAMPM(createdAt) {
    const date = new Date(createdAt);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Construct the time string
    return `${hours}:${formattedMinutes} ${ampm}`;
  }

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
            {/* <button
              type="button"
              className="btn btn-primary d-inline"
              onClick={handleShow}
              style={{ height: "38px" }}
            >
              <TiPlus /> New
            </button> */}
            {/* <Dropdown className="mx-3">
              <Dropdown.Toggle
                variant="transparent outline btn-outline-primary"
                id="dropdown-basic"
              >
                Sort
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={sortByProductName}>
                  Product Name
                </Dropdown.Item>
                <Dropdown.Item onClick={sortByQuantity}>Quantity</Dropdown.Item>
                <Dropdown.Item onClick={sortByPurchaseRate}>
                  Purchase Rate
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
        </div>
      </div>

      <div className="row overflow-auto">
        <div className="col-md-12">
          <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col" className="text-center">
                  Sl.no
                </th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Reason
                </th>
                <th scope="col" className="text-center">
                  Description
                </th>
                <th scope="col" className="text-center">
                  Reference
                </th>
                <th scope="col" className="text-center">
                  Type
                </th>
                <th scope="col" className="text-center">
                  Created Time
                </th>
                <th scope="col" className="text-center">
                  Last Modified Time
                </th>
                <th className="text-center" style={{ width: "130px" }}>
                  Action
                </th>
              </tr>
            </thead>
            {filteredArray.length !== 0 ? (
              <tbody>
                {filteredArray
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  ?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td className="text-center">
                          {index + 1 + usersPerPage * pageNumber}
                        </td>
                        <td className="text-center">{formatDate(item.date)}</td>
                        <td className="text-center">{item.reason}</td>
                        <td className="text-center">{item.description}</td>
                        <td className="text-center">{item.reference}</td>
                        <td className="text-center">{item.type}</td>
                        <td className="text-center">
                          {`${new Date(item.createdAt).getDate()}/${
                            new Date(item.createdAt).getMonth() + 1
                          }/${new Date(item.createdAt).getFullYear()}`}
                          <br />
                          {formatTimeWithAMPM(item.createdAt)}
                        </td>
                        <td className="text-center">
                          {`${new Date(item.updatedAt).getDate()}/${
                            new Date(item.updatedAt).getMonth() + 1
                          }/${new Date(item.updatedAt).getFullYear()}`}
                          <br />
                          {formatTimeWithAMPM(item.updatedAt)}
                        </td>

                        <td className="text-center">
                          <FaEye
                            onClick={() =>
                              navigate(
                                "/dashboard/inventory/viewInventoryAdjustments",
                                {
                                  state: item,
                                }
                              )
                            }
                          />

                          {item?.type === "Quantity" ? (
                            <FaEdit
                              onClick={() =>
                                navigate(
                                  "/dashboard/inventory/editInventoryAdjustments",
                                  {
                                    state: item,
                                  }
                                )
                              }
                              style={{ marginLeft: "10px" }}
                            />
                          ) : (
                            ""
                          )}

                          <MdDeleteForever
                            onClick={() => confirmalert(item._id)}
                            style={{ marginLeft: "10px" }}
                          />
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
                    <h6>There are no Products in Inventory.</h6>
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

      {/* Off-Canvas--------------------------- */}

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "1000px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Item</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form class="row g-3 needs-validation" novalidate>
            {/* 
            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Sl.No.
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="slno"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.slno}
                />
              </div>
            </div> */}

            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  HSN Code
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="hsncode"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.hsncode}
                />
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Product Name
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="productname"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.productname}
                />
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Description
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="description"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Quantity
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="quantity"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.quantity}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Purchase Price
                </label>
              </div>
              <div className="col-md-5 ">
                <div class="input-group mb-3 textInput">
                  <span class="input-group-text" id="basic-addon1">
                    INR
                  </span>
                  <input
                    type="number"
                    name="purchaseprice"
                    class="form-control"
                    aria-label="Username"
                    value={formData.purchaseprice}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="row mt-5">
                <div className="col-md-1 col-2">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={saveProduct}
                  >
                    Save
                  </button>
                </div>
                <div className="col-md-1 col-2">
                  <button
                    type="button"
                    class="btn btn-outline-info"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* off-canvas End ------------------ */}
    </div>
  );
}

export default InventoryAdjustment;
