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

async function getMultipleFactsPerNum(number, num_facts) {
  let nums_of_number = Array(num_facts).fill(number);
  let responses = await Promise.all(nums_of_number.map(num => axios.get(BASE_URL + "/" + num)));

  for (let entry of responses) {
    $("#show-batch-numbers").append($("<p>").text(entry.data));
  }
}


