  import React, { useState } from 'react';
  import './movieSelection.css';
  import Joe from "../assets/joe.jpg";
  import Kong from "../assets/kong.jpg";
  import Fail from "../assets/fail.jpg";
  import Star from "../assets/star.jpg";
  import Avengers from "../assets/avengers.jpg";
  import Aranmanai from "../assets/aranmanai.jpg";
  import OptionPage from '../Pages/optionPage';

  interface Movie {
    name: string;
    language: string;
    imageUrl: string;
  }

  const movies: Movie[] = [
    { name: 'Aranmanai 4', language: 'Tamil', imageUrl: Aranmanai },
    { name: 'Godzilla x Kong: The New Empire', language: 'English', imageUrl: Kong },
    { name: '12th Fail', language: 'Hindi', imageUrl: Fail },
    { name: 'Avengers', language: 'English', imageUrl: Avengers },
    { name: 'Joe', language: 'Tamil', imageUrl: Joe },
    { name: 'Star', language: 'Tamil', imageUrl: Star },
  ];

  interface MovieCardProps {
    movie: Movie;
    onClick: () => void;
  }



  const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => (
    <div className="movie-card" onClick={onClick}>
      <img src={movie.imageUrl} alt={movie.name} className="movie-image" />
      <div className="movie-details">
        <span className="movie-name">{movie.name}</span>
        <br />
        <span className="movie-language">{movie.language}</span>
      </div>
    </div>
  );

  interface MovieSelectionProps {
    onMovieSelection: (movie: Movie) => void;
  }

  const MovieSelection: React.FC <MovieSelectionProps> = ({ onMovieSelection }) =>{
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    if (selectedMovie) {
      return <OptionPage movie={selectedMovie.name} />;
    }

    return (
      <>
        
        <div className="movie-selection">
          <h1>Recommended Movies</h1>
          <div className="movies-grid">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} onClick={() => {setSelectedMovie(movie);onMovieSelection(movie);}} />
            ))}
          </div>
        </div>
      </>
    );
  };

  export default MovieSelection;
