
const toggleFavorite = (id: number) => {
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.includes(id)) {
        favorites = favorites.filter(pokemonId => pokemonId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

/**
 * Check if Pokemon is in favorite list
 * 
 * @param id Pokemon ID
 * @returns boolean
 */
const isFavorite = (id: number): boolean => {
    if (typeof window === 'undefined') return false;

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes(id);
}

/**
 * Get a complete list of Pokemons ID's
 * 
 * @returns List of all pokemons ID's
 */
const pokemonsList = () => JSON.parse(localStorage.getItem('favorites') || '[]');

export default {
    isFavorite,
    pokemonsList,
    toggleFavorite
}