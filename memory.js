// function for setting up default settings and fetching Harry potter images (incomplete)
(function HPfetch(){
    fetch('https://hp-api.herokuapp.com/api/characters')
    .then(response => response.json())
    .then(data => {
        const HPchars = data.image;
        let rng1 = math.floor(Math.random() *3 +1);
        for(var i = 0; i < 12; i+2){
            let firstcardPair = document.getElementById(`${i+1}`);
            const charCard1 = firstcardPair.querySelector(".front-face");
            const CharBadge1 = firstcardPair.querySelector(".back-face");
            charCard1.src = HPchars[i*rng1];
            CharBadge1.src = `https://i.ebayimg.com/images/g/UxAAAOSwKiZgoWC5/s-l400.jpg`;
            charCard1.alt = "Harry-potter-character-image";
            CharBadge1.alt = "HP-badge";
            let secondcardPair = document.getElementById(`${i +2}`);
            const charCard2 = secondcardPair.querySelector(".front-face");
            const CharBadge2 = secondcardPair.querySelector(".back-face");
            charCard2.src = HPchars[i*rng1];
            CharBadge2.src = `https://i.ebayimg.com/images/g/UxAAAOSwKiZgoWC5/s-l400.jpg`;
            charCard2.alt = "Harry-potter-character-image";
            CharBadge2.alt = "HP-badge";
        }
    })
    .catch(error => console.error("Error fetching Harry Potter images:", error));
})();

// function for fetching dog images with random
function fetchDogImages() {
    fetch('https://dog.ceo/api/breeds/image/random/6')
    .then(response => response.json())
    .then(data => {
         const dogBreeds = data.message;
         for (var i = 0; i < 12; i+2) {
             let cardPairfirstcard = document.getElementById(`${i + 1}`);
             const dogImage1 = cardPairfirstcard.querySelector(".front-face");
             const dogBadge1 = cardPair.querySelector(".back-face");
             dogImage1.src = dogBreeds[i];
             dogBadge1.src = `https://images.dog.ceo/breeds/shiba/shiba-5.jpg`;
             dogImage1.alt = "dog-image";
             dogBadge1.alt = "dog-badge";
             let cardPairSecondcard = document.getElementById(`${i + 2}`);
             const dogImage2 = cardPairSecondcard.querySelector(".front-face");
             const dogBadge2 = cardPairSecondcard.querySelector(".back-face");
             dogImage2.src = dogBreeds[i];
             dogBadge2.src = `https://images.dog.ceo/breeds/shiba/shiba-5.jpg`;
             dogImage2.alt = "dog-image";
             dogBadge2.alt = "dog-badge";
         }
     })
    .catch(error => console.error("Error fetching dog images:", error));
};

// function for fetching country flags (incomplete)
function fetchCountryFlags() {
    fetch('https://flagsapi.com/countries')
    .then(response => response.json())
    .then(data => {
         const countryFlags = data.message;
         let rng2 = math.floor(math.random() *3 + 1);
         for (var i = 0; i < 12; i++) {
             const countryFlag = countryFlags[i*rng2];;
             const paircard1 = document.getElementById(`${i + 1}`);
             const Flag1 = paircard1.querySelector(".front-face");
             const Flag1badge = paircard1.document.querySelector(".back-face");
             Flag1.src = `https://flagsapi.com/${countryFlag}/flat/64.png`;
             Flag1.alt = "country-Flag";
             Flag1badge.src = "https://img.freepik.com/free-vector/earth-globe-model-vector_1308-128315.jpg";
             Flag1badge.alt = "flag-badge";
             const paircard2 = document.getElementById(`${i + 2}`);
             const flag2 = paircard2.querySelector(".front-face");
             const flag2badge = paircard2.querySelector(".back-face");
             flag2.src = `https://flagsapi.com/${countryFlag}/flat/64.png`;
             flag2.alt = "country Flag";
             flag2badge.src = "https://img.freepik.com/free-vector/earth-globe-model-vector_1308-128315.jpg";
             flag2badge.alt = "flag-badge";
             
            }
        })
    .catch(error => console.error("Error fetching country flags:", error));
};

