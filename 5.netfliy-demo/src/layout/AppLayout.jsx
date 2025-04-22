// AppLayout.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link, useSearchParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppLayout.style.css";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const currentQ = query.get("q") || "";
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const searchByKeyword = (event) => {
    event.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) {
      handleShow();
      return;
    }

    const timestamp = Date.now();
    if (trimmed === currentQ) {
      alert("이미 검색된 키워드입니다!");
    }

    // trigger(t) 파라미터를 항상 넣어 URL 강제 변경
    navigate(`/movies?q=${trimmed}&t=${timestamp}`);
    setKeyword("");
  };

  return (
    <div className="nav-container">
      <Navbar expand="lg" variant="dark" style={{ background: "black" }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" style={{ color: "red", fontSize: "2.2rem", marginLeft: "0.2em" }}>
            <strong>M</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/movies" className="text-white">Movies</Nav.Link>
              <Nav.Link as={Link} to="/recommendation" className="text-white">Weather</Nav.Link>
            </Nav>
            <Form className="d-flex nav-custom-search-container" onSubmit={searchByKeyword}>
              <Form.Control
                className="nav-custom-search-box"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button variant="danger" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>⚠️ 입력 오류</Modal.Title>
          </Modal.Header>
          <Modal.Body>검색어를 입력해주세요!</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>닫기</Button>
          </Modal.Footer>
        </Modal>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default AppLayout;
