import React from 'react'
import ProductDetail from '../page/ProductDetail'
import { Navigate } from 'react-router-dom'

// const PrivateRoute = ({authenticate}) => {
//   return (
//     authenticate === true? <ProductDetail/>: <Navigate to="/login/"/>   
//   )
// }
const PrivateRoute = ({ isLoggedIn }) => {
  // ✅ 로그인 상태에 따라 접근 가능 여부 설정
  return isLoggedIn ? <ProductDetail /> : <Navigate to="/login" />;
};

export default PrivateRoute
