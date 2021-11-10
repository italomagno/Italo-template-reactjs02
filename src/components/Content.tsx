import { GenreResponseProps } from "../App";
import { MovieProps } from "../App";
import { MovieCard } from "./MovieCard";
import { useState, useEffect } from "react";
import { api } from "../services/api";
//import { Button } from "./Button";


interface ContentProps {
  selectedGenreId: number;
}


export function Content({ selectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  
  return(
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">


          {movies.map(movie => (
            <MovieCard 
            key ={movie.imdbID} 
            title={movie.Title} 
            poster={movie.Poster} 
            runtime={movie.Runtime} 
            rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}
/*
{genres.map(genre => (
  <Button
    key={String(genre.id)}
    title={genre.title}
    iconName={genre.name}
    onClick={() => handleClickButton(genre.id)}
    selected={selectedGenreId === genre.id}
  />
))}
*/