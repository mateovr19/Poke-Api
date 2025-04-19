const BASE_URL = "https://pokeapi.co/api/v2"

export async function getPokemonsByType(type) {
    try {
        const response = await fetch(`${BASE_URL}/type/${type.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokemon no encontrado");
        const data = await response.json();
        const promises = data.pokemon.slice(0, 10).map(p => 
            fetch(p.pokemon.url).then(res => res.json())
        );
        return await Promise.all(promises);
    } catch (error) {
        throw error;
    }
}

export async function getAllTypes() {
    try {
        const response = await fetch(`${BASE_URL}/type`);
        if (!response.ok) throw new Error("No se pudieron cargar los tipos");
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw error;
    }
}