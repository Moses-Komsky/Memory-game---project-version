// function for setting up default settings and fetching Harry potter images (incomplete)
(function HPfetch(){
    fetch('https://hp-api.herokuapp.com/api/characters')
    .then(response => response.json())
    .then(data => {
        for(var i = 0; i < 12; i++){}
    })
    .catch(error => console.error("Error fetching Harry Potter images:", error));
})();

// function for fetching dog images (incomplete)
function fetchDogImages() {
    fetch('https://dog.ceo/api/breeds/image/random/12')
    .then(response => response.json())
    .then(data => {
         const dogBreeds = data.message;
         for (var i = 0; i < 12; i+2) {
             const cardPairfirstcard = document.getElementById(i + 1);
             const dogImage1 = cardPairfirstcard.document.querySelector(".front-face");
             const dogBadge1 = cardPair.document.querySelector(".back-face");
             dogImage1.src = `https://dog.ceo/api/breed/images/random/${i+1}`;
             dogBadge1.src = `https://images.dog.ceo/breeds/shiba/shiba-5.jpg`;
             dogImage1.classList.add('dog-image');
             dogBadge1.classList.add('dog-badge');
             const cardPairSecondcard = document.getElementById(i + 2);
             const dogImage2 = cardPairSecondcard.document.querySelector(".front-face");
             const dogBadge2 = cardPairSecondcard.document.querySelector(".back-face");
             dogImage2.src = `https://dog.ceo/api/breed/images/random/${i+1}`;
             dogBadge2.src = `https://images.dog.ceo/breeds/shiba/shiba-5.jpg`;
         }
     })
    .catch(error => console.error("Error fetching dog images:", error));
};

// function for fetching country flags (incomplete)
function fetchCountryFlags() {
    fetch('https://flagsapi.com/countries')
    .then(response => response.json())
    .then(data => {
         const countryFlags = data;
         for (var i = 0; i < 12; i++) {
             const countryFlag = document.createElement('img');
             countryFlag.src = countryFlags[country].svg;
             countryFlag.classList.add('country-flag');
             document.getElementById('country-flags').appendChild(countryFlag);
         }
     })
    .catch(error => console.error("Error fetching country flags:", error));
};

// function for random fetch requests (incomplete)
function fetchRandom(){
    let randomnumber = math.floor(math.random() * 3)
    if (randomnumber == 0){
        HPfetch();
    }else if (randomnumber == 1){
        fetchDogImages();
    }else if (randomnumber == 2){
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