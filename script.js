const totalVoice = document.getElementById("voice");
const totalMusic = document.getElementById("music");
const totalPerformance = document.getElementById("performance");
const overallSum = document.getElementById("sum");

const updateTotal = () => {
  const voiceValue = parseInt(totalVoice.value) || 0;
  const musicValue = parseInt(totalMusic.value) || 0;
  const performanceValue = parseInt(totalPerformance.value) || 0;

  const total = voiceValue + musicValue + performanceValue;

  overallSum.textContent = total;
};

document.querySelector("form").addEventListener("input", updateTotal);

updateTotal();
