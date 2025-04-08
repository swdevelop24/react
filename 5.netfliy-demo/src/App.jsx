import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage"
import NotFoundPage from "./pages/NotFound/NotFoundPage";

//홈페이지 /
//영화 전체 보여주는 페이지 (서치) /movies?q=agoia
//영화 디테일 /movies/:id 
//(
// 추천영화 /movies/:id/recommendation
// 리뷰 /movies/:id/reviews
// )

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path="movies">
            <Route index element={<MoviePage/>} />
            <Route path=":id" element={<MovieDetailPage/>} />
          </Route>
        </Route>

        {/* AppLayout 바깥에서 404 페이지 처리 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}




export default App;
