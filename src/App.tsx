import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomNavbar from './Components/Navbar';
import OptionPage from './Pages/optionPage';
import BookSeatingPage from './Pages/seatBooking';
import CustomizeRowPage from './Pages/customizeRow';
import MovieSelection from './Pages/movieSelection';

interface Movie {
  name: string;
  language: string;
  imageUrl: string;
}

const App: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [showMovieSelection, setShowMovieSelection] = useState(true);

  const handleMovieSelection = (movie: Movie) => {
    setSelectedMovie(movie.name);
    setShowMovieSelection(false);
  };

  const handleNavigation = () => {
    setShowMovieSelection(true);
  };

  return (
    <Router>
      <CustomNavbar onNavigation={handleNavigation} isOnMovieSelection={showMovieSelection} />
      <Routes>
        <Route
          path="/"
          element={
            showMovieSelection ? (
              <MovieSelection onMovieSelection={handleMovieSelection} />
            ) : (
              <Navigate to="/optionpage" />
            )
          }
        />
        <Route path="/optionpage" element={<OptionPage movie={selectedMovie || ''} />} />
        <Route path="/book-seating" element={<BookSeatingPage movie={selectedMovie || ''} />} />
        <Route path="/customize-row" element={<CustomizeRowPage movie={selectedMovie || ''} />} />
      </Routes>
    </Router>
  );
};

export default App;
