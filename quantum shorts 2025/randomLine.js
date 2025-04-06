let rows = [];

function loadHostedCSV(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load CSV file: " + response.status);
      }
      return response.text();
    })
    .then(csvText => {
      const allRows = csvText
        .trim()
        .split("\n")
        .map(line => line.split(","));
      
      rows = allRows.filter(row => row.length > 0);
    })
    .catch(error => {
      console.error("Error loading CSV file:", error);
    });
}

function sanitize(text) {
  if (typeof text !== "string") return text;

  return text
    .normalize("NFKC")
    .replace(/[\u201C\u201D\u00AB\u00BB\u02DD\u301E\u301F]/g, '"')  // smart double quotes
    .replace(/[\u2018\u2019\u02BC\u2032\u2035]/g, "'")             // smart single quotes
    .replace(/[\u2013\u2014\u2015]/g, "-")                         // en/em dashes
    .replace(/\u2026/g, "...")                                     // ellipsis
    .replace(/[\u00A0\u200B-\u200F\uFEFF]/g, " ")                  // invisible spaces
    .replace(/&/g, "&amp;")                                        // escape HTML
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .trim();
}

function formatLinksFromRow(row) {
  if (row.length <= 3) return "N/A";

  const links = row.slice(3).filter(cell => typeof cell === "string" && cell.trim() !== "");
  if (links.length === 0) return "N/A";

  return links
    .map(link => {
      const url = sanitize(link);
      return `<a href="${url}" target="_blank">${url}</a>`;
    })
    .join("<br>");
}

function showRandomRow() {
  if (rows.length === 0) {
    document.getElementById("output").textContent = "No data loaded.";
    return;
  }

  const startIndex = isNaN(rows[0][0]) ? 1 : 0;
  const randomIndex = Math.floor(Math.random() * (rows.length - startIndex)) + startIndex;
  const row = rows[randomIndex];

  const display = `
    <strong>Date:</strong> ${sanitize(row[0]) || "N/A"}<br>
    <strong>Location:</strong> ${sanitize(row[1]) || "N/A"}<br><br>
    ${sanitize(row[2]) || ""}<br><br>
    <strong>Links:</strong><br>${formatLinksFromRow(row)}
  `;

  document.getElementById("output").innerHTML = display;
}

window.onload = function () {
  const csvURL = "https://yizhuj.com/quantum%20shorts%202025/database.csv";
  loadHostedCSV(csvURL);
};