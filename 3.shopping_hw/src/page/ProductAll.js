import React, { useEffect, useState } from 'react'
import ProductCard from '../component/ProductCard';
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ProductAll = () => {

  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();

  let searchQuery = query?.get('q') ?? "";

  const getProducts = async () => {
    // let searchQuery = query.get('q')|| "";

    // 이전 결과 먼저 초기화
    // setProductList([]);
    // console.log("쿼리값은?", searchQuery)
    // let url = ` https://my-json-server.typicode.com/swdevelop24/react/products?q=${searchQuery}`
    // let response = await fetch(url);
    // let data = await response.json();
    // console.log(data);
    // setProductList(data);

    // 초기화
    setProductList([]);
    console.log("쿼리값은?", searchQuery);

    // 1. 전체 데이터를 먼저 가져오고
    let url = `https://my-json-server.typicode.com/swdevelop24/react/products`;
    let response = await fetch(url);
    let data = await response.json();

    // 2. 검색어가 있을 경우 필터링
    if (searchQuery.trim()) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setProductList(data);
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  return <div>
    <Container>

      {/* 검색어는 있는데 결과가 없을 때 */}
      {searchQuery.trim() && productList.length === 0 && (
        <div style={{ textAlign: 'center', padding: '1rem', background: '#eee', marginTop: '10px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>검색 결과가 없습니다.</p>
          <button onClick={() => navigate(-1)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
            Go Back
          </button>
        </div>
      )}

      <Row>

        {productList.map((menu) => (
          <Col lg={3}><ProductCard item={menu} /></Col>
        ))}

      </Row>
    </Container>
  </div>

}

export default ProductAll
