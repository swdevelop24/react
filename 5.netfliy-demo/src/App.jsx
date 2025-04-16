import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import RecommendationPage from "./pages/Recommendation/RecommendationPage"; // ← 추가했는지 확인!
import NotFoundPage from "./pages/NotFound/NotFoundPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />

          {/* /movies 및 상세 */}
          <Route path="movies">
            <Route index element={<MoviePage />} />
            <Route path=":id">
              <Route index element={<MovieDetailPage />} />
              {/* 추천/리뷰 같은 하위 페이지 추가 가능 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* /recom 은 movies 안이 아니라 여기! */}
          <Route path="recommendation" element={<RecommendationPage />} />

          {/* 그 외는 모두 NotFound */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
