
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { FC } from 'react';
import { PokemonDetail } from '../../interfaces';
import { useRouter } from 'next/router';

interface Props {
    pokemons: PokemonDetail;
}

export const PokemonCard: FC<Props> = ({ pokemons }) => {

    const router = useRouter();
    
    const detailPokemon = () => {
        router.push(`/name/${pokemons.name}`);
    }

    return (
        <Grid xs={12} sm={3} md={2} xl={1} key={pokemons.id}>
            <Card isHoverable isPressable onPress={detailPokemon}>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image src={pokemons.img}
                        width='100%'
                        height={140}
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify='space-between'>
                        <Text transform='capitalize'>{pokemons.name}</Text>
                        <Text># {pokemons.id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}
