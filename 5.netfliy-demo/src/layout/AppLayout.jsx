import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppLayout.style.css";
import { Outlet, Link, useSearchParams, useNavigate } from "react-router-dom";

const AppLayout = () => {
  // 입력값 받아오기
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const searchByKeyword = (event) => {
    event.preventDefault();
    if (!keyword.trim()) {
      handleShow(); // 모달 띄우기
      return;
    }
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div className="nav-container">
      <Navbar expand="lg" variant="dark" style={{ background: "black" }}>
        <Container fluid>
          <Navbar.Brand href="#">
            {" "}
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV0ZmxpeHxlbnwwfHwwfHx8Mg%3D%3D"
              alt="Brand Logo"
              height="53"
              width="100"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/movies" className="text-white">
                Movies
              </Nav.Link>
            </Nav>
            <Form
              className="d-flex nav-custom-search-container"
              onSubmit={searchByKeyword}
            >
              <Form.Control
                className="nav-custom-search-box"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="danger" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>⚠️ 입력 오류</Modal.Title>
          </Modal.Header>
          <Modal.Body>검색어를 입력해주세요!</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
        ;
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
