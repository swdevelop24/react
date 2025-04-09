import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
// import TopRatedSlide from './components/TopRated/TopRatedSlide'
import TopRatedSlide from './components/TopRated/TopRatedSlide'

import '../../App.css'
import UpComingSlide from './components/UpComing/UpComingSlide'


//1. 배너 => popular 영화를 들고와서 첫번쨰 아이템을 보여주자 (popular movie api호출하기 )
//2. popular movie
//3. top rated movie
//4. upcoming movie 

const HomePage = () => {
  return (
    <div>
      <Banner/>
      <PopularMovieSlide/>
      <TopRatedSlide/>
      <UpComingSlide/>
    </div>
  )
}

export default HomePage
