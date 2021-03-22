let BASE_URL = "http://numbersapi.com";

async function getNumFact() {
  let response = await axios.get(BASE_URL + "/6?json");
  console.log(response);
  //ask why other ways didnt work
}

async function getManyNumFacts() {
  let response = await axios.get(BASE_URL + "/6,9,64");
  for (let key in response.data) {
    console.log(response.data[key]);
    $("#show-batch-numbers").append($("<p>").text(response.data[key]));
  }
}

async function getMultipleFactsPerNum(number) {
  let response = await Promise.all([
    axios.get(BASE_URL + `/${number}?json`),
    axios.get(BASE_URL + `/${number}?json`),
    axios.get(BASE_URL + `/${number}?json`),
    axios.get(BASE_URL + `/${number}?json`),
  ]);
  for (let entry of response) {
    console.log(entry.data.text);
    $("#show-batch-numbers").append($("<p>").text(entry.data.text));
  }
}
