function calculateOverall(country) {
    var voice = parseInt(document.getElementById(country + "-voice").value);
    var performance = parseInt(document.getElementById(country + "-performance").value);
    var melody = parseInt(document.getElementById(country + "-melody").value);

    var overall = voice + performance + melody;

    document.getElementById(country + "-overall").textContent = overall;

    highlightWinner();
}

function highlightWinner() {
    var maxOverall = 0;
    var winnerCountry = "";

    var rows = document.querySelectorAll(".voting-row");

    rows.forEach(function(row) {
        var overall = parseInt(row.querySelector(".voting-item:last-child span").textContent);
        if (overall > maxOverall) {
            maxOverall = overall;
            winnerCountry = row.querySelector(".voting-item:first-child label").textContent;
        }
    });

    rows.forEach(function(row) {
        var overall = parseInt(row.querySelector(".voting-item:last-child span").textContent);
        if (overall === maxOverall) {
            row.querySelector(".voting-item:last-child span").style.color = "red";
        } else {
            row.querySelector(".voting-item:last-child span").style.color = "black";
        }
    });

    document.getElementById("winner").textContent = winnerCountry;
}
