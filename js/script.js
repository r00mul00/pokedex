const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

let currentDescription = '';

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
    if (APIResponse.status == 200) {
     const data = await APIResponse.json();
    return data;   
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = ' '

    const data = await fetchPokemon(pokemon);

    if(data ){
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;

// Busca a descrição do Pokémon
const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
const species = await response.json();

const description = species.flavor_text_entries.find(
    entry => entry.language.name === "en"
);

if (description) {
    currentDescription = description.flavor_text.replace(/\f/g, " ");

    const speech = new SpeechSynthesisUtterance(currentDescription);

    speech.lang = "en-US";
    speech.rate = 0.9;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
}

}

    else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Num tem 😭';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();    
    renderPokemon(input.value.toLowerCase());
   
});

buttonPrev.addEventListener('click', () => {
   if (searchPokemon > 1){
    searchPokemon -= 1;
   renderPokemon(searchPokemon); 
   } 
});

buttonNext.addEventListener('click', () => {
   searchPokemon += 1;
   renderPokemon(searchPokemon);

});

renderPokemon(searchPokemon);

