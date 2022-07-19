
import { MainLayout } from "../../components/layouts";
import { NoFavoritesPage } from '../../components/ui/';
import { useEffect, useState } from 'react';
import { localFavorites } from "../../utils";
import { FavoritesPokemons } from "../../components/pokemon/FavoritesPokemons";

export const FavoritesPage = () => {

  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemonsList);
  }, []);

  return (
    <MainLayout title="Favorites Pokemons">
      {
        favoritesPokemons.length === 0
          ? (<NoFavoritesPage />)
          :
          <FavoritesPokemons favoritesPokemons={favoritesPokemons}/>
      }
    </MainLayout>
  )
}

export default FavoritesPage;
