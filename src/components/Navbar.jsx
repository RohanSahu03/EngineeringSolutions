import React from 'react'
import '../css/navbar.css'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoMdCall } from "react-icons/io";

function NavBar() {
  return (
    <div
            className="headers"
        
        >
            {["xl"].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                
                    className='header'
                >
                    <Container fluid style={{ padding: "5px 20px"}}>
                        <div className="d-flex align-items-center gap-2" >
                            <a href="/" className="tail-text" style={{color:"black", height:"75px"}}>
                                <img src="../images/logo2.jpeg" alt="Logo" className='logo'/>
                    
                            </a>
                            <div className='verticleline'></div>
                            <div className="callInfo">
                                <p>Have any question ?</p>
                                <p> <span style={{color:'#0061D1'}}><IoMdCall/></span>+91-9900070087</p>
                            </div>
                          
                        </div>
                        <Navbar.Toggle className='shadow-none border-0'>
                            <img src="../images/menu.png" alt="" srcset="" />
                        </Navbar.Toggle>
                          
                        
                        <Navbar.Offcanvas
                            // id={offcanvasNavbar-expand-${expand}}
                            // aria-labelledby={offcanvasNavbarLabel-expand-${expand}}
                            placement="start"
                           className='offcanvas'
                        >
                            <Offcanvas.Header closeButton className='closeBtn border-bottom'></Offcanvas.Header>
                            <Offcanvas.Body className='offCanvasBody'>
                                <Nav
                                    className="justify-content-end flex-grow-1 pe-3"
                        
                                >
                                     <Nav.Link href="/" className="tail-text menus"   >
                                       Home
                                    </Nav.Link>
                                    <Nav.Link href="/aboutus" className="tail-text menus" >
                                        About Us
                                    </Nav.Link>
                                    <Nav.Link href="/service" className="tail-text menus" >
                                      Service
                                    </Nav.Link>
                                 
                                    <Nav.Link href="/contactus" className="tail-text menus">
                                       Contact Us
                                    </Nav.Link>
                                   
                                    <Nav.Link href="/login" className="tail-text loginbtn">
                                      SIGN IN
                                    </Nav.Link>
                                    {/* <Nav.Link href="/signup" className="tail-text signup w-sm-25">
                                      SIGN UP
                                    </Nav.Link> */}

                                </Nav>



                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
  )
}

export default NavBar