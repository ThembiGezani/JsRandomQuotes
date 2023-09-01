// script.js

const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const tweetQuoteButton = document.getElementById("tweet-quote");

newQuoteButton.addEventListener("click", fetchQuote);
tweetQuoteButton.addEventListener("click", tweetQuote);

fetchQuote();

function fetchQuote() {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      quoteText.textContent = data.content;
      quoteAuthor.textContent = `- ${data.author}`;
      setRandomColors();

      // Set tweet-quote button href attribute
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `"${data.content}" - ${data.author}`
      )}`;
      tweetQuoteButton.href = tweetUrl;
    })
    .catch((error) => console.error("Error fetching quote:", error));
}

function setRandomColors() {
  const randomColor = getRandomColor();
  document.body.style.backgroundColor = randomColor;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function tweetQuote() {
  const currentQuote = quoteText.textContent;
  const currentAuthor = quoteAuthor.textContent;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${currentQuote}" - ${currentAuthor}`
  )}`;
  window.open(tweetUrl, "_blank");
}