// function for random fetch requests 
function fetchRandom(){
    let randomnumber = math.floor(math.random() * 3 + 1);
    if (randomnumber == 1){
        HPfetch();
    }else if (randomnumber == 2){
        fetchDogImages();
    }else if (randomnumber == 3){
        fetchCountryFlags();
    }
}

// Select all the cards from the HTML file
const cards = document.querySelectorAll(".memory-card");

// Flag for letting us know if a card already been fliped
let hasFlippedCard = false;

// Flag for locking the borad when two cards been fliped
// Prevent us from flipping more cards when our app calculte the results
let lockBoard = false;

// Variables for saving the current card selections after the user choosed to flip them
let firstCard, secondCard;

// function for fliping the card
function flipCard() {
  // We don't allow to flip the card if the lockBoard is true
  if (lockBoard) return;
  // We don't allow to flip the card if we already flipped this card
  if (this === firstCard) return;

  // adding the class flip to the selected card
  this.classList.add("flip");

  // If we don't already fliped a card (first card been fliped)
  if (!hasFlippedCard) {
    // Flag to true -> flipped a card and save to firstCard the seleceted card
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // If we already fliped a card (second card been fliped)
  // save to secondCard the seleceted card
  secondCard = this;
  // Call checkForMatch() method to see if cards are matched
  checkForMatch();
}

function checkForMatch() {
  // dataset will contain all the HTML properties that has "data-{name}"
  // we can get those properties by calling element.dataset.{name}
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  // if the dataset name of the two cards is the same -> we will call disableCards()
  // else -> we will call unflipCards()
  isMatch ? disableCards() : unflipCards();
}

// Function that will make sure that we can't flip the cards again in the game
// the fucntion is removing the eventListener for "click" from both cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  // we should call reset to make sure that the user can now chose again two cards
  resetBoard();
}

// Function that will unflip the selected cards incase they are not matched
function unflipCards() {
  // during the unflip time we don't want to allow the user to flip other cards
  // so lockBoard should be true
  lockBoard = true;

  // the unflip functionality is by removing the "flip" class from both cards and reset the board
  // we want to start this logic only 1.5 seconds after the unflipCards() was triggered
  // because if we won't do it our app will imedietly flip the cards before we will be able to see it
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

// Function that should reset all flags back to false and all card variables back to null
function resetBoard() {
  // [hasFlippedCard, lockBoard] = [false, false];
  hasFlippedCard = false;
  lockBoard = false;
  // [firstCard, secondCard] = [null, null];
  firstCard = null;
  secondCard = null;
}

// This function shuffles the cards
// we are calling this fucntion imidietly when the game start and this is why we have () in the end of the function
(function shuffle() {
  cards.forEach((card) => {
    // create a random number between 0 - 11
    let randomPos = Math.floor(Math.random() * 12);
    // The order property specifies the order of a flexible item relative to the rest of the flexible items inside the same container.
    // If we will get the same number we will position it next to the previus card that got the same number
    card.style.order = randomPos;
  });
})();



// we will add a "click" event listener that will trigger flipCard on every card element
cards.forEach((card) => card.addEventListener("click", flipCard));

// Adding event listener to options buttons to fetch different data sources (Harry Potter, Dogs, Flags, randomize) and shuffle the cards accordingly.
document.querySelector(".options").addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-HP")) {
        HPfetch();
        shuffle();
    } else if (e.target.classList.contains("btn-dogs")) {
        fetchDogImages();
        shuffle();
    } else if (e.target.classList.contains("btn-flags")) {
        fetchCountryFlags();
        shuffle();
    }else if (e.target.classList.contains("btn-random")) {
        fetchRandom();
        shuffle();
    }
})