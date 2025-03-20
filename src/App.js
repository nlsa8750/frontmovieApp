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
// importing spinner because the api was throwing the null response, making the component render before the api call becomes completed.
// so while the api call will throw undefined or null value => loading icon will be rendered until then
import { Spinner } from 'react-bootstrap';

function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    
    try {
      const response = await api.get("/api/v1/movies");
      console.log("Movies Data:", response.data);
      setMovies(response.data);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
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
      <Header />
      {loading ? (
        // spinner
        <div className="loading-container">
          <Spinner animation="border" variant="primary" />
          <p>Loading movies...</p>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies} />} />
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
            <Route
              path="/Reviews/:movieId"
              element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;