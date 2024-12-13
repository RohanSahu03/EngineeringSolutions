import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../../css/dashboard/items.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdDeleteForever } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";

function Indent() {
  const [show, setShow] = useState(false);
  const [product, setProducts] = useState([]);
  const [selecteItem, setSelectedItem] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [vendordata, setVendordata] = useState([]);

  const handleClose = () => setShow(false);
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

  const [formData, setFormData] = useState({
    slno: "",
    date: startDate,
    material: "",
    unit: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [slno, setSlno] = useState("");
  const [startDate1, setStartDate1] = useState(new Date());
  const [unit, setUnit] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState("");

  // let formdata = new FormData();

  const saveProduct = async (e) => {
    e.preventDefault();

    if (!formData.slno) {
      return toast.warning("Please enter Sl.No.");
    }
    if (!formData.date) {
      return toast.warning("Plese select date");
    }
    if (!formData.material) {
      return toast.warning("Please enter material name");
    }
    if (!formData.unit) {
      return toast.warning("Please enter Unit");
    }
    if (!formData.quantity) {
      return toast.warning("Please enter Quantity");
    }
    if (!formData.description) {
      return toast.warning("Please enter description");
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
        handleClose2();
      }
    } catch (error) {
      failureMsg();
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const res = await axios.get(
        "https://engineeringsolutions.net.in/api/products/getproduct"
      );
      if (res.status === 201) {
        setProducts(res.data);
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
        `https://engineeringsolutions.net.in/api/products/deleteproduct/${id}`
      );
      if (res.status === 200) {
        getAllItems();
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
          slno: slno,
          date: startDate1,
          material: material,
          unit: unit,
          quantity: quantity,
          description: description,
        },
      };

      const res = await axios(config);
      if (res.status === 200) {
        toast("product updated successfully...");
        getAllItems();
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

  return (
    <div>
      <ToastContainer />
      <div className="row border py-3 d-flex ">
        <div className="col-md-6 col-6">
          <Button
            variant="transparent"
            className="float-start"
            ref={target1}
            onClick={() => setShow1(!show1)}
          >
            All Items <TiArrowSortedDown />
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
                  <li class="list-group-item list-group-item-action">Active</li>
                  <li class="list-group-item list-group-item-action">
                    Inactive
                  </li>
                  <li class="list-group-item list-group-item-action">Sales</li>
                  <li class="list-group-item list-group-item-action">
                    Purchase
                  </li>
                </ul>
              </div>
            )}
          </Overlay>
        </div>

        <div className="col-md-6 col-6 d-flex justify-content-end">
          {/* < BsThreeDotsVertical className='menuDot'/> */}
          <div className="buttons">
            <button
              type="button"
              className="btn btn-primary d-inline"
              onClick={handleShow}
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
                <Dropdown.Item>Name</Dropdown.Item>
                <Dropdown.Item>Rate</Dropdown.Item>
                <Dropdown.Item>Purchase Rate</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="row overflow-auto">
        <div className="col-md-12">
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Purchase Description</th>
                <th scope="col">Rate</th>
                <th scope="col">Purchase Rate</th>
                <th scope="col">Usage unit</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            {product.length !== 0 ? (
              <tbody>
                {product.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.firstname}</td>
                      <td>{item.salesdescription}</td>
                      <td>{item.purchasedescription}</td>
                      <td>{item.sellingprice}</td>
                      <td>{item.purchasecostprice}</td>
                      <td>{item.unit}</td>
                      <td>
                        <FaEdit
                          onClick={() => {
                            openOffcanvas();
                            setSelectedItem(item);
                          }}
                        />
                      </td>
                      <td>
                        <MdDeleteForever onClick={() => deleteItem(item._id)} />
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
            </div>

            <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
              <div className="col-md-2 text-start">
                <label for="inputText" className="col-form-label label">
                  Date*
                </label>
              </div>
              <div className="col-md-5  text-start">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="textInput"
                  style={{ outline: "none" }}
                  required
                />
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Material
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="material"
                  className="form-control textInput"
                  required
                  onChange={handleChange}
                  value={formData.material}
                />
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
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
                  Description
                </label>
              </div>
              <div className="col-md-5 ">
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
                  <button type="button" class="btn btn-outline-info">
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
                  name="firstname"
                  className="form-control textInput"
                  required
                  onChange={(e) => setSlno(e.target.value)}
                  value={slno}
                  placeHolder={selecteItem?.slno}
                />
              </div>
            </div>

            <div className="row mt-md-2 mt-1 g-md-3 g-1 align-items-center">
              <div className="col-md-2 text-start">
                <label for="inputText" className="col-form-label label">
                  Date*
                </label>
              </div>
              <div className="col-md-5  text-start">
                <DatePicker
                  selected={startDate1}
                  onChange={(date) => setStartDate1(date)}
                  className="textInput"
                  style={{ outline: "none" }}
                  placeHolder={selecteItem?.date}
                />
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Material
                </label>
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  id="inputText"
                  name="material"
                  className="form-control textInput"
                  required
                  onChange={(e) => setMaterial(e.target.value)}
                  value={material}
                  placeHolder={selecteItem?.material}
                />
              </div>
            </div>

            <div className="row mt-2 g-3 align-items-center">
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
                  onChange={(e) => setUnit(e.target.value)}
                  value={unit}
                  placeHolder={selecteItem?.unit}
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
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  placeHolder={selecteItem?.quantity}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-2">
                <label for="inputText" className="col-form-label label">
                  Description
                </label>
              </div>
              <div className="col-md-5 ">
                <input
                  type="text"
                  id="inputText"
                  className="form-control textInput"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeHolder={selecteItem?.description}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="row mt-5">
                <div className="col-md-1 col-2 mx-3">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={updateItem}
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
        </Offcanvas.Body>
      </Offcanvas>

      {/* off-canvas End ------------------ */}
    </div>
  );
}

export default Indent;
