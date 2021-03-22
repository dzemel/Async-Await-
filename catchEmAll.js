const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

let pokemonArray = [];
let newPokemonArr = [];

async function getNameAndURL() {
  let response = await axios.get(BASE_URL + "?limit=1200");
  pokemonArray = response.data.results;
  let threePokemon = randomElementsFrom(pokemonArray, 3);
  for (let pokemon of threePokemon) {
    let res = await getPokemonDetails(pokemon.url);
    console.log(res);
    newPokemonArr.push(res);
  }
  console.log(newPokemonArr);
}

async function getPokemonDetails(url) {
  let response = await axios.get(url);
  let name = response.data.name;
  let image = response.data.sprites.front_default;
  let speciesURL = response.data.species.url;
  let description = await getDescription(speciesURL);
  return { name, image, description };
}

async function getDescription(speciesUrl) {
  let response = await axios.get(speciesUrl);
  console.log(response);
  let englishResults = response.data.flavor_text_entries.filter(
    (entry) => entry.language.name === "en"
  );
  console.log(englishResults);
  console.log(englishResults[0].flavor_text);
  return "";
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
