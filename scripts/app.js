import { getPokemonsByType, getAllTypes } from "./api.js";
import { renderPokemonList, renderError, renderTypeOptions } from "./ui.js";

let currentSlide = 0;

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.querySelector("form");
    const select = document.querySelector("#typeSelect");
    
    try {
        const types = await getAllTypes();
        renderTypeOptions(types);
    } catch (error) {
        renderError(error.message);
    }

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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.prev-button').addEventListener('click', () => moveSlide(currentSlide - 1));
    document.querySelector('.next-button').addEventListener('click', () => moveSlide(currentSlide + 1));
});