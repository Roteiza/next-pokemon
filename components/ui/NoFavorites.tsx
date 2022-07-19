import { Container, Text, Image } from '@nextui-org/react';

export const NoFavoritesPage = () => {
  return (
    <Container css={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center' 
      }}>
        <Text h1>
          There are no favorites Pokemons
        </Text>
        <Image
          src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'}
          alt='pokemon'
          css={{opacity: 0.5, paddingTop: 40}}
        />
      </Container>
  )
}
