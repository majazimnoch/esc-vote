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
