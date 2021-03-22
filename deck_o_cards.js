//Deck o Cards
const $GET_CARD = $('#get_card');
const $CARDS_CONTAINER = $('#cards');
const BASE_URL = "https://deckofcardsapi.com/api/deck";
let DECK_ID = null;

//================================== Functions not related to the page
async function getNumCards(count){
    resp = await axios.get(`${BASE_URL}/new/shuffle`);
    deckId = resp.data.deck_id;
    resp2 = await axios.get(`${BASE_URL}/${deckId}/draw`, {
        params: {count}
    });
    for(let card of resp2.data.cards){
        console.log(card.value, "of", card.suit);
    }
}

async function getTwoCards(){
    resp = await axios.get(`${BASE_URL}/new/shuffle`);
    deckId = resp.data.deck_id;
    resp2 = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
    resp3 = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
    console.log(resp2.data.cards[0].value, "of", resp2.data.cards[0].suit);
    console.log(resp3.data.cards[0].value, "of", resp3.data.cards[0].suit);
}
//================================================================
async function getDeck(){
    resp = await axios.get(`${BASE_URL}/new/shuffle`);
    DECK_ID = resp.data.deck_id;
}

// why are we getting 500 codes?

async function getOneCard(){
    resp = await axios.get(`${BASE_URL}/${DECK_ID}/draw/?count=1`);
    if(resp.data.cards.length > 0){
        imgUrl = resp.data.cards[0].image;
        randomAngle = Math.floor(70 * Math.random())-35;
        $CARDS_CONTAINER.append( $('<img>').attr('src', imgUrl).css('transform', `rotate(${randomAngle}deg)`) );
    }
    else {
        $GET_CARD.remove();
    }
}

$GET_CARD.on('click', getOneCard);
$('document').ready(getDeck);