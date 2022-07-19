
import { NextPage, GetStaticProps } from 'next'
import { MainLayout } from '../components/layouts/';
import { Grid } from '@nextui-org/react';

import { pokeApi } from '../api';
import { PokemonListResponse } from '../interfaces';
import { PokemonDetail } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon/PokemonCard';

interface Props {
  pokemons: PokemonDetail[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <MainLayout title='Pokemon List'>
      <Grid.Container gap={2} justify={'flex-start'}>
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemons={pokemon} />
          ))
        }
      </Grid.Container>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=50');

  const pokemons: PokemonDetail[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
