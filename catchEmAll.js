const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

let pokemonArray = [];
let newPokemonArr = [];

async function getNameAndURL(num) {
  let response = await axios.get(BASE_URL + "?limit=1200");
  pokemonArray = response.data.results;
  let threePokemon = randomElementsFrom(pokemonArray, num);
  threePokemon = await Promise.all(threePokemon.map(e => getPokemonDetails(e.url)));
}

async function getPokemonDetails(url) {
  let response = await axios.get(url);
  let name = response.data.name;
  let image = response.data.sprites.front_default;
  let speciesURL = response.data.species.url;
  let description = await getDescription(speciesURL);
  return {name, image, description};
}

async function getDescription(speciesUrl) {
  let response = await axios.get(speciesUrl);
  let englishResults = response.data.flavor_text_entries.filter(
    (entry) => entry.language.name === "en");
  return englishResults[0].flavor_text;
}

function randomElementsFrom(arr, num) {
  let randomElements = [];
  //return all indices if num > arr.length
  while (randomElements.length < num) {
    const rIdx = Math.floor(Math.random() * arr.length);
    if (randomElements.includes(arr[rIdx])) {
      continue;
    }
    randomElements.push(arr[rIdx]);
  }
  return randomElements;
}
