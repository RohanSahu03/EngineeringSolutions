import React, { useState, useRef, useEffect } from "react";
// import Button from "react-bootstrap/Button";
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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ReactPaginate from "react-paginate";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function Items() {
  const [show, setShow] = useState(false);
  const [product, setProducts] = useState([]);
  const [selecteItem, setSelectedItem] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [vendordata, setVendordata] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => setShow(!show);
  const handleShow = () => {
    getAllVendor();
    setShow(true);
  };

  const [show1, setShow1] = useState(false);
  const target1 = useRef(null);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const target2 = useRef(null);

  const successMsg = () => toast("Item Saved Successfully");
  const failureMsg = () => toast("Something went wrong");
  const [productstatus, setProductStatus] = useState("Active");

  const [formData, setFormData] = useState({
    itemtype: "goods",
    firstname: "",
    unit: "",
    sellingprice: 0,
    salesdescription: "",
    purchasedescription: "",
    gst:"",
    // purchasecostprice: 0,
    prefferedvendors: "",
    productstatus: productstatus,
    openingstock: 0,
    openingrateperunit: 0,
    reorederpoint: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [itemtype, setItemType] = useState("");
  const [firstname, setFirstname] = useState("");
  const [unit, setUnit] = useState("");
  const [gst, setGst] = useState("");
  const [sellingprice, setSellingPrice] = useState();
  const [salesdescription, setSalesDescription] = useState("");
  const [purchasedescription, setPurchaseDescription] = useState("");
  const [purchasecostprice, setPurchaseCostPrice] = useState();
  const [prefferedvendors, setPrefferedVendor] = useState("");

  // let formdata = new FormData();

  const saveItem = async (e) => {
    e.preventDefault();

    if (!formData.itemtype) {
      return toast("select product type");
    }
    if (!formData.firstname) {
      return toast("enter product name");
    }
    if (!formData.unit) {
      return toast("enter product unit");
    }
    if (!formData.sellingprice) {
      return toast("enter selling price");
    }
    if (!formData.salesdescription) {
      return toast("enter sales description");
    }
    // if (!formData.purchasecostprice) {
    //   return toast("enter purchase cost price");
    // }
    if (!formData.purchasedescription) {
      return toast("enter purchase description");
    }
    if (!formData.openingstock) {
      return toast("Enter opening stock");
    }
    if (!formData.openingrateperunit) {
      return toast("Enter per unit opening rate");
    }
    if (!formData.reorederpoint) {
      return toast("Enter reorder point ");
    }

    try {
      const config = {
        url: "/createproduct",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/products",
        headers: { "content-type": "application/json" },
        data: formData,
      };

      let res = await axios(config);
      if (res.status === 201) {
        successMsg();
        getAllItems();
        setShow(false);
        handleClose();
        setFormData({
          firstname: "",
          unit: "",
          gst:'',
          sellingprice: 0,
          salesdescription: "",
          purchasedescription: "",
          // purchasecostprice: 0,
          prefferedvendors: "",
          openingstock: 0,
          openingrateperunit: 0,
          reorederpoint: 0,
        });
      }
    } catch (error) {
      failureMsg();
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const [filteredArray, setFillteredArray] = useState([]);

  const getAllItems = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/products/getproduct"
      );
      if (res.status === 201) {
        setProducts(res.data);
        setFillteredArray(res.data);
        setIsLoading(false)
      } else {
        failureMsg();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (item) => {
    let status = "";
    if (item?.productstatus === "Active") {
      status = "Inactive";
    } else {
      status = "Active";
    }
    try {
      let config = {
        url: `updateproduct/${item?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/products",
        headers: { "content-type": "application/json" },
        data: { productstatus: status },
      };
      const res = await axios(config);
      if (res.status === 200) {
        toast.success("customer status changed");
        getAllItems();
      }

      if (res.status === 404) {
        toast.warning("customer not found");
      }
      if (res.status === 500) {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/products/deleteproduct/${id}`
      );
      if (res.status === 200) {
        getAllItems();
        toast.success("product deleted");
      } else {
        toast("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openOffcanvas = () => {
    console.log(selecteItem);
    setShow2(!show2);
  };

  let formdata2 = new FormData();
  const updateItem = async (id) => {
    try {
      let config = {
        url: `updateproduct/${selecteItem?._id}`,
        method: "put",
        baseURL: "https://engineeringsolutions.net.in/api/products",
        headers: { "content-type": "application/json" },
        data: {
          itemtype: itemtype,
          firstname: firstname,
          unit: unit,
          gst:gst,
          sellingprice: sellingprice,
          // purchasecostprice: purchasecostprice,
          salesdescription: salesdescription,
          purchasedescription: purchasedescription,
          preferredvendors: prefferedvendors,
        },
      };

      const res = await axios(config);
      if (res.status === 200) {
        toast("product updated successfully...");
        getAllItems();
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
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortByName = () => {
    setFillteredArray([
      ...product.sort((a, b) => a.firstname.localeCompare(b.firstname)),
    ]);
  };
  const sortByRate = () => {
    setFillteredArray([
      ...product.sort((a, b) => a.sellingprice - b.sellingprice),
    ]);
  };

  const sortByPurchaseRate = () => {
    setFillteredArray([
      ...product.sort((a, b) => a.purchasecostprice - b.purchasecostprice),
    ]);
  };

  const confirmalert = (id) => {
    confirmAlert({
      title: "Confirm to Delete Product",
      message: "Are You Sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteItem(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const [activetab, setActiveTab] = useState("All Items");

  const filterItemsByActiveStatus = () => {
    setFillteredArray([
      ...product.filter((item) => item.productstatus === "Active"),
    ]);
    setShow1(!show1);
    setActiveTab("Active Items");
  };

  const filterItemsByInactivStatus = () => {
    setFillteredArray([
      ...product.filter((item) => item.productstatus === "Inactive"),
    ]);
    setShow1(!show1);
    setActiveTab("Inactive Items");
  };

  const filterAllItem = () => {
    setFillteredArray([...product]);
    setShow1(!show1);
    setActiveTab("All Items");
  };

  const [search, setSearch] = useState("");
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

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <ToastContainer />
      <div className="row border py-3 d-flex ">
        <div className="col-md-4 col-4">
          <Button
            variant="transparent"
            className="float-start"
            ref={target1}
            onClick={() => setShow1(!show1)}
          >
            {activetab} <TiArrowSortedDown />
          </Button>
          <Overlay target={target1.current} show={show1} placement="bottom">
            {({
              placement: _placement,
              arrowProps: _arrowProps,
              show: _show,
              popper: _popper,
              hasDoneInitialMeasure: _hasDoneInitialMeasure,
              ...props
            }) => (
              <div
                {...props}
                style={{
                  position: "absolute",
                  backgroundColor: "",
                  padding: "2px 10px",
                  color: "black",
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                <ul class="list-group">
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={filterAllItem}
                  >
                    All Items
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={filterItemsByActiveStatus}
                  >
                    Active Items
                  </li>
                  <li
                    class="list-group-item list-group-item-action"
                    onClick={filterItemsByInactivStatus}
                  >
                    Inactive Items
                  </li>
                </ul>
              </div>
            )}
          </Overlay>
        </div>
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

        <div className="col-md-4 col-4 d-flex justify-content-end">
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
                <Dropdown.Item onClick={sortByName}>Name</Dropdown.Item>
                <Dropdown.Item onClick={sortByRate}>Rate</Dropdown.Item>
                <Dropdown.Item onClick={sortByPurchaseRate}>
                  Purchase Rate
                </Dropdown.Item>
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
                  Sl.No.
                </th>
                <th scope="col" className="text-center">
                  Name
                </th>
                <th scope="col" className="text-center ">
                  Description
                </th>
                <th scope="col" className="text-center">
                  Purchase Description
                </th>
                <th scope="col" className="text-center ">
                  Rate
                </th>
                {/* <th scope="col" className="text-center">
                  Purchase Rate
                </th> */}
                <th scope="col" className="text-center">
                  Usage unit
                </th>
                <th scope="col" className="text-center">
                  Stock on Hand
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: "130px" }}
                >
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
                        <td className="text-center">{item.firstname}</td>
                        <td className="text-center">{item.salesdescription}</td>
                        <td className="text-center">
                          {item.purchasedescription}
                        </td>
                        <td className="text-center">{item.sellingprice}</td>
                        {/* <td className="text-center">
                          {item.purchasecostprice}
                        </td> */}
                        <td className="text-center">{item.unit}</td>
                        <td className="text-center">{item.stockonhand}</td>
                        <td className="text-center">
                          {item.productstatus === "Active" ? (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => changeStatus(item)}
                            >
                              {item.productstatus}
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => changeStatus(item)}
                            >
                              {item.productstatus}
                            </Button>
                          )}
                        </td>
                        <td className="text-center">
                          <FaEdit
                            onClick={() => {
                              openOffcanvas();
                              setSelectedItem(item);
                            }}
                          />

                          <MdDeleteForever
                            onClick={() => confirmalert(item._id)}
                            style={{ marginLeft: "10px" }}
                          />

                          <FaEye
                            onClick={() =>
                              navigate("/dashboard/items/viewItem", {
                                state: item,
                              })
                            }
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
                      src="/images/emptybox.jpg"
                      alt=""
                      srcset=""
                      style={{
                        width: "200px",
                        height: "200px",
                        opacity: "0.4",
                      }}
                    />
                    <h6>There are no items.</h6>
                  
                  </div>
                </div>
              </div>
            )}
          </table>
          <div style={{ display: "flex" }} className="reactPagination">
            <p style={{ width: "100%", marginTop: "20px" }}>
              Total Count: {product?.length}
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
            <div className="row g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Type
                </label>
              </div>
              <div className="col-md-5">
                <div className="row">
                  <div className="col-md-6">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        name="itemtype"
                        id="flexRadioDefault1"
                        type="radio"
                        value="goods"
                        checked={formData.itemtype === "goods"}
                        onChange={handleChange}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Goods
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="itemtype"
                        id="flexRadioDefault1"
                        value="service"
                        checked={formData.itemtype === "service"}
                        onChange={handleChange}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Service
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Name*
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="firstname"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.firstname}
                />
              </div>
            </div>

            <div className="row g-3 mt-2 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Unit
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="unit"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.unit}
                />
              </div>
            </div>

            <div className="row g-3 mt-2 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                GST
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="gst"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.gst}
                />
              </div>
            </div>

            <div className="row mt-4 ">
              <div className="col-md-6 ">
                <h6>Sales Information</h6>
                <div className="row mt-3 ">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Selling price*
                    </label>
                  </div>
                  <div className="col-md-8 offset-1 ">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        INR
                      </span>
                      <input
                        type="number"
                        name="sellingprice"
                        class="form-control"
                        aria-label="Username"
                        value={formData.sellingprice}
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Description
                    </label>
                  </div>
                  <div className="col-md-8 offset-1">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        value={formData.salesdescription}
                        onChange={handleChange}
                        name="salesdescription"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: "70px" }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h6>Purchase Information</h6>
                {/* <div className="row mt-3">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Cost price*
                    </label>
                  </div>
                  <div className="col-md-8 offset-1">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        INR
                      </span>
                      <input
                        type="number"
                        class="form-control"
                        value={formData.purchasecostprice}
                        name="purchasecostprice"
                        onChange={handleChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div> */}

                <div className="row mt-3">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Description
                    </label>
                  </div>
                  <div className="col-md-8 offset-1">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        value={formData.purchasedescription}
                        onChange={handleChange}
                        name="purchasedescription"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: "70px" }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Preffered Vendor
                    </label>
                  </div>
                  <div className="col-md-8 offset-1">
                    <select
                      className="form-select textInput"
                      id="inputGroupSelect03"
                      aria-label="Example select with button addon"
                      placeholder="select vendor"
                      onChange={handleChange}
                      value={formData.prefferedvendors}
                      name="prefferedvendors"
                    >
                      <option value="">Select Vendor</option>
                      {vendordata.map((item) => {
                        return (
                          <option value={item._id}>
                            {item.vendorfirstname}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <hr />
              <div className="row">
                <h6>Inventory Details</h6>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <label for="inputText" className="col-form-label label">
                        Opening Stock
                      </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="inputText"
                        name="openingstock"
                        className="form-control textInput"
                        required
                        onChange={handleChange}
                        value={formData.openingstock}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <label for="inputText" className="col-form-label label">
                        Opening Stock Rate Per Unit
                      </label>
                    </div>
                    <div className="col-md-5">
                      <input
                        type="text"
                        id="inputText"
                        name="openingrateperunit"
                        className="form-control textInput"
                        required
                        onChange={handleChange}
                        value={formData.openingrateperunit}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Reorder point
                    </label>
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      id="inputText"
                      name="reorederpoint"
                      className="form-control textInput"
                      required
                      onChange={handleChange}
                      value={formData.reorederpoint}
                    />
                  </div>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-md-6">
                <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                   Reorder point
                    </label>
                  </div>
                  <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="openingrateperunit"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.openingrateperunit}
                />
              </div>
                </div>
              </div> */}

              <div className="row mt-5">
                <div className="col-md-1 col-2">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={saveItem}
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

      {/* Off-Canvas--------------------------- */}

      <Offcanvas
        show={show2}
        onHide={handleClose2}
        placement="end"
        style={{ width: "1000px", backgroundColor: "white" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update Item</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div class="row g-3 needs-validation" novalidate>
            <div className="row g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Type
                </label>
              </div>
              <div className="col-md-5">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="inputText"
                      className="form-control textInput"
                      placeHolder={selecteItem?.itemtype}
                      onChange={(e) => setItemType(e.target.value)}
                      value={itemtype}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Name*
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="firstname"
                  className="form-control textInput"
                  required
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  placeHolder={selecteItem?.firstname}
                />
              </div>
            </div>

            <div className="row g-3 mt-2 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Unit
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="firstname"
                  className="form-control textInput"
                  required
                  onChange={(e) => setUnit(e.target.value)}
                  value={unit || selecteItem?.unit}
                  placeHolder={selecteItem?.unit}
                />
              </div>
            </div>

            <div className="row g-3 mt-2 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
              GST
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="firstname"
                  className="form-control textInput"
                  required
                  onChange={(e) => setGst(e.target.value)}
                  value={gst || selecteItem?.gst}
                  placeHolder={selecteItem?.gst}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <h6>Sales Information</h6>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Selling price*
                    </label>
                  </div>
                  <div className="col-md-8 ">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        INR
                      </span>
                      <input
                        type="number"
                        name="sellingprice"
                        class="form-control"
                        placeHolder={selecteItem?.sellingprice}
                        value={sellingprice}
                        aria-describedby="basic-addon1"
                        onChange={(e) => setSellingPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Description
                    </label>
                  </div>
                  <div className="col-md-8">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        value={
                          salesdescription || selecteItem?.salesdescription
                        }
                        onChange={(e) => setSalesDescription(e.target.value)}
                        id="floatingTextarea2"
                        style={{ height: "70px" }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 g-3">
                <h6>Purchase Information</h6>
                {/* <div className="row mt-3">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Cost price*
                    </label>
                  </div>
                  <div className="col-md-8 ">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        INR
                      </span>
                      <input
                        type="number"
                        class="form-control"
                        value={purchasecostprice}
                        onChange={(e) => setPurchaseCostPrice(e.target.value)}
                        placeHolder={selecteItem?.purchasecostprice}
                      />
                    </div>
                  </div>
                </div> */}

                <div className="row mt-3">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Description
                    </label>
                  </div>
                  <div className="col-md-8">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        value={
                          purchasedescription ||
                          selecteItem?.purchasedescription
                        }
                        onChange={(e) => setPurchaseDescription(e.target.value)}
                        id="floatingTextarea2"
                        style={{ height: "70px" }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-3">
                    <label for="inputText" className="col-form-label label">
                      Preffered Vendor
                    </label>
                  </div>
                  <div className="col-md-8">
                    <select
                      className="form-select textInput"
                      id="inputGroupSelect03"
                      aria-label="Example select with button addon"
                      onChange={(e) => setPrefferedVendor(e.target.value)}
                      value={prefferedvendors || selecteItem?.preferredvendors}
                      onClick={getAllVendor}
                    >
                      {vendordata.map((item) => {
                        return (
                          <option value={item._id}>
                            {item.vendorfirstname}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-md-1 col-2">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={() => updateItem(selecteItem._id)}
                  >
                    Update
                  </button>
                </div>
                <div className="col-md-1 col-2 mx-3">
                  <button
                    type="button"
                    class="btn btn-outline-info"
                    onClick={handleClose2}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* off-canvas End ------------------ */}
    </div>
  );
}

export default Items;
