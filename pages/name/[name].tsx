import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import { pokeApi } from '../../api';
import { MainLayout } from '../../components/layouts'
import { PokemonFullDetail, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti';

interface Props {
    pokemon: PokemonFullDetail
}

export const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorites = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsFavorite(localFavorites.isFavorite(pokemon.id));

        if (isFavorite) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        });
    }

    useEffect(() => {
        setIsFavorite(localFavorites.isFavorite(pokemon.id));
    },[pokemon.id]);

    return (
        <MainLayout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable isPressable css={{ padding: 30 }}>
                        <Card.Body>
                            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || 'no image'}
                                alt={pokemon.name}
                                width="100%"
                                height={200} />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>
                                {pokemon.name}
                            </Text>
                            <Button color={'gradient'} ghost={!isFavorite} onPress={toggleFavorites}>
                                { isFavorite ? 'Remove from Favorites' : 'Save in Favorites' }
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>
                                Sprites
                            </Text>
                            <Container display='flex' direction='row'>
                                <Image src={pokemon.sprites.front_default} alt={pokemon.name} height={100} width={100} />
                                <Image src={pokemon.sprites.back_default} alt={pokemon.name} height={100} width={100} />
                                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} height={100} width={100} />
                                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} height={100} width={100} />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </MainLayout>
    )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    // Set Array with all 200 pages that will be previously rendered
    const { data }  = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=50`);
    const allPokemons: string[] = data.results.map(poke => `${poke.name}`);

    return {
        // paths: [{params: {name:'ditto'},},{params: {name:'psiduck'},}],
        paths: allPokemons.map(name => ({
            params: {name}
        })),
        fallback: 'blocking'
        // fallback: false // If paths no exist in statics, show 404 page
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };
    
    const pokemon = await getPokemonInfo(name);

    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    return {
        props: {
            pokemon
        },
        revalidate: 86400 // 1 year
    }
}

export default PokemonByNamePage;
