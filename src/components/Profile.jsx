import React,{useState} from 'react'

import { Link } from "react-router-dom";
import PersonalInfo from './Dashboard/profile/PersonalInfo';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Security from './Dashboard/profile/Security';

function Profile() {
  const [currentPage, setCurrentPage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderPage = () => {

    switch (currentPage) {
      case "/dashboard/profile/personal":
        return <PersonalInfo/>;
      case "/dashboard/items":
        return ;
      case "/dashboard/profile/security":
        return <Security/>;
      case "/dashboard/profile/settings":
        return ;

      default:
        return <PersonalInfo/> ;
    }
  };

  return (
    <div>
        <div className="container-fluid">
        <div className="row">
<div className="col hamburgerColumn " >
<img src="../images/hamburger.png" alt="" srcset=""  onClick={handleShow} />
</div>
          <div className="col-md-2 sidebarColumn  overflow-auto sidebar forBoxSadow" style={{maxHeight:'90vh',backgroundColor:'#2F3645'}}>
        
            <div class="list-group h-100 border d-flex justify-content-start border-0" style={{backgroundColor:'#2F3645'}}>
              <Link
                class="list-group-item list-group-item-action text-start w-100 border-0"
                onClick={() => setCurrentPage("/dashboard/profile/personal")}
                style={{backgroundColor:'#2F3645',color:'white'}}
              >
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/profilelogo.png" alt="" srcset="" />
                </span>
               Profile
              </Link>
              {/* <Link
                class="list-group-item list-group-item-action text-start border-0"
                onClick={() => setCurrentPage("/dashboard/profile/security")}
                style={{backgroundColor:'#2F3645',color:'white'}}
              >
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/shield.png" alt="" srcset="" />
                </span>
            Security
              </Link>

              <Link
                class="list-group-item list-group-item-action text-start border-0"
                onClick={() => setCurrentPage("/dashboard/items")}
                style={{backgroundColor:'#2F3645',color:'white'}}
              >
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/settings.png" alt="" srcset="" />
                </span>
          Settings
              </Link> */}

            </div>
          </div>
          <div className="col-md-10 border min-vh-80 overflow-auto sidebar" style={{maxHeight:'90vh'}}>
            {renderPage()}
          </div>
        </div>
      </div>



      <Offcanvas show={show}   onHide={handleClose} style={{background:'white'}}>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="border">
        <div class="list-group h-100 border d-flex justify-content-evenly border-0" style={{backgroundColor:'#070F2B'}}>
              <Link
                class="list-group-item list-group-item-action text-start w-100 border-0"
                onClick={() => {setCurrentPage("/dashboard/profile/personal");
                  setShow(false)}
                }
                style={{backgroundColor:'#070F2B',color:'white'}}
              >
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/profilelogo.png" alt="" srcset="" />
                </span>
               Profile
              </Link>
              {/* <Link
                class="list-group-item list-group-item-action text-start border-0"
                onClick={() =>{ setCurrentPage("/dashboard/profile/security");
                  setShow(false)}}
                
                style={{backgroundColor:'#070F2B',color:'white'}}
              >
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/shield.png" alt="" srcset="" />
                </span>
            Security
              </Link>

              <Link
                class="list-group-item list-group-item-action text-start border-0"
                onClick={() =>{ setCurrentPage("/dashboard/items");
                  setShow(false)}}                
                style={{backgroundColor:'#070F2B',color:'white'}}
              >
                <span style={{ marginRight: "10px" }}>
                  <img src="../images/settings.png" alt="" srcset="" />
                </span>
          Settings
              </Link> */}

            </div>
              </Offcanvas.Body>
      </Offcanvas>

      
    </div>
  )
}

export default Profile