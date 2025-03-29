import React, { useEffect, useState } from 'react'
import ProductCard from '../component/ProductCard';
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';


const ProductAll = () => {

  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();

  const getProducts = async () => {
    let searchQuery = query.get('q') || "";
    console.log("쿼리값은?", searchQuery)
    let url = ` https://my-json-server.typicode.com/swdevelop24/react/products?q=${searchQuery}`
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setProductList(data);
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  return <div>
    <Container>
      <Row>
        {productList.map((menu) => (
          <Col lg={3}><ProductCard item={menu} /></Col>
        ))}

      </Row>
    </Container>
  </div>

}

export default ProductAll
