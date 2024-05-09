// Function to add a new number bigger by 1 to each new element
const addNewNumber = () => {
  // Select all the elements with the class 'here'
  const numberDivs = document.querySelectorAll(".here");

  // Loop through each element with the class 'here' and update its content
  numberDivs.forEach((div, index) => {
    div.textContent = index + 1 + ". "; // Increment the number by 1 for each new element
  });
};

// Call the function initially to add numbers to existing elements
addNewNumber();

// Get all the voting row elements
const votingRows = document.querySelectorAll(".voting-row");

// Function to hide all voting-row elements except the first one
const hideAllExceptFirst = () => {
  votingRows.forEach((row, index) => {
    if (index !== 0) {
      row.style.display = "none";
    }
  });
};

hideAllExceptFirst();

// event listeners to btns

const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => {
  // find the index of the currently visible voting row
  const visibleIndex = Array.from(votingRows).findIndex(
    (row) => row.style.display !== "none"
  );

  // hide the current voting-row
  votingRows[visibleIndex].style.display = "none";

  // show the next voting row if exists otherwise loop back to the first
  const nextIndex = (visibleIndex + 1) % votingRows.length;
  votingRows[nextIndex].style.display = "flex";
});

const previousButton = document.getElementById("previous-button");
previousButton.addEventListener("click", () => {
  const visibleIndex = Array.from(votingRows).findIndex(
    (row) => row.style.display !== "none"
  );

  // hide the current voting-row
  votingRows[visibleIndex].style.display = "none";

  const previousIndex =
    (visibleIndex - 1 + votingRows.length) % votingRows.length;
  votingRows[previousIndex].style.display = "flex";
});

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
  let highestScoreLabels = [];

  sums.forEach((sum, index) => {
    const score = parseInt(sum.textContent);
    if (score > highestScore) {
      highestScore = score;
      highestScoreLabels = [
        document.querySelectorAll(".voting-row label")[index].textContent,
      ];
    } else if (score === highestScore) {
      highestScoreLabels.push(
        document.querySelectorAll(".voting-row label")[index].textContent
      );
    }
  });

  return highestScoreLabels;
};

// Function to update the winning country heading
const updateWinningCountries = () => {
  const winningCountryHeading = document.querySelector(".winning-country");
  const winningCountryLabels = findHighestScoreLabel();
  if (winningCountryLabels.length === 1) {
    winningCountryHeading.textContent =
      "The winning country: " + winningCountryLabels[0];
  } else {
    winningCountryHeading.textContent =
      "The winning countries: " + winningCountryLabels.join(", ");
  }
};

// Call the function initially to display the winning country
updateWinningCountries();

// Watch for changes in the scores and update the winning country heading accordingly
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    updateWinningCountries();
  });
});
