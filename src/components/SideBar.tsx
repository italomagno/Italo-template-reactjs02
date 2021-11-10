import { Button } from "./Button"
import { api } from "../services/api";
import { useState , useEffect } from "react";
import { GenreResponseProps } from "../App";

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}


export function SideBar({ selectedGenreId, setSelectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map(({ id, title, name }) => (
          <Button
            key={String(id)}
            title={title}
            iconName={name}
            onClick={() => handleClickButton(id)}
            selected={selectedGenreId === id}
          />
        ))}
      </div>
    </nav>
  )
}
//ct