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

// Event listeners for next and previous buttons
const nextButton = document.getElementById("next-button");
// Event listener for the "Next" button
// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
  // Find the index of the currently visible voting row
  const visibleIndex = Array.from(votingRows).findIndex(
    (row) => row.style.display !== "none"
  );

  // Hide the current voting-row
  votingRows[visibleIndex].style.display = "none";

  // Show the next voting row if exists, otherwise loop back to the first
  const nextIndex = (visibleIndex + 1) % votingRows.length;
  votingRows[nextIndex].style.display = "flex";

  // Hide the "Previous" button if the first country is displayed
  if (votingRows[nextIndex] === votingRows[0]) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "block";
  }

  // Hide the "Next" button if the final results page is displayed
  if (nextIndex === votingRows.length - 1) {
    // Remove the "Next" button from display
    nextButton.style.display = "none";
  } else {
    // If not the final results page, display the "Next" button
    nextButton.style.display = "block";
  }
});

const previousButton = document.getElementById("previous-button");
previousButton.addEventListener("click", () => {
  const visibleIndex = Array.from(votingRows).findIndex(
    (row) => row.style.display !== "none"
  );

  // Hide the current voting-row
  votingRows[visibleIndex].style.display = "none";

  const previousIndex =
    (visibleIndex - 1 + votingRows.length) % votingRows.length;
  votingRows[previousIndex].style.display = "flex";

  // Hide the "Next" button if the final results page is displayed
  if (previousIndex === votingRows.length - 1) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "block";
  }
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
    updateWinningCountries(); // Update winning country whenever input changes
  });
});

// Function to find the labels with the highest score
const findHighestScoreLabelsAndPoints = () => {
  let highestScore = -1;
  let highestScoreLabels = [];
  let highestScorePoints = 0;

  sums.forEach((sum, index) => {
    const score = parseInt(sum.textContent);
    if (score > highestScore) {
      highestScore = score;
      highestScoreLabels = [
        document.querySelectorAll(".voting-row label")[index].textContent,
      ];
      highestScorePoints = score;
    } else if (score === highestScore) {
      highestScoreLabels.push(
        document.querySelectorAll(".voting-row label")[index].textContent
      );
      highestScorePoints += score;
    }
  });

  return { labels: highestScoreLabels, points: highestScorePoints };
};

// Function to update the winning country and number of points in the final results form
const updateWinningCountries = () => {
  const winningCountrySpan = document.getElementById("winner");
  const pointsSpan = document.getElementById("points");

  const { labels, points } = findHighestScoreLabelsAndPoints();
  if (labels.length === 1) {
    winningCountrySpan.textContent = labels[0];
    pointsSpan.textContent = points;
  } else {
    winningCountrySpan.textContent = labels.join(", ");
    pointsSpan.textContent = points / labels.length; // Divide total points by the number of winners
  }
};

// Call the function initially to display the winning country and number of points
updateWinningCountries();

document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON data
  fetch("esc.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through each voting row
      document.querySelectorAll(".voting-row").forEach((row, index) => {
        // Get the country data from the JSON file
        const countryData = data[index];

        // Update the label with the country name
        row.querySelector("label").textContent = countryData.country;

        // Update the paragraph elements with the song name and artist
        row.querySelector("#name").textContent = `${countryData.name}`;
        row.querySelector("#song").textContent = `${countryData.song}`;
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));

  // Hide the "Previous" button when the page loads
  previousButton.style.display = "none";
});

const limitValue = (input) => {
  if (input.value > 10) {
    input.value = 10;
  } else if (input.value < 0) {
    input.value = 0;
  }
};
