import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWonSign } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ item }) => {
  
  const navigate = useNavigate();
  const showDetail=()=>{
    navigate(`/product/${item.id}`)
  }
  return (
    <div className="product-card" onClick={showDetail}>
      <img src={item?.img} />
      <div className='conscious-pcard'>{item?.choice === true ? "Conscious  Choice" : ""}</div>
      <div>{item?.title}</div>
      <div><FontAwesomeIcon icon={faWonSign} /> {item?.price?.toLocaleString('ko-KR')}원</div>
      <div>{item?.new === true ? "신제품" : ""}</div>
    </div>
  )
}

export default ProductCard
