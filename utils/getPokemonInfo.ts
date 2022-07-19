
import { pokeApi } from "../api";
import { PokemonFullDetail } from "../interfaces";

export const getPokemonInfo = async(nameOrId: string) => {
    const { data } = await pokeApi.get<PokemonFullDetail>(`/pokemon/${nameOrId}`);
    
    return {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    };
}
