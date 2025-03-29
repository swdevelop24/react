import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import ProductAll from './page/ProductAll';
import Login from './page/Login';
import ProductDetail from './page/ProductDetail';
import Navbar from './component/Navbar';
import { useState, useEffect } from "react"
import PrivateRoute from './route/PrivateRoute';


//1.전체상품페이지, 로그인, 상품상세페이지 
//1-1. 네비게이션바 만들기 
//2.전체 상품페이지에서는 전체 상품을 볼수 있다.
//3. 로그인 버튼을 누르면 로그인 페이지가 나온다 (#6-7)
//3.상품디테일을 눌렀으나, 로그인이 안되어있을경우에는 로그인 페이지가 먼저 나온다
//4. 로그인이 되어있을 경우에는 상품 디테일 페이지를 볼수 있다. 
//5. 로그아웃 버튼을 클릭하면 로그아웃이 된다 
//5. 로그아웃이되면 상품 디테일 페이지를 볼수없다. 다시 로그인 페이지가 보인다
//6. 로그인을 하면 로그아웃이 보이고 로그아웃을 하면 로그인이 보인다 
//7. 상품을 검색할 수 있다. 





// function App() {

//   // true면 로그인이 됨 false이면 로그인이 안됨
//   const [authenticate, setAuthenticate] = useState(false)
//   useEffect(() => {
//     console.log("aaaaa", authenticate);
//   }, [authenticate])
//   return (
//     <div >
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<ProductAll />} />
//         <Route path="/login" element={<Login setAuthenticate={setAuthenticate} />} />
//         <Route path="/product/:id" element={<PrivateRoute authenticate ={authenticate}/>} />
//       </Routes>

//     </div>
//   );
// }

function App() {
  //  로그인 상태를 전역에서 관리
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // 로그인/로그아웃 상태 변경 핸들러
  const setAuthenticate = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', status.toString());
  };

  // 로그인 상태 변경 시 console 확인
  useEffect(() => {
    console.log('로그인 상태 변경:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
      {/* Navbar에 상태와 핸들러 전달 */}
      <Navbar isLoggedIn={isLoggedIn} setAuthenticate={setAuthenticate} />
      <Routes>
        <Route path="/" element={<ProductAll />} />
        <Route path="/login" element={<Login setAuthenticate={setAuthenticate} />} />
        <Route path="/product/:id" element={<PrivateRoute isLoggedIn={isLoggedIn} />} />
      </Routes>
    </div>
  );
}



export default App;
