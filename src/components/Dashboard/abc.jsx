import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { AiFillDelete, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

function AccrediationAndAssessment() {
  let naacMainAdmin = JSON.parse(sessionStorage.getItem("Admin"));

  const [imageURL1, setimageURL1] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setimageURL1(URL.createObjectURL(event.target.files[0]));
      console.log("ghghg", URL.createObjectURL(event.target.files[0]));
    }
  };

  const [imageURL2, setimageURL2] = useState(null);

  const onImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setimageURL2(URL.createObjectURL(event.target.files[0]));
      console.log("ghghg", URL.createObjectURL(event.target.files[0]));
    }
  };

  // ================ add campus details modal===============================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ================ delete campus details modal===============================
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // ================ edit campus details modal===============================
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // ================ Show modal===============================
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  // ================ accrediation body Show modal===============================
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  // ================ eligibility criteria Show modal===============================
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  // ================ unit of assessment Show modal===============================
  const [show6, setShow6] = useState(false);
  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  // ================ criteria and weightage Show modal===============================
  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  // ================ Grading Show modal===============================
  const [show8, setShow8] = useState(false);
  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  // ================ Grievance Redressal Show modal===============================
  const [show9, setShow9] = useState(false);
  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);

  // ================ Re-Assessment Show modal===============================
  const [show10, setShow10] = useState(false);
  const handleClose10 = () => setShow10(false);
  const handleShow10 = () => setShow10(true);

  // ================ Cycle of Accrediation Show modal===============================
  const [show11, setShow11] = useState(false);
  const handleClose11 = () => setShow11(false);
  const handleShow11 = () => setShow11(true);

  // ================ Assessment Outcome Details Show modal===============================
  const [show12, setShow12] = useState(false);
  const handleClose12 = () => setShow12(false);
  const handleShow12 = () => setShow12(true);

  // ================ Assessment Outcome Note Show modal===============================
  const [show13, setShow13] = useState(false);
  const handleClose13 = () => setShow13(false);
  const handleShow13 = () => setShow13(true);

  const [img, setimg] = useState("");
  const [body, setbody] = useState("");
  const [accredImg, setaccredImg] = useState("");
  const [accredTopic, setaccredTopic] = useState("");
  const [accredbody, setaccredbody] = useState("");
  const [elegibleCriMainBody, setelegibleCriMainBody] = useState("");
  const [unitOfAssessment, setunitOfAssessment] = useState("");
  const [processData, setprocessData] = useState("");
  const [processLink, setprocessLink] = useState("");
  const [criteriaAndWeightagesBody, setcriteriaAndWeightagesBody] =
    useState("");
  const [criteriaWeightagesDescription, setcriteriaWeightagesDescription] =
    useState([]);
  const [criWeiTopic, setcriWeiTopic] = useState("");
  const [section1, setsection1] = useState("");
  const [section2, setsection2] = useState("");
  const [section3, setsection3] = useState("");
  const [section4, setsection4] = useState("");
  const [grading, setgrading] = useState("");
  const [grievanceRedressal, setgrievanceRedressal] = useState("");
  const [reAssessment, setreAssessment] = useState("");
  const [cyclesOfAccred, setcyclesOfAccred] = useState("");
  const [assessmentOutcomeBody, setassessmentOutcomeBody] = useState("");
  const [assessmentOutcomeNote, setassessmentOutcomeNote] = useState("");

  const [CGPA, setCGPA] = useState("");
  const [letterGrade, setletterGrade] = useState("");
  const [status, setstatus] = useState("");
  const [assessmentOutcomeTable, setassessmentOutcomeTable] = useState([]);
  const [Showitem, setShowitem] = useState({});

  const [View, setView] = useState({});

  //   =============================set main body=======================
  const handleMainBody = (e, editor) => {
    const data = editor.getData();
    setbody(data);
  };

  //   =============================set accred body=======================
  const handleAccredBody = (e, editor) => {
    const data = editor.getData();
    setaccredbody(data);
  };

  //   =============================set elegible criteria body=======================
  const handleElegibleCriBody = (e, editor) => {
    const data = editor.getData();
    setelegibleCriMainBody(data);
  };

  //   =============================set unit assessment body=======================
  const handleUnitAssessment = (e, editor) => {
    const data = editor.getData();
    setunitOfAssessment(data);
  };

  //   =============================set criteria and weightages body=======================
  const handleCriteriaWeightage = (e, editor) => {
    const data = editor.getData();
    setcriteriaAndWeightagesBody(data);
  };

  //   =============================set grading body=======================
  const handleGrading = (e, editor) => {
    const data = editor.getData();
    setgrading(data);
  };

  //   =============================set Grievance Redressal=======================
  const handlegrievanceRedressal = (e, editor) => {
    const data = editor.getData();
    setgrievanceRedressal(data);
  };

  //   =============================set Re Assessment=======================
  const handlereAssessment = (e, editor) => {
    const data = editor.getData();
    setreAssessment(data);
  };
  //   =============================set Cycle of Accrediation=======================
  const handlecyclesOfAccred = (e, editor) => {
    const data = editor.getData();
    setcyclesOfAccred(data);
  };

  //   =============================set Assessment outcome main body=======================
  const handleAssessmentOutcome = (e, editor) => {
    const data = editor.getData();
    setassessmentOutcomeBody(data);
  };

  //   =============================set Assessment outcome Note=======================
  const handleAssessmentOutcomeNote = (e, editor) => {
    const data = editor.getData();
    setassessmentOutcomeNote(data);
  };

  function addLinks() {
    try {
      if (!criWeiTopic || !section1 || !section2 || !section3 || !section4) {
        return alert("please add link name and their respective link.");
      }

      setcriteriaWeightagesDescription((curr) => [
        ...curr,
        {
          criWeiTopic: criWeiTopic,
          section1: section1,
          section2: section2,
          section3: section3,
          section4: section4,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  function addAssessmentOutcomeEntry() {
    try {
      if (!CGPA || !letterGrade || !status) {
        return alert("please add All the fields of assessment outcome table.");
      }

      setassessmentOutcomeTable((curr) => [
        ...curr,
        {
          CGPA: CGPA,
          letterGrade: letterGrade,
          status: status,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  // =================Add Accrediation and Assessment===========================
  const AddAccredContent = async (e) => {
    if (
      !img ||
      !body ||
      !accredImg ||
      !accredTopic ||
      !accredbody ||
      !elegibleCriMainBody ||
      !unitOfAssessment ||
      !processData ||
      !processLink ||
      !criteriaAndWeightagesBody ||
      !criteriaWeightagesDescription ||
      !grading ||
      !grievanceRedressal ||
      !reAssessment ||
      !cyclesOfAccred ||
      !assessmentOutcomeBody ||
      !assessmentOutcomeTable ||
      !assessmentOutcomeNote
    ) {
      return alert("Please fill all the fields");
    }
    e.preventDefault();
    let obj = {
      img: img,
      body: body,
      accredImg: accredImg,
      accredTopic: accredTopic,
      accredbody: accredbody,
      elegibleCriMainBody: elegibleCriMainBody,
      unitOfAssessment: unitOfAssessment,
      processData: processData,
      processLink: processLink,
      criteriaAndWeightagesBody: criteriaAndWeightagesBody,
      criteriaWeightagesDescription: criteriaWeightagesDescription,
      grading: grading,
      grievanceRedressal: grievanceRedressal,
      reAssessment: reAssessment,
      cyclesOfAccred: cyclesOfAccred,
      assessmentOutcomeBody: assessmentOutcomeBody,
      assessmentOutcomeTable: assessmentOutcomeTable,
      assessmentOutcomeNote: assessmentOutcomeNote,
    };

    try {
      const config = {
        url: "/admin/addaccredAndAssessment",
        method: "post",
        baseURL: "https://brightnaac.co.in/api",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: obj,
      };
      await axios(config).then((res) => {
        if (res.status === 201) {
          alert("Added Successfully");
          getAccredAssessmentContent();
          setimg("");
          setbody("");
          setaccredImg("");
          setaccredTopic("");
          setaccredbody("");
          setelegibleCriMainBody("");
          setunitOfAssessment("");
          setprocessData("");
          setprocessLink("");
          setcriteriaAndWeightagesBody("");
          setcriteriaWeightagesDescription([]);
          setgrading("");
          setgrievanceRedressal("");
          setreAssessment("");
          setcyclesOfAccred("");
          setassessmentOutcomeBody("");
          setCGPA("");
          setletterGrade("");
          setstatus("");
          setassessmentOutcomeTable([]);
          setassessmentOutcomeNote("");
          handleClose();
        }
      });
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  // =================== calling api for getting the Accrediation content======================
  const [AccredAssessmentDetails, setAccredAssessmentDetails] = useState([]);
  const getAccredAssessmentContent = async () => {
    try {
      let res = await axios.get(
        "https://brightnaac.co.in/api/admin/getaccredAndAssessmentDetails"
      );
      if (res.status === 200) {
        setAccredAssessmentDetails(res.data.allContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =================== calling api for getting the specific campus content======================
  const getContentById = async (id) => {
    try {
      let res = await axios.get(
        "https://brightnaac.co.in/api/admin/getaccredAndAssessmentById/" + id
      );
      if (res.status === 200) {
        setView(res.data.Content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =================== calling api for deleting the Leadership content======================
  const deleteContent = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/admin/deleteaccredAndAssessment/" + View?._id,
        method: "delete",
        baseURL: "https://brightnaac.co.in/api",
        headers: { "content-type": "application/json" },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert(res.data.success);
          getAccredAssessmentContent();
          handleClose1();
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
      handleClose1();
    }
  };

  // =================== calling api for editing the Leadership content======================
  const editContent = async (e) => {
    e.preventDefault();
    if (
      !img &&
      !body &&
      !accredImg &&
      !accredTopic &&
      !accredbody &&
      !elegibleCriMainBody &&
      !unitOfAssessment &&
      !processData &&
      !processLink &&
      !criteriaAndWeightagesBody &&
      !criteriaWeightagesDescription &&
      !grading &&
      !grievanceRedressal &&
      !reAssessment &&
      !cyclesOfAccred &&
      !assessmentOutcomeBody &&
      !assessmentOutcomeTable &&
      !assessmentOutcomeNote
    ) {
      return alert("Please provide atleast one field");
    }
    let obj = {
      img: img,
      body: body,
      accredImg: accredImg,
      accredTopic: accredTopic,
      accredbody: accredbody,
      elegibleCriMainBody: elegibleCriMainBody,
      unitOfAssessment: unitOfAssessment,
      processData: processData,
      processLink: processLink,
      criteriaAndWeightagesBody: criteriaAndWeightagesBody,
      grading: grading,
      grievanceRedressal: grievanceRedressal,
      reAssessment: reAssessment,
      cyclesOfAccred: cyclesOfAccred,
      assessmentOutcomeBody: assessmentOutcomeBody,
      assessmentOutcomeNote: assessmentOutcomeNote,
    };

    try {
      const config = {
        url: "/admin/editaccredAndAssessment/" + View?._id,
        method: "put",
        baseURL: "https://brightnaac.co.in/api",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: obj,
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert(res.data.success);
          getAccredAssessmentContent();
          setimg("");
          setbody("");
          setaccredImg("");
          setaccredTopic("");
          setaccredbody("");
          setelegibleCriMainBody("");
          setunitOfAssessment("");
          setprocessData("");
          setprocessLink("");
          setcriteriaAndWeightagesBody("");
          setcriteriaWeightagesDescription([]);
          setgrading("");
          setgrievanceRedressal("");
          setreAssessment("");
          setcyclesOfAccred("");
          setassessmentOutcomeBody("");
          setCGPA("");
          setletterGrade("");
          setstatus("");
          setassessmentOutcomeTable([]);
          setassessmentOutcomeNote("");
          handleClose2();
        }
      });
    } catch (error) {
      console.log(error);
      handleClose2();
    }
  };

  // ======================calling api for editing=================
  const EditCriteriaWeightageDetails = async (e, state, id) => {
    e.preventDefault();
    try {
      const config = {
        url: "/admin/editCritWeiContent/" + View?._id,
        method: "put",
        baseURL: "https://brightnaac.co.in/api",
        headers: {
          "content-type": "application/json",
        },
        data: {
          criWeightageid: id,
          criWeiTopic: criWeiTopic,
          section1: section1,
          section2: section2,
          section3: section3,
          section4: section4,
          state: state,
        },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert(res.data.success);
          getContentById(View?._id);
          setcriWeiTopic("");
          setsection1("");
          setsection2("");
          setsection3("");
          setsection4("");
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  // ======================calling api for editing=================
  const EditAssessmentOutcomeDetails = async (e, state, id) => {
    e.preventDefault();
    try {
      const config = {
        url: "/admin/editAssessOutcomeContent/" + View?._id,
        method: "put",
        baseURL: "https://brightnaac.co.in/api",
        headers: {
          "content-type": "application/json",
        },
        data: {
          accessOutid: id,
          CGPA: CGPA,
          letterGrade: letterGrade,
          status: status,
          state: state,
        },
      };
      await axios(config).then((res) => {
        if (res.status === 200) {
          alert(res.data.success);
          getContentById(View?._id);
          setCGPA("");
          setletterGrade("");
          setstatus("");
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    naacMainAdmin = JSON.parse(sessionStorage.getItem("Admin"));
    if (!naacMainAdmin) {
      alert("Please login first!!!");
      window.location.assign("/admin");
    }
    getAccredAssessmentContent();
  }, []);
  return (
    <>
      <div className="conrainer-fluid">
        <div className="row m-0 align-items-center justify-content-center pt-5">
          <div className="header-01 col-lg-6">
            <span className="" style={{ fontSize: "19px", fontWeight: "bold" }}>
              {" "}
              Assessment & Accreditation
            </span>
          </div>
          <div className="header-02 col-lg-6 text-end">
            <Button onClick={handleShow}>Add</Button>
          </div>
        </div>
        <br />
        <div className="row m-0 pt-4">
          <Table responsive bordered>
            <thead>
              <tr
                style={{
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "#161632",
                  lineHeight: "30px",
                }}
              >
                <th>Sl.No</th>
                <th>Image</th>
                <th>Main Body</th>
                <th>Accrediation Image</th>
                <th>Accrediation Topic</th>
                <th>Accrediation Body</th>
                <th>Eligibility Criteria</th>
                <th>Unit of Assessment</th>
                <th>Process Data</th>
                <th>Process Link</th>
                <th>Criteria And Weightages</th>
                <th>Criteria And Weightages Description</th>
                <th>Grading</th>
                <th>Grievance Redressal</th>
                <th>Re-Assessment</th>
                <th>Cycle of Accrediation</th>
                <th>Assessment Outcome Details</th>
                <th>Assessment Outcome</th>
                <th>Assessment Outcome Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {AccredAssessmentDetails?.map((item, i) => {
                return (
                  <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <td> {++i} </td>
                    <td>
                      <img
                        style={{ width: "100%" }}
                        src={`https://brightnaac.co.in/AccrediationAndAssessment/${item?.img}`}
                        alt="no-image"
                      />
                    </td>
                    <td>
                      {parse(`<div>${item?.body?.slice(0, 40)}</div>`)}
                      <Link
                        onClick={() => {
                          handleShow3();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      <img
                        style={{ width: "100%" }}
                        src={`https://brightnaac.co.in/AccrediationAndAssessment/${item?.accredImg}`}
                        alt="no-image"
                      />
                    </td>
                    <td>{item?.accredTopic}</td>
                    <td>
                      {parse(`<div>${item?.accredbody?.slice(0, 70)}</div>`)}
                      <Link
                        onClick={() => {
                          handleShow4();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      {parse(
                        `<div>${item?.elegibleCriMainBody?.slice(0, 70)}</div>`
                      )}
                      <Link
                        onClick={() => {
                          handleShow5();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      {parse(
                        `<div>${item?.unitOfAssessment?.slice(0, 70)}</div>`
                      )}
                      <Link
                        onClick={() => {
                          handleShow6();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>{item?.processData}</td>
                    <td>{item?.processLink}</td>
                    <td>
                      {parse(
                        `<div>${item?.criteriaAndWeightagesBody?.slice(
                          0,
                          70
                        )}</div>`
                      )}
                      <Link
                        onClick={() => {
                          handleShow7();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      <Table responsive>
                        <tbody>
                          {item?.criteriaWeightagesDescription?.map((item1) => {
                            return (
                              <tr>
                                <td>{item1?.criWeiTopic}</td>
                                <td>{item1?.section1}</td>
                                <td>{item1?.section2}</td>
                                <td>{item1?.section3}</td>
                                <td>{item1?.section4}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </td>
                    <td>
                      {parse(`<div>${item?.grading?.slice(0, 70)}</div>`)}
                      <Link
                        onClick={() => {
                          handleShow8();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      {parse(
                        `<div>${item?.grievanceRedressal?.slice(0, 70)}</div>`
                      )}
                      <Link
                        onClick={() => {
                          handleShow9();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      {parse(`<div>${item?.reAssessment?.slice(0, 70)}</div>`)}
                      <Link
                        onClick={() => {
                          handleShow10();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      {parse(
                        `<div>${item?.cyclesOfAccred?.slice(0, 70)}</div>`
                      )}
                      <Link
                        onClick={() => {
                          handleShow11();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      {parse(
                        `<div>${item?.assessmentOutcomeBody?.slice(
                          0,
                          70
                        )}</div>`
                      )}
                      <Link
                        onClick={() => {
                          handleShow12();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      <Table responsive>
                        <thead>
                          <th>CGPA</th>
                          <th>Letter Grade</th>
                          <th>Status</th>
                        </thead>
                        <tbody>
                          {item?.assessmentOutcomeTable?.map((item1) => {
                            return (
                              <tr>
                                <td>{item1?.CGPA}</td>
                                <td>{item1?.letterGrade}</td>
                                <td>{item1?.status}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </td>
                    <td>
                      {parse(
                        `<div>${item?.assessmentOutcomeNote?.slice(
                          0,
                          70
                        )}</div>`
                      )}
                      <Link
                        onClick={() => {
                          handleShow13();
                          setShowitem(item);
                        }}
                      >
                        Read More...
                      </Link>
                    </td>
                    <td>
                      <div className="d-flex align-items-center justify-content-evenly">
                        <div className="">
                          <span>
                            <BiEdit
                              size={20}
                              style={{
                                cursor: "pointer",
                                color: "blue",
                                margin: "10px",
                              }}
                              onClick={() => {
                                setView(item);
                                getContentById(item?._id);
                                handleShow2();
                              }}
                            />
                          </span>
                        </div>
                        <div className="">
                          <span
                            onClick={() => {
                              setView(item);
                              getContentById(item?._id);
                              handleShow1();
                            }}
                            style={{
                              cursor: "pointer",
                              color: "red",
                              margin: "10px",
                            }}
                          >
                            <AiFillDelete size={20} />
                          </span>
                        </div>
                      </div>
                    </td>{" "}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        {/* edit about us details modal */}
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Edit </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-1">
              <label>Image1</label>
              <div className="">
                <input
                  type="file"
                  id="Eupload1"
                  name="ImageStyle"
                  className="vi_0"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    onImageChange(e);
                    setimg(e.target.files[0]);
                  }}
                />
                <label for="Eupload1">
                  {img ? (
                    <img
                      src={imageURL1}
                      alt="no-image"
                      style={{ width: "30%" }}
                    />
                  ) : (
                    <img
                      src={`https://brightnaac.co.in/AccrediationAndAssessment/${View?.img}`}
                      alt="no-image"
                      style={{ width: "30%" }}
                    />
                  )}
                </label>
              </div>
            </div>
            <div className="mb-1">
              <label>Main Body</label>
              <div className="">
                <div className="">
                  <CKEditor
                    editor={ClassicEditor}
                    data={View?.body}
                    onChange={handleMainBody}
                  />
                </div>
              </div>
            </div>
            <div className="mb-1">
              <label>Accrediation Image</label>
              <div className="">
                <input
                  type="file"
                  id="Eupload2"
                  name="ImageStyle"
                  className="vi_0"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    onImageChange2(e);
                    setaccredImg(e.target.files[0]);
                  }}
                />
                <label for="Eupload2">
                  {accredImg ? (
                    <img
                      src={imageURL2}
                      alt="no-image"
                      style={{ width: "30%" }}
                    />
                  ) : (
                    <img
                      src={`https://brightnaac.co.in/AccrediationAndAssessment/${View?.accredImg}`}
                      alt="no-image"
                      style={{ width: "30%" }}
                    />
                  )}
                </label>
              </div>
            </div>

            <div className="mb-1">
              <label>Accrediation Topic</label>
              <div className="">
                <input
                  type="text"
                  id="file-input"
                  name="ImageStyle"
                  className="vi_0"
                  placeholder={View?.accredTopic}
                  onChange={(e) => setaccredTopic(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Accrediation Body</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.accredbody}
                  onChange={handleAccredBody}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Elegibility Criteria</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.elegibleCriMainBody}
                  onChange={handleElegibleCriBody}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Unit of Assessment</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.unitOfAssessment}
                  onChange={handleUnitAssessment}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Process Data</label>
              <div className="">
                <input
                  type="text"
                  id="file-input"
                  name="ImageStyle"
                  className="vi_0"
                  placeholder={View?.processData}
                  onChange={(e) => setprocessData(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Process Link</label>
              <div className="">
                <input
                  type="text"
                  id="file-input"
                  name="ImageStyle"
                  className="vi_0"
                  placeholder={View?.processLink}
                  onChange={(e) => setprocessLink(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Criteria & Weightages</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.criteriaAndWeightagesBody}
                  onChange={handleCriteriaWeightage}
                />
              </div>
            </div>

            <div className="mb-1">
              <label>Criteria Weightage</label>
              <Table>
                <tbody>
                  {View?.criteriaWeightagesDescription?.map((val1) => {
                    return (
                      <tr>
                        <td>
                          <div className="">
                            <input
                              type="text"
                              id="file-input"
                              name="ImageStyle"
                              className="vi_0"
                              placeholder={val1?.criWeiTopic}
                              onChange={(e) => setcriWeiTopic(e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <input
                              type="text"
                              id="file-input"
                              name="ImageStyle"
                              className="vi_0"
                              placeholder={val1?.section1}
                              onChange={(e) => setsection1(e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <input
                              type="text"
                              id="file-input"
                              name="ImageStyle"
                              className="vi_0"
                              placeholder={val1?.section2}
                              onChange={(e) => setsection2(e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <input
                              type="text"
                              id="file-input"
                              name="ImageStyle"
                              className="vi_0"
                              placeholder={val1?.section3}
                              onChange={(e) => setsection3(e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <input
                              type="text"
                              id="file-input"
                              name="ImageStyle"
                              className="vi_0"
                              placeholder={val1?.section4}
                              onChange={(e) => setsection4(e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <div
                            className="d-flex"
                            style={{ alignItems: "end", gap: "5px" }}
                          >
                            <AiOutlineSave
                              onClick={(e) => {
                                EditCriteriaWeightageDetails(
                                  e,
                                  "EDIT",
                                  val1?._id
                                );
                              }}
                            />{" "}
                            <AiOutlineDelete
                              onClick={(e) => {
                                EditCriteriaWeightageDetails(
                                  e,
                                  "DELETE",
                                  val1?._id
                                );
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div>
              <label>Add Criteria Weightage</label>
              <div className="d-flex" style={{ alignItems: "end", gap: "5px" }}>
                <div>
                  <label>Topic</label>
                  <div className="">
                    <input
                      type="text"
                      id="file-input"
                      name="ImageStyle"
                      className="vi_0"
                      onChange={(e) => setcriWeiTopic(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>Sec-1</label>
                  <div className="">
                    <input
                      type="text"
                      id="file-input"
                      name="ImageStyle"
                      className="vi_0"
                      onChange={(e) => setsection1(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>Sec-2</label>
                  <div className="">
                    <input
                      type="text"
                      id="file-input"
                      name="ImageStyle"
                      className="vi_0"
                      onChange={(e) => setsection2(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>Sec-3</label>
                  <div className="">
                    <input
                      type="text"
                      id="file-input"
                      name="ImageStyle"
                      className="vi_0"
                      onChange={(e) => setsection3(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>Sec-4</label>
                  <div className="">
                    <input
                      type="text"
                      id="file-input"
                      name="ImageStyle"
                      className="vi_0"
                      onChange={(e) => setsection4(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    onClick={(e) => {
                      EditCriteriaWeightageDetails(e, "ADD");
                    }}
                  >
                    ADD
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-1">
              <label>Grading</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.grading}
                  onChange={handleGrading}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Grievance Redressal</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.grievanceRedressal}
                  onChange={handlegrievanceRedressal}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Re-Assessment</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.reAssessment}
                  onChange={handlereAssessment}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Cycle of Accrediation</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.cyclesOfAccred}
                  onChange={handlecyclesOfAccred}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Assessment Outcome Body</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.assessmentOutcomeBody}
                  onChange={handleAssessmentOutcome}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Assessment Outcome</label>
              <Table>
                <tbody>
                  {View?.assessmentOutcomeTable?.map((val1) => {
                    return (
                      <tr>
                        <td>
                          <div className="">
                            <input
                              type="text"
                              id="file-input"
                              name="ImageStyle"
                              className="vi_0"
                              placeholder={val1?.CGPA}
                              onChange={(e) => setCGPA(e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <input
                              type="text"
                              id="file-input"
                              name="ImageStyle"
                              className="vi_0"
                              placeholder={val1?.letterGrade}
                              onChange={(e) => setletterGrade(e.target.value)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <input
                              type="text"
                              id="file-input"
                              name="ImageStyle"
                              className="vi_0"
                              placeholder={val1?.status}
                              onChange={(e) => setstatus(e.target.value)}
                            />
                          </div>
                        </td>

                        <td>
                          <div
                            className="d-flex"
                            style={{ alignItems: "end", gap: "5px" }}
                          >
                            <AiOutlineSave
                              onClick={(e) => {
                                EditAssessmentOutcomeDetails(
                                  e,
                                  "EDIT",
                                  val1?._id
                                );
                              }}
                            />{" "}
                            <AiOutlineDelete
                              onClick={(e) => {
                                EditAssessmentOutcomeDetails(
                                  e,
                                  "DELETE",
                                  val1?._id
                                );
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div>
              <label>Add Assessment Outcome</label>
              <div className="d-flex" style={{ alignItems: "end", gap: "5px" }}>
                <div>
                  <label>CGPA</label>
                  <div className="">
                    <input
                      type="text"
                      id="file-input"
                      name="ImageStyle"
                      className="vi_0"
                      onChange={(e) => setCGPA(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>Letter Grade</label>
                  <div className="">
                    <input
                      type="text"
                      id="file-input"
                      name="ImageStyle"
                      className="vi_0"
                      onChange={(e) => setletterGrade(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>Status</label>
                  <div className="">
                    <input
                      type="text"
                      id="file-input"
                      name="ImageStyle"
                      className="vi_0"
                      onChange={(e) => setstatus(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    onClick={(e) => {
                      EditAssessmentOutcomeDetails(e, "ADD");
                    }}
                  >
                    ADD
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-1">
              <label>Assessment Outcome Note</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={View?.assessmentOutcomeNote}
                  onChange={handleAssessmentOutcomeNote}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => editContent(e)}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* add Accrediation and Assessment details modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Accrediation & Assessment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-1">
              <label htmlFor="upload1">
                Upload Main Image <span className="font-css top">*</span>
              </label>
              <div className="">
                <input
                  type="file"
                  id="file-input"
                  name="ImageStyle"
                  className="vi_0"
                  accept="image/*"
                  onChange={(e) => setimg(e.target.files[0])}
                />
              </div>
            </div>

            <div className="mb-1">
              <label>
                Main Body<span className="font-css top">*</span>
              </label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={body}
                  onChange={handleMainBody}
                />
              </div>
            </div>

            <div className="mb-1">
              <label htmlFor="upload1">
                Upload Accrediation Image{" "}
                <span className="font-css top">*</span>
              </label>
              <div className="">
                <input
                  type="file"
                  id="file-input"
                  name="ImageStyle"
                  className="vi_0"
                  accept="image/*"
                  onChange={(e) => setaccredImg(e.target.files[0])}
                />
              </div>
            </div>

            <div className="mb-1">
              <label>Accrediation Topic</label>
              <div className="">
                <input
                  type="text"
                  id="file-input"
                  name="ImageStyle"
                  className="vi_0"
                  onChange={(e) => setaccredTopic(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-1">
              <label>Accrediation Body</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={accredbody}
                  onChange={handleAccredBody}
                />
              </div>
            </div>

            <div className="mb-1">
              <label>Elegibility Criteria</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={elegibleCriMainBody}
                  onChange={handleElegibleCriBody}
                />
              </div>
            </div>

            <div className="mb-1">
              <label>Unit of Assessment</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={unitOfAssessment}
                  onChange={handleUnitAssessment}
                />
              </div>
            </div>

            <div className="mb-1">
              <label>Process Data</label>
              <div className="">
                <input
                  type="text"
                  id="file-input"
                  name="ImageStyle"
                  className="vi_0"
                  onChange={(e) => setprocessData(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Process Link</label>
              <div className="">
                <input
                  type="text"
                  id="file-input"
                  name="ImageStyle"
                  className="vi_0"
                  onChange={(e) => setprocessLink(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-1">
              <label>Criteria & Weightages</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={criteriaAndWeightagesBody}
                  onChange={handleCriteriaWeightage}
                />
              </div>
            </div>
            <div className="d-flex" style={{ alignItems: "end", gap: "5px" }}>
              <div>
                <label>Topic</label>
                <div className="">
                  <input
                    type="text"
                    id="file-input"
                    name="ImageStyle"
                    className="vi_0"
                    onChange={(e) => setcriWeiTopic(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>Sec-1</label>
                <div className="">
                  <input
                    type="text"
                    id="file-input"
                    name="ImageStyle"
                    className="vi_0"
                    onChange={(e) => setsection1(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>Sec-2</label>
                <div className="">
                  <input
                    type="text"
                    id="file-input"
                    name="ImageStyle"
                    className="vi_0"
                    onChange={(e) => setsection2(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>Sec-3</label>
                <div className="">
                  <input
                    type="text"
                    id="file-input"
                    name="ImageStyle"
                    className="vi_0"
                    onChange={(e) => setsection3(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>Sec-4</label>
                <div className="">
                  <input
                    type="text"
                    id="file-input"
                    name="ImageStyle"
                    className="vi_0"
                    onChange={(e) => setsection4(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button onClick={addLinks}>ADD</Button>
              </div>
            </div>
            <div>
              {criteriaWeightagesDescription?.map((val) => {
                return (
                  <div className="d-flex" style={{ gap: "10px" }}>
                    <div>{val?.criWeiTopic}</div>
                    <div>{val?.section1}</div>
                    <div>{val?.section2}</div>
                    <div>{val?.section3}</div>
                    <div>{val?.section4}</div>
                  </div>
                );
              })}
            </div>
            <div className="mb-1">
              <label>Grading</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={grading}
                  onChange={handleGrading}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Grievance Redressal</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={grievanceRedressal}
                  onChange={handlegrievanceRedressal}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Re-Assessment</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={reAssessment}
                  onChange={handlereAssessment}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Cycle of Accrediation</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={cyclesOfAccred}
                  onChange={handlecyclesOfAccred}
                />
              </div>
            </div>
            <div className="mb-1">
              <label>Assessment Outcome Body</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={assessmentOutcomeBody}
                  onChange={handleAssessmentOutcome}
                />
              </div>
            </div>

            <div>
              <label>Assessment Outcome</label>
            </div>
            <div className="d-flex" style={{ alignItems: "end", gap: "5px" }}>
              <div>
                <label>CGPA</label>
                <div className="">
                  <input
                    type="text"
                    id="file-input"
                    name="ImageStyle"
                    className="vi_0"
                    onChange={(e) => setCGPA(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>Letter Grade</label>
                <div className="">
                  <input
                    type="text"
                    id="file-input"
                    name="ImageStyle"
                    className="vi_0"
                    onChange={(e) => setletterGrade(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label>Status</label>
                <div className="">
                  <input
                    type="text"
                    id="file-input"
                    name="ImageStyle"
                    className="vi_0"
                    onChange={(e) => setstatus(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button onClick={addAssessmentOutcomeEntry}>ADD</Button>
              </div>
            </div>
            <div>
              {assessmentOutcomeTable?.map((val) => {
                return (
                  <div className="d-flex" style={{ gap: "10px" }}>
                    <div>{val?.CGPA}</div>
                    <div>{val?.letterGrade}</div>
                    {"  "}
                    <div>{val?.status}</div>
                    {"  "}
                  </div>
                );
              })}
            </div>
            <div className="mb-1">
              <label>Assessment Outcome Note</label>
              <div className="">
                <CKEditor
                  editor={ClassicEditor}
                  data={assessmentOutcomeNote}
                  onChange={handleAssessmentOutcomeNote}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => AddAccredContent(e)}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* delete about us details modal */}
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span style={{ color: "#b00b39" }}>Warning..!</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>
              Are you sure..!,{" "}
              <span style={{ color: "#b00b39" }}>
                you want to delete this item....!
              </span>
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <span className="header-03">
              <Button onClick={(e) => deleteContent(e, View?._id)}>
                Delete
              </Button>
            </span>
          </Modal.Footer>
        </Modal>

        {/* Show body modal */}
        <Modal show={show3} onHide={handleClose3}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.body}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose3}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show accrediation body modal */}
        <Modal show={show4} onHide={handleClose4}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.accredbody}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose4}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show Eligibility criteria modal */}
        <Modal show={show5} onHide={handleClose5}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.elegibleCriMainBody}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose5}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show unit of assessment modal */}
        <Modal show={show6} onHide={handleClose6}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.unitOfAssessment}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose6}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show unit of assessment modal */}
        <Modal show={show7} onHide={handleClose7}>
          <Modal.Body>
            <div>
              {parse(`<div>${Showitem?.criteriaAndWeightagesBody}</div>`)}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose7}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show Grading modal */}
        <Modal show={show8} onHide={handleClose8}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.grading}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose8}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show Grievance Redressal modal */}
        <Modal show={show9} onHide={handleClose9}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.grievanceRedressal}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose9}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show Re-Assessment modal */}
        <Modal show={show10} onHide={handleClose10}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.reAssessment}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose10}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show Cycle of Accrediation modal */}
        <Modal show={show11} onHide={handleClose11}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.cyclesOfAccred}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose11}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show Assessment Outcome Details modal */}
        <Modal show={show12} onHide={handleClose12}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.assessmentOutcomeBody}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose12}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show Assessment Outcome Note modal */}
        <Modal show={show13} onHide={handleClose13}>
          <Modal.Body>
            <div>{parse(`<div>${Showitem?.assessmentOutcomeNote}</div>`)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose13}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default AccrediationAndAssessment;
