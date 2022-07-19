
import { Grid } from "@nextui-org/react"
import { NextPage } from "next"
import { FavoriteCard } from "./";

interface Props {
  favoritesPokemons: number[]
}

export const FavoritesPokemons: NextPage<Props> = ({ favoritesPokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {
        favoritesPokemons.map(id => (
          <FavoriteCard key={id} pokemonId={id} />
        ))
      }
    </Grid.Container>
  )
}
