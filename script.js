const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// SHOW LOADER
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// HIDE LOADER
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// FUNCTION THAT FETCHES QUOTES
const getQuote = async () => {
  // Show the loader before fetching
  loading();

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if (data.quoteText.length >= 120) quote.classList.add("long-quote");
    else quote.classList.remove("long-quote");

    quote.textContent = data.quoteText;
    author.textContent = data.quoteAuthor ? data.quoteAuthor : "Anonymous";

    // Hide the loader after fetching
    complete();
  } catch (err) {
    getQuote();
  }
};

// TWEET THE QUOTE
const tweetQuote = () => {
  const quoteText = quote.textContent;
  const quoteAuthor = author.textContent;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${quoteAuthor}`;

  window.open(tweetUrl, "_blank");
};

// EVENT LISTENERS
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);

// ON PAGE LOAD, GET NEW QUOTE
getQuote();
