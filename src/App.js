import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './component/Layout.js';
import Home from './component/home/Home.js';
import Header from './component/header/Header.js';
import Trailer from './component/trailer/Trailer.js';
import Reviews from './component/reviews/Reviews.js';
import NotFound from './component/notFound/NotFound.js';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () =>{
    
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
     
    try {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const singleMovie = response.data;
        setMovie(singleMovie);
        setReviews(singleMovie.reviews);     
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;