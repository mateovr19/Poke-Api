/**
 * @version 1.0.0
 * @author Mateo Velasquez Rodriguez
 * @email mateo.velasquezr@udea.edu.co
 */
/**
 * @ui
 * @description Archivo que contiene las funciones para manejar la UI de la aplicación.
 */

// Renderiza las opciones del dropdown de tipos de Pokémon
export function renderTypeOptions(types) {
  const select = document.querySelector("#typeSelect");
  select.innerHTML = `<option value="">Types</option>`;
  types.forEach(type => {
      const option = document.createElement("option");
      option.value = type.name;
      option.textContent = type.name.toUpperCase();
      select.appendChild(option);
  });
}

// Renderiza la lista de Pokémon filtrados por tipo
export function renderPokemonList(pokemons) {
  const container = document.querySelector(".slider-track");
  const cards = pokemons.map(pokemon => {
    const imgSrc = pokemon.sprites.other.dream_world.front_default ||
                   pokemon.sprites.other["official-artwork"].front_default ||
                   pokemon.sprites.front_default;

    return `
      <div class="slide">
        <div class="slide-inner">
          <img src="${imgSrc}" alt="${pokemon.name}" class="full-img" />
          <div class="info-panel visible">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <br>
            <p><strong>Altura:</strong> ${pokemon.height}</p>
            <p><strong>Peso:</strong> ${pokemon.weight}</p>
            <p><strong>Tipos:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Habilidades:</strong> ${pokemon.abilities.map(t => t.ability.name).join(", ")}</p>
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = cards;
}

// Muestra un mensaje de error si falla la búsqueda o carga de datos
export function renderError(message) {
  const container = document.querySelector(".slider-track");
  container.innerHTML = `
    <div class="slide">
      <div class="slide-inner">
        <div class="info-panel">
          <h2>Error</h2>
          <p>${message}</p>
        </div>
      </div>
    </div>
  `;
}