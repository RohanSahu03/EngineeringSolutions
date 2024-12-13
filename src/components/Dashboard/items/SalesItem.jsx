import React, { useState, useRef, useEffect, useMemo } from "react";
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

function PurchaseItem() {
  const [show, setShow] = useState(false);
  const [product, setProducts] = useState([]);
  const [selecteItem, setSelectedItem] = useState({});
  const [productCode, setProductCode] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [vendordata, setVendordata] = useState([]);
  const navigate = useNavigate();
  const [indentnumber, setIndentNumber] = useState("");
  const [purchaseitemno, setPurchaseItemNo] = useState("");

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
    itemname: "",
    itemcode: "",
    unit: "",
    hsncode: "",
    sgst: "",
    cgst: "",
    igst: "",
    quantity:0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [itemname, setItemName] = useState("");
  const [hsncode, setHsnCode] = useState("");
  const [unit, setUnit] = useState("");
  const [sgst, setSgst] = useState("");
  const [cgst, setCgst] = useState("");
  const [igst, setIgst] = useState("");
  const [itemcode, setItemCode] = useState("");

  // let formdata = new FormData();

  const saveItem = async (e) => {
    e.preventDefault();

    if (!formData.itemname) {
      return toast("Please Enter Item Name");
    }
    if (!formData.unit) {
      return toast("Please Enter Unit");
    }
    // if (!formData.itemcode) {
    //   return toast("Please Enter Item Code");
    // }
    if (!formData.hsncode) {
      return toast("Please Enter HSN Code");
    }

    try {
      const config = {
        url: "/createproduct",
        method: "post",
        baseURL: "https://engineeringsolutions.net.in/api/salesitem",
        headers: { "content-type": "application/json" },
        data: formData,
      };

      let res = await axios(config);
      if (res.status === 201) {
        successMsg();
        getAllItems();
        setShow(false);
        savePurchaseItemNo();
        handleClose();
        setFormData({
          itemname: "",
          itemcode: "",
          unit: "",
          hsncode: "",
          sgst: "",
          cgst: "",
          igst: "",
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
        "https://engineeringsolutions.net.in/api/salesitem/getproduct"
      );
      if (res.status === 201) {
        setProducts(res.data);
        const revarr = res.data.reverse();
        setFillteredArray(revarr);
        setIsLoading(false);
      } else {
        failureMsg();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://engineeringsolutions.net.in/api/salesitem/deleteproduct/${id}`
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
        baseURL: "https://engineeringsolutions.net.in/api/salesitem",
        headers: { "content-type": "application/json" },
        data: {
          itemname: itemname,
          hsncode: hsncode,
          unit: unit,
          sgst: sgst,
          cgst: cgst,
          igst: igst,
        },
      };

      const res = await axios(config);
      if (res.status === 200) {
        toast("Product Updated successfully...");
        getAllItems();
        handleClose2();
        setItemCode("");
        setItemName("");
        setSgst("");
        setIgst("");
        setCgst("");
        setHsnCode("");
        setUnit("");
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

  const savePurchaseItemNo = async () => {
    try {
      const res = await axios.post(
        "https://engineeringsolutions.net.in/api/salesitem/createSalesItemNo",
        { salesitemno: purchaseitemno }
      );
      if (res.status === 201) {
        console.log("data saved");
      } else {
        console.log("not saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLastPurchaseItemNo = async () => {
    try {
      const res = await axios.get(
        `https://engineeringsolutions.net.in/api/salesitem/getLastSalesItemNo`
      );
      if (res.status === 201) {
        setIndentNumber(res.data.salesitemno);
        increase();
      }
      if (res.status === 500) {
        toast.warning("Failed to retrieve data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLastPurchaseItemNo();
  }, []);

  const incrementPurchaseItemNo = () => {
    let newIndentNo;

    // Extract the numeric part and increment as usual
    const numberPart = indentnumber?.slice(2); // '000001'
    console.log("inc", numberPart);

    const incrementedNumber = parseInt(numberPart) + 1;
    const newNumberPart = String(incrementedNumber).padStart(
      numberPart?.length,
      "0"
    );

    // Combine the current date part with the new incremented number
    newIndentNo = `SI${newNumberPart}`;

    // Update the state with the new incremented value
    setPurchaseItemNo(newIndentNo);
    formData.itemcode = newIndentNo;
  };

  const increase = useMemo(() => {
    incrementPurchaseItemNo();
  }, [indentnumber]);

  return (
    <div>
      <ToastContainer />
      <div className="row border py-3 d-flex ">
        <div className="col-md-4 col-4">
          {/* <Button
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
          </Overlay> */}
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
              onClick={()=>{
                handleShow()
                getLastPurchaseItemNo()
              }}
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
                  Item Code
                </th>
                <th scope="col" className="text-center ">
                  Item Name
                </th>
                <th scope="col" className="text-center">
                  Unit
                </th>
                <th scope="col" className="text-center ">
                  HSN Code
                </th>
                {/* <th scope="col" className="text-center ">
           GST
                </th> */}
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
                        <td className="text-center">{item.itemcode}</td>
                        <td className="text-center">{item.itemname}</td>
                        <td className="text-center">{item.unit}</td>
                        <td className="text-center">{item.hsncode}</td>
                        {/* <td className="text-center">{item.gst}</td> */}

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
                              navigate("/dashboard/items/viewSalesItem", {
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
            <div className="row mt-2 g-3 align-items-center ">
              <div className="col-md-6 d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    Item Name
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="itemname"
                    className="form-control textInput"
                    required
                    onChange={handleChange}
                    value={formData.itemname}
                  />
                </div>
              </div>

              <div className="col-md-6  d-flex">
                <div className="col-md-3 offset-1 ">
                  <label for="inputText" className="col-form-label label">
                    Unit
                  </label>
                </div>
                <div className="col-md-8">
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
            </div>

            <div className="row mt-2 g-3 align-items-center ">
              <div className="col-md-6 d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    Item Code
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="code"
                    className="form-control textInput"
                    required
                    value={purchaseitemno}
                  />
                </div>
              </div>

              <div className="col-md-6  d-flex">
                <div className="col-md-3 offset-1 ">
                  <label for="inputText" className="col-form-label label">
                    HSN Code
                  </label>
                </div>
                <div className="col-md-8">
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
            </div>

            <div className="row mt-2 g-3 align-items-center ">
              <div className="col-md-6 d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    SGST in %
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="gst"
                    className="form-control textInput"
                    onChange={handleChange}
                    value={formData.sgst}
                  />
                </div>
              </div>

              <div className="col-md-6  d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    CGST in %
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="cgst"
                    className="form-control textInput"
                    onChange={handleChange}
                    value={formData.cgst}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center ">
              <div className="col-md-6 d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    IGST in %
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="igst"
                    className="form-control textInput"
                    onChange={handleChange}
                    value={formData.igst}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-1 col-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  // onClick={() => updateItem(selecteItem._id)}
                  onClick={saveItem}
                >
                  Save
                </button>
              </div>
              <div className="col-md-1 col-2 mx-3">
                <button
                  type="button"
                  class="btn btn-outline-info"
                  onClick={handleClose}
                >
                  Cancel
                </button>
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
          <form class="row g-3 needs-validation" novalidate>
            <div className="row mt-2 g-3 align-items-center ">
              <div className="col-md-6 d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    Item Name
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="itemname"
                    className="form-control textInput"
                    onChange={(e) => setItemName(e.target.value)}
                    value={itemname}
                    placeholder={selecteItem?.itemname}
                  />
                </div>
              </div>

              <div className="col-md-6  d-flex">
                <div className="col-md-3 offset-1 ">
                  <label for="inputText" className="col-form-label label">
                    Unit
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="unit"
                    className="form-control textInput"
                    onChange={(e) => setUnit(e.target.value)}
                    value={unit}
                    placeholder={selecteItem?.unit}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center ">
              <div className="col-md-6 d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    Item Code
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="itemcode"
                    className="form-control textInput"
                    onChange={(e) => setItemCode(e.target.value)}
                    value={itemcode}
                    placeholder={selecteItem?.itemcode}
                  />
                </div>
              </div>

              <div className="col-md-6  d-flex">
                <div className="col-md-3 offset-1 ">
                  <label for="inputText" className="col-form-label label">
                    HSN Code
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="hsncode"
                    className="form-control textInput"
                    onChange={(e) => setHsnCode(e.target.value)}
                    value={hsncode}
                    placeholder={selecteItem?.hsncode}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center ">
              <div className="col-md-6 d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    SGST in %
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="gst"
                    className="form-control textInput"
                    onChange={(e) => setSgst(e.target.value)}
                    value={sgst}
                    placeholder={selecteItem?.sgst}
                  />
                </div>
              </div>

              <div className="col-md-6  d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    CGST in %
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="cgst"
                    className="form-control textInput"
                    onChange={(e) => setCgst(e.target.value)}
                    value={cgst}
                    placeholder={selecteItem?.cgst}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center ">
              <div className="col-md-6 d-flex">
                <div className="col-md-4">
                  <label for="inputText" className="col-form-label label">
                    IGST in %
                  </label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="inputText"
                    name="igst"
                    className="form-control textInput"
                    onChange={(e) => setIgst(e.target.value)}
                    value={igst}
                    placeholder={selecteItem?.igst}
                  />
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
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* off-canvas End ------------------ */}
    </div>
  );
}

export default PurchaseItem;
