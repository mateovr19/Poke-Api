/**
 * @version 1.0.0
 * @author Mateo Velasquez Rodriguez
 * @email mateo.velasquezr@udea.edu.co
 */
/**
 * @app
 * @description Archivo que contiene las funciones para obtener los pokemones y tipos de la API de PokeAPI.
 */

// Importo funciones para consumir la API y manejar la UI
import { getPokemonsByType, getAllTypes } from "./api.js";
import { renderPokemonList, renderError, renderTypeOptions } from "./ui.js";

// Variable global para llevar el control del slide actual
let currentSlide = 0;

// Carga inicial de tipos de Pokémon al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    const form = document.querySelector("form");
    const select = document.querySelector("#typeSelect");
    
    try {
        const types = await getAllTypes();
        renderTypeOptions(types);
    } catch (error) {
        renderError(error.message);
    }

    // Maneja el submit del formulario para buscar Pokémon por tipo
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const selectType = select.value;
        if (!selectType) return;
        try {
            const pokemons= await getPokemonsByType(selectType);
            renderPokemonList(pokemons);
        } catch (error) {
            renderError(error.message);
        }
    });
});

// Mueve el slider a la posición indicada
function moveSlide(index) {
    const track = document.querySelector('.slider-track');
    const totalSlides = track.children.length;
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Agrega eventos a las flechas de navegación
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.prev-button').addEventListener('click', () => moveSlide(currentSlide - 1));
    document.querySelector('.next-button').addEventListener('click', () => moveSlide(currentSlide + 1));
});