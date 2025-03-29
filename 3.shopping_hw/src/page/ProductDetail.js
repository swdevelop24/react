import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Dropdown, DropdownButton, Button } from 'react-bootstrap'
import styles from './ProductDetail.module.css'
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWonSign } from '@fortawesome/free-solid-svg-icons';


const ProductDetail = () => {

  let { id } = useParams();
  const [product, setProduct] = useState(null);

  // 선택된 사이즈 상태
  const [selectedSize, setSelectedSize] = useState("사이즈");



  const getProductDetail = async () => {
    let url = `https://my-json-server.typicode.com/swdevelop24/react/products/${id}`
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setProduct(data);
  }
  useEffect(() => {
    getProductDetail()
  }, [])

  // 사이즈 선택 핸들러
  const handleSelect = (size) => {
    setSelectedSize(size);
    console.log("size", size);
  };



  return (
    <Container className={styles['product-container']} >
      <Row className={styles['product-container-row'] }>
        <Col className={styles['product-img']}>
          <img src={product?.img} />
        </Col>
        <Col>
          <div className={styles['product-des']}>품명: {product?.title}</div>
          <div className={styles['product-des']}>가격:  <FontAwesomeIcon icon={faWonSign} />{product?.price?.toLocaleString('ko-KR')} 원</div>
          <div className={styles['product-des-choice']}>{product?.choice ? "Conscious Choice" : ""}</div>
          <DropdownButton
            variant="light"
            // id="dropdown-basic-button"
            title={<span className={
              selectedSize === "사이즈"
                ? styles["product-des-size-no-choice"]
                : styles["product-des-size"]
            }>{selectedSize}</span>}// 선택 전: "사이즈", 선택 후: 선택한 값
          >
            {product?.size?.map((size, id) => (
              <Dropdown.Item key={id} onClick={() => handleSelect(size)}>
                {size}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <Button variant="outline-danger" className={styles['product-button']}>추가</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail
