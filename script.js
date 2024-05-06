// Get all the input fields and spans
const voices = document.querySelectorAll(".voice");
const musics = document.querySelectorAll(".music");
const performances = document.querySelectorAll(".performance");
const sums = document.querySelectorAll(".sum");

// Function to update total for a particular row
const updateTotal = (index) => {
  const voiceValue = parseInt(voices[index].value) || 0;
  const musicValue = parseInt(musics[index].value) || 0;
  const performanceValue = parseInt(performances[index].value) || 0;

  const total = voiceValue + musicValue + performanceValue;

  sums[index].textContent = total;
};

// Add event listeners to all input fields
document.querySelectorAll("input").forEach((input, index) => {
  input.addEventListener("input", () => {
    // Calculate the row index based on the index of the input
    const rowIndex = Math.floor(index / 3);
    updateTotal(rowIndex);
  });
});

const findHighestScoreLabel = () => {
  let highestScore = -1;
  let highestScoreLabel = "";

  sums.forEach((sum, index) => {
    const score = parseInt(sum.textContent);
    if (score > highestScore) {
      highestScore = score;
      highestScoreLabel =
        document.querySelectorAll(".voting-row label")[index].textContent;
    }
  });

  return highestScoreLabel;
};

// Function to update the winning country heading
const updateWinningCountry = () => {
  const winningCountryHeading = document.querySelector(".winning-country");
  winningCountryHeading.textContent =
    "The winning country: " + findHighestScoreLabel();
};

// Call the function initially to display the winning country
updateWinningCountry();

// Watch for changes in the scores and update the winning country heading accordingly
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    updateWinningCountry();
  });
});
